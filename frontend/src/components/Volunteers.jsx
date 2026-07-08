import React, { useState } from 'react';
import { Users, UserPlus, Heart, MapPin, CheckCircle, Gift } from 'lucide-react';

export default function Volunteers({ sectors, reports, clickedMapCoords }) {
  const [volunteers, setVolunteers] = useState([
    { id: 'v1', name: 'Dr. Vivek Anand', skill: 'Medical', sectorId: 'nizamabad', coords: { x: 440, y: 220 }, matchedReport: 'rep_002', status: 'On Site' },
    { id: 'v2', name: 'Rajesh Goud', skill: 'Food Distribution', sectorId: 'warangal', coords: { x: 670, y: 440 }, matchedReport: 'rep_001', status: 'En Route' },
    { id: 'v3', name: 'Neha Sharma', skill: 'First Aid', sectorId: 'khammam', coords: { x: 630, y: 150 }, matchedReport: null, status: 'Idle' }
  ]);
  
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('First Aid');
  const [sectorId, setSectorId] = useState('khammam');
  
  const skillsList = ['First Aid', 'Medical', 'Food Distribution', 'Debris Clearance', 'Boat Operation'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    // Default coords based on selected sector
    const sectorCoords = sectors.find(s => s.id === sectorId)?.coords || { x: 400, y: 300 };
    const coords = clickedMapCoords || { 
      x: sectorCoords.x + Math.round((Math.random() - 0.5) * 40),
      y: sectorCoords.y + Math.round((Math.random() - 0.5) * 40)
    };

    // Auto-match logic with pending reports
    let matchedId = null;
    const compatibleReports = reports.filter(r => r.status === 'Pending');
    
    if (compatibleReports.length > 0) {
      // Greedy match: closest report
      let closestRep = null;
      let minDist = Infinity;
      
      compatibleReports.forEach(rep => {
        const dist = Math.sqrt((coords.x - rep.coords.x) ** 2 + (coords.y - rep.coords.y) ** 2);
        if (dist < minDist) {
          minDist = dist;
          closestRep = rep;
        }
      });
      if (closestRep) {
        matchedId = closestRep.id;
      }
    }

    const newVolunteer = {
      id: `vol_${Date.now()}`,
      name,
      skill,
      sectorId,
      coords,
      matchedReport: matchedId,
      status: matchedId ? 'En Route' : 'Idle'
    };

    setVolunteers(prev => [newVolunteer, ...prev]);
    setName('');
  };

  const getMatchedReportDesc = (reportId) => {
    if (!reportId) return 'Standing By';
    const rep = reports.find(r => r.id === reportId);
    if (!rep) return 'Assigned Task';
    return `Matched: ${rep.type} rescue in ${rep.sector_id} (${rep.name})`;
  };

  return (
    <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row h-[360px] w-full">
      {/* Volunteer Signup Form */}
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-3.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <UserPlus className="w-3.5 h-3.5 text-blue-500" />
            <span>Volunteer Registration Portal</span>
          </div>

          <div>
            <label className="text-[10px] font-medium text-zinc-500 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-medium text-zinc-500 block mb-1">Primary Skill</label>
              <select
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
              >
                {skillsList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-medium text-zinc-500 block mb-1">Base Sector</label>
              <select
                value={sectorId}
                onChange={(e) => setSectorId(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
              >
                {sectors.map(s => (
                  <option key={s.id} value={s.id}>{s.name.split(' ')[0]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded-lg flex items-center justify-between font-mono">
            <span>📍 Matched Location:</span>
            <span>
              {clickedMapCoords ? `X: ${clickedMapCoords.x}, Y: ${clickedMapCoords.y}` : 'Auto (Sector Base)'}
            </span>
          </div>
          <span className="text-[9.5px] text-zinc-400 block italic leading-normal">
            *Volunteer matching engine pairs registrations instantly with nearby pending SOS requests needing emergency support.
          </span>
        </div>

        <button
          type="submit"
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg py-2 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Heart className="w-3.5 h-3.5 fill-white/10" />
          Enroll as Emergency Volunteer
        </button>
      </form>

      {/* Matching Results Queue */}
      <div className="w-full md:w-1/2 p-4 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Matched Volunteers Tasklist</span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
            {volunteers.length} Mapped
          </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5">
          {volunteers.map((vol) => (
            <div 
              key={vol.id} 
              className="border border-zinc-100 dark:border-zinc-800 p-3 rounded-lg flex flex-col justify-between gap-1.5 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{vol.name}</div>
                  <div className="text-[10px] text-zinc-400">
                    Skill: <span className="font-semibold text-zinc-500">{vol.skill}</span> | Sector: <span className="font-mono">{vol.sectorId}</span>
                  </div>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  vol.status === 'Idle' 
                    ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' 
                    : vol.status === 'En Route'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                }`}>
                  {vol.status}
                </span>
              </div>
              <div className="text-[10px] text-zinc-500 flex items-center gap-1 font-medium bg-zinc-50 dark:bg-zinc-950 px-2 py-1.5 rounded border border-zinc-100 dark:border-zinc-800/80">
                <Gift className="w-3.5 h-3.5 text-blue-500" />
                <span className="truncate">{getMatchedReportDesc(vol.matchedReport)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
