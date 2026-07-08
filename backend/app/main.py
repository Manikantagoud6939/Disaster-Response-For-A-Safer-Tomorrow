import os
import uuid
from typing import Optional, List
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .mock_data import SECTORS, SHELTERS, HOSPITALS, RESPONDERS, INITIAL_REPORTS, ROADS
from .optimizer import RescueOptimizer
from .predictor import FloodPredictor

app = FastAPI(title="AI Disaster Response Platform API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev environments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Simulation State
class SimulationState:
    def __init__(self):
        self.rain_rate_mm_hr = 15.0
        self.weather_condition = "Heavy Thunderstorms"
        self.saved_count = 142
        self.trapped_count = 185
        self.sectors = {k: v.copy() for k, v in SECTORS.items()}
        self.shelters = [s.copy() for s in SHELTERS]
        self.hospitals = [h.copy() for h in HOSPITALS]
        self.responders = [r.copy() for r in RESPONDERS]
        self.reports = [r.copy() for r in INITIAL_REPORTS]
        self.roads = [rd.copy() for rd in ROADS]

state = SimulationState()

# Pydantic models for request bodies
class CitizenReportCreate(BaseModel):
    name: str
    phone: str
    sector_id: str
    type: str
    severity: str
    description: str
    coords: dict
    photo_url: Optional[str] = None

class ResponderUpdate(BaseModel):
    status: str
    task_id: Optional[str] = None

class RainUpdate(BaseModel):
    rain_rate_mm_hr: float

class CopilotQuery(BaseModel):
    query: str

@app.get("/api/status")
def get_status():
    pending_count = len([r for r in state.reports if r["status"] == "Pending"])
    active_rescue_count = len([r for r in state.reports if r["status"] == "Dispatched"])
    idle_responders_count = len([res for res in state.responders if res["status"] == "Idle"])
    
    # Recalculate trapped population based on flood levels
    predictor = FloodPredictor()
    forecast = predictor.predict_spread(hours=1, rain_rate_mm_hr=state.rain_rate_mm_hr)
    first_hour_sectors = forecast[1]["sectors"]
    
    total_trapped = 0
    for sector_id, sec_data in first_hour_sectors.items():
        if sec_data["threat_level"] in ["High", "Critical"]:
            total_trapped += sec_data["affected_population"]

    state.trapped_count = total_trapped if total_trapped > 0 else 125

    return {
        "rain_rate_mm_hr": state.rain_rate_mm_hr,
        "weather_condition": state.weather_condition,
        "saved_count": state.saved_count,
        "trapped_count": state.trapped_count,
        "pending_reports_count": pending_count,
        "active_rescue_count": active_rescue_count,
        "idle_responders_count": idle_responders_count,
        "total_responders": len(state.responders)
    }

@app.get("/api/sectors")
def get_sectors():
    # Overlay flood levels onto sector objects dynamically
    predictor = FloodPredictor()
    # Estimate current flooding after 2 hours of current rain rate
    forecast = predictor.predict_spread(hours=2, rain_rate_mm_hr=state.rain_rate_mm_hr)
    current_sectors = forecast[2]["sectors"]
    
    # Merge coords and details back
    merged_sectors = []
    for sector_id, info in current_sectors.items():
        base_sector = state.sectors[sector_id]
        merged_sectors.append({
            **base_sector,
            **info
        })
    return merged_sectors

@app.get("/api/shelters")
def get_shelters():
    return state.shelters

@app.get("/api/hospitals")
def get_hospitals():
    return state.hospitals

@app.get("/api/responders")
def get_responders():
    return state.responders

@app.get("/api/reports")
def get_reports():
    return state.reports

@app.get("/api/roads")
def get_roads():
    # Update road blockages based on flood water depth of connected sectors
    predictor = FloodPredictor()
    forecast = predictor.predict_spread(hours=2, rain_rate_mm_hr=state.rain_rate_mm_hr)
    current_sectors = forecast[2]["sectors"]
    
    updated_roads = []
    for road in state.roads:
        r_copy = road.copy()
        # If either from/to sector has Medium, High, or Critical flooding, the road becomes blocked
        from_sec_depth = current_sectors[road["from"]]["water_depth"]
        to_sec_depth = current_sectors[road["to"]]["water_depth"]
        
        if from_sec_depth > 0.8 or to_sec_depth > 0.8:
            r_copy["blocked"] = True
        else:
            r_copy["blocked"] = road["blocked"]
            
        updated_roads.append(r_copy)
    
    return updated_roads

@app.post("/api/reports")
def create_report(report_data: CitizenReportCreate):
    new_report = {
        "id": f"rep_{uuid.uuid4().hex[:6]}",
        "name": report_data.name,
        "phone": report_data.phone,
        "sector_id": report_data.sector_id,
        "type": report_data.type,
        "severity": report_data.severity,
        "description": report_data.description,
        "coords": report_data.coords,
        "time": "Just Now",
        "photo_url": report_data.photo_url,
        "status": "Pending",
        "assigned_responder": None
    }
    state.reports.insert(0, new_report)
    return new_report

@app.post("/api/optimize")
def run_optimization():
    optimizer = RescueOptimizer(state.responders, state.reports, state.roads)
    assignments = optimizer.optimize_assignments()
    
    dispatched_count = 0
    for assign in assignments:
        # Update responder state
        for res in state.responders:
            if res["id"] == assign["responder_id"]:
                res["status"] = "Dispatched"
                res["task_id"] = assign["report_id"]
                break
                
        # Update report state
        for rep in state.reports:
            if rep["id"] == assign["report_id"]:
                rep["status"] = "Dispatched"
                rep["assigned_responder"] = assign["responder_id"]
                break
        dispatched_count += 1
        
    return {
        "status": "Success",
        "assignments_made": dispatched_count,
        "details": assignments
    }

@app.post("/api/responders/{responder_id}/update")
def update_responder_status(responder_id: str, payload: ResponderUpdate):
    target_res = None
    for res in state.responders:
        if res["id"] == responder_id:
            target_res = res
            break
            
    if not target_res:
        raise HTTPException(status_code=404, detail="Responder not found")
        
    target_res["status"] = payload.status
    
    # If responder status is completed, release them and mark report as completed
    if payload.status == "Idle":
        associated_task = target_res.get("task_id")
        if associated_task:
            for rep in state.reports:
                if rep["id"] == associated_task:
                    rep["status"] = "Resolved"
                    state.saved_count += 1
                    break
            target_res["task_id"] = None
            
    elif payload.status == "Arrived":
        # Simply sets arrival state
        pass
        
    return target_res

@app.get("/api/predict")
def get_prediction(hours: int = 12):
    predictor = FloodPredictor()
    timeline = predictor.predict_spread(hours=hours, rain_rate_mm_hr=state.rain_rate_mm_hr)
    return timeline

@app.post("/api/simulate-rain")
def simulate_rain(payload: RainUpdate):
    state.rain_rate_mm_hr = payload.rain_rate_mm_hr
    if state.rain_rate_mm_hr <= 0:
        state.weather_condition = "Clear Sky"
    elif state.rain_rate_mm_hr < 10:
        state.weather_condition = "Light Rain"
    elif state.rain_rate_mm_hr < 25:
        state.weather_condition = "Heavy Showers"
    else:
        state.weather_condition = "Cloudburst / Flash Flood Risk"
    return {"status": "Updated", "rain_rate": state.rain_rate_mm_hr, "weather": state.weather_condition}

@app.post("/api/copilot")
def query_copilot(payload: CopilotQuery):
    query_text = payload.query.lower()
    
    # Check if user has Google GenAI library and key
    # For a robust fallback, we implement a beautiful disaster command agent logic
    # that parses key parameters of the state to answer queries
    
    # 1. Total status query
    if any(k in query_text for k in ["status", "overview", "summary", "how is it"]):
        pending = len([r for r in state.reports if r["status"] == "Pending"])
        active = len([r for r in state.reports if r["status"] == "Dispatched"])
        return {
            "answer": f"**Disaster Summary**: Currently experiencing **{state.weather_condition}** with a rain rate of **{state.rain_rate_mm_hr} mm/hour**. There are **{pending} pending alerts** requiring response, and **{active} active rescues** in progress. We have successfully saved **{state.saved_count} citizens** so far, while **{state.trapped_count}** are estimated trapped in critical flood sectors."
        }
        
    # 2. Bed availability / hospital query
    elif any(k in query_text for k in ["bed", "hospital", "icu", "medical"]):
        hospital_info = []
        for h in state.hospitals:
            status_text = "Flooded" if h["is_flooded"] else "Normal"
            hospital_info.append(f"- **{h['name']}**: {h['icu_beds_available']}/{h['icu_beds_total']} ICU beds available (Status: {status_text})")
        hospitals_joined = "\n".join(hospital_info)
        return {
            "answer": f"**Medical Asset Availability**:\n{hospitals_joined}\n\n*Osmania General Hospital is experiencing restricted access due to rising water levels at the entrance.*"
        }
        
    # 3. Shelter query
    elif any(k in query_text for k in ["shelter", "safe zone", "safe area"]):
        shelter_info = []
        for s in state.shelters:
            vacancy = s["capacity"] - s["occupied"]
            shelter_info.append(f"- **{s['name']}**: {s['occupied']}/{s['capacity']} occupied ({vacancy} slots left). Medicine: {s['medicine_stock']}, Food: {s['food_stock']}.")
        shelters_joined = "\n".join(shelter_info)
        return {
            "answer": f"**Emergency Shelter Status**:\n{shelters_joined}\n\n*HITEX Exhibition Center is functioning as the primary high-capacity shelter with ample food stock, but medicine levels are critical.*"
        }
        
    # 4. Drone query
    elif any(k in query_text for k in ["drone", "drones", "battery"]):
        drones = [r for r in state.responders if r["type"] == "Drone"]
        drone_info = []
        for d in drones:
            drone_info.append(f"- **{d['name']}**: Status: {d['status']}, Battery: {d['battery']}%")
        drones_joined = "\n".join(drone_info)
        return {
            "answer": f"**Med-Drone Fleet Diagnostics**:\n{drones_joined}"
        }

    # 5. Blocked roads query
    elif any(k in query_text for k in ["road", "blocked", "closed", "route"]):
        # Fetch updated blocked roads
        updated_roads = get_roads()
        blocked_roads = [r for r in updated_roads if r["blocked"]]
        if not blocked_roads:
            return {"answer": "Good news. Currently, all main arterial corridors connecting the sectors are open."}
        
        road_info = []
        for r in blocked_roads:
            # Map sector IDs to names
            from_name = state.sectors[r["from"]]["name"]
            to_name = state.sectors[r["to"]]["name"]
            road_info.append(f"- Corridor between **{from_name}** and **{to_name}**")
        roads_joined = "\n".join(road_info)
        return {
            "answer": f"⚠️ **Active Road Blockages (Flooded Routes)**:\n{roads_joined}\n\n*Vehicular traffic is advised to divert through Secunderabad or Madhapur bypasses.*"
        }
        
    # Default fallback
    return {
        "answer": f"I received your query: '{payload.query}'. As your Command Copilot, I can assist you with details regarding shelter occupancy, ICU bed vacancies, active drone batteries, road blockages, or an overall disaster status. Try asking 'What is the shelter capacity?' or 'Show blocked roads'."
    }
