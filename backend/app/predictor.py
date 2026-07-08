import copy
from .mock_data import SECTORS, ROADS

class FloodPredictor:
    def __init__(self):
        self.sectors = copy.deepcopy(SECTORS)
        self.roads = copy.deepcopy(ROADS)

    def predict_spread(self, hours: int = 12, rain_rate_mm_hr: float = 25.0):
        """
        Simulates flood spreading across Hyderabad sectors using an elevation-based model.
        Returns a timeline of predictions (from hour 0 to hours).
        """
        timeline = []
        
        # Initialize sector water levels (meters of floodwater)
        water_levels = {sector_id: 0.0 for sector_id in self.sectors}
        
        # Seed initial water bodies (Hussain Sagar lake & Musi river bank start with some flood level)
        water_levels["hussain_sagar"] = 0.5
        water_levels["musi_river_bank"] = 0.6
        
        for hour in range(hours + 1):
            current_state = {}
            
            # 1. Update water level based on rain and elevation-based spread
            new_levels = copy.deepcopy(water_levels)
            
            # Apply rain to low-elevation areas faster
            for sector_id, sector in self.sectors.items():
                elevation = sector["elevation"]
                # Lower elevations gather rain faster
                rain_accumulation = (rain_rate_mm_hr / 1000.0) * (1.2 if elevation < 500 else 0.8)
                new_levels[sector_id] += rain_accumulation

            # 2. Spread water from higher levels to connected lower elevation sectors
            # Run multiple iterations of cell spreading for equilibrium
            for _ in range(3):
                temp_levels = copy.deepcopy(new_levels)
                for road in self.roads:
                    u = road["from"]
                    v = road["to"]
                    
                    # Total height = sector elevation + water depth
                    h_u = self.sectors[u]["elevation"] + temp_levels[u]
                    h_v = self.sectors[v]["elevation"] + temp_levels[v]
                    
                    if h_u > h_v + 0.1:  # Flow from u to v
                        flow = (h_u - h_v) * 0.15
                        # Limit flow by current water depth at source
                        flow = min(flow, temp_levels[u] * 0.5)
                        temp_levels[u] -= flow
                        temp_levels[v] += flow
                    elif h_v > h_u + 0.1:  # Flow from v to u
                        flow = (h_v - h_u) * 0.15
                        flow = min(flow, temp_levels[v] * 0.5)
                        temp_levels[v] -= flow
                        temp_levels[u] += flow
                new_levels = temp_levels

            # Update working water levels
            water_levels = new_levels
            
            # 3. Compile predictions for this hour
            for sector_id, sector in self.sectors.items():
                water_depth = water_levels[sector_id]
                
                # Determine threat level
                if water_depth < 0.2:
                    threat = "None"
                    color = "zinc"
                    building_risk = "Low"
                elif water_depth < 0.6:
                    threat = "Low"
                    color = "blue"
                    building_risk = "Minor Basements At Risk"
                elif water_depth < 1.2:
                    threat = "Medium"
                    color = "amber"
                    building_risk = "Ground Floors Flood Warning"
                elif water_depth < 2.0:
                    threat = "High"
                    color = "orange"
                    building_risk = "Structural Instability in Slums"
                else:
                    threat = "Critical"
                    color = "red"
                    building_risk = "High Collapse Probability (Old Buildings)"
                
                # People affected scales with flood height
                affected_pct = min(100.0, (water_depth / 3.0) * 100.0 if water_depth > 0.2 else 0.0)
                affected_pop = int(sector["population"] * (affected_pct / 100.0))
                
                if sector_id not in current_state:
                    current_state[sector_id] = []
                
                current_state[sector_id] = {
                    "sector_id": sector_id,
                    "name": sector["name"],
                    "water_depth": round(water_depth, 2),
                    "threat_level": threat,
                    "color": color,
                    "affected_population": affected_pop,
                    "building_risk": building_risk,
                    "is_safe": sector["is_safe"] if water_depth < 1.0 else False
                }
            
            timeline.append({
                "hour": hour,
                "sectors": current_state
            })
            
        return timeline
