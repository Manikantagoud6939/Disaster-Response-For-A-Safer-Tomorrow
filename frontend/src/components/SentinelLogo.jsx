import React from 'react';

export default function SentinelLogo({ size = 120, showText = true, className = "" }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* High-Fidelity SVG Drawing of the Circular Logo Composition */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 160 160" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_12px_rgba(37,99,235,0.25)] transition-transform duration-500 hover:scale-105"
      >
        {/* Outer Circular border with gradient ring */}
        <circle cx="80" cy="70" r="62" stroke="url(#logoRingGrad)" strokeWidth="3" />
        <circle cx="80" cy="70" r="59" stroke="#0F172A" strokeWidth="1" />
        
        {/* Small circle accent dots on outer ring */}
        <circle cx="80" cy="8" r="2.5" fill="#3B82F6" />
        <circle cx="21" cy="45" r="2" fill="#3B82F6" />
        <circle cx="139" cy="45" r="2" fill="#10B981" />

        {/* Mountain Silhouette Background */}
        <path d="M30,105 L52,78 L80,98 L108,74 L130,105 Z" fill="#1E293B" stroke="url(#mountainGrad)" strokeWidth="1.5" />
        <path d="M52,78 L65,95 L80,98 Z" fill="rgba(255,255,255,0.05)" />
        <path d="M108,74 L118,92 L130,105 Z" fill="rgba(255,255,255,0.05)" />

        {/* City Skyline peaks behind vehicles */}
        <rect x="72" y="88" width="6" height="15" fill="#334155" />
        <rect x="80" y="82" width="8" height="21" fill="#475569" />
        <rect x="88" y="85" width="5" height="18" fill="#334155" />
        <rect x="94" y="90" width="7" height="12" fill="#475569" />

        {/* Tactical Watchtower Center Shield */}
        <path 
          d="M60,40 C60,40 80,34 80,34 C80,34 100,40 100,40 L100,70 C100,85 80,95 80,95 C80,95 60,85 60,70 Z" 
          fill="#1E293B" 
          stroke="url(#shieldGrad)" 
          strokeWidth="2.5" 
          strokeLinejoin="round"
        />

        {/* Watchtower structure inside shield */}
        {/* Tower base columns */}
        <path d="M72,82 L76,52 L84,52 L88,82 Z" fill="#F8FAFC" opacity="0.9" />
        {/* Crossed supports */}
        <line x1="74.5" y1="55" x2="85.5" y2="80" stroke="#0F172A" strokeWidth="1" />
        <line x1="85.5" y1="55" x2="74.5" y2="80" stroke="#0F172A" strokeWidth="1" />
        
        {/* Cabin deck */}
        <rect x="71" y="47" width="18" height="6" fill="#F8FAFC" rx="1" />
        <rect x="74" y="49" width="3" height="3" fill="#0F172A" />
        <rect x="79" y="49" width="3" height="3" fill="#0F172A" />
        <rect x="84" y="49" width="3" height="3" fill="#0F172A" />
        
        {/* Roof structure */}
        <polygon points="69,47 91,47 80,36" fill="#1e3a8a" stroke="#2563EB" strokeWidth="0.8" />
        {/* Flag pole and flag */}
        <line x1="80" y1="36" x2="80" y2="28" stroke="#F8FAFC" strokeWidth="1" />
        <path d="M80,28 L87,31.5 L80,35 Z" fill="#EF4444" />

        {/* Left Widget: Rain Cloud */}
        <path d="M38,36 C38,32 44,32 46,35 C48,32 54,34 52,38 L36,38 C34,37 35,36 38,36 Z" fill="#60A5FA" />
        <line x1="39" y1="41" x2="39" y2="46" stroke="#60A5FA" strokeWidth="1" strokeDasharray="1.5,1.5" />
        <line x1="43" y1="41" x2="43" y2="46" stroke="#60A5FA" strokeWidth="1" strokeDasharray="1.5,1.5" />
        <line x1="47" y1="41" x2="47" y2="46" stroke="#60A5FA" strokeWidth="1" strokeDasharray="1.5,1.5" />

        {/* Left Widget: Hydrological Flooded House */}
        <path d="M35,62 L43,54 L51,62 Z" fill="#3B82F6" stroke="#F8FAFC" strokeWidth="0.8" />
        <rect x="38" y="62" width="10" height="7" fill="#3B82F6" stroke="#F8FAFC" strokeWidth="0.8" />
        {/* Flowing water lines under house */}
        <path d="M31,70 C35,68 39,72 43,70 C47,68 51,72 55,70" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M31,73 C35,71 39,75 43,73 C47,71 51,75 55,73" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />

        {/* Left Widget: Fire Flame */}
        <path 
          d="M40,78 C35,84 40,94 40,94 C40,94 45,84 40,78 Z" 
          fill="#EF4444" 
          className="animate-pulse"
        />
        <path 
          d="M40,84 C38,87 40,93 40,93 C40,93 42,87 40,84 Z" 
          fill="#F59E0B" 
        />

        {/* Right Widget: Satellite */}
        <g transform="translate(102, 21) rotate(15)">
          <rect x="0" y="4" width="12" height="5" fill="#475569" rx="0.5" />
          <rect x="3" y="0" width="6" height="13" fill="#64748B" rx="0.5" />
          <line x1="6" y1="6.5" x2="16" y2="6.5" stroke="#94A3B8" strokeWidth="1" />
          <circle cx="16" cy="6.5" r="1.8" fill="#F59E0B" />
          <path d="M16,6.5 C19,4.5 19,8.5 22,6.5" stroke="#94A3B8" strokeWidth="0.5" />
        </g>

        {/* Right Widget: Map Grid & Pointer Pin */}
        <path d="M106,62 L124,56 L130,62 L112,68 Z" fill="#047857" opacity="0.6" />
        <line x1="112" y1="56" x2="124" y2="68" stroke="#10B981" strokeWidth="1" />
        <path d="M120,53 C118,53 116,55 116,58 C116,62 120,66 120,66 C120,66 124,62 124,58 C124,55 122,53 120,53 Z" fill="#EF4444" />
        <circle cx="120" cy="58" r="1" fill="#F8FAFC" />

        {/* Right Widget: Citizens coordination node */}
        <circle cx="114" cy="78" r="2.5" fill="#38BDF8" />
        <circle cx="123" cy="78" r="2.5" fill="#38BDF8" />
        <circle cx="118.5" cy="74" r="2.5" fill="#0284C7" />
        <path d="M109,85 C109,82 113,81 118.5,81 C124,81 128,82 128,85 Z" fill="#0284C7" />

        {/* Circuit board paths routing (glowing green/blue connections) */}
        {/* Left paths */}
        <path d="M57,48 L48,52" stroke="#2563EB" strokeWidth="1" />
        <circle cx="48" cy="52" r="1" fill="#2563EB" />
        <path d="M57,65 L50,68" stroke="#2563EB" strokeWidth="1" />
        <path d="M58,78 L48,84" stroke="#10B981" strokeWidth="1" />
        <circle cx="48" cy="84" r="1" fill="#10B981" />
        {/* Right paths */}
        <path d="M103,48 L110,50" stroke="#10B981" strokeWidth="1" />
        <circle cx="110" cy="50" r="1" fill="#10B981" />
        <path d="M102,66 L108,70" stroke="#2563EB" strokeWidth="1" />
        <path d="M102,78 L110,81" stroke="#10B981" strokeWidth="1" />
        <circle cx="110" cy="81" r="1" fill="#10B981" />

        {/* Ground platform & emergency fleet road */}
        <path d="M26,108 C50,103 110,103 134,108" stroke="#475569" strokeWidth="3" />

        {/* Three emergency vehicles on road */}
        {/* 1. Red Ambulance (Left) */}
        <g transform="translate(48, 100)">
          <rect x="0" y="2" width="11" height="6" fill="#EF4444" rx="0.8" />
          <rect x="7" y="2" width="4" height="3" fill="#93C5FD" />
          {/* Red Cross */}
          <rect x="3" y="4" width="4" height="2" fill="#F8FAFC" />
          <rect x="4" y="3" width="2" height="4" fill="#F8FAFC" />
          {/* Siren */}
          <polygon points="3,2 5,0 7,2" fill="#3B82F6" className="animate-pulse" />
          {/* Wheels */}
          <circle cx="3" cy="8" r="1.5" fill="#020617" />
          <circle cx="8" cy="8" r="1.5" fill="#020617" />
        </g>

        {/* 2. Police Cruiser (Center) */}
        <g transform="translate(73, 102)">
          <rect x="0" y="2" width="13" height="4.5" fill="#0F172A" rx="0.8" />
          <path d="M3,2 L5,0 L9,0 L11,2 Z" fill="#1E293B" stroke="#3B82F6" strokeWidth="0.5" />
          {/* Police text */}
          <rect x="4" y="3" width="5" height="2" fill="#2563EB" />
          {/* Siren lights */}
          <circle cx="6.5" cy="0" r="1" fill="#EF4444" className="animate-pulse" />
          {/* Wheels */}
          <circle cx="3" cy="6.5" r="1.5" fill="#020617" />
          <circle cx="10" cy="6.5" r="1.5" fill="#020617" />
        </g>

        {/* 3. Green Fire Truck (Right) */}
        <g transform="translate(98, 100)">
          <rect x="0" y="2" width="13" height="6.5" fill="#059669" rx="0.8" />
          <rect x="8" y="2" width="5" height="3" fill="#93C5FD" />
          {/* White stripes */}
          <rect x="3" y="2" width="2" height="6.5" fill="#F8FAFC" />
          {/* Wheels */}
          <circle cx="3" cy="8.5" r="1.8" fill="#020617" />
          <circle cx="9.5" cy="8.5" r="1.8" fill="#020617" />
        </g>

        {/* Defs/Gradients */}
        <defs>
          <linearGradient id="logoRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
      </svg>

      {/* Under Logo Typography text (matches spelling "SENTINAL" in screenshot logo) */}
      {showText && (
        <div className="mt-4 select-none">
          <h1 className="text-xl font-extrabold tracking-[0.18em] text-zinc-100 font-sans uppercase">
            SENTINAL
          </h1>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <div className="w-5 h-[1.5px] bg-[#10B981]"></div>
            <span className="text-xs font-bold text-[#10B981] tracking-[0.2em] uppercase font-sans">
              AI PORTAL
            </span>
            <div className="w-5 h-[1.5px] bg-[#10B981]"></div>
          </div>
          <div className="text-[7.5px] font-bold text-zinc-400 tracking-[0.16em] uppercase mt-1.5 leading-snug max-w-[180px] mx-auto">
            Smart Monitoring. Intelligent Response.
          </div>
          <div className="relative w-28 mx-auto h-[1px] bg-zinc-800 my-1"></div>
          <div className="text-[8px] font-bold text-[#10B981] tracking-[0.2em] uppercase">
            Safer Lives.
          </div>
        </div>
      )}
    </div>
  );
}
