import React, { useState } from 'react';
import { Shield, Flame, Ambulance, Navigation, Battery, CheckCircle2, UserCheck, Zap } from 'lucide-react';

export default function Responders({ responders, reports, onUpdateResponder, defaultRoleTab }) {
  const [activeTab, setActiveTab] = useState(defaultRoleTab && defaultRoleTab !== 'Admin' ? defaultRoleTab : 'All');

  React.useEffect(() => {
    if (defaultRoleTab && defaultRoleTab !== 'Admin') {
      setActiveTab(defaultRoleTab);
    }
  }, [defaultRoleTab]);

  const categories = ['All', 'Police', 'Fire', 'Ambulance', 'Boat', 'Drone'];

  const getIcon = (type) => {
    switch (type) {
      case 'Police': return <Shield className="w-3.5 h-3.5 text-blue-500 animate-pulse" />;
      case 'Fire': return <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />;
      case 'Ambulance': return <Ambulance className="w-3.5 h-3.5 text-red-500 animate-pulse" />;
      case 'Boat': return <Navigation className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />;
      case 'Drone': return <Battery className="w-3.5 h-3.5 text-purple-500 animate-pulse" />;
      default: return <UserCheck className="w-3.5 h-3.5 text-zinc-550" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Dispatched': return 'bg-amber-950/40 text-amber-400 border border-amber-900/40 animate-pulse';
      case 'Arrived': return 'bg-blue-950/40 text-blue-400 border border-blue-900/40';
      default: return 'bg-zinc-950 text-zinc-500 border border-zinc-850';
    }
  };

  const filteredResponders = activeTab === 'All' 
    ? responders 
    : responders.filter(r => r.type === activeTab);

  return (
    <div className="bg-[#1E293B] border border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-[280px] font-sans">
      
      {/* Category Tabs */}
      <div className="border-b border-zinc-850 bg-zinc-950/30 p-1 flex gap-1 overflow-x-auto shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveTab(cat)}
            className={`px-3 py-1 text-[10.5px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0 ${
              activeTab === cat 
                ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.3)]' 
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-950/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responders List */}
      <div className="flex-grow overflow-y-auto p-3 space-y-2 select-none">
        {filteredResponders.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-zinc-500 text-xs py-8 font-mono">
            No active responder units registered.
          </div>
        ) : (
          filteredResponders.map((res) => {
            const activeReport = reports.find(rep => rep.id === res.task_id);
            const isDrone = res.type === 'Drone';
            
            return (
              <div 
                key={res.id} 
                className="border border-zinc-850 bg-zinc-950/15 rounded-xl p-2.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:bg-zinc-950/20 transition-all duration-300"
              >
                {/* Details Column */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    {getIcon(res.type)}
                    <span className="font-bold text-zinc-200">{res.name}</span>
                    <span className={`text-[8.5px] px-1.5 py-0.2 rounded font-bold uppercase border ${getStatusStyle(res.status)}`}>
                      {res.status}
                    </span>
                    {isDrone && (
                      <span className={`text-[9px] font-mono px-1 py-0.2 rounded font-bold ${res.battery < 30 ? 'text-red-400 animate-pulse' : 'text-zinc-500'}`}>
                        🔋{res.battery}%
                      </span>
                    )}
                  </div>
                  {activeReport ? (
                    <div className="text-[10px] text-zinc-500">
                      🎯 <span className="font-bold text-rose-450">{activeReport.type}</span> rescue in <span className="font-bold text-zinc-400">{activeReport.sector_id.toUpperCase()}</span> ({activeReport.name})
                    </div>
                  ) : (
                    <div className="text-[10px] text-zinc-600 italic">
                      Standing by for alert dispatches.
                    </div>
                  )}
                </div>

                {/* Actions Button */}
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                  {isDrone && res.battery < 85 && (
                    <button
                      onClick={() => onUpdateResponder(res.id, 'Recharge')}
                      className="bg-purple-600/10 hover:bg-purple-600 border border-purple-500/20 text-purple-400 hover:text-white text-[9.5px] px-2 py-1 rounded font-bold uppercase tracking-wider font-mono flex items-center gap-0.5 transition-all shadow-[0_0_8px_rgba(168,85,247,0.2)]"
                    >
                      <Zap className="w-3 h-3 animate-bounce" /> Recharge
                    </button>
                  )}
                  {res.status !== 'Idle' && (
                    <>
                      {res.status === 'Dispatched' && (
                        <button
                          onClick={() => onUpdateResponder(res.id, 'Arrived')}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-[9.5px] px-2.5 py-1 rounded font-bold uppercase tracking-wider transition-all shadow-[0_0_8px_rgba(37,99,235,0.25)]"
                        >
                          Arrived
                        </button>
                      )}
                      {res.status === 'Arrived' && (
                        <button
                          onClick={() => onUpdateResponder(res.id, 'Idle')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9.5px] px-2.5 py-1 rounded font-bold uppercase tracking-wider transition-all shadow-[0_0_8px_rgba(34,197,94,0.25)] flex items-center gap-0.5"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Resolve
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
