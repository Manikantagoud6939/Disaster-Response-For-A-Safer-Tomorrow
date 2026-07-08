# Mock data representating sectors, assets, and emergency locations in Hyderabad

SECTORS = {
    "hussain_sagar": {
        "id": "hussain_sagar",
        "name": "Hussain Sagar Lake Area",
        "elevation": 480,  # Lowest point - flooding origin
        "coords": {"x": 500, "y": 400},
        "population": 1500,
        "is_safe": False
    },
    "musi_river_bank": {
        "id": "musi_river_bank",
        "name": "Musi River Bank Area",
        "elevation": 482,  # Low-lying river basin
        "coords": {"x": 550, "y": 620},
        "population": 8000,
        "is_safe": False
    },
    "amberpet": {
        "id": "amberpet",
        "name": "Amberpet Sector",
        "elevation": 488,  # Low-lying east
        "coords": {"x": 720, "y": 550},
        "population": 12000,
        "is_safe": False
    },
    "charminar": {
        "id": "charminar",
        "name": "Charminar Sector",
        "elevation": 495,  # Historic South
        "coords": {"x": 450, "y": 680},
        "population": 25000,
        "is_safe": False
    },
    "begumpet": {
        "id": "begumpet",
        "name": "Begumpet Sector",
        "elevation": 512,  # Central, moderate risk
        "coords": {"x": 480, "y": 280},
        "population": 18000,
        "is_safe": False
    },
    "secunderabad": {
        "id": "secunderabad",
        "name": "Secunderabad Sector",
        "elevation": 520,  # North, relatively safe
        "coords": {"x": 620, "y": 180},
        "population": 22000,
        "is_safe": True
    },
    "madhapur": {
        "id": "madhapur",
        "name": "Madhapur Tech Area",
        "elevation": 580,  # High elevation west
        "coords": {"x": 200, "y": 320},
        "population": 15000,
        "is_safe": True
    },
    "hitech_city": {
        "id": "hitech_city",
        "name": "Hitech City",
        "elevation": 590,  # Highest elevation
        "coords": {"x": 150, "y": 420},
        "population": 30000,
        "is_safe": True
    }
}

SHELTERS = [
    {
        "id": "shelter_secunderabad",
        "name": "Secunderabad Stadium Safe Zone",
        "coords": {"x": 630, "y": 150},
        "capacity": 1000,
        "occupied": 420,
        "medicine_stock": "High",
        "food_stock": "Medium",
        "sector_id": "secunderabad"
    },
    {
        "id": "shelter_hitech",
        "name": "Hitech City Exhibition Center (HITEX)",
        "coords": {"x": 160, "y": 390},
        "capacity": 2500,
        "occupied": 850,
        "medicine_stock": "Critical",
        "food_stock": "High",
        "sector_id": "hitech_city"
    },
    {
        "id": "shelter_madhapur",
        "name": "Madhapur Indoor Arena",
        "coords": {"x": 220, "y": 340},
        "capacity": 800,
        "occupied": 150,
        "medicine_stock": "High",
        "food_stock": "High",
        "sector_id": "madhapur"
    }
]

HOSPITALS = [
    {
        "id": "hosp_yashoda",
        "name": "Yashoda Hospital (Begumpet)",
        "coords": {"x": 490, "y": 300},
        "icu_beds_total": 50,
        "icu_beds_available": 12,
        "status": "Operational",
        "is_flooded": False
    },
    {
        "id": "hosp_apollo",
        "name": "Apollo Hospitals (Jubilee Hills)",
        "coords": {"x": 280, "y": 450},
        "icu_beds_total": 80,
        "icu_beds_available": 34,
        "status": "Operational",
        "is_flooded": False
    },
    {
        "id": "hosp_osmania",
        "name": "Osmania General Hospital",
        "coords": {"x": 480, "y": 600},
        "icu_beds_total": 60,
        "icu_beds_available": 3,  # Critical shortage
        "status": "Restricted Access (Water at entrance)",
        "is_flooded": True
    }
]

# Assets available for dispatch
RESPONDERS = [
    {"id": "police_1", "name": "Hyderabad Police Unit 1", "type": "Police", "coords": {"x": 470, "y": 270}, "status": "Idle", "task_id": None},
    {"id": "police_2", "name": "Cyberabad Patrol Unit 4", "type": "Police", "coords": {"x": 210, "y": 350}, "status": "Idle", "task_id": None},
    {"id": "fire_1", "name": "Begumpet Fire Station Unit", "type": "Fire", "coords": {"x": 460, "y": 310}, "status": "Idle", "task_id": None},
    {"id": "fire_2", "name": "Charminar Rescue Team", "type": "Fire", "coords": {"x": 420, "y": 650}, "status": "Idle", "task_id": None},
    {"id": "amb_1", "name": "Ambulance Lifesaver A", "type": "Ambulance", "coords": {"x": 510, "y": 320}, "status": "Idle", "task_id": None},
    {"id": "amb_2", "name": "Ambulance Lifesaver B", "type": "Ambulance", "coords": {"x": 260, "y": 430}, "status": "Idle", "task_id": None},
    {"id": "boat_1", "name": "NDRF Rescue Boat 1", "type": "Boat", "coords": {"x": 510, "y": 430}, "status": "Idle", "task_id": None},
    {"id": "boat_2", "name": "NDRF Rescue Boat 2", "type": "Boat", "coords": {"x": 530, "y": 600}, "status": "Idle", "task_id": None},
    {"id": "drone_1", "name": "Med-Drone Sentinel X1", "type": "Drone", "coords": {"x": 170, "y": 400}, "status": "Idle", "task_id": None, "battery": 92},
    {"id": "drone_2", "name": "Med-Drone Sentinel X2", "type": "Drone", "coords": {"x": 610, "y": 160}, "status": "Idle", "task_id": None, "battery": 85},
    {"id": "drone_3", "name": "Surveillance Eye-3", "type": "Drone", "coords": {"x": 480, "y": 380}, "status": "Idle", "task_id": None, "battery": 55}
]

# Initial active citizen reports
INITIAL_REPORTS = [
    {
        "id": "rep_001",
        "name": "Srinivas Rao",
        "phone": "+91 98480 22338",
        "sector_id": "amberpet",
        "type": "Trapped",
        "severity": "Critical",
        "description": "50 people trapped on community center rooftop. Water level rising fast, first floor flooded.",
        "coords": {"x": 735, "y": 560},
        "time": "13:30",
        "photo_url": "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=500&auto=format&fit=crop&q=60",
        "status": "Pending",
        "assigned_responder": None
    },
    {
        "id": "rep_002",
        "name": "Kavitha Reddy",
        "phone": "+91 99890 55432",
        "sector_id": "musi_river_bank",
        "type": "Medical",
        "severity": "Critical",
        "description": "Elderly patient needs oxygen cylinder and insulin urgently. House surrounded by 4ft water.",
        "coords": {"x": 570, "y": 630},
        "time": "13:42",
        "photo_url": None,
        "status": "Pending",
        "assigned_responder": None
    },
    {
        "id": "rep_003",
        "name": "MD. Ibrahim",
        "phone": "+91 91770 99881",
        "sector_id": "charminar",
        "type": "Road Block",
        "severity": "Medium",
        "description": "Main arterial road leading to Charminar hospital blocked by fallen tree and waterlogging.",
        "coords": {"x": 435, "y": 665},
        "time": "13:48",
        "photo_url": None,
        "status": "Pending",
        "assigned_responder": None
    }
]

# Road connections (for simple shortest path route drawing)
# Contains links between sectors
ROADS = [
    {"from": "hitech_city", "to": "madhapur", "blocked": False},
    {"from": "madhapur", "to": "begumpet", "blocked": False},
    {"from": "madhapur", "to": "hussain_sagar", "blocked": False},
    {"from": "begumpet", "to": "secunderabad", "blocked": False},
    {"from": "begumpet", "to": "hussain_sagar", "blocked": False},
    {"from": "secunderabad", "to": "amberpet", "blocked": False},
    {"from": "hussain_sagar", "to": "amberpet", "blocked": True},  # Blocked due to flooding
    {"from": "hussain_sagar", "to": "charminar", "blocked": True},  # Blocked due to flooding
    {"from": "charminar", "to": "musi_river_bank", "blocked": False},
    {"from": "amberpet", "to": "musi_river_bank", "blocked": False}
]
