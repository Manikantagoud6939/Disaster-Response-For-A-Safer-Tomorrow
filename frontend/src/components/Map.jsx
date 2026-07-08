import React, { useState } from 'react';
import { Shield, Home, AlertTriangle, Crosshair, Droplets, MapPin, Eye, Flame, Layers, Sliders } from 'lucide-react';

export default function Map({ 
  sectors, 
  shelters, 
  hospitals, 
  responders, 
  reports, 
  roads, 
  onSelectSector, 
  onSelectReport,
  onSelectResponder,
  selectedItemId,
  onMapClick 
}) {
  const [showCVOverlays, setShowCVOverlays] = useState(true);
  const [showThermalZones, setShowThermalZones] = useState(true);
  const [activeLayer, setActiveLayer] = useState('Hybrid'); // 'Street', 'Satellite', 'Hybrid', 'Heatmap', 'Population', 'Infrastructure'
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [splitX, setSplitX] = useState(400);

  // Renders the color overlay for a sector based on its threat level
  const getSectorColor = (threatLevel, isBefore = false) => {
    if (isBefore) {
      // Historical pre-disaster: everything is green/safe
      return 'fill-emerald-500/10 dark:fill-emerald-500/15 stroke-emerald-500/50';
    }
    switch (threatLevel) {
      case 'Critical': return 'fill-red-500/30 stroke-red-500';
      case 'High': return 'fill-orange-500/25 stroke-orange-500';
      case 'Medium': return 'fill-amber-500/20 stroke-amber-500';
      case 'Low': return 'fill-blue-500/15 stroke-blue-500';
      default: return 'fill-zinc-800/10 dark:fill-zinc-800/20 stroke-zinc-300 dark:stroke-zinc-800';
    }
  };

  const handleSvgClick = (e) => {
    // Only register map click if clicking on empty background
    if (e.target.id === 'map-background' || e.target.id === 'split-clip-background') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 800);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 600);
      onMapClick({ x, y });
    }
  };

  // Helper to determine critical infrastructure health status badge
  const getInfraHealthBadge = (id) => {
    if (id.includes('osmania')) return { label: '🔴 DESTROYED', color: 'text-red-500 bg-red-950/40 border-red-500/35' };
    if (id.includes('warangal')) return { label: '🟠 MAJOR DAMAGE', color: 'text-orange-500 bg-orange-950/40 border-orange-500/35' };
    if (id.includes('nizamabad')) return { label: '🟡 MINOR DAMAGE', color: 'text-amber-500 bg-amber-950/40 border-amber-500/35' };
    return { label: '🟢 SAFE', color: 'text-emerald-500 bg-emerald-950/40 border-emerald-500/35' };
  };

  const layersList = ['Street', 'Satellite', 'Hybrid', 'Heatmap', 'Population', 'Infrastructure'];

  return (
    <div className="relative bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm h-[580px] w-full flex flex-col">
      {/* Map Header Controls */}
      <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex flex-wrap justify-between items-center gap-3 bg-zinc-50 dark:bg-zinc-900/50 select-none">
        
        {/* Layer Selector */}
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-500" />
          <select
            value={activeLayer}
            onChange={(e) => setActiveLayer(e.target.value)}
            className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-2 py-0.5 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 focus:outline-none"
          >
            {layersList.map(l => (
              <option key={l} value={l}>{l} Layer</option>
            ))}
          </select>
        </div>

        {/* Before / After comparison slider controls */}
        <div className="flex items-center gap-2 border-l border-zinc-250 dark:border-zinc-800 pl-3">
          <button
            type="button"
            onClick={() => setIsCompareMode(!isCompareMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold border transition-all ${
              isCompareMode 
                ? 'bg-blue-600 border-blue-500 text-white shadow-sm' 
                : 'bg-zinc-100 dark:bg-zinc-800 border-transparent text-zinc-500 hover:bg-zinc-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Before/After Split
          </button>
          
          {isCompareMode && (
            <div className="flex items-center gap-1.5">
              <input
                type="range"
                min="100"
                max="700"
                value={splitX}
                onChange={(e) => setSplitX(parseInt(e.target.value))}
                className="w-24 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-[9px] font-bold text-zinc-400 font-mono">Split: {Math.round((splitX / 8) )}%</span>
            </div>
          )}
        </div>

        {/* CV overlays toggles */}
        <div className="flex items-center gap-1.5 border-l border-zinc-250 dark:border-zinc-800 pl-3">
          <button
            type="button"
            onClick={() => setShowCVOverlays(!showCVOverlays)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold border transition-all ${
              showCVOverlays 
                ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400' 
                : 'bg-zinc-100 dark:bg-zinc-800 border-transparent text-zinc-500'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            CV Damage
          </button>
          <button
            type="button"
            onClick={() => setShowThermalZones(!showThermalZones)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold border transition-all ${
              showThermalZones 
                ? 'bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400' 
                : 'bg-zinc-100 dark:bg-zinc-800 border-transparent text-zinc-500'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            CV Hazards
          </button>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative flex-grow bg-zinc-50 dark:bg-[#09090b] overflow-hidden select-none">
        
        {/* Layer style overlays */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-cover bg-center">
          {activeLayer === 'Satellite' && (
            <div className="absolute inset-0 bg-[#06060f] opacity-80 grid grid-cols-12 gap-1.5 p-4 border border-zinc-900">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-zinc-800/10 text-[6px] font-mono text-zinc-800 p-0.5">SAT_{i}</div>
              ))}
            </div>
          )}
        </div>

        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-full"
          onClick={handleSvgClick}
        >
          {/* Base definition clip paths for Before/After splitting */}
          <defs>
            <clipPath id="clip-before">
              <rect x="0" y="0" width={splitX} height="600" />
            </clipPath>
            <clipPath id="clip-after">
              <rect x={splitX} y="0" width={800 - splitX} height="600" />
            </clipPath>
          </defs>

          {/* BACKGROUND CLICK SENSOR */}
          <rect id="map-background" width="800" height="600" className="fill-transparent cursor-crosshair" />

          {/* GRID LINES TECH AESTHETIC */}
          <g className={`opacity-[0.03] dark:opacity-[0.05] stroke-zinc-950 dark:stroke-zinc-50 stroke-[1] ${activeLayer === 'Satellite' || activeLayer === 'Hybrid' ? 'opacity-[0.1]' : ''}`}>
            {Array.from({ length: 16 }).map((_, idx) => (
              <line key={`v-${idx}`} x1={idx * 50} y1="0" x2={idx * 50} y2="600" />
            ))}
            {Array.from({ length: 12 }).map((_, idx) => (
              <line key={`h-${idx}`} x1="0" y1={idx * 50} x2="800" y2={idx * 50} />
            ))}
          </g>

          {/* ========================================== */}
          {/* GROUP A: BEFORE DISASTER (HISTORICAL DATA) */}
          {/* ========================================== */}
          <g clipPath={isCompareMode ? "url(#clip-before)" : undefined}>
            {/* Background color */}
            {isCompareMode && (
              <rect id="split-clip-background" width="800" height="600" className="fill-emerald-500/[0.02] dark:fill-emerald-500/[0.04]" />
            )}
            
            {/* Dry Roads */}
            <g>
              {roads.map((road, idx) => {
                const fromSector = sectors.find(s => s.id === road.from);
                const toSector = sectors.find(s => s.id === road.to);
                if (!fromSector || !toSector) return null;
                return (
                  <line
                    key={`road-before-${idx}`}
                    x1={fromSector.coords.x}
                    y1={fromSector.coords.y}
                    x2={toSector.coords.x}
                    y2={toSector.coords.y}
                    className="stroke-zinc-300 dark:stroke-zinc-800 stroke-[2.5]"
                  />
                );
              })}
            </g>

            {/* Pre-disaster Sectors (Green safe fills) */}
            <g>
              {sectors.map((sector) => (
                <g key={`sec-before-${sector.id}`} className="opacity-60">
                  <circle
                    cx={sector.coords.x}
                    cy={sector.coords.y}
                    r={sector.id === 'godavari_basin' ? 70 : 50}
                    className={getSectorColor(sector.threat_level, true)}
                  />
                  <text
                    x={sector.coords.x}
                    y={sector.coords.y + 5}
                    textAnchor="middle"
                    className="font-bold text-[9px] fill-emerald-600/80 dark:fill-emerald-500/70 pointer-events-none select-none font-mono"
                  >
                    {sector.name.split(' ')[0]}
                  </text>
                  <text
                    x={sector.coords.x}
                    y={sector.coords.y + 16}
                    textAnchor="middle"
                    className="font-medium text-[8px] fill-zinc-400 pointer-events-none select-none"
                  >
                    [DRY]
                  </text>
                </g>
              ))}
            </g>
          </g>

          {/* ========================================== */}
          {/* GROUP B: AFTER DISASTER (ACTIVE THREATS)   */}
          {/* ========================================== */}
          <g clipPath={isCompareMode ? "url(#clip-after)" : undefined}>
            {/* Flooded / Blocked Roads */}
            <g>
              {roads.map((road, idx) => {
                const fromSector = sectors.find(s => s.id === road.from);
                const toSector = sectors.find(s => s.id === road.to);
                if (!fromSector || !toSector) return null;
                return (
                  <line
                    key={`road-after-${idx}`}
                    x1={fromSector.coords.x}
                    y1={fromSector.coords.y}
                    x2={toSector.coords.x}
                    y2={toSector.coords.y}
                    className={`stroke-[3.5] stroke-linecap-round ${
                      road.blocked 
                        ? 'stroke-red-500 stroke-dasharray-4 animate-[dash_1s_linear_infinite]' 
                        : 'stroke-zinc-300 dark:stroke-zinc-800'
                    }`}
                    style={road.blocked ? { strokeDasharray: '4, 4' } : {}}
                  />
                );
              })}
            </g>

            {/* Active Flooded Sectors */}
            <g>
              {sectors.map((sector) => {
                const isSelected = selectedItemId === sector.id;
                return (
                  <g 
                    key={`sec-after-${sector.id}`} 
                    onClick={() => onSelectSector(sector)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={sector.coords.x}
                      cy={sector.coords.y}
                      r={sector.id === 'godavari_basin' ? 70 : 50}
                      className={`transition-colors duration-300 ${
                        isSelected 
                          ? 'fill-blue-500/20 stroke-blue-500 stroke-[2] shadow-xl' 
                          : getSectorColor(sector.threat_level)
                      }`}
                    />
                    
                    {/* Ripple loops for active floods */}
                    {sector.water_depth > 0.4 && (
                      <circle
                        cx={sector.coords.x}
                        cy={sector.coords.y}
                        r={sector.id === 'godavari_basin' ? 70 : 50}
                        className="stroke-blue-500/40 fill-none animate-ripple"
                      />
                    )}

                    {/* Population Density Dots layer overlay */}
                    {activeLayer === 'Population' && (
                      <g className="fill-zinc-500/20 dark:fill-zinc-100/20 pointer-events-none">
                        <circle cx={sector.coords.x - 15} cy={sector.coords.y - 15} r="2" />
                        <circle cx={sector.coords.x + 15} cy={sector.coords.y + 15} r="2" />
                        <circle cx={sector.coords.x - 10} cy={sector.coords.y + 10} r="2" />
                        <circle cx={sector.coords.x + 10} cy={sector.coords.y - 10} r="2" />
                      </g>
                    )}

                    {/* Heatmap overlay circles */}
                    {activeLayer === 'Heatmap' && sector.water_depth > 0.1 && (
                      <circle
                        cx={sector.coords.x}
                        cy={sector.coords.y}
                        r="35"
                        className="fill-red-500/20 blur-md pointer-events-none"
                      />
                    )}
                    
                    <text
                      x={sector.coords.x}
                      y={sector.coords.y + 5}
                      textAnchor="middle"
                      className="font-bold text-[10px] fill-zinc-900 dark:fill-zinc-100 pointer-events-none select-none"
                    >
                      {sector.name.split(' ')[0]}
                    </text>
                    <text
                      x={sector.coords.x}
                      y={sector.coords.y + 17}
                      textAnchor="middle"
                      className="font-extrabold text-[9px] fill-blue-500 pointer-events-none select-none font-mono"
                    >
                      {sector.water_depth > 0 ? `${sector.water_depth}m` : 'Dry'}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Shelters & Hospitals pins */}
            <g>
              {shelters.map((shelter) => (
                <g 
                  key={`shelter-after-${shelter.id}`}
                  onClick={() => onSelectSector(sectors.find(s => s.id === shelter.sector_id))}
                  className="cursor-pointer"
                >
                  <circle cx={shelter.coords.x} cy={shelter.coords.y} r="6" className="fill-emerald-500 stroke-white stroke-[1.5]" />
                  <text x={shelter.coords.x} y={shelter.coords.y - 8} textAnchor="middle" className="fill-zinc-400 font-bold text-[8px] font-mono">
                    [SHELTER]
                  </text>
                </g>
              ))}

              {hospitals.map((hospital) => (
                <g key={`hospital-after-${hospital.id}`}>
                  <circle cx={hospital.coords.x} cy={hospital.coords.y} r="6" className="fill-red-500 stroke-white stroke-[1.5]" />
                  <text x={hospital.coords.x} y={hospital.coords.y - 8} textAnchor="middle" className="fill-rose-500 font-bold text-[8px] font-mono">
                    [HOSPITAL]
                  </text>
                </g>
              ))}
            </g>

            {/* Active Citizen Reports (SOS Incidents) */}
            <g>
              {reports
                .filter(r => r.status !== 'Resolved')
                .map((report) => {
                  const isSelected = selectedItemId === report.id;
                  return (
                    <g 
                      key={`rep-after-${report.id}`}
                      onClick={() => onSelectReport(report)}
                      className="cursor-pointer"
                    >
                      {report.severity === 'Critical' && (
                        <circle
                          cx={report.coords.x}
                          cy={report.coords.y}
                          r="18"
                          className="fill-none stroke-rose-500 stroke-[1.5] animate-ping"
                        />
                      )}
                      <circle 
                        cx={report.coords.x} 
                        cy={report.coords.y} 
                        r="10" 
                        className={`transition-all duration-300 stroke-[2] ${
                          isSelected 
                            ? 'fill-rose-500 stroke-white scale-125 shadow-lg' 
                            : report.status === 'Dispatched' 
                              ? 'fill-blue-500 stroke-blue-200' 
                              : 'fill-rose-600 stroke-rose-200'
                        }`}
                      />
                      <text x={report.coords.x} y={report.coords.y + 3} textAnchor="middle" className="fill-white font-bold text-[10px]">
                        !
                      </text>
                    </g>
                  );
                })}
            </g>

            {/* Responders Units & Dispatches */}
            <g>
              {responders.map((responder) => {
                const isSelected = selectedItemId === responder.id;
                const isDispatched = responder.status === 'Dispatched';
                let routeLine = null;
                
                if (isDispatched && responder.targetCoords) {
                  routeLine = (
                    <line
                      x1={responder.coords.x}
                      y1={responder.coords.y}
                      x2={responder.targetCoords.x}
                      y2={responder.targetCoords.y}
                      className="stroke-blue-500 stroke-[1.5] stroke-dasharray-3 opacity-60 animate-[dash_1s_linear_infinite]"
                      style={{ strokeDasharray: '3, 3' }}
                    />
                  );
                }

                return (
                  <g key={`res-after-${responder.id}`}>
                    {routeLine}
                    <g
                      onClick={() => onSelectResponder(responder)}
                      className="cursor-pointer transition-transform duration-300 hover:scale-110"
                    >
                      <circle 
                        cx={responder.coords.x} 
                        cy={responder.coords.y} 
                        r="9" 
                        className={`stroke-[1.5] transition-all duration-300 ${
                          isSelected
                            ? 'fill-blue-600 stroke-white'
                            : isDispatched
                              ? 'fill-blue-500 stroke-blue-200 animate-pulse'
                              : 'fill-zinc-600 stroke-zinc-300'
                        }`}
                      />
                      <circle cx={responder.coords.x} cy={responder.coords.y} r="3" className="fill-white" />
                    </g>
                  </g>
                );
              })}
            </g>

            {/* CV Damage overlays bounding boxes */}
            {showCVOverlays && (
              <g className="pointer-events-none">
                <rect x="310" y="445" width="45" height="40" className="fill-none stroke-yellow-500 stroke-[1.5]" style={{ strokeDasharray: '3, 3' }} />
                <text x="310" y="438" className="fill-yellow-500 font-bold text-[8px] font-mono">[COLLAPSED_BLDG 86%]</text>
                
                <rect x="650" y="420" width="45" height="45" className="fill-none stroke-yellow-500 stroke-[1.5]" style={{ strokeDasharray: '3, 3' }} />
                <text x="650" y="413" className="fill-yellow-500 font-bold text-[8px] font-mono">[STRUCT_DAMAGE 92%]</text>
              </g>
            )}

            {/* CV Hazard Wildfire polygon overlays */}
            {showThermalZones && (
              <g className="pointer-events-none">
                <polygon points="460,530 520,490 560,540 500,560" className="fill-orange-600/25 stroke-orange-500 stroke-[1.5]" />
                <text x="500" y="520" className="fill-orange-500 font-bold text-[8px] font-mono" textAnchor="middle">[THERMAL_ANOMALY]</text>
              </g>
            )}

            {/* Infrastructure Health Status overlay badges */}
            {activeLayer === 'Infrastructure' && (
              <g className="pointer-events-none text-[7px] font-mono font-extrabold">
                {hospitals.map(h => {
                  const health = getInfraHealthBadge(h.id);
                  return (
                    <g key={`health-h-${h.id}`}>
                      <rect x={h.coords.x - 30} y={h.coords.y + 8} width="60" height="9" rx="2" className="fill-zinc-950/80 stroke-zinc-800" />
                      <text x={h.coords.x} y={h.coords.y + 15} textAnchor="middle" className="fill-white">{health.label}</text>
                    </g>
                  );
                })}
              </g>
            )}
          </g>

          {/* Drag slider divider line when comparison mode is active */}
          {isCompareMode && (
            <g className="pointer-events-none">
              <line 
                x1={splitX} 
                y1="0" 
                x2={splitX} 
                y2="600" 
                className="stroke-blue-500 stroke-[2] shadow-lg animate-pulse" 
              />
              <rect x={splitX - 35} y="15" width="70" height="15" rx="3" className="fill-blue-600 stroke-blue-500 stroke-[1]" />
              <text x={splitX} y="25" textAnchor="middle" className="fill-white font-bold text-[8px] font-mono">
                DRAG DIVISION
              </text>
            </g>
          )}
        </svg>

        {/* Floating Help Badge */}
        <div className="absolute bottom-3 left-3 bg-zinc-950/85 backdrop-blur-md text-zinc-100 text-[10px] px-2.5 py-1.5 rounded-lg border border-zinc-800 flex flex-col gap-1 pointer-events-none max-w-[280px]">
          <div className="font-semibold text-zinc-400">Controls:</div>
          <div>• Select map layers (Satellite, Heatmap, etc.) in the top left</div>
          <div>• Toggle "Before/After split" to sweep and compare historical vs current imagery</div>
          <div>• Click on green dots [SHELTER] or red dots [HOSPITAL] to check assets</div>
        </div>
      </div>
    </div>
  );
}
