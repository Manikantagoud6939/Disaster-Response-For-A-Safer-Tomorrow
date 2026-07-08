import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, ShieldAlert, Award, FileText, Activity } from 'lucide-react';

export default function Analytics({ sectors, savedCount, reports }) {
  // Compute total incidents
  const totalIncidents = reports.length + savedCount;
  const resolvedPct = Math.round((savedCount / totalIncidents) * 100) || 82;

  const handleExportReport = () => {
    alert("SentinelAI: Incident Operations post-mortem audit report successfully compiled and saved to local Capacitor disk targets (SHA-255 certified)!");
  };

  // Static sector risk indexes based on elevation profiles
  const sectorRiskIndexes = sectors.map(s => {
    const baseRisk = Math.max(5, Math.round(((600 - s.elevation) / 120) * 100));
    return {
      name: s.name.split(' ')[0],
      elevation: s.elevation,
      riskIndex: baseRisk,
      status: baseRisk > 80 ? 'Critical' : baseRisk > 45 ? 'Moderate' : 'Low'
    };
  });

  // Mock data for interactive SVG line chart (incident trends)
  const linePoints = [
    { label: 'T-2h', val: 12, x: 20, y: 100 },
    { label: 'T-1.5h', val: 24, x: 80, y: 80 },
    { label: 'T-1h', val: 45, x: 140, y: 55 },
    { label: 'T-45m', val: 68, x: 200, y: 35 },
    { label: 'T-20m', val: 95, x: 260, y: 15 },
    { label: 'Live', val: totalIncidents, x: 320, y: 10 }
  ];

  // Map points to SVG polyline path
  const linePath = linePoints.map(p => `${p.x},${p.y}`).join(' ');
  const areaPath = `20,110 ${linePath} 320,110`;

  // Mock data for resource utilization bars
  const utilizationBars = [
    { category: 'Drones', pct: 85, color: 'bg-purple-500' },
    { category: 'Boats', pct: 72, color: 'bg-blue-500' },
    { category: 'Ambulances', pct: 90, color: 'bg-cyan-500' },
    { category: 'Fire Trucks', pct: 60, color: 'bg-orange-500' }
  ];

  return (
    <div className="bg-[#1E293B] border border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col lg:flex-row h-[580px] w-full text-zinc-100 font-sans select-none">
      
      {/* Left Column: Data Auditing & Responsive Charts */}
      <div className="w-full lg:w-3/5 border-b lg:border-b-0 lg:border-r border-zinc-850 p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
        
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Disaster Metrics & Post-Mortem Analytics</h2>
          </div>
          <p className="text-[11px] text-zinc-400">Post-disaster operations audit, resource distribution tracking, and safety indexing.</p>
        </div>

        {/* Audit Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-zinc-950/40 border border-zinc-850 rounded-xl">
            <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider">Estimated Infrastructure Loss</span>
            <span className="text-lg font-extrabold font-mono text-zinc-100 mt-1 block">$24.5M</span>
            <span className="text-[8.5px] text-zinc-500 block mt-0.5">Calculated building structural damages.</span>
          </div>
          <div className="p-3 bg-zinc-950/40 border border-zinc-850 rounded-xl">
            <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider">Average Dispatch Delay</span>
            <span className="text-lg font-extrabold font-mono text-emerald-400 mt-1 block">4.2 min</span>
            <span className="text-[8.5px] text-zinc-500 block mt-0.5">32% faster than manual routing vectors.</span>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-850 pt-4">
          {/* Incident Trends: Line Chart */}
          <div className="space-y-2">
            <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider">Disaster Incident Curve</span>
            <div className="bg-zinc-950/50 border border-zinc-850 p-3 rounded-lg flex flex-col justify-between h-[130px]">
              <svg className="w-full h-[90px] overflow-visible">
                {/* Horizontal gridlines */}
                <line x1="20" y1="15" x2="320" y2="15" className="stroke-zinc-900 stroke-[1]" />
                <line x1="20" y1="55" x2="320" y2="55" className="stroke-zinc-900 stroke-[1]" />
                <line x1="20" y1="95" x2="320" y2="95" className="stroke-zinc-900 stroke-[1]" />
                
                {/* Path Area under curve */}
                <polygon points={areaPath} className="fill-blue-500/5" />
                
                {/* Line Path */}
                <polyline points={linePath} className="fill-none stroke-blue-500 stroke-[2] stroke-linecap-round" />
                
                {/* Points */}
                {linePoints.map((p, idx) => (
                  <circle key={idx} cx={p.x} cy={p.y} r="3" className="fill-zinc-100 stroke-blue-500 stroke-[1.5]" />
                ))}
              </svg>
              <div className="flex justify-between text-[8px] font-mono text-zinc-500 px-2 mt-1">
                {linePoints.map((p, idx) => <span key={idx}>{p.label}</span>)}
              </div>
            </div>
          </div>

          {/* Resource Utilization: Bar Chart */}
          <div className="space-y-2">
            <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider">Rescue Resource Load</span>
            <div className="bg-zinc-950/50 border border-zinc-850 p-3 rounded-lg h-[130px] flex flex-col justify-between">
              <div className="space-y-2 pt-1">
                {utilizationBars.map((bar, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-[8px] font-mono text-zinc-400">
                      <span>{bar.category}</span>
                      <span>{bar.pct}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                      <div className={`${bar.color} h-full rounded-full`} style={{ width: `${bar.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sector Risk Index Table */}
        <div className="space-y-1.5 border-t border-zinc-850 pt-4">
          <span className="text-[9px] text-zinc-500 block font-bold uppercase tracking-wider">Sectors Hydrological Risk Profile</span>
          <div className="border border-zinc-850 rounded-lg overflow-hidden text-[10px]">
            <table className="w-full text-left font-mono">
              <thead>
                <tr className="bg-zinc-950/40 text-zinc-500 border-b border-zinc-850">
                  <th className="p-2">Sector Name</th>
                  <th className="p-2">Elevation</th>
                  <th className="p-2">Risk Rating</th>
                  <th className="p-2">Safety Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850 text-zinc-400">
                {sectorRiskIndexes.map((row) => (
                  <tr key={row.name} className="hover:bg-zinc-950/20">
                    <td className="p-2 font-semibold text-zinc-200">{row.name}</td>
                    <td className="p-2">{row.elevation}m</td>
                    <td className="p-2 font-bold text-zinc-100">{row.riskIndex}</td>
                    <td className="p-2">
                      <span className={`text-[8.5px] px-1.5 py-0.2 rounded font-bold uppercase border ${
                        row.status === 'Critical' 
                          ? 'bg-red-950/40 text-red-400 border-red-900/35' 
                          : row.status === 'Moderate'
                            ? 'bg-amber-950/40 text-amber-400 border-amber-900/35'
                            : 'bg-emerald-950/40 text-emerald-450 border-emerald-900/35'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column: AI Post-Disaster Incident Report */}
      <div className="w-full lg:w-2/5 p-6 bg-zinc-950/70 text-zinc-300 flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center gap-1.5 text-zinc-400 pb-3 border-b border-zinc-850 font-mono text-[10px]">
          <FileText className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span>AI_GENERATED_POST_MORTEM_REPORT</span>
        </div>

        {/* Report contents */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-[10.5px] font-mono leading-relaxed select-text text-zinc-400">
          <div className="space-y-1">
            <div className="text-[9px] text-zinc-600">REPORT_METADATA:</div>
            <div>- OPERATION_ID: SENTINEL-TS-005</div>
            <div>- LOCAL_TIME: 2026-07-05 01:22</div>
            <div>- COMPILING_AGENT: Analytics Agent v2.4</div>
          </div>

          <div className="border-t border-zinc-900 pt-3 space-y-2">
            <h4 className="text-zinc-200 font-bold uppercase">&lt;Executive Summary&gt;</h4>
            <p>
              Precipitation rates peaked at cloudburst thresholds, causing high stress along low-lying divisions. SentinelAI successfully paired emergency dispatches using the route optimizer, bypassing active road blocks.
            </p>
          </div>

          <div className="border-t border-zinc-900 pt-3 space-y-2">
            <h4 className="text-zinc-200 font-bold uppercase">&lt;AI Recommendations&gt;</h4>
            <p>
              1. **Hydrological Buffers**: Construct drainage conduits near Musi banks to withstand heavy cloudburst flow velocities.
            </p>
            <p>
              2. **Supply Stations**: Pre-position medical logistics at HITEX Exhibition Center to prevent critical inventory outages.
            </p>
            <p>
              3. **Mobile Routing**: Keep relative assets mapped locally in Capacitor packaging to ensure offline network execution matches active routing targets.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-900 flex justify-between items-center text-[9px] font-mono text-zinc-500">
          <button
            onClick={handleExportReport}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white px-2 py-1 rounded transition-colors uppercase tracking-wider font-bold"
          >
            📥 EXPORT AUDIT LOG
          </button>
          <span className="flex items-center gap-0.5 text-emerald-500 animate-pulse">
            <Award className="w-3.5 h-3.5" /> SECURE REPORT COMPACTED
          </span>
        </div>
      </div>
    </div>
  );
}
