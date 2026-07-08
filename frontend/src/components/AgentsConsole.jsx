import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Bot, Radio, Cpu, Network, RefreshCw } from 'lucide-react';

export default function AgentsConsole({ reports }) {
  const [logs, setLogs] = useState([
    { id: '1', time: '14:35:10', agent: 'Damage Assessment', text: 'Scanned Sentinel-2 Satellite pass over Musi river basin. Cloud cover 4%.' },
    { id: '2', time: '14:35:12', agent: 'Prediction Agent', text: 'Hydrological cellular automata model recalibrated. Elevation profiles loaded.' },
    { id: '3', time: '14:35:15', agent: 'Alert Agent', text: 'Broadcasting weather severity updates to Warangal mobile cells.' },
    { id: '4', time: '14:36:01', agent: 'Route Optimizer', text: 'Identified water accumulation (>0.8m) on Godavari corridor. Updating path constraints.' }
  ]);
  const logsEndRef = useRef(null);

  const agents = [
    { name: 'Prediction Agent', status: 'Simulating Spreads', active: true },
    { name: 'Damage Assessment', status: 'Scanning Imagery', active: true },
    { name: 'Resource Allocator', status: 'Monitoring Dispatches', active: true },
    { name: 'Route Optimizer', status: 'Rerouting Vehicles', active: true },
    { name: 'Rescue Coordinator', status: 'Tracking Rescues', active: true },
    { name: 'Citizen Assistance', status: 'Interfacing SOS', active: true },
    { name: 'Public Alert Agent', status: 'Broadcasting Alerts', active: true },
    { name: 'Analytics Agent', status: 'Logging Statistics', active: true }
  ];

  // Dynamic ticker: append simulated agent thinking log entries every 4 seconds to make the UI look alive!
  useEffect(() => {
    const agentsList = ['Prediction Agent', 'Damage Assessment', 'Resource Allocator', 'Route Optimizer', 'Rescue Coordinator', 'Citizen Assistance', 'Public Alert Agent'];
    
    const actions = [
      'Recalculated flood flow velocity for Warangal sector: 2.1 m/s.',
      'Analyzing building structural integrity coefficients via drone pass visual telemetry.',
      'Bipartite match verified. Proximity index optimized for pending dispatches.',
      'Checking highway corridors for vehicle clearance. Karimnagar pass is 100% open.',
      'SOS signal received from coordinate X:480 Y:520. Dispatching closest ambulance unit.',
      'Verifying telemetry packets from Musi River hydrology flow meters.',
      'Syncing local edge cache configurations with Capacitor client wrappers.',
      'Evaluating volunteer assignments. Skills index mapped successfully.'
    ];

    const interval = setInterval(() => {
      const randomAgent = agentsList[Math.floor(Math.random() * agentsList.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour12: false });
      
      setLogs(prev => [
        ...prev.slice(-30), // Limit log size
        {
          id: `log_${Date.now()}`,
          time: timeStr,
          agent: randomAgent,
          text: randomAction
        }
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Sync log updates whenever reports change (e.g. a new citizen alert triggers immediate agent reaction!)
  useEffect(() => {
    if (reports.length > 0) {
      const latestReport = reports[0];
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour12: false });
      
      const newLogs = [
        {
          id: `log_rep1_${Date.now()}`,
          time: timeStr,
          agent: 'Citizen Assistance',
          text: `🚨 SOS alert parsed: ${latestReport.type} reported in ${latestReport.sector_id}. Assigning Priority Score: 92.`
        },
        {
          id: `log_rep2_${Date.now()}`,
          time: timeStr,
          agent: 'Resource Allocator',
          text: `🔍 Matching closest available responders for ${latestReport.name}'s request.`
        }
      ];

      setLogs(prev => [...prev, ...newLogs]);
    }
  }, [reports.length]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row h-[360px] w-full">
      
      {/* Agents Status Side Panel */}
      <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 p-4 overflow-y-auto space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          <Network className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
          <span>Active AI Agents mesh</span>
        </div>
        
        <div className="space-y-2">
          {agents.map((agent) => (
            <div key={agent.name} className="flex justify-between items-center p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/35 border border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{agent.name}</span>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 px-1.5 py-0.5 rounded font-mono">
                {agent.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Agents Thinking Feed */}
      <div className="w-full md:w-3/5 p-4 flex flex-col justify-between bg-zinc-950 text-zinc-100 font-mono text-[11px] overflow-hidden">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            AGENT_COLLABORATION_STREAM
          </span>
          <span className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">
            EDGE_SYNC
          </span>
        </div>

        {/* Terminal logs list */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2 select-text">
          {logs.map((log) => (
            <div key={log.id} className="leading-relaxed">
              <span className="text-zinc-500">[{log.time}]</span>{' '}
              <span className="text-blue-400 font-semibold">&lt;{log.agent}&gt;</span>{' '}
              <span className="text-zinc-200">{log.text}</span>
            </div>
          ))}
          <div ref={logsEndRef} />
        </div>

        <div className="pt-2 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500">
          <span>Inference Latency: 0.12ms</span>
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-emerald-500 animate-pulse" />
            Consensus Algorithm: Active
          </span>
        </div>
      </div>
    </div>
  );
}
