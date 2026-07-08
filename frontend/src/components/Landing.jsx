import React, { useEffect, useRef, useState } from 'react';
import { 
  LogIn, UserPlus, Sparkles, Shield, Radio, PlayCircle, Eye, 
  Brain, Zap, Users, CheckCircle, Activity, ShieldAlert, Award, 
  MapPin, Flame, AlertTriangle, ArrowRight, HeartPulse, Compass,
  Home, ShieldCheck, HelpCircle, HardDrive, Phone, Users2, Landmark, 
  AlertCircle, ChevronRight, Mail, MapPinned, Send, RadioTower
} from 'lucide-react';
import SentinelLogo from './SentinelLogo';

export default function Landing({ onEnterLogin, onEnterSignUp, lang = 'en', setLang, t }) {
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Home');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactRole, setContactRole] = useState('Citizen');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Animated background network lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const points = [];
    for (let i = 0; i < 35; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.04)';
      ctx.lineWidth = 1;

      points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        points.forEach(other => {
          const dist = Math.sqrt((p.x - other.x) ** 2 + (p.y - other.y) ** 2);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScrollTo = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#060814] text-[#F8FAFC] flex flex-col relative overflow-x-hidden font-sans selection:bg-emerald-500 selection:text-black">
      {/* Animated network lines background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Abstract background blur bubbles */}
      <div className="absolute top-[8%] left-[-15%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-[25%] right-[-12%] w-[650px] h-[650px] bg-emerald-900/10 rounded-full blur-[190px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[15%] w-[550px] h-[550px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* 1. STICKY GLASS HEADER BAR */}
      <header className="w-full px-6 py-4 flex justify-between items-center z-30 sticky top-0 bg-[#060814]/75 backdrop-blur-md border-b border-zinc-900/80">
        {/* Left: Logo Badge */}
        <div className="flex items-center gap-2.5 select-none cursor-pointer" onClick={() => handleScrollTo('Home')}>
          <SentinelLogo size={36} showText={false} className="shrink-0" />
          <div className="text-left leading-normal">
            <span className="font-extrabold tracking-widest text-sm uppercase bg-gradient-to-r from-blue-400 to-emerald-450 bg-clip-text text-transparent">
              Sentinel
            </span>
            <div className="text-[7.5px] font-bold text-emerald-500 tracking-[0.15em] uppercase mt-0.5">Portal</div>
          </div>
        </div>

        {/* Center: Navigation Menu links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
          {['Home', 'About', 'Features', 'Services', 'Dashboard', 'Contact'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                if (tab === 'Dashboard') {
                  onEnterLogin();
                } else {
                  handleScrollTo(tab);
                }
              }}
              className={`transition-colors hover:text-white relative py-1 ${
                activeTab === tab ? 'text-emerald-400 font-bold' : ''
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 rounded shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              )}
            </button>
          ))}
        </nav>

        {/* Right: Language selection + Login/Register call trigger */}
        <div className="flex items-center gap-3">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-[#111827]/80 border border-zinc-800 rounded-lg px-2 py-1 text-[10px] font-bold text-zinc-350 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono tracking-wider cursor-pointer h-7"
          >
            <option value="en">🇺🇸 EN</option>
            <option value="te">🇮🇳 తె</option>
            <option value="hi">🇮🇳 हि</option>
            <option value="es">🇪🇸 ES</option>
          </select>
          <button
            onClick={onEnterLogin}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-emerald-500/25 hover:border-emerald-500/50 bg-[#111827]/80 hover:bg-[#1F2937] text-xs font-bold text-zinc-250 hover:text-white transition-all shadow-[0_0_12px_rgba(16,185,129,0.1)] h-7.5"
          >
            <LogIn className="w-3.5 h-3.5 text-emerald-400" /> Login / Register
          </button>
        </div>
      </header>

      {/* 2. HERO HIGHLIGHTS PANEL (id="home") */}
      <section id="home" className="w-full max-w-7xl mx-auto px-6 pt-10 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 scroll-mt-20">
        
        {/* Left Column: Slogans, Descriptions, Feature Icons grid, and Buttons */}
        <div className="lg:col-span-7 space-y-6 text-left animate-fadeIn">
          <div className="space-y-2.5">
            <span className="text-[10px] font-extrabold tracking-[0.25em] text-emerald-400 uppercase block pl-0.5">
              Smart Monitoring. Intelligent Response.
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-zinc-50 font-sans uppercase">
              Disaster <br />
              Response <br />
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                For A Safer Tomorrow
              </span>
            </h1>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl">
            Sentinel Portal leverages real-time data, smart analytics and actionable insights to detect, predict and respond to disasters faster – saving lives and building resilient communities.
          </p>

          {/* Under-hero Features Grids */}
          <div className="grid grid-cols-4 gap-2 pt-2 max-w-lg">
            {[
              { label: 'Real-time Monitoring', icon: Radio, color: 'text-emerald-455 border-emerald-500/20 bg-emerald-500/5' },
              { label: 'Smart Predictions', icon: Brain, color: 'text-emerald-455 border-emerald-500/20 bg-emerald-500/5' },
              { label: 'Rapid Response', icon: Zap, color: 'text-emerald-455 border-emerald-500/20 bg-emerald-500/5' },
              { label: 'Smart Coordination', icon: Users, color: 'text-emerald-455 border-emerald-500/20 bg-emerald-500/5' }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-1.5 p-2 rounded-xl">
                <div className={`p-2.5 rounded-full border ${f.color} flex items-center justify-center transition-transform hover:scale-110`}>
                  <f.icon className="w-4 h-4" />
                </div>
                <h4 className="text-[8.5px] font-bold text-zinc-300 tracking-wide uppercase leading-tight select-none">{f.label}</h4>
              </div>
            ))}
          </div>

          {/* Buttons row positioned below the icons list */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onEnterLogin}
              className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.35)]"
            >
              Explore Dashboard <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScrollTo('About')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-800 bg-[#111827]/40 hover:bg-[#1F2937]/50 text-xs font-extrabold text-zinc-300 hover:text-white uppercase tracking-widest transition-all"
            >
              <PlayCircle className="w-4 h-4 text-emerald-400 animate-pulse" /> Watch Video
            </button>
          </div>

        </div>

        {/* Right Column: Hologram Badge Shield, Warning Toast, Rescue Personnel Backdrop */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative animate-scaleUp z-10">
          
          {/* Hologram Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[280px] h-[280px] border border-blue-500/15 rounded-full animate-[spin_40s_linear_infinite] relative">
              <div className="absolute top-1/2 left-0 w-2 h-2 bg-blue-455 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
            </div>
            <div className="w-[320px] h-[320px] border border-emerald-500/10 border-dashed rounded-full absolute animate-[spin_60s_linear_infinite_reverse]"></div>
            <div className="w-[240px] h-[240px] bg-blue-500/5 rounded-full filter blur-xl absolute"></div>
          </div>

          {/* Large Center Hologram Badge logo */}
          <div className="relative z-10 mb-8">
            <div className="absolute inset-0 bg-blue-600/10 rounded-full filter blur-2xl"></div>
            <SentinelLogo size={200} showText={true} className="relative z-10" />
          </div>

          {/* Floating warning toast widget */}
          <div className="absolute bottom-6 right-[-20px] sm:right-0 bg-[#0F172A]/90 backdrop-blur-md border border-red-500/30 rounded-xl p-3 shadow-2xl z-20 flex gap-3 max-w-[210px] text-left animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="p-1.5 bg-red-950/40 border border-red-500/40 rounded-lg text-red-500 h-fit shrink-0 animate-pulse">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-wider">High Flood Risk Detected</h4>
              <div className="text-[8px] text-zinc-400 leading-normal space-y-0.5">
                <div><span className="font-semibold text-zinc-350">Location:</span> Riverdale, Sector 7</div>
                <div><span className="font-semibold text-zinc-350">Severity:</span> Emergency Level</div>
              </div>
              <button 
                onClick={onEnterLogin}
                className="text-[7.5px] font-extrabold text-red-400 hover:text-red-300 transition-colors inline-flex items-center gap-0.5 uppercase tracking-wider pt-0.5"
              >
                View on Map <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* Team Silhouette labels */}
          <div className="flex items-center justify-center gap-5 mt-4 text-[9px] font-bold tracking-widest text-zinc-400 uppercase select-none opacity-80">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> RESCUE</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> POLICE</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> FIRE</span>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION (id="about") - [NEW] */}
      <section id="about" className="w-full bg-[#090D1A] border-t border-zinc-900/60 py-16 px-6 z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: About text matter */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#10B981] uppercase block pl-0.5">
                Ecosystem Vision
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest text-zinc-100 uppercase">
                ABOUT SENTINEL
              </h2>
            </div>
            <h3 className="text-sm font-semibold text-zinc-300 leading-normal">
              Transforming Disaster Telemetry into Live Tactical Coordination.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Sentinel is a next-generation emergency response platform powered by digital telemetry integrations. Designed for municipal control centers, emergency responders, and local citizens, the portal synthesizes raw data streams into high-fidelity actionable dashboards.
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              By nesting GIS maps, autonomous drone operations, dynamic hydraulic flow simulators, and volunteer matching networks under a single unified dashboard, Sentinel allows dispatchers to forecast environmental impact, authorize rescue dispatch channels, and direct citizens to safety coordinates within crucial minutes of crisis.
            </p>
            <div className="flex gap-6 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-[#10B981]" />
                <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">ADC Compliant Logging</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-[#10B981]" />
                <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">Offline Node Support</span>
              </div>
            </div>
          </div>

          {/* Right: Graphic Box showing key targets */}
          <div className="lg:col-span-5 bg-[#0F172A]/40 border border-zinc-800 rounded-2xl p-6 space-y-4 text-left shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none"></div>
            <h4 className="text-xs font-extrabold text-zinc-200 tracking-wider uppercase border-b border-zinc-900 pb-2">
              Operational Core Targets
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-zinc-200 uppercase tracking-wider">Shrink Dispatch Delay</h5>
                  <p className="text-[9px] text-zinc-450 mt-0.5">Automated path mapping cuts responder dispatch delay metrics by 40%.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-zinc-200 uppercase tracking-wider">Empower Local Communities</h5>
                  <p className="text-[9px] text-zinc-450 mt-0.5">Direct volunteer lines to coordinate rescue support inside neighborhoods.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-zinc-200 uppercase tracking-wider">Certified SHA Audit Trails</h5>
                  <p className="text-[9px] text-zinc-450 mt-0.5">Encrypt incident logs with digital signatures for secure post-mortems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION (id="features") */}
      <section id="features" className="w-full bg-[#070A14] border-y border-zinc-900/60 py-16 px-6 z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header titles */}
          <div className="text-center space-y-3 max-w-2xl mx-auto select-none">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest text-zinc-100 uppercase">
              ONE PLATFORM. <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">ENDLESS IMPACT.</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Sentinel Portal unites technology, people and resources on one intelligent platform to create a faster, smarter and more efficient disaster response ecosystem.
            </p>
          </div>

          {/* Four glass cards row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: IMPACT (Green/Emerald Theme) */}
            <div className="bg-[#0F172A]/40 backdrop-blur-md border border-emerald-500/10 hover:border-emerald-500/35 rounded-2xl p-5 shadow-xl transition-all hover:-translate-y-1 group">
              <div className="w-full h-24 rounded-xl bg-emerald-950/20 border border-emerald-900/30 flex items-center justify-center text-emerald-400 mb-4 overflow-hidden relative">
                <div className="absolute w-20 h-20 border border-emerald-500/10 rounded-full animate-ping"></div>
                <div className="absolute w-12 h-12 border border-emerald-500/20 rounded-full"></div>
                <div className="absolute w-[1px] h-12 bg-emerald-500/40 origin-bottom bottom-12 rotate-45 animate-[spin_5s_linear_infinite]"></div>
                <Radio className="w-8 h-8 relative z-10 animate-pulse" />
              </div>
              <h3 className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest mb-1">IMPACT</h3>
              <p className="text-[10px] text-zinc-300 font-semibold mb-3 leading-normal">Saving Lives, Reducing Loss.</p>
              <ul className="text-[9px] text-zinc-450 text-left space-y-2 border-t border-zinc-900/80 pt-3">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" /> Automatically detects threats early
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" /> Minimizes loss of life & property
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" /> Data-driven decisions that matter
                </li>
              </ul>
            </div>

            {/* Card 2: DYNAMIC (Blue Theme) */}
            <div className="bg-[#0F172A]/40 backdrop-blur-md border border-blue-500/10 hover:border-blue-500/35 rounded-2xl p-5 shadow-xl transition-all hover:-translate-y-1 group">
              <div className="w-full h-24 rounded-xl bg-blue-950/20 border border-blue-900/30 flex items-center justify-center text-blue-400 mb-4 overflow-hidden relative">
                <div className="absolute inset-2 border border-blue-500/5 grid grid-cols-3 gap-2 p-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-ping"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30"></div>
                </div>
                <Eye className="w-8 h-8 relative z-10 animate-pulse" />
              </div>
              <h3 className="text-xs font-extrabold text-blue-400 uppercase tracking-widest mb-1">DYNAMIC</h3>
              <p className="text-[10px] text-zinc-300 font-semibold mb-3 leading-normal">Real-time. Reliable. Responsive.</p>
              <ul className="text-[9px] text-zinc-450 text-left space-y-2 border-t border-zinc-900/80 pt-3">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-blue-500 shrink-0" /> Live disaster tracking
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-blue-500 shrink-0" /> Real-time alerts & updates
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-blue-500 shrink-0" /> Adaptive to evolving situations
                </li>
              </ul>
            </div>

            {/* Card 3: EMPOWERMENT (Purple Theme) */}
            <div className="bg-[#0F172A]/40 backdrop-blur-md border border-purple-500/10 hover:border-purple-500/35 rounded-2xl p-5 shadow-xl transition-all hover:-translate-y-1 group">
              <div className="w-full h-24 rounded-xl bg-purple-950/20 border border-purple-900/30 flex items-center justify-center text-purple-400 mb-4 overflow-hidden relative">
                <svg className="w-12 h-12 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3,20 L10,8 L14,14 L18,8 L21,20" />
                  <circle cx="10" cy="7" r="1.5" fill="currentColor" />
                  <circle cx="17.5" cy="7" r="1.5" fill="currentColor" />
                  <line x1="10" y1="7" x2="16.5" y2="7" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5" />
                </svg>
                <Users className="w-6 h-6 absolute z-10 bottom-3 right-3 opacity-30" />
              </div>
              <h3 className="text-xs font-extrabold text-purple-400 uppercase tracking-widest mb-1">EMPOWERMENT</h3>
              <p className="text-[10px] text-zinc-300 font-semibold mb-3 leading-normal">Empowered Teams. Strong Communities.</p>
              <ul className="text-[9px] text-zinc-450 text-left space-y-2 border-t border-zinc-900/80 pt-3">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-purple-500 shrink-0" /> Equip responders with smart insights
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-purple-500 shrink-0" /> Empower volunteers & citizens
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-purple-500 shrink-0" /> Knowledge that creates resilience
                </li>
              </ul>
            </div>

            {/* Card 4: ATTRACTION (Amber/Yellow Theme) */}
            <div className="bg-[#0F172A]/40 backdrop-blur-md border border-amber-500/10 hover:border-amber-500/35 rounded-2xl p-5 shadow-xl transition-all hover:-translate-y-1 group">
              <div className="w-full h-24 rounded-xl bg-amber-950/20 border border-amber-900/30 flex items-center justify-center text-amber-400 mb-4 overflow-hidden relative">
                <div className="absolute w-14 h-14 border border-amber-500/20 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
                <div className="absolute w-14 h-14 border-x border-amber-500/20 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
                <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
              </div>
              <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-widest mb-1">ATTRACTION</h3>
              <p className="text-[10px] text-zinc-300 font-semibold mb-3 leading-normal">Technology That Inspires Trust.</p>
              <ul className="text-[9px] text-zinc-450 text-left space-y-2 border-t border-zinc-900/80 pt-3">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-amber-500 shrink-0" /> Intuitive & modern interface
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-amber-500 shrink-0" /> Engaging visual intelligence
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-amber-500 shrink-0" /> Built for everyone, everywhere
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION (id="services") - [NEW] */}
      <section id="services" className="w-full bg-[#060814] py-16 px-6 z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header titles */}
          <div className="text-center space-y-3 max-w-2xl mx-auto select-none">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest text-zinc-100 uppercase">
              SERVICES & CORE CAPABILITIES
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Designed for rapid emergency response, automated coordination, and tactical recovery operations.
            </p>
          </div>

          {/* Services list (4 cards grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            
            {/* Service 1 */}
            <div className="bg-[#0F172A]/30 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-5 flex gap-4 transition-all hover:bg-[#0F172A]/40 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0">
                <RadioTower className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-zinc-200 uppercase tracking-wider">Digital Twin Flow Simulations</h4>
                <p className="text-[10.5px] text-zinc-450 leading-relaxed">
                  Utilize our 60 FPS topography simulator mapping hydrology cascading coordinates down from high elevation areas to Musi Basin. Manipulate wind speed, precipitation, and rain duration parameters to project blockages.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-[#0F172A]/30 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-5 flex gap-4 transition-all hover:bg-[#0F172A]/40 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-455 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-zinc-200 uppercase tracking-wider">Computer Vision Drone Feeds</h4>
                <p className="text-[10.5px] text-zinc-450 leading-relaxed">
                  Trigger automated surveillance scans with real-time target identification overlays. Segment flood boundaries using Segment Anything models (SAM) to calculate coordinates.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-[#0F172A]/30 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-5 flex gap-4 transition-all hover:bg-[#0F172A]/40 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-zinc-200 uppercase tracking-wider">Google Maps Fleet Coordinates</h4>
                <p className="text-[10.5px] text-zinc-450 leading-relaxed">
                  Track ambulance, police cruiser, and rescue boat coordinates via large maps interfaces. Calculate routing solutions for dispatchers dynamically using OR-Tools coordinate path optimizers.
                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-[#0F172A]/30 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-5 flex gap-4 transition-all hover:bg-[#0F172A]/40 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-450 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-zinc-200 uppercase tracking-wider">Citizen Assistance Channels</h4>
                <p className="text-[10.5px] text-zinc-450 leading-relaxed">
                  Allow citizens to trigger glowing emergency SOS alerts that dispatch coordinates to rescue hubs. View evacuation shelter lists, blood bank supplies registries, and survival prep checklists.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. STATISTICS HUD BAR */}
      <section className="w-full bg-[#0F172A]/50 border-b border-zinc-900/60 py-10 px-6 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
          
          {/* Stat 1 */}
          <div className="flex items-center gap-3.5 justify-center border-r border-zinc-900/50 last:border-none">
            <div className="p-3 bg-emerald-500/10 text-emerald-455 rounded-xl shrink-0">
              <Users className="w-5.5 h-5.5" />
            </div>
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-100 tracking-tight leading-none">12,500+</h2>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1 block leading-tight">Lives Impacted</span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3.5 justify-center md:border-r border-zinc-900/50 last:border-none">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl shrink-0">
              <Activity className="w-5.5 h-5.5" />
            </div>
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-100 tracking-tight leading-none">1,250+</h2>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1 block leading-tight">Disasters Monitored</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3.5 justify-center border-r border-zinc-900/50 last:border-none">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl shrink-0">
              <Compass className="w-5.5 h-5.5" />
            </div>
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-100 tracking-tight leading-none">3,200+</h2>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1 block leading-tight">Rescue Missions</span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-3.5 justify-center border-r border-zinc-900/50 last:border-none">
            <div className="p-3 bg-amber-500/10 text-amber-450 rounded-xl shrink-0">
              <Landmark className="w-5.5 h-5.5" />
            </div>
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-100 tracking-tight leading-none">2,800+</h2>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1 block leading-tight">Relief Camps</span>
            </div>
          </div>

          {/* Stat 5 */}
          <div className="flex items-center gap-3.5 justify-center last:border-none">
            <div className="p-3 bg-emerald-500/10 text-emerald-455 rounded-xl shrink-0">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-100 tracking-tight leading-none">500+</h2>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1 block leading-tight">Communities Protected</span>
            </div>
          </div>

        </div>
      </section>

      {/* 7. CONTACT / CTA SECTION (id="contact") - [NEW] */}
      <section id="contact" className="w-full bg-[#060814] py-16 px-6 border-t border-zinc-950 z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header row split: Left coordinates slogans & Right 4 card shortcuts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Text details */}
            <div className="lg:col-span-5 space-y-4 text-left select-none">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest text-zinc-50 uppercase leading-snug">
                TOGETHER, WE CAN <br />BUILD A <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">SAFER FUTURE.</span>
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                Be a part of the intelligent revolution in disaster management. Choose your gateway coordinates to authorize entry.
              </p>
            </div>

            {/* Right Cards grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* Citizens Card */}
              <div 
                onClick={onEnterLogin}
                className="bg-[#0F172A]/40 hover:bg-[#1E293B]/60 border border-blue-500/10 hover:border-blue-500/30 rounded-xl p-4 text-left transition-all cursor-pointer shadow-lg group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500/5 rounded-bl-full pointer-events-none"></div>
                <Users2 className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-[10px] font-extrabold text-zinc-250 uppercase tracking-wider">For Citizens</h4>
                <p className="text-[8.5px] text-zinc-450 leading-relaxed mt-1 mb-2">Report incidents, get alerts and stay informed.</p>
                <span className="text-[8px] font-bold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-0.5 uppercase tracking-wider">
                  Learn More <ChevronRight className="w-2.5 h-2.5" />
                </span>
              </div>

              {/* Responders Card */}
              <div 
                onClick={onEnterLogin}
                className="bg-[#0F172A]/40 hover:bg-[#1E293B]/60 border border-emerald-500/10 hover:border-emerald-500/30 rounded-xl p-4 text-left transition-all cursor-pointer shadow-lg group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/5 rounded-bl-full pointer-events-none"></div>
                <Radio className="w-5 h-5 text-emerald-455 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-[10px] font-extrabold text-zinc-250 uppercase tracking-wider">For Responders</h4>
                <p className="text-[8.5px] text-zinc-450 leading-relaxed mt-1 mb-2">Manage operations, resources & teams efficiently.</p>
                <span className="text-[8px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-0.5 uppercase tracking-wider">
                  Learn More <ChevronRight className="w-2.5 h-2.5" />
                </span>
              </div>

              {/* Volunteers Card */}
              <div 
                onClick={onEnterLogin}
                className="bg-[#0F172A]/40 hover:bg-[#1E293B]/60 border border-purple-500/10 hover:border-purple-500/30 rounded-xl p-4 text-left transition-all cursor-pointer shadow-lg group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-8 h-8 bg-purple-500/5 rounded-bl-full pointer-events-none"></div>
                <Users className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-[10px] font-extrabold text-zinc-250 uppercase tracking-wider">For Volunteers</h4>
                <p className="text-[8.5px] text-zinc-450 leading-relaxed mt-1 mb-2">Join hands, help communities and make a difference.</p>
                <span className="text-[8px] font-bold text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-0.5 uppercase tracking-wider">
                  Learn More <ChevronRight className="w-2.5 h-2.5" />
                </span>
              </div>

              {/* Authorities Card */}
              <div 
                onClick={onEnterLogin}
                className="bg-[#0F172A]/40 hover:bg-[#1E293B]/60 border border-amber-500/10 hover:border-amber-500/30 rounded-xl p-4 text-left transition-all cursor-pointer shadow-lg group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
                <Landmark className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-[10px] font-extrabold text-zinc-250 uppercase tracking-wider">For Authorities</h4>
                <p className="text-[8.5px] text-zinc-450 leading-relaxed mt-1 mb-2">Make data-driven decisions with confidence.</p>
                <span className="text-[8px] font-bold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-0.5 uppercase tracking-wider">
                  Learn More <ChevronRight className="w-2.5 h-2.5" />
                </span>
              </div>

            </div>

          </div>

          {/* Contact Details & Inquiry Form (NEW) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-zinc-900/60 max-w-5xl mx-auto">
            {/* Left Column: Coordinates details */}
            <div className="md:col-span-5 text-left space-y-4">
              <h3 className="text-sm font-extrabold text-zinc-200 uppercase tracking-wider">
                Emergency Command Coordinates
              </h3>
              <p className="text-[10.5px] text-zinc-450 leading-relaxed">
                If you have an immediate life-safety emergency, please trigger the Citizen SOS alert tab inside the authorized portal or dial standard municipal channels.
              </p>
              <div className="space-y-3 pt-2 text-[10px] font-semibold text-zinc-350">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-450 shrink-0" />
                  <span>Command Center hotline: +91 040 2345 6789</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-455 shrink-0" />
                  <span>Operations email: operations@sentinel.gov</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinned className="w-4 h-4 text-emerald-455 shrink-0" />
                  <span>State Command Building, Hyderabad, TS, India</span>
                </div>
              </div>
            </div>

            {/* Right Column: Mini Contact Form */}
            <div className="md:col-span-7 bg-[#0F172A]/40 border border-zinc-900 rounded-xl p-5 text-left shadow-xl">
              <h4 className="text-[10.5px] font-extrabold text-zinc-250 uppercase tracking-widest border-b border-zinc-900 pb-2 mb-3">
                Send Operational Inquiry
              </h4>
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider block">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-[#060814] border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-150 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider block">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-[#060814] border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-150 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider block">Your Role</label>
                    <select 
                      value={contactRole}
                      onChange={(e) => setContactRole(e.target.value)}
                      className="w-full bg-[#060814] border border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-zinc-150 focus:outline-none font-sans"
                    >
                      <option value="Citizen">Citizen</option>
                      <option value="Responder">First Responder</option>
                      <option value="Agency">Govt Authority</option>
                      <option value="Volunteer">Volunteer Coordinator</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider block">Message Details</label>
                  <textarea 
                    required 
                    rows="2.5"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Enter message coordinates..."
                    className="w-full bg-[#060814] border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-150 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-[10px] uppercase tracking-wider py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Send className="w-3 h-3" /> Submit Tactical Inquiry
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Global Footer baseline */}
        <div className="w-full text-center border-t border-zinc-900/60 pt-10 mt-12 text-[8px] font-bold text-zinc-600 uppercase tracking-widest select-text flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-zinc-700 animate-pulse" />
          <span>Sentinel Portal – Smart Monitoring. Intelligent Response. Safer Lives.</span>
        </div>
      </section>
    </div>
  );
}
