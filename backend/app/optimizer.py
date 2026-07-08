import math
import copy

# Attempt to import Google OR-Tools. Fallback to greedy optimization if not installed.
try:
    from ortools.constraint_solver import routing_enums_pb2
    from ortools.constraint_solver import pywrapcp
    OR_TOOLS_AVAILABLE = True
except ImportError:
    OR_TOOLS_AVAILABLE = False

def calculate_distance(p1, p2):
    """Euclidean distance between two grid coordinates."""
    return math.sqrt((p1["x"] - p2["x"]) ** 2 + (p1["y"] - p2["y"]) ** 2)

class RescueOptimizer:
    def __init__(self, responders, reports, roads):
        self.responders = copy.deepcopy(responders)
        self.reports = copy.deepcopy(reports)
        self.roads = copy.deepcopy(roads)

    def optimize_assignments(self):
        """
        Assigns idle responders to pending reports based on type compatibility and proximity.
        Returns a list of proposed assignments.
        """
        # Compatibility map: report type -> list of compatible responder types
        COMPATIBILITY = {
            "Trapped": ["Boat", "Fire"],      # Boats for deep water, fire for general rescue
            "Medical": ["Ambulance", "Drone"], # Drones for medicine drops, ambulances for transport
            "Road Block": ["Police"],          # Police for traffic divert/road blocks
        }
        
        pending_reports = [r for r in self.reports if r["status"] == "Pending"]
        idle_responders = [res for res in self.responders if res["status"] == "Idle"]
        
        assignments = []
        
        if not pending_reports or not idle_responders:
            return assignments

        # If OR-Tools is available and we have multiple items, solve using OR-Tools routing/assignment
        if OR_TOOLS_AVAILABLE:
            try:
                # We can formulate this as a Bipartite Matching / Assignment problem using OR-Tools Linear Solver
                # Or we can do a quick greedy algorithm. Since this is an assignment problem, we'll demonstrate
                # a clean solver formulation using pywrapcp or simple linear programming.
                # To keep it extremely reliable and avoid setup issues, we'll implement a clean distance-cost matrix
                # and solve using a greedy matching heuristic that represents the optimization, 
                # but we will also show the OR-Tools integration.
                return self._solve_ortools_assignment(pending_reports, idle_responders, COMPATIBILITY)
            except Exception as e:
                # Fallback to greedy if solver fails
                return self._solve_greedy_assignment(pending_reports, idle_responders, COMPATIBILITY)
        else:
            return self._solve_greedy_assignment(pending_reports, idle_responders, COMPATIBILITY)

    def _solve_greedy_assignment(self, reports, responders, compatibility):
        """Greedy matching based on distance and type compatibility."""
        assignments = []
        available_responders = copy.deepcopy(responders)
        
        # Sort reports by severity (Critical first)
        sorted_reports = sorted(
            reports, 
            key=lambda x: (0 if x["severity"] == "Critical" else 1)
        )
        
        for report in sorted_reports:
            compatible_types = compatibility.get(report["type"], [])
            
            best_responder = None
            min_dist = float('inf')
            
            # Find the closest available compatible responder
            for res in available_responders:
                if res["type"] in compatible_types:
                    dist = calculate_distance(res["coords"], report["coords"])
                    # Drones are faster, so we give them a speed multiplier (reduce effective distance cost)
                    if res["type"] == "Drone":
                        dist = dist * 0.4
                        
                    if dist < min_dist:
                        min_dist = dist
                        best_responder = res
            
            if best_responder:
                assignments.append({
                    "report_id": report["id"],
                    "responder_id": best_responder["id"],
                    "estimated_time_minutes": max(2, int(min_dist / 15)),
                    "route": [best_responder["coords"], report["coords"]]
                })
                # Remove from available
                available_responders.remove(best_responder)
                
        return assignments

    def _solve_ortools_assignment(self, reports, responders, compatibility):
        """
        Uses OR-Tools linear programming solver (or routing solver) for optimal dispatch.
        For assignment, we use OR-Tools Linear Sum Assignment solver.
        """
        from ortools.graph.pywrapgraph import LinearSumAssignment
        
        assignment_solver = LinearSumAssignment()
        
        # Build cost matrix
        # Let i be index of reports, j be index of responders
        # cost = distance between report i and responder j. If incompatible, cost is infinite (or very large).
        num_reports = len(reports)
        num_responders = len(responders)
        
        # Mapping index to actual objects
        report_map = {idx: r for idx, r in enumerate(reports)}
        responder_map = {idx: r for idx, r in enumerate(responders)}
        
        for i in range(num_reports):
            report = report_map[i]
            comp_types = compatibility.get(report["type"], [])
            for j in range(num_responders):
                res = responder_map[j]
                
                if res["type"] in comp_types:
                    # High severity reports have lower cost (higher priority)
                    severity_bonus = 0.5 if report["severity"] == "Critical" else 1.0
                    dist = calculate_distance(res["coords"], report["coords"])
                    cost = int(dist * severity_bonus)
                else:
                    # Incompatible type
                    cost = 999999
                
                assignment_solver.add_arc_with_cost(i, j, cost)
                
        status = assignment_solver.solve()
        
        assignments = []
        if status == LinearSumAssignment.OPTIMAL:
            # Gather results
            for i in range(assignment_solver.num_nodes()):
                assigned_j = assignment_solver.assigned_node(i)
                cost = assignment_solver.assignment_cost(i)
                
                # Check if it was a valid assignment (not matching incompatible nodes)
                if cost < 500000:
                    report = report_map[i]
                    res = responder_map[assigned_j]
                    dist = calculate_distance(res["coords"], report["coords"])
                    
                    assignments.append({
                        "report_id": report["id"],
                        "responder_id": res["id"],
                        "estimated_time_minutes": max(2, int(dist / 15)),
                        "route": [res["coords"], report["coords"]]
                    })
            return assignments
        else:
            # Fallback
            return self._solve_greedy_assignment(reports, responders, compatibility)
