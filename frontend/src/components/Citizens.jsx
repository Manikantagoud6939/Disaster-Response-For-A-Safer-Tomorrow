import React, { useState, useEffect } from 'react';
import { AlertCircle, Phone, MapPin, CheckCircle, Image as ImageIcon, Send } from 'lucide-react';

export default function Citizens({ sectors, reports, onCreateReport, clickedMapCoords }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('Trapped');
  const [sectorId, setSectorId] = useState('warangal');
  const [severity, setSeverity] = useState('Critical');
  const [description, setDescription] = useState('');
  const [coords, setCoords] = useState({ x: 500, y: 300 });

  // Update coords if user clicked on the map
  useEffect(() => {
    if (clickedMapCoords) {
      setCoords(clickedMapCoords);
      // Auto-identify sector based on coordinate proximity
      let nearestSector = sectors[0];
      let minDistance = floatDistance(clickedMapCoords, nearestSector?.coords || {x:0, y:0});
      
      for (const sector of sectors) {
        const d = floatDistance(clickedMapCoords, sector.coords);
        if (d < minDistance) {
          minDistance = d;
          nearestSector = sector;
        }
      }
      if (nearestSector) {
        setSectorId(nearestSector.id);
      }
    }
  }, [clickedMapCoords, sectors]);

  const floatDistance = (p1, p2) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) return;

    onCreateReport({
      name,
      phone: phone || "+91 90000 12345",
      type,
      sector_id: sectorId,
      severity,
      description,
      coords
    });

    // Reset form fields
    setName('');
    setDescription('');
    setPhone('');
  };

  const getSeverityStyle = (sev) => {
    switch (sev) {
      case 'Critical': return 'text-red-600 bg-red-100 dark:bg-red-950/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Medium': return 'text-amber-600 bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      default: return 'text-zinc-600 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
    }
  };

  return (
    <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row h-[360px]">
      
      {/* Simulation Report Form */}
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <AlertCircle className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>Filer Citizen Report Simulator</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-medium text-zinc-500 block mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anand Kumar"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-zinc-500 block mb-1">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 94400 12121"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-medium text-zinc-500 block mb-1">Report Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Trapped">Trapped</option>
                <option value="Medical">Medical</option>
                <option value="Road Block">Road Block</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-medium text-zinc-500 block mb-1">Sector (Nearest)</label>
              <select
                value={sectorId}
                onChange={(e) => setSectorId(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {sectors.map(s => (
                  <option key={s.id} value={s.id}>{s.name.split(' ')[0]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-medium text-zinc-500 block mb-1">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Critical">Critical</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-medium text-zinc-500 block mb-1">Description</label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Water is entering the living room. Need emergency boat rescue..."
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="text-[10px] text-zinc-500 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg flex items-center justify-between font-mono">
            <span>📍 Map Coords:</span>
            <span>X: {coords.x}, Y: {coords.y}</span>
            <span className="text-[9px] text-blue-500 animate-pulse font-sans">
              (Click on map to place)
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg py-2 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          Broadcast Emergency Alert
        </button>
      </form>

      {/* Citizens Live Feed */}
      <div className="w-full md:w-1/2 p-4 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Live Reports Queue</span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            {reports.filter(r => r.status !== 'Resolved').length} Active
          </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5">
          {reports.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-400 dark:text-zinc-500 text-xs italic">
              No reports active. The grid is currently safe.
            </div>
          ) : (
            reports.map((rep) => (
              <div 
                key={rep.id} 
                className={`border rounded-lg p-2.5 transition-colors ${
                  rep.status === 'Resolved' 
                    ? 'border-zinc-200 bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-900/10 opacity-60' 
                    : rep.status === 'Dispatched'
                      ? 'border-blue-200 dark:border-blue-900 bg-blue-50/20 dark:bg-blue-950/10'
                      : 'border-rose-100 dark:border-rose-950 bg-rose-50/10 dark:bg-rose-950/5'
                }`}
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border uppercase ${getSeverityStyle(rep.severity)}`}>
                      {rep.severity}
                    </span>
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                      {rep.type}
                    </span>
                  </div>
                  <span className="text-[9px] text-zinc-400">{rep.time}</span>
                </div>
                
                <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                  {rep.description}
                </p>

                <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center text-[10px] text-zinc-400">
                  <span className="flex items-center gap-0.5">
                    <Phone className="w-3 h-3" /> {rep.phone}
                  </span>
                  <span className="flex items-center gap-0.5 font-medium text-zinc-500">
                    📍 {sectors.find(s => s.id === rep.sector_id)?.name.split(' ')[0]}
                  </span>
                  <span className={`font-semibold ${
                    rep.status === 'Resolved' 
                      ? 'text-emerald-500' 
                      : rep.status === 'Dispatched' 
                        ? 'text-blue-500' 
                        : 'text-rose-500 animate-pulse'
                  }`}>
                    {rep.status === 'Dispatched' ? 'Rescue Dispatched' : rep.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
