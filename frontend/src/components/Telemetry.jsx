import React from 'react';
import { Radio, Wifi, Database, Activity, HardDrive } from 'lucide-react';

export default function Telemetry({ rainRate, sectors }) {
  // Compute sensor telemetry dynamically based on current rain rate
  const humidity = Math.min(100, 78 + Math.round(rainRate * 0.5));
  const windSpeed = 12 + Math.round(rainRate * 0.8);
  const flowRate = Math.round(1500 + rainRate * 320);
  const barometricPressure = (1012 - rainRate * 0.6).toFixed(1);

  const godavariWaterDepth = sectors.find(s => s.id === 'godavari_basin')?.water_depth || 0;
  const musiWaterDepth = sectors.find(s => s.id === 'musi_basin')?.water_depth || 0;

  return (
    <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-[280px]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Live IoT & Satellite Telemetry</span>
        </div>
        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded font-mono">
          REFRESH 1S
        </span>
      </div>

      {/* Grid Content */}
      <div className="flex-1 p-4 grid grid-cols-2 gap-3.5 overflow-y-auto">
        {/* Weather IoT */}
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 rounded-lg space-y-1.5">
          <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <Wifi className="w-3.5 h-3.5 text-blue-500" />
            <span>Weather Stations</span>
          </div>
          <div className="space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-300">
            <div className="flex justify-between">
              <span>💧 Humidity:</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{humidity}%</span>
            </div>
            <div className="flex justify-between">
              <span>💨 Wind:</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{windSpeed} km/h</span>
            </div>
            <div className="flex justify-between">
              <span>🌡️ Barometer:</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{barometricPressure} hPa</span>
            </div>
          </div>
        </div>

        {/* Hydrological Sensors */}
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 rounded-lg space-y-1.5">
          <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-cyan-500" />
            <span>Hydro-Telemetry</span>
          </div>
          <div className="space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-300">
            <div className="flex justify-between">
              <span>🌊 Musi Flow:</span>
              <span className={`font-semibold ${flowRate > 8000 ? 'text-red-500 animate-pulse' : 'text-zinc-900 dark:text-zinc-100'}`}>
                {flowRate} cusec
              </span>
            </div>
            <div className="flex justify-between">
              <span>📍 Godavari Depth:</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{godavariWaterDepth} m</span>
            </div>
            <div className="flex justify-between">
              <span>📍 Musi Depth:</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{musiWaterDepth} m</span>
            </div>
          </div>
        </div>

        {/* Space Operations */}
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 rounded-lg space-y-1.5">
          <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <Database className="w-3.5 h-3.5 text-purple-500" />
            <span>Satellite Orbiters</span>
          </div>
          <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
            <div className="flex justify-between items-center">
              <span>🛰️ RISAT-1A:</span>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.2 rounded font-medium">
                Active Pass
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>🛰️ Cartosat-3:</span>
              <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.2 rounded font-medium">
                Next Pass 14m
              </span>
            </div>
          </div>
        </div>

        {/* Edge Compute node */}
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 rounded-lg space-y-1.5">
          <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <HardDrive className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Inference Nodes</span>
          </div>
          <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
            <div className="flex justify-between items-center">
              <span>🧠 Grid GPU 1:</span>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.2 rounded font-medium">
                0.2ms Latency
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>📊 Routing node:</span>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.2 rounded font-medium">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
