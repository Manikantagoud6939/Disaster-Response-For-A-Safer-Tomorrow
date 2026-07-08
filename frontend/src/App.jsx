import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, Moon, AlertOctagon, ShieldAlert, Users, CloudRain, 
  Settings, Play, RefreshCw, X, Radio, ArrowRight, Zap,
  LayoutDashboard, Bell, Search, AlertTriangle, Shield, CheckCircle, Eye, BarChart3, Bot, Navigation
} from 'lucide-react';

import Map from './components/Map';
import Responders from './components/Responders';
import Citizens from './components/Citizens';
import ChatCopilot from './components/ChatCopilot';
import Telemetry from './components/Telemetry';
import Login from './components/Login';
import Landing from './components/Landing';
import SentinelLogo from './components/SentinelLogo';
import AgentsConsole from './components/AgentsConsole';
import Volunteers from './components/Volunteers';
import Analytics from './components/Analytics';

// Multi-language Translation Database
const TRANSLATIONS = {
  en: {
    portalTitle: "Sentinel Command",
    citizenNode: "Telangana Safe Citizen Node",
    sirenAlert: "SIREN_ALERT",
    sirenSos: "🔊 SIREN SOS",
    stopSiren: "⏹️ STOP SIREN",
    exploreDashboard: "Explore Dashboard",
    watchVideo: "Watch Video",
    loginHeader: "Sentinel Node",
    loginSub: "Choose your network access node to authorize connection.",
    citizenSosTab: "📢 Citizen SOS",
    responderTab: "👮 Responder",
    emailLabel: "Email Address",
    passcodeLabel: "Security Passcode",
    forgotPasscode: "Forgot?",
    signInBtn: "Establish Secure Link",
    signUpBtn: "Register Local Node",
    noAccount: "No node account?",
    haveAccount: "Already registered?",
    recoverTitle: "Recover Passcode",
    recoverSub: "Enter registered email coordinates to output password logs.",
    decryptBtn: "Decrypt Passcode",
    backSignIn: "← Back to Sign In",
    tabDashboard: "Dashboard",
    tabLiveTracking: "Live Tracking",
    tabIncidents: "Incidents",
    tabAiDetection: "AI Detection",
    tabResources: "Resources",
    tabAnalytics: "Analytics",
    tabSandbox: "Digital Twin Sandbox",
    tabSettings: "Settings",
    tabMap: "🗺️ Map",
    tabSos: "🚨 SOS",
    tabShelters: "🏢 Shelters",
    tabMedical: "🏥 Medical",
    tabVolunteers: "👥 Volunteers",
    tabSurvival: "🎒 Survival",
    tabAlerts: "📡 Alerts",
    weatherAdvisory: "Tactical Alert Advisory",
    weatherTitle: "Telangana",
    tempLabel: "Temperature",
    precipLabel: "Precipitation",
    windLabel: "Wind Speed",
    humidityLabel: "Humidity",
  },
  te: {
    portalTitle: "సెంటినల్ ఏఐ కమాండ్",
    citizenNode: "తెలంగాణ సేఫ్ సిటిజన్ నోడ్",
    sirenAlert: "సైరన్_అలర్ట్",
    sirenSos: "🔊 సైరన్ SOS",
    stopSiren: "⏹️ సైరన్ ఆపు",
    exploreDashboard: "డ్యాష్‌బోర్డ్ చూడండి",
    watchVideo: "వీడియో చూడండి",
    loginHeader: "సెంటినల్ ఏఐ నోడ్",
    loginSub: "కనెక్షన్‌ని అనుమతించడానికి మీ నెట్‌వర్క్ యాక్సెస్ నోడ్‌ని ఎంచుకోండి.",
    citizenSosTab: "📢 సిటిజన్ SOS",
    responderTab: "👮 రెస్పాండర్",
    emailLabel: "ఈమెయిల్ చిరునామా",
    passcodeLabel: "భద్రతా పాస్‌కోడ్",
    forgotPasscode: "మర్చిపోయారా?",
    signInBtn: "సురక్షిత లింక్ ఏర్పాటు చేయి",
    signUpBtn: "స్థానిక నోడ్‌ను నమోదు చేయి",
    noAccount: "నోడ్ ఖాతా లేదా?",
    haveAccount: "ఇప్పటికే నమోదయ్యారా?",
    recoverTitle: "పాస్‌కోడ్ రికవరీ",
    recoverSub: "పాస్‌వర్డ్ లాగ్‌లను పొందడానికి నమోదित ఈమెయిల్ ఎంటర్ చేయండి.",
    decryptBtn: "పాస్‌కోడ్‌ను డీక్రిప్ట్ చేయి",
    backSignIn: "← సైన్ ఇన్ కి తిరిగి వెళ్ళు",
    tabDashboard: "డ్యాష్‌బోర్డ్",
    tabLiveTracking: "లైవ్ ట్రాకింగ్",
    tabIncidents: "సంఘటనలు",
    tabAiDetection: "ఏఐ డిటెక్షన్",
    tabResources: "వనరులు",
    tabAnalytics: "విశ్లేషణలు",
    tabSandbox: "డిజిటల్ ట్విన్ సాండ్‌బాక్స్",
    tabSettings: "సెట్టింగులు",
    tabMap: "🗺️ మ్యాప్",
    tabSos: "🚨 SOS",
    tabShelters: "🏢 ఆశ్రయాలు",
    tabMedical: "🏥 వైద్య సేవలు",
    tabVolunteers: "👥 స్వచ్ఛంద సేవకులు",
    tabSurvival: "🎒 బతికేందుకు కిట్",
    tabAlerts: "📡 హెచ్చరికలు",
    weatherAdvisory: "వ్యూహాత్మక హెచ్చరికల సలహా",
    weatherTitle: "తెలంగాణ",
    tempLabel: "ఉష్ణోగ్రత",
    precipLabel: "వర్షపాతం",
    windLabel: "గాలి వేగం",
    humidityLabel: "తేమ",
  },
  hi: {
    portalTitle: "सेंटीनेल एआई कमांड",
    citizenNode: "तेलंगाना सुरक्षित नागरिक नोड",
    sirenAlert: "साइरन_अलर्ट",
    sirenSos: "🔊 साइरन SOS",
    stopSiren: "⏹️ साइरन बंद करें",
    exploreDashboard: "डैशबोर्ड खोलें",
    watchVideo: "वीडियो देखें",
    loginHeader: "सेंटीनेल एआई नोड",
    loginSub: "कनेक्शन को अधिकृत करने के लिए अपना नेटवर्क एक्सेस नोड चुनें।",
    citizenSosTab: "📢 नागरिक SOS",
    responderTab: "👮 रिस्पॉन्डर",
    emailLabel: "ईमेल पता",
    passcodeLabel: "सुरक्षा पासकोड",
    forgotPasscode: "भूल गए?",
    signInBtn: "सुरक्षित लिंक स्थापित करें",
    signUpBtn: "स्थानीय नोड पंजीकृत करें",
    noAccount: "नोड खाता नहीं है?",
    haveAccount: "पहले से पंजीकृत हैं?",
    recoverTitle: "पासकोड पुनर्प्राप्ति",
    recoverSub: "पासवर्ड लॉग प्राप्त करने के लिए पंजीकृत ईमेल दर्ज करें।",
    decryptBtn: "पासकोड डिक्रिप्ट करें",
    backSignIn: "← साइन इन पर वापस जाएं",
    tabDashboard: "डैशबोर्ड",
    tabLiveTracking: "लाइव ट्रैकिंग",
    tabIncidents: "घटनाएँ",
    tabAiDetection: "एआई डिटेक्शन",
    tabResources: "संसाधन",
    tabAnalytics: "विश्लेषण",
    tabSandbox: "डिजिटल ट्विन सैंडबॉक्स",
    tabSettings: "सेTINGS",
    tabMap: "🗺️ मानचित्र",
    tabSos: "🚨 SOS",
    tabShelters: "🏢 आश्रय स्थल",
    tabMedical: "🏥 चिकित्सा",
    tabVolunteers: "👥 स्वयंसेवक",
    tabSurvival: "🎒 उत्तरजीविता पैक",
    tabAlerts: "📡 अलर्ट",
    weatherAdvisory: "सामरिक चेतावनी सलाह",
    weatherTitle: "तेलंगाना",
    tempLabel: "तापमान",
    precipLabel: "वर्षा दर",
    windLabel: "हवा की गति",
    humidityLabel: "आर्द्रता",
  },
  es: {
    portalTitle: "Comando Sentinel",
    citizenNode: "Nodo Ciudadano Seguro de Telangana",
    sirenAlert: "ALERTA_SIRENA",
    sirenSos: "🔊 SIRENA SOS",
    stopSiren: "⏹️ DETENER SIRENA",
    exploreDashboard: "Explorar Tablero",
    watchVideo: "Ver Video",
    loginHeader: "Nodo Sentinel",
    loginSub: "Elija su nodo de acceso a la red para autorizar la conexión.",
    citizenSosTab: "📢 SOS Ciudadano",
    responderTab: "👮 Respondedor",
    emailLabel: "Correo Electrónico",
    passcodeLabel: "Código de Seguridad",
    forgotPasscode: "¿Olvidó?",
    signInBtn: "Establecer Enlace Seguro",
    signUpBtn: "Registrar Nodo Local",
    noAccount: "¿No tiene cuenta de nodo?",
    haveAccount: "¿Ya está registrado?",
    recoverTitle: "Recuperar Código",
    recoverSub: "Ingrese el correo registrado para generar los registros de contraseña.",
    decryptBtn: "Desencriptar Código",
    backSignIn: "← Volver al Acceso",
    tabDashboard: "Tablero",
    tabLiveTracking: "Rastreo en Vivo",
    tabIncidents: "Incidentes",
    tabAiDetection: "Detección IA",
    tabResources: "Recursos",
    tabAnalytics: "Analítica",
    tabSandbox: "Simulador Digital Twin",
    tabSettings: "Ajustes",
    tabMap: "🗺️ Mapa",
    tabSos: "🚨 SOS",
    tabShelters: "🏢 Refugios",
    tabMedical: "🏥 Médico",
    tabVolunteers: "👥 Voluntarios",
    tabSurvival: "🎒 Kit Supervivencia",
    tabAlerts: "📡 Alertas",
    weatherAdvisory: "Aviso de Alerta Táctica",
    weatherTitle: "Telangana",
    tempLabel: "Temperatura",
    precipLabel: "Precipitación",
    windLabel: "Viento",
    humidityLabel: "Humedad",
  }
};

// Base static data matching mock_data.py but fully client-side
const INITIAL_SECTORS = [
  { id: "godavari_basin", name: "Godavari Basin Region", elevation: 95, coords: { x: 500, y: 310 }, population: 45000, is_safe: false, water_depth: 0.5, threat_level: 'Low' },
  { id: "musi_basin", name: "Musi River Basin Area", elevation: 110, coords: { x: 500, y: 500 }, population: 18000, is_safe: false, water_depth: 0.6, threat_level: 'Medium' },
  { id: "warangal", name: "Warangal Division", elevation: 302, coords: { x: 670, y: 440 }, population: 12000, is_safe: false, water_depth: 0.2, threat_level: 'Low' },
  { id: "hyderabad", name: "Hyderabad Capital Zone", elevation: 505, coords: { x: 330, y: 480 }, population: 68000, is_safe: false, water_depth: 0.0, threat_level: 'None' },
  { id: "nizamabad", name: "Nizamabad Sector", elevation: 395, coords: { x: 440, y: 220 }, population: 18000, is_safe: false, water_depth: 0.0, threat_level: 'None' },
  { id: "khammam", name: "Khammam Sector", elevation: 112, coords: { x: 630, y: 150 }, population: 22000, is_safe: true, water_depth: 0.0, threat_level: 'None' },
  { id: "karimnagar", name: "Karimnagar Sector", elevation: 265, coords: { x: 220, y: 300 }, population: 15000, is_safe: true, water_depth: 0.0, threat_level: 'None' },
  { id: "nalgonda", name: "Nalgonda Division", elevation: 171, coords: { x: 130, y: 380 }, population: 30000, is_safe: true, water_depth: 0.0, threat_level: 'None' }
];

const INITIAL_SHELTERS = [
  { id: "shelter_khammam", name: "Khammam Stadium Safe Zone", coords: { x: 620, y: 130 }, capacity: 1000, occupied: 420, medicine_stock: "High", food_stock: "Medium", sector_id: "khammam" },
  { id: "shelter_hyderabad", name: "Hyderabad Exhibition Safe Zone", coords: { x: 140, y: 360 }, capacity: 2500, occupied: 850, medicine_stock: "Critical", food_stock: "High", sector_id: "nalgonda" },
  { id: "shelter_karimnagar", name: "Karimnagar Indoor Arena", coords: { x: 200, y: 310 }, capacity: 800, occupied: 150, medicine_stock: "High", food_stock: "High", sector_id: "karimnagar" }
];

const INITIAL_HOSPITALS = [
  { id: "hosp_nizamabad", name: "Nizamabad Medical College", coords: { x: 450, y: 230 }, icu_beds_total: 50, icu_beds_available: 12, status: "Operational", is_flooded: false },
  { id: "hosp_warangal", name: "Warangal MGM Hospital", coords: { x: 250, y: 390 }, icu_beds_total: 80, icu_beds_available: 34, status: "Operational", is_flooded: false },
  { id: "hosp_osmania", name: "Hyderabad Osmania Hospital", coords: { x: 480, y: 520 }, icu_beds_total: 60, icu_beds_available: 3, status: "Water at Entrance", is_flooded: true }
];

const INITIAL_RESPONDERS = [
  { id: "police_1", name: "TS Police Unit 1", type: "Police", coords: { x: 450, y: 210 }, startCoords: { x: 450, y: 210 }, status: "Idle", task_id: null },
  { id: "police_2", name: "Rachakonda Patrol Unit 4", type: "Police", coords: { x: 230, y: 320 }, startCoords: { x: 230, y: 320 }, status: "Idle", task_id: null },
  { id: "fire_1", name: "Nizamabad Fire Team", type: "Fire", coords: { x: 420, y: 230 }, startCoords: { x: 420, y: 230 }, status: "Idle", task_id: null },
  { id: "fire_2", name: "Hyderabad NDRF Unit", type: "Fire", coords: { x: 310, y: 460 }, startCoords: { x: 310, y: 460 }, status: "Idle", task_id: null },
  { id: "amb_1", name: "Ambulance Lifesaver A", type: "Ambulance", coords: { x: 470, y: 240 }, startCoords: { x: 470, y: 240 }, status: "Idle", task_id: null },
  { id: "amb_2", name: "Ambulance Lifesaver B", type: "Ambulance", coords: { x: 260, y: 410 }, startCoords: { x: 260, y: 410 }, status: "Idle", task_id: null },
  { id: "boat_1", name: "NDRF Rescue Boat 1", type: "Boat", coords: { x: 510, y: 330 }, startCoords: { x: 510, y: 330 }, status: "Idle", task_id: null },
  { id: "boat_2", name: "NDRF Rescue Boat 2", type: "Boat", coords: { x: 490, y: 490 }, startCoords: { x: 490, y: 490 }, status: "Idle", task_id: null },
  { id: "drone_1", name: "Med-Drone X1", type: "Drone", coords: { x: 150, y: 350 }, startCoords: { x: 150, y: 350 }, status: "Idle", task_id: null, battery: 92 },
  { id: "drone_2", name: "Med-Drone X2", type: "Drone", coords: { x: 610, y: 130 }, startCoords: { x: 610, y: 130 }, status: "Idle", task_id: null, battery: 85 },
  { id: "drone_3", name: "Surveillance Eye-3", type: "Drone", coords: { x: 490, y: 290 }, startCoords: { x: 490, y: 290 }, status: "Idle", task_id: null, battery: 55 }
];

const INITIAL_REPORTS = [
  { id: "rep_001", name: "Srinivas Rao", phone: "+91 98480 22338", sector_id: "warangal", type: "Trapped", severity: "Critical", description: "50 people trapped on community center rooftop. Water rising fast, first floor flooded.", coords: { x: 680, y: 450 }, time: "13:30", status: "Pending", assigned_responder: null },
  { id: "rep_002", name: "Kavitha Reddy", phone: "+91 99890 55432", sector_id: "musi_basin", type: "Medical", severity: "Critical", description: "Elderly patient needs oxygen cylinder and insulin urgently. House surrounded by 4ft water.", coords: { x: 520, y: 520 }, time: "13:42", status: "Pending", assigned_responder: null },
  { id: "rep_003", name: "MD. Ibrahim", phone: "+91 91770 99881", sector_id: "hyderabad", type: "Road Block", severity: "Medium", description: "Main arterial road leading to Osmania hospital blocked by waterlogging.", coords: { x: 340, y: 470 }, time: "13:48", status: "Pending", assigned_responder: null }
];

const INITIAL_ROADS = [
  { from: "nalgonda", to: "karimnagar", blocked: false },
  { from: "karimnagar", to: "nizamabad", blocked: false },
  { from: "karimnagar", to: "godavari_basin", blocked: false },
  { from: "nizamabad", to: "khammam", blocked: false },
  { from: "nizamabad", to: "godavari_basin", blocked: false },
  { from: "khammam", to: "warangal", blocked: false },
  { from: "godavari_basin", to: "warangal", blocked: true },
  { from: "godavari_basin", to: "hyderabad", blocked: true },
  { from: "hyderabad", to: "musi_basin", blocked: false },
  { from: "warangal", to: "musi_basin", blocked: false }
];

const WEATHER_STATES = [
  { rate: 0, cond: 'Clear Sky (Calm)', temp: '32°C', wind: 8 },
  { rate: 6, cond: 'Light Showers (Drizzle)', temp: '28°C', wind: 14 },
  { rate: 18, cond: 'Heavy Thunderstorms (Downpour)', temp: '24°C', wind: 24 },
  { rate: 35, cond: 'Extreme Cloudburst (Precipitation Surge)', temp: '22°C', wind: 36 },
  { rate: 12, cond: 'Moderate Storms (Receding)', temp: '26°C', wind: 18 }
];

function DopplerRadarCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, 140, 140);
      
      // Radar background grids
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.arc(70, 70, 65, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(70, 70, 42, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(70, 70, 20, 0, 2 * Math.PI);
      ctx.stroke();

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(5, 70);
      ctx.lineTo(135, 70);
      ctx.moveTo(70, 5);
      ctx.lineTo(70, 135);
      ctx.stroke();

      // Sweeper arm
      ctx.beginPath();
      ctx.moveTo(70, 70);
      ctx.lineTo(70 + Math.cos(angle) * 65, 70 + Math.sin(angle) * 65);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Storm cells
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.beginPath();
      ctx.arc(45, 55, 6, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.beginPath();
      ctx.arc(95, 88, 5, 0, 2 * Math.PI);
      ctx.fill();

      angle += 0.04;
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} width="140" height="140" className="mx-auto block" />;
}

function HydrologySimulatorCanvas({ rainRate, predictionHour }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let offset = 0;

    // Node locations matching Telangana geography sectors
    const nodes = [
      { name: 'Madhapur', x: 50, y: 40, elev: 600, color: '#3B82F6' },
      { name: 'Begumpet', x: 150, y: 80, elev: 420, color: '#60A5FA' },
      { name: 'NIMS', x: 250, y: 70, elev: 310, color: '#93C5FD' },
      { name: 'Osmania', x: 100, y: 160, elev: 150, color: '#F59E0B' },
      { name: 'Musi Basin', x: 200, y: 190, elev: 80, color: '#EF4444' }
    ];

    // Flow paths from high elevation nodes to low elevation nodes
    const paths = [
      { from: 0, to: 1 }, // Madhapur to Begumpet
      { from: 1, to: 2 }, // Begumpet to NIMS
      { from: 2, to: 4 }, // NIMS to Musi Basin
      { from: 0, to: 3 }, // Madhapur to Osmania
      { from: 3, to: 4 }  // Osmania to Musi Basin
    ];

    const draw = () => {
      ctx.clearRect(0, 0, 300, 220);

      // Draw path lines
      paths.forEach(p => {
        const start = nodes[p.from];
        const end = nodes[p.to];
        
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = 'rgba(55, 65, 81, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw animated trickle water particles if raining
        if (rainRate > 0) {
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const steps = Math.ceil(len / 15);
          
          for (let i = 0; i < steps; i++) {
            const ratio = ((i / steps) + (offset / 100)) % 1.0;
            const px = start.x + dx * ratio;
            const py = start.y + dy * ratio;
            
            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(96, 165, 250, 0.85)';
            ctx.fill();
          }
        }
      });

      // Draw sector points
      nodes.forEach(node => {
        // Compute local water accumulation based on elevation and rain rate
        const localRainFactor = Math.max(1.0, (600 - node.elev) / 100);
        const waterAccum = (rainRate * 0.08 * localRainFactor * (1 + predictionHour * 0.15));
        const radius = Math.min(24, 6 + waterAccum);
        const isFlooded = waterAccum > 14;

        // Glowing boundary ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + (isFlooded ? Math.abs(Math.sin(offset / 10) * 4) : 0), 0, 2 * Math.PI);
        ctx.strokeStyle = isFlooded ? 'rgba(239, 68, 68, 0.65)' : 'rgba(96, 165, 250, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = isFlooded ? '#EF4444' : node.color;
        ctx.fill();

        // Label
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '8px monospace';
        ctx.fillText(`${node.name.toUpperCase()} (${node.elev}m)`, node.x - 22, node.y - 12);
        
        ctx.fillStyle = isFlooded ? '#EF4444' : '#60A5FA';
        ctx.fillText(`${waterAccum.toFixed(1)}mm`, node.x - 12, node.y + radius + 10);
      });

      offset = (offset + 1.25) % 100;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [rainRate, predictionHour]);

  return <canvas ref={canvasRef} width="300" height="220" className="mx-auto block bg-zinc-950/80 rounded-xl border border-zinc-850 shadow-inner" />;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLanding, setShowLanding] = useState(true);
  const [initialSignUpMode, setInitialSignUpMode] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');
  
  // Platform States
  const [sectors, setSectors] = useState(INITIAL_SECTORS);
  const [shelters, setShelters] = useState(INITIAL_SHELTERS);
  const [hospitals, setHospitals] = useState(INITIAL_HOSPITALS);
  const [responders, setResponders] = useState(INITIAL_RESPONDERS);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [roads, setRoads] = useState(INITIAL_ROADS);
  
  // Dashboard & simulation values
  const [rainRate, setRainRate] = useState(18); // mm/hr
  const [weatherCondition, setWeatherCondition] = useState('Severe Thunderstorms');
  const [savedCount, setSavedCount] = useState(148);
  const [trappedCount, setTrappedCount] = useState(85);
  const [clickedMapCoords, setClickedMapCoords] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  // Selection Panel drawers
  const [selectedItem, setSelectedItem] = useState(null);
  const [citizenTab, setCitizenTab] = useState('Map');
  const [survivalPack, setSurvivalPack] = useState({ docs: false, meds: false, food: false, power: false, light: false });
  const [isScanningDrone, setIsScanningDrone] = useState(false);
  const [droneScanResults, setDroneScanResults] = useState(null);
  
  // Time Travel Prediction Slider
  const [predictionHour, setPredictionHour] = useState(0);
  const [isTimelinePlaying, setIsTimelinePlaying] = useState(false);
  const [simWindSpeed, setSimWindSpeed] = useState(20);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const sirenAudioRef = useRef(null);
  const [lang, setLang] = useState('en');
  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  // Toggle Dark Mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Dispatch simulation: incrementally move dispatched responders towards targets
  useEffect(() => {
    const interval = setInterval(() => {
      setResponders(prevRes => {
        let updated = false;
        const nextRes = prevRes.map(res => {
          if (res.status === 'Dispatched' && res.targetCoords) {
            // Calculate step towards coordinates
            const dx = res.targetCoords.x - res.coords.x;
            const dy = res.targetCoords.y - res.coords.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Step speed (drones move faster)
            const speed = res.type === 'Drone' ? 30 : 12;
            
            if (distance < speed) {
              // Arrived!
              updated = true;
              return {
                ...res,
                coords: { ...res.targetCoords },
                status: 'Arrived',
                battery: res.type === 'Drone' ? Math.max(10, res.battery - 15) : undefined
              };
            } else {
              // Step forward
              const ratio = speed / distance;
              updated = true;
              return {
                ...res,
                coords: {
                  x: Math.round(res.coords.x + dx * ratio),
                  y: Math.round(res.coords.y + dy * ratio)
                },
                battery: res.type === 'Drone' ? Math.max(1, res.battery - 1) : undefined
              };
            }
          }
          return res;
        });
        return updated ? nextRes : prevRes;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update status count based on flood prediction or completed dispatches
  useEffect(() => {
    // Count active alerts that are not resolved
    const active = reports.filter(r => r.status !== 'Resolved').length;
    // Set mock trapped count based on active reports severity
    setTrappedCount(reports.filter(r => r.severity === 'Critical' && r.status !== 'Resolved').length * 25 + active * 4);
  }, [reports]);

  // Automatic Weather Monitoring Loop
  useEffect(() => {
    let index = 2; // Start with index 2 (18 mm/hr)
    const interval = setInterval(() => {
      index = (index + 1) % WEATHER_STATES.length;
      const state = WEATHER_STATES[index];
      setRainRate(state.rate);
      setWeatherCondition(state.cond);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Digital Twin Auto-Simulation Cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setPredictionHour(h => (h + 1) % 4); // Automatically loops 0, 1, 2, 3 hours to animate propagation
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Run the Cellular Automata spread prediction locally based on prediction hour
  useEffect(() => {
    // Compute new sector water levels depending on slider hour
    setSectors(prev => {
      return prev.map(s => {
        // Base elevation-based formula
        let depth = 0;
        if (s.id === 'godavari_basin') {
          depth = 0.5 + (predictionHour * (rainRate / 60));
        } else if (s.id === 'musi_basin') {
          depth = 0.6 + (predictionHour * (rainRate / 65));
        } else {
          // Water flows from lake/river to connected low elevation sectors
          const elevationDiff = s.elevation - 95;
          const spreadFactor = Math.max(0, 8 - elevationDiff / 10);
          depth = Math.max(0, (predictionHour * (rainRate / 100) * spreadFactor) - 0.2);
        }
        
        // Cap decimals and calculate threat level
        depth = Math.max(0, parseFloat(depth.toFixed(2)));
        let level = 'None';
        if (depth > 1.8) level = 'Critical';
        else if (depth > 1.0) level = 'High';
        else if (depth > 0.4) level = 'Medium';
        else if (depth > 0.05) level = 'Low';
        
        return {
          ...s,
          water_depth: depth,
          threat_level: level
        };
      });
    });

    // Update road blockages depending on flood levels
    setRoads(prev => {
      return prev.map(r => {
        // Find water levels of connected nodes
        // Simulated blockages rise at prediction hours
        const isBlocked = (predictionHour > 2 && (r.from === 'godavari_basin' || r.to === 'godavari_basin')) ||
                          (predictionHour > 4 && (r.from === 'musi_basin' || r.to === 'musi_basin')) ||
                          (predictionHour > 8);
        return { ...r, blocked: isBlocked };
      });
    });
  }, [predictionHour, rainRate]);

  // Change simulated rain rate
  const handleRainSliderChange = (e) => {
    const rate = parseInt(e.target.value);
    setRainRate(rate);
    if (rate === 0) {
      setWeatherCondition('Clear Sky');
    } else if (rate < 10) {
      setWeatherCondition('Light Showers');
    } else if (rate < 25) {
      setWeatherCondition('Heavy Thunderstorms');
    } else {
      setWeatherCondition('Cloudburst / Extreme Flooding');
    }
  };

  // Play audio synthesizer warning siren (Web Audio API) - wailing dual-tone disaster siren
  const playEmergencySiren = () => {
    try {
      // If already playing, stop the siren
      if (isSirenActive && sirenAudioRef.current) {
        const { osc1, osc2, gainNode, audioCtx, intervalId } = sirenAudioRef.current;
        clearInterval(intervalId);
        
        const now = audioCtx.currentTime;
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0.0, now + 0.5);
        
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
            audioCtx.close();
          } catch (e) {
            console.warn(e);
          }
        }, 550);
        
        sirenAudioRef.current = null;
        setIsSirenActive(false);
        return;
      }

      // Start playing wailing mechanical air-raid/disaster siren
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      const filterNode = audioCtx.createBiquadFilter();

      // Dual-tone minor third chord ratio (1.2:1) creating realistic municipal dissonance
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(264, audioCtx.currentTime);

      // Lowpass filter to emulate the muffled, booming distance of outdoor sirens
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(650, audioCtx.currentTime);

      // Volume control with fade-in
      gainNode.gain.setValueAtTime(0.0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.6);

      // Connections
      osc1.connect(filterNode);
      osc2.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start();
      osc2.start();

      // Pitch sweep cycles: rise to 380Hz/456Hz and fall back to 220Hz/264Hz slowly
      const runSirenCycle = () => {
        if (!audioCtx || audioCtx.state === 'closed') return;
        const now = audioCtx.currentTime;
        osc1.frequency.linearRampToValueAtTime(360, now + 1.8);
        osc2.frequency.linearRampToValueAtTime(432, now + 1.8);
        osc1.frequency.linearRampToValueAtTime(220, now + 3.8);
        osc2.frequency.linearRampToValueAtTime(264, now + 3.8);
      };

      runSirenCycle();
      const intervalId = setInterval(runSirenCycle, 4000);

      sirenAudioRef.current = { osc1, osc2, gainNode, audioCtx, intervalId };
      setIsSirenActive(true);
    } catch (e) {
      console.warn("Web Audio API not supported on this platform:", e);
    }
  };

  // Handle interactive drone surveillance scanning action
  const handleDroneScan = () => {
    setIsScanningDrone(true);
    setDroneScanResults(null);
    setTimeout(() => {
      setIsScanningDrone(false);
      setDroneScanResults("SURVEILLANCE COMPLETED: Detected 3 Trapped Citizens near Musi Basin sector. Coordinates synced with auto-router dispatch targets.");
    }, 1800);
  };

  // Submit report from Citizens.jsx
  const handleCreateReport = (newReport) => {
    const reportWithId = {
      ...newReport,
      id: `rep_${Math.floor(100 + Math.random() * 900)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Pending',
      assigned_responder: null
    };

    setReports(prev => [reportWithId, ...prev]);
    setClickedMapCoords(null);
    setSelectedItem(reportWithId); // Auto-open details drawer
  };

  // Trigger Resource Allocation AI Engine (bipartite type-based matching)
  const triggerAIOptimization = () => {
    setIsOptimizing(true);
    
    // Simulate thinking delay
    setTimeout(() => {
      // Compatibility map
      const COMPATIBILITY = {
        'Trapped': ['Boat', 'Fire'],
        'Medical': ['Ambulance', 'Drone'],
        'Road Block': ['Police']
      };

      setReports(prevReports => {
        // Map reports to responders
        let availableResponders = [...responders];
        
        return prevReports.map(rep => {
          if (rep.status === 'Pending') {
            const compTypes = COMPATIBILITY[rep.type] || [];
            
            // Find closest idle compatible responder
            let bestRes = null;
            let minDist = Infinity;
            
            availableResponders.forEach(res => {
              if (res.status === 'Idle' && compTypes.includes(res.type)) {
                // Euclidean distance
                const dist = Math.sqrt(
                  (res.coords.x - rep.coords.x) ** 2 + 
                  (res.coords.y - rep.coords.y) ** 2
                );
                
                if (dist < minDist) {
                  minDist = dist;
                  bestRes = res;
                }
              }
            });

            if (bestRes) {
              // Assign this responder
              setResponders(prevRes => 
                prevRes.map(r => 
                  r.id === bestRes.id 
                    ? { ...r, status: 'Dispatched', task_id: rep.id, targetCoords: rep.coords } 
                    : r
                )
              );
              
              // Remove from available responders pool in this iteration
              availableResponders = availableResponders.filter(r => r.id !== bestRes.id);
              
              return {
                ...rep,
                status: 'Dispatched',
                assigned_responder: bestRes.id
              };
            }
          }
          return rep;
        });
      });

      setIsOptimizing(false);
    }, 800);
  };

  // Update specific responder status from Console Actions
  const handleUpdateResponder = (resId, nextStatus) => {
    setResponders(prev => 
      prev.map(res => {
        if (res.id === resId) {
          if (nextStatus === 'Recharge') {
            return { ...res, battery: 100 };
          }
          
          const associatedReportId = res.task_id;
          
          if (nextStatus === 'Idle' && associatedReportId) {
            // Mark report resolved
            setReports(prevReps => 
              prevReps.map(rep => 
                rep.id === associatedReportId 
                  ? { ...rep, status: 'Resolved' } 
                  : rep
              )
            );
            setSavedCount(c => c + 1);
            return { ...res, status: 'Idle', task_id: null, targetCoords: null };
          }
          return { ...res, status: nextStatus };
        }
        return res;
      })
    );
  };

  const handleSelectSector = (sector) => {
    setSelectedItem({ type: 'sector', data: sector });
  };

  const handleSelectReport = (report) => {
    setSelectedItem({ type: 'report', data: report });
  };

  const handleSelectResponder = (responder) => {
    setSelectedItem({ type: 'responder', data: responder });
  };

  // Find assigned responder name
  const getAssignedResponderName = (resId) => {
    return responders.find(r => r.id === resId)?.name || 'None';
  };

  const openExternalMap = (lat = 17.3850, lng = 78.4867) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    if (window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function' && window.Capacitor.isNativePlatform()) {
      window.open(url, '_system');
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const renderWeatherReport = (isCitizen = false) => {
    const temp = Math.max(18, 32 - Math.round(rainRate * 0.3));
    const humidity = Math.min(100, 75 + Math.round(rainRate * 0.8));
    
    // Determine advisory message based on sandbox values
    let advisoryText = "Standard monsoon precautions active. Emergency responder units are standby.";
    let alertType = "info"; // info, warning, danger
    
    if (rainRate >= 28 && simWindSpeed >= 70) {
      advisoryText = "⚠️ CRITICAL WEATHER BULLETIN: Severe cyclonic cloudburst active. Ground operations restricted. Drone fleets recalled for fast-charge. Evacuate Musi River basin immediately.";
      alertType = "danger";
    } else if (rainRate >= 25) {
      advisoryText = "⚠️ FLASH FLOOD ALERT: Extreme cloudburst active along low-lying Musi Basin. River depth sensors are rising. Safe shelters directory is open.";
      alertType = "warning";
    } else if (simWindSpeed >= 65) {
      advisoryText = "⚠️ GALE WIND ADVISORY: Storm winds exceed drone safety thresholds. Secure responder equipment and avoid high-elevation sectors.";
      alertType = "warning";
    } else if (rainRate >= 12) {
      advisoryText = "☔ MODERATE MONSOON ALERT: Steady precipitation accumulation active. Highways open, expect standard routing delays.";
      alertType = "info";
    }

    const alertStyles = {
      danger: "bg-red-500/10 border-red-500/30 text-red-500",
      warning: "bg-amber-500/10 border-amber-500/30 text-amber-500",
      info: "bg-blue-500/10 border-blue-500/30 text-blue-400"
    };

    const iconStyles = {
      danger: "text-red-500",
      warning: "text-amber-500",
      info: "text-blue-400"
    };

    return (
      <div className={`border rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between transition-all duration-300 font-sans ${alertStyles[alertType]}`}>
        {/* Left: Weather specs metrics */}
        <div className="flex flex-wrap items-center gap-5 select-none w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-950/40 rounded-xl border border-zinc-800 flex items-center justify-center">
              <Radio className={`w-6 h-6 animate-pulse ${iconStyles[alertType]}`} />
            </div>
            <div className="text-left font-sans">
              <div className="text-xs font-bold text-zinc-300 uppercase tracking-widest leading-none">{t('weatherTitle')}</div>
              <span className="text-[10px] text-zinc-500 mt-1 block uppercase font-bold">{weatherCondition}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs border-l border-zinc-800/80 pl-5">
            <div className="text-left">
              <div className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider">{t('tempLabel')}</div>
              <div className="text-sm font-extrabold text-zinc-200 mt-0.5 font-mono">{temp}°C</div>
            </div>
            <div className="text-left">
              <div className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider">{t('precipLabel')}</div>
              <div className="text-sm font-extrabold text-zinc-200 mt-0.5 font-mono">{rainRate} mm/hr</div>
            </div>
            <div className="text-left">
              <div className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider">{t('windLabel')}</div>
              <div className="text-sm font-extrabold text-zinc-200 mt-0.5 font-mono">{simWindSpeed} km/h</div>
            </div>
            <div className="text-left">
              <div className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider">{t('humidityLabel')}</div>
              <div className="text-sm font-extrabold text-zinc-200 mt-0.5 font-mono">{humidity}%</div>
            </div>
          </div>
        </div>

        {/* Right: Emergency advice text */}
        <div className="text-left text-[11px] max-w-xl leading-relaxed flex-grow md:border-l border-zinc-800/80 md:pl-5 w-full md:w-auto mt-2 md:mt-0 select-text">
          <div className="font-extrabold tracking-wider uppercase text-[9.5px] mb-0.5 flex items-center gap-1.5 font-sans">
            <span className={`w-1.5 h-1.5 rounded-full animate-ping ${
              alertType === 'danger' ? 'bg-red-500' : alertType === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
            }`}></span>
            <span>{t('weatherAdvisory')}</span>
          </div>
          <p className="text-zinc-350">{advisoryText}</p>
        </div>
      </div>
    );
  };

  if (showLanding && !currentUser) {
    return (
      <Landing 
        lang={lang}
        setLang={setLang}
        t={t}
        onEnterLogin={() => {
          setInitialSignUpMode(false);
          setShowLanding(false);
        }}
        onEnterSignUp={() => {
          setInitialSignUpMode(true);
          setShowLanding(false);
        }}
      />
    );
  }

  if (!currentUser) {
    return (
      <Login 
        lang={lang}
        setLang={setLang}
        t={t}
        onLogin={setCurrentUser} 
        initialSignUp={initialSignUpMode}
        onBackToLanding={() => setShowLanding(true)}
      />
    );
  }

  if (currentUser.role === 'Citizen') {
    return (
      <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex font-sans antialiased">
        
        {/* 1. CITIZEN LEFT SIDEBAR MENU (DESKTOP) */}
        <aside className="w-64 bg-[#1E293B] border-r border-zinc-800/80 shrink-0 hidden lg:flex flex-col justify-between h-screen sticky top-0 z-20">
          <div className="flex flex-col">
            {/* Brand Header */}
            <div className="px-6 py-5 border-b border-zinc-850 flex items-center gap-2.5">
              <SentinelLogo size={36} showText={false} className="shrink-0" />
              <div>
                <span className="font-extrabold tracking-wider text-sm font-sans uppercase bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">
                  Sentinel
                </span>
                <div className="text-[9px] font-bold text-[#10B981] tracking-widest font-mono uppercase mt-0.5">CITIZEN PORTAL</div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-1">
              {[
                { id: 'Map', name: t('tabMap'), icon: '🗺️' },
                { id: 'SOS', name: t('tabSos'), icon: '🚨' },
                { id: 'Shelters', name: t('tabShelters'), icon: '🏢' },
                { id: 'Hospitals', name: t('tabMedical'), icon: '🏥' },
                { id: 'Volunteers', name: t('tabVolunteers'), icon: '👥' },
                { id: 'Survival', name: t('tabSurvival'), icon: '🎒' },
                { id: 'Alerts', name: t('tabAlerts'), icon: '📡' }
              ].map((item) => {
                const isActive = citizenTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCitizenTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.35)]' 
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850/50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User profile footer */}
          <div className="p-4 border-t border-zinc-850 bg-zinc-950/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-500/25 text-red-400 flex items-center justify-center font-bold text-xs font-mono">
                C
              </div>
              <div className="text-left select-text">
                <div className="text-xs font-bold text-zinc-100">{currentUser.name.split(' ')[0]}</div>
                <div className="text-[8.5px] text-zinc-550 font-mono mt-0.5">Citizen Profile</div>
              </div>
            </div>
            <button
              onClick={() => setCurrentUser(null)}
              className="p-2 rounded-lg text-zinc-500 hover:text-red-400 transition-colors hover:bg-red-950/20"
              title="Logout"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* 2. MAIN LAYOUT SHELL */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          
          {/* Header Bar */}
          <header className="bg-[#1E293B] border-b border-zinc-800/80 px-6 py-4 flex justify-between items-center h-16 shrink-0 z-10 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-400 font-sans uppercase tracking-wider">{t('citizenNode')}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block select-text">
                <span className="text-xs font-bold text-zinc-200 block">{currentUser.name}</span>
                <span className="text-[9px] text-zinc-550 font-mono block mt-0.5">{currentUser.phone}</span>
              </div>
              
              {/* Language Selector */}
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-zinc-950/60 border border-zinc-800 rounded-lg px-2 py-1 text-[10px] font-bold text-zinc-350 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono tracking-wider cursor-pointer"
              >
                <option value="en">🇺🇸 EN</option>
                <option value="te">🇮🇳 తె</option>
                <option value="hi">🇮🇳 हि</option>
                <option value="es">🇪🇸 ES</option>
              </select>

              <button
                onClick={playEmergencySiren}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold font-mono transition-all ${
                  isSirenActive 
                    ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.6)]' 
                    : 'bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/50 animate-pulse'
                }`}
              >
                {isSirenActive ? t('stopSiren') : t('sirenSos')}
              </button>
              
              <button
                onClick={() => setCurrentUser(null)}
                className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-red-950/20 text-zinc-400 hover:text-red-400 text-xs font-bold transition-all border border-zinc-800/80 lg:hidden"
              >
                Logout
              </button>
            </div>
          </header>

          <main className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Weather Report advisory */}
            {renderWeatherReport(true)}

            {/* Mobile-Only Horizontal Scrollable Tab Bar */}
            <div className="flex gap-2 p-1.5 bg-[#1E293B] border border-zinc-800 rounded-xl max-w-full overflow-x-auto lg:hidden">
              {[
                { id: 'Map', name: '🗺️ Map' },
                { id: 'SOS', name: '🚨 SOS' },
                { id: 'Shelters', name: '🏢 Shelters' },
                { id: 'Hospitals', name: '🏥 Medical' },
                { id: 'Volunteers', name: '👥 Volunteers' },
                { id: 'Survival', name: '🎒 Survival' },
                { id: 'Alerts', name: '📡 Alerts' }
              ].map(tab => {
                const active = citizenTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCitizenTab(tab.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all shrink-0 uppercase tracking-wider ${
                      active 
                        ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.45)]' 
                        : 'bg-zinc-950/20 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }`}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>

          {/* Tab Views */}
          {citizenTab === 'Map' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Google Maps Safe Routing (col-span-2) */}
              <div className="lg:col-span-2 bg-[#1E293B] border border-zinc-800 p-4 rounded-xl shadow-sm h-[480px] flex flex-col justify-between select-text animate-fadeIn">
                <div className="pb-2 border-b border-zinc-850 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Google Maps Safe Evacuation Routing</span>
                  <span className="text-[9px] bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded font-mono font-bold animate-pulse">LIVE MAP</span>
                </div>
                <div className="flex-grow my-3 rounded-lg overflow-hidden border border-zinc-850">
                  <iframe 
                    src="https://maps.google.com/maps?q=17.3850,78.4867&z=11&output=embed" 
                    className="w-full h-full border-none opacity-85 hover:opacity-100 transition-opacity" 
                    title="Citizen Road Blocks Live Feed"
                  />
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-3.5 text-[10px] pt-1">
                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] text-zinc-500 font-bold block">🚨 ACTIVE CORRIDOR CLOSURES</span>
                    <div className="text-[9px] font-mono text-zinc-400 space-y-1 max-h-[45px] overflow-y-auto pr-1">
                      {roads.filter(r => r.blocked).map((r, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-red-400">
                          <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></span>
                          <span>{r.from.toUpperCase()} to {r.to.toUpperCase()}: Closed</span>
                        </div>
                      ))}
                      {roads.filter(r => r.blocked).length === 0 && (
                        <span className="text-emerald-400">🟢 All Telangana evacuation highways are open.</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 bg-zinc-950/30 border border-zinc-850 p-2 rounded-lg text-zinc-400 leading-relaxed font-sans text-[9.5px]">
                    💡 **AI Routing Advice**: Musi Basin road corridors are heavily flooded. Responders advise using Warangal bypass routes (Safe 🟢).
                  </div>
                  <div className="flex items-center justify-center shrink-0">
                    <button 
                      onClick={() => openExternalMap(17.3850, 78.4867)}
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9.5px] px-3 py-2 rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 uppercase font-mono tracking-wider select-none border border-blue-500/20 cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5 animate-pulse" />
                      Open Maps Mobile App
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Doppler Scan & Hydrology Gauge (col-span-1) */}
              <div className="lg:col-span-1 bg-[#1E293B] border border-zinc-800 p-4 rounded-xl shadow-sm h-[480px] flex flex-col justify-between animate-fadeIn">
                <div className="pb-2 border-b border-zinc-850 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Live Telemetry Scanning</span>
                  <span className="text-[9px] bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded font-mono font-bold animate-pulse font-mono">DOPPLER_SCAN</span>
                </div>

                {/* Animated Doppler Scan Radar */}
                <div className="flex-1 flex items-center justify-center bg-zinc-950/60 border border-zinc-850 rounded-lg p-2 max-h-[160px]">
                  <DopplerRadarCanvas />
                </div>

                {/* Hydrological Musi River Gauge */}
                {(() => {
                  const riverDepth = parseFloat((rainRate * 0.12).toFixed(2));
                  const isCritical = riverDepth >= 2.8;
                  const isWarning = riverDepth >= 1.2 && riverDepth < 2.8;
                  return (
                    <div className="space-y-3 pt-3 border-t border-zinc-850">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-zinc-550 font-bold block">MUSI RIVER WATER GAUGE</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase border ${
                          isCritical 
                            ? 'bg-red-950/40 text-red-400 border-red-900/40 animate-pulse' 
                            : isWarning 
                              ? 'bg-amber-950/40 text-amber-450 border-amber-900/40' 
                              : 'bg-emerald-950/40 text-emerald-450 border-emerald-900/40'
                        }`}>
                          {isCritical ? 'CRITICAL OVERFLOW' : isWarning ? 'WARNING FLOW' : 'SAFE FLOW'}
                        </span>
                      </div>

                      {/* Gauge visual slider representation */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                          <span>Live Level Telemetry:</span>
                          <span className="font-extrabold text-zinc-100">{riverDepth} meters</span>
                        </div>
                        <div className="w-full bg-zinc-950 border border-zinc-850 h-5 rounded-lg overflow-hidden p-0.5">
                          <div 
                            className={`h-full rounded-md transition-all duration-500 ${
                              isCritical ? 'bg-gradient-to-r from-red-600 to-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : isWarning ? 'bg-gradient-to-r from-amber-600 to-amber-500' : 'bg-gradient-to-r from-emerald-600 to-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, (riverDepth / 5.0) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <p className="text-[9.5px] text-zinc-500 leading-normal font-sans italic">
                        *River gauge receives telemetry packets from irrigation sensors. Evacuation warning alerts trigger automatically at &gt;2.8m level.
                      </p>
                    </div>
                  );
                })()}
              </div>

            </div>
          )}

          {citizenTab === 'SOS' && (
            <div className="animate-fadeIn">
              <Citizens 
                sectors={sectors}
                reports={reports}
                onCreateReport={handleCreateReport}
                clickedMapCoords={clickedMapCoords}
              />
            </div>
          )}

          {citizenTab === 'Shelters' && (
            <div className="bg-[#1E293B] border border-zinc-800 p-6 rounded-xl shadow-sm space-y-4 animate-fadeIn">
              <div className="pb-2.5 border-b border-zinc-800 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Designated Evacuation Shelters</span>
                <span className="text-[9px] bg-blue-950/40 text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded font-mono font-bold">STATEWIDE DIRECTORY</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shelters.map(sh => (
                  <div key={sh.id} className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-850 flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-zinc-200">{sh.name}</div>
                      <div className="text-[10px] text-zinc-500 font-mono font-semibold">Capacity: {sh.capacity} people | Elevation: {sh.elevation}m</div>
                      <div className="text-[9.5px] text-zinc-450">Active relief coordinates. Hotlines connected.</div>
                    </div>
                    <span className="text-[10px] bg-emerald-950/40 text-emerald-450 border border-emerald-900/30 px-2 py-1 rounded font-mono font-bold">
                      🟢 OPEN
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {citizenTab === 'Hospitals' && (
            <div className="bg-[#1E293B] border border-zinc-800 p-6 rounded-xl shadow-sm space-y-4 animate-fadeIn">
              <div className="pb-2.5 border-b border-zinc-800 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">ICU Bed Vacancy & Blood Bank Telemetry</span>
                <span className="text-[9px] bg-red-950/40 text-red-400 border border-red-900/50 px-2 py-0.5 rounded font-mono font-bold animate-pulse">LIVE EMERGENCY INVENTORY</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'NIMS Hospital (Punjagutta)', icu: 12, icuTotal: 45, bloodO: 24, bloodA: 8, phone: '040-23489000' },
                  { name: 'Osmania General Hospital', icu: 4, icuTotal: 30, bloodO: 15, bloodA: 2, phone: '040-24600141' },
                  { name: 'Yashoda Hospital (Secunderabad)', icu: 18, icuTotal: 50, bloodO: 32, bloodA: 12, phone: '040-27710000' }
                ].map((hosp, idx) => {
                  const icuPct = Math.round((hosp.icu / hosp.icuTotal) * 100);
                  return (
                    <div key={idx} className="p-4 bg-zinc-950/40 border border-zinc-850 rounded-xl space-y-3 font-mono text-[10px] text-zinc-405">
                      <div>
                        <div className="text-xs font-bold text-zinc-200 font-sans mb-1">{hosp.name}</div>
                        <div className="text-zinc-500 text-[9px]">{hosp.phone}</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between font-bold">
                          <span>ICU BEDS VACANCY</span>
                          <span className={hosp.icu < 5 ? 'text-red-400 font-extrabold' : 'text-emerald-400'}>
                            {hosp.icu} / {hosp.icuTotal} FREE
                          </span>
                        </div>
                        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full ${hosp.icu < 5 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${icuPct}%` }}></div>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900/60 pt-2 space-y-1 text-[9px]">
                        <span className="text-zinc-500 font-bold block">BLOOD INVENTORY UNITS:</span>
                        <div className="flex justify-between">
                          <span>O- Positive:</span>
                          <span className="font-bold text-zinc-300">{hosp.bloodO} units</span>
                        </div>
                        <div className="flex justify-between">
                          <span>A- Negative:</span>
                          <span className="font-bold text-zinc-300">{hosp.bloodA} units</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {citizenTab === 'Volunteers' && (
            <div className="bg-[#1E293B] border border-zinc-800 p-6 rounded-xl shadow-sm space-y-4 animate-fadeIn">
              <div className="pb-2.5 border-b border-zinc-800 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Registered Community Aid Volunteers</span>
                <span className="text-[9px] bg-blue-950/40 text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded font-mono font-bold animate-pulse">3 ONLINE - NEAR YOU</span>
              </div>
              
              <p className="text-[10px] text-zinc-500 leading-normal">
                Disaster responders recommend contacting active neighborhood volunteer coordinators directly for fast local supply distributions or community first-aid sweeps.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Suresh Kumar', sector: 'Dilsukhnagar', role: 'First Aid & CPR Specialist', dist: '1.2 km away', phone: '+91-9848022338' },
                  { name: 'Anitha Rao', sector: 'Madhapur', role: 'Emergency Food Supplies coordinator', dist: '2.4 km away', phone: '+91-9959011442' },
                  { name: 'Rajesh Reddy', sector: 'Begumpet', role: 'Local Evacuation Transport Coordinator', dist: '3.8 km away', phone: '+91-9440122557' }
                ].map((vol, idx) => (
                  <div key={idx} className="p-4 bg-zinc-950/40 border border-zinc-850 rounded-xl flex flex-col justify-between space-y-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-zinc-200">{vol.name}</span>
                        <span className="text-[9px] text-blue-450 font-mono font-bold">{vol.dist}</span>
                      </div>
                      <div className="text-[9.5px] text-zinc-500 font-mono">Sector: {vol.sector.toUpperCase()}</div>
                      <div className="text-[10px] text-zinc-400 leading-snug">{vol.role}</div>
                    </div>

                    <a 
                      href={`tel:${vol.phone}`}
                      className="w-full block text-center bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 py-2 rounded-lg text-[9.5px] font-bold uppercase tracking-wider transition-all font-mono"
                    >
                      📞 Dial {vol.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {citizenTab === 'Survival' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              
              {/* Survival Pack Builder */}
              <div className="bg-[#1E293B] border border-zinc-800 p-6 rounded-xl shadow-sm space-y-4">
                <div className="pb-2 border-b border-zinc-850 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">AI Evacuation Pack Survival Builder</span>
                  <span className="text-[9px] bg-blue-950/40 text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded font-mono font-bold">
                    {Math.round((Object.values(survivalPack).filter(Boolean).length / 5) * 100)}% READY
                  </span>
                </div>
                
                <p className="text-[10px] text-zinc-500 leading-normal">
                  Toggle checklist items as you pack them. Sentinel verifies evacuation readiness to ensure regulatory safety guidelines.
                </p>

                <div className="space-y-2.5 pt-1 text-xs">
                  {[
                    { key: 'docs', label: '📄 Identity documents, deeds, passports (sealed in zip bag)' },
                    { key: 'meds', label: '💊 Required family medical prescriptions (minimum 7-day supply)' },
                    { key: 'food', label: '🥫 Non-perishable canned food & bottled drinking water' },
                    { key: 'power', label: '🔋 Mobile power bank chargers & spare cell batteries' },
                    { key: 'light', label: '🔦 Waterproof flashlight with whistle signaling beacon' }
                  ].map(item => (
                    <label key={item.key} className="flex items-start gap-3 p-2 bg-zinc-950/20 border border-zinc-850/60 hover:bg-zinc-950/40 rounded-lg cursor-pointer transition-all">
                      <input 
                        type="checkbox" 
                        checked={survivalPack[item.key]} 
                        onChange={() => setSurvivalPack(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className="mt-0.5 rounded border-zinc-800 text-blue-600 focus:ring-blue-500" 
                      />
                      <span className={survivalPack[item.key] ? 'text-zinc-450 line-through' : 'text-zinc-200'}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>

                {Object.values(survivalPack).every(Boolean) && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-900/35 text-emerald-400 rounded-lg text-[10px] text-center font-bold font-mono animate-pulse">
                    🟢 AI ANALYSIS: EVACUATION PACK 100% READY - CORRIDOR COMPLIANT
                  </div>
                )}
              </div>

              {/* Emergency ham radio scanner */}
              <div className="bg-[#1E293B] border border-zinc-800 p-6 rounded-xl shadow-sm space-y-4 flex flex-col justify-between h-full min-h-[380px]">
                <div className="pb-2 border-b border-zinc-850 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Emergency Ham Radio Broadcast Portal</span>
                  <span className="text-[9px] bg-red-950/40 text-red-500 border border-red-900/50 px-2 py-0.5 rounded font-mono font-bold animate-pulse">Tuned: HAM_145.80</span>
                </div>
                
                {/* Scanner visualizer animation */}
                <div className="flex-1 my-2 bg-zinc-950 rounded-xl border border-zinc-850 p-4 flex flex-col justify-between font-mono text-[9px] text-emerald-500 relative overflow-hidden select-none h-44">
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgba(16,185,129,0.05)_50%,transparent_55%)] bg-[length:100%_15px] animate-[pulse_1.5s_infinite]"></div>
                  
                  <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-zinc-500">
                    <span>RECEIVER: HAM_TELANGANA</span>
                    <span>SIGNAL: S9+20dB</span>
                  </div>

                  <div className="flex-grow flex flex-col justify-center items-center py-4 space-y-1.5">
                    <span className="text-xl font-bold tracking-widest text-emerald-400 animate-pulse font-bold">145.800 MHz</span>
                    <span className="text-[8px] text-emerald-600 font-bold uppercase tracking-widest">Active Search Scanner Mode</span>
                  </div>

                  <div className="border-t border-zinc-900 pt-2 text-[8px] text-zinc-450 uppercase leading-relaxed">
                    📻 **Scanning Transcripts**: "NDRF dispatching inflatables near Godavari basin... low flow path is open... Musi water log depth at 1.4m..."
                  </div>
                </div>

                <div className="text-[10px] text-zinc-500 italic leading-normal">
                  *Emergency broadcasts are read directly from Telangana Search & Rescue radio towers. Manual transmission is restricted to operators.
                </div>
              </div>

            </div>
          )}

          {citizenTab === 'Alerts' && (
            <div className="bg-[#1E293B] border border-zinc-800 p-6 rounded-xl shadow-sm flex flex-col justify-between min-h-[380px] animate-fadeIn">
              <div className="pb-2.5 border-b border-zinc-850 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-455">Your Dispatched SOS Alerts</span>
                <span className="text-[10px] bg-zinc-950 text-zinc-500 px-2.5 py-0.5 rounded font-mono border border-zinc-800">
                  {reports.filter(r => r.name.toLowerCase().includes(currentUser.name.toLowerCase().split(' ')[0])).length} Sent
                </span>
              </div>
              
              <div className="flex-grow pt-4 space-y-3 pr-1 select-text">
                {reports.filter(r => r.name.toLowerCase().includes(currentUser.name.toLowerCase().split(' ')[0])).length === 0 ? (
                  <div className="text-center text-xs text-zinc-500 py-16 font-mono">
                    No emergency alerts sent yet. Select "Request Rescue SOS" tab to trigger alert dispatch coordinates.
                  </div>
                ) : (
                  reports
                    .filter(r => r.name.toLowerCase().includes(currentUser.name.toLowerCase().split(' ')[0]))
                    .map(r => (
                      <div key={r.id} className="p-3.5 rounded-xl border border-zinc-850 bg-zinc-950/30 flex justify-between items-center text-xs">
                        <div className="space-y-1">
                          <div className="font-bold text-zinc-200 text-sm">{r.type} Emergency</div>
                          <div className="text-[10px] text-zinc-500 font-mono">{r.description}</div>
                          <div className="text-[9px] text-blue-450 font-mono mt-1">Coordinates Node: {r.coords.x}, {r.coords.y}</div>
                        </div>
                        <span className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase font-mono border ${
                          r.status === 'Pending' 
                            ? 'bg-amber-950/40 text-amber-400 border-amber-900/35' 
                            : r.status === 'Dispatched'
                              ? 'bg-blue-950/40 text-blue-400 border-blue-900/35 animate-pulse'
                              : 'bg-emerald-950/40 text-emerald-450 border-emerald-900/35'
                        }`}>
                          {r.status}
                        </span>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex font-sans select-none antialiased">
      
      {/* 1. LEFT SIDEBAR MENU NAVIGATION */}
      <aside className="w-64 bg-[#1E293B] border-r border-zinc-800/80 shrink-0 hidden lg:flex flex-col justify-between h-screen sticky top-0">
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="px-6 py-5 border-b border-zinc-850 flex items-center gap-2.5">
            <SentinelLogo size={36} showText={false} className="shrink-0" />
            <div>
              <span className="font-extrabold tracking-wider text-sm font-sans uppercase bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                Sentinel
              </span>
              <div className="text-[9px] font-bold text-[#10B981] tracking-widest font-mono uppercase mt-0.5">COMMAND NODE</div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1">
            {[
              { id: 'Dashboard', name: t('tabDashboard'), icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'Live Tracking', name: t('tabLiveTracking'), icon: <Navigation className="w-4 h-4 animate-pulse" /> },
              { id: 'Incidents', name: t('tabIncidents'), icon: <AlertTriangle className="w-4 h-4" /> },
              { id: 'AI Detection', name: t('tabAiDetection'), icon: <Eye className="w-4 h-4" /> },
              { id: 'Resources', name: t('tabResources'), icon: <Shield className="w-4 h-4" /> },
              { id: 'Analytics', name: t('tabAnalytics'), icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'Sandbox', name: t('tabSandbox'), icon: <Bot className="w-4 h-4 animate-pulse" /> },
              { id: 'Settings', name: t('tabSettings'), icon: <Settings className="w-4 h-4" /> }
            ].map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActivePage(item.id);
                    setSelectedItem(null);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Session profile controls footer */}
        <div className="p-4 border-t border-zinc-850 bg-[#151f30]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs font-mono">
              {currentUser.role[0]}
            </div>
            <div className="text-left select-text">
              <div className="text-xs font-bold text-zinc-100">{currentUser.name.split(' ').slice(-1)[0]}</div>
              <div className="text-[9px] text-zinc-500 font-mono mt-0.5">{currentUser.role}</div>
            </div>
          </div>
          <button
            onClick={() => setCurrentUser(null)}
            className="p-2 rounded-lg text-zinc-500 hover:text-red-400 transition-colors hover:bg-red-950/20"
            title="Disconnect portal session"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN HEADER & ROUTING LAYOUT CONTAINER */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden bg-[#0F172A]">
        
        {/* Header Bar */}
        <header className="bg-[#1E293B] border-b border-zinc-800/80 px-6 py-4 flex justify-between items-center h-16 shrink-0 z-10 shadow-sm">
          {/* Left search/logo */}
          <div className="flex items-center gap-4">
            <div className="relative w-48 sm:w-64 md:w-80">
              <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search Location or Coordinates..."
                className="w-full bg-[#0F172A] border border-zinc-800 rounded-lg pl-9 pr-4 py-1.5 text-[11px] text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Header Status Widgets */}
          <div className="flex items-center gap-4 text-xs">
            {/* Language Selector */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-zinc-950/60 border border-zinc-800 rounded-lg px-2 py-1 text-[10px] font-bold text-zinc-350 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono tracking-wider cursor-pointer"
            >
              <option value="en">🇺🇸 EN</option>
              <option value="te">🇮🇳 తె</option>
              <option value="hi">🇮🇳 हि</option>
              <option value="es">🇪🇸 ES</option>
            </select>

            {/* Siren Broadcast Button */}
            <button
              onClick={playEmergencySiren}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold font-mono transition-all ${
                isSirenActive 
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.6)]' 
                  : 'bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/50 shadow-[0_0_8px_rgba(239,68,68,0.2)]'
              }`}
            >
              {isSirenActive ? (
                <>
                  <X className="w-3 h-3 animate-spin" />
                  <span>STOP_ALERT</span>
                </>
              ) : (
                <>
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>{t('sirenAlert')}</span>
                </>
              )}
            </button>

            {/* Doppler Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-[#0F172A] border border-zinc-850 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-emerald-500">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span>DOPPLER_ONLINE</span>
            </div>

            {/* Notifications panel */}
            <div className="relative cursor-pointer p-2 rounded-lg bg-[#0F172A] hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-850 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#1E293B] animate-pulse"></span>
            </div>

            {/* Mobile menu toggle (fallback representation) */}
            <div className="flex items-center gap-1 bg-zinc-950 px-2 py-1 rounded text-zinc-500 font-mono text-[9px] uppercase tracking-wider">
              {currentUser.role} Control
            </div>
          </div>
        </header>

        {/* 3. DYNAMIC CONTENT AREA */}
        <main className="flex-grow overflow-y-auto p-6 space-y-6">

          {/* ========================================== */}
          {/* VIEW A: DASHBOARD VIEW                    */}
          {/* ========================================== */}
          {activePage === 'Dashboard' && (
            <div className="space-y-6">
              {/* Weather Telemetry Advisory */}
              {renderWeatherReport(false)}
              
              {/* Summary KPI Hackathon Cards */}
              <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-[#1E293B] border border-zinc-800 p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">🔥 Active Fires</span>
                  <div className="text-xl font-extrabold text-orange-500 mt-2 font-mono">12</div>
                  <span className="text-[9px] text-zinc-500 block mt-1">Thermal sweeps</span>
                </div>
                <div className="bg-[#1E293B] border border-zinc-800 p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">🌊 Floods Detected</span>
                  <div className="text-xl font-extrabold text-blue-500 mt-2 font-mono">6</div>
                  <span className="text-[9px] text-zinc-500 block mt-1">Sagar & Musi basins</span>
                </div>
                <div className="bg-[#1E293B] border border-zinc-800 p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">🌪 Cyclones Active</span>
                  <div className="text-xl font-extrabold text-rose-500 mt-2 font-mono">2</div>
                  <span className="text-[9px] text-zinc-500 block mt-1">Bay warning index</span>
                </div>
                <div className="bg-[#1E293B] border border-zinc-800 p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">👥 People Rescued</span>
                  <div className="text-xl font-extrabold text-emerald-500 mt-2 font-mono">1,245</div>
                  <span className="text-[9px] text-zinc-500 block mt-1">OR-Tools optimized</span>
                </div>
                <div className="bg-[#1E293B] border border-zinc-800 p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">🚑 Ambulances Free</span>
                  <div className="text-xl font-extrabold text-cyan-500 mt-2 font-mono">34</div>
                  <span className="text-[9px] text-zinc-500 block mt-1">Live status ready</span>
                </div>
                <div className="bg-[#1E293B] border border-zinc-800 p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">🚁 Active Drones</span>
                  <div className="text-xl font-extrabold text-purple-500 mt-2 font-mono">8</div>
                  <span className="text-[9px] text-zinc-500 block mt-1">Scanning corridors</span>
                </div>
              </section>

              {/* Map & Copilot sidebar */}
              <section className="flex flex-col lg:flex-row gap-6">
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 h-[580px] overflow-y-auto">
                  <Responders 
                    responders={responders}
                    reports={reports}
                    onUpdateResponder={handleUpdateResponder}
                    defaultRoleTab={currentUser.role}
                  />
                  <Telemetry 
                    rainRate={rainRate}
                    sectors={sectors}
                  />
                </div>
                <div className="w-full lg:w-[380px] shrink-0">
                  {selectedItem ? (
                    /* Detailed Inspection drawer */
                    <div className="bg-[#1E293B] border border-zinc-850 rounded-xl overflow-hidden shadow-md h-[580px] flex flex-col justify-between">
                      <div className="px-4 py-3 border-b border-zinc-800 bg-[#162030]/50 flex justify-between items-center text-xs font-bold text-zinc-400">
                        <span>Explainable AI Insights</span>
                        <button onClick={() => setSelectedItem(null)} className="p-1 hover:bg-zinc-800 rounded">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-4 select-text">
                        {selectedItem.type === 'sector' && (
                          <div className="space-y-3">
                            <h3 className="text-sm font-bold text-zinc-100">{selectedItem.data.name}</h3>
                            <div className="p-2.5 bg-zinc-950 rounded-lg text-[10px] font-mono space-y-1">
                              <div>• AI Confidence: <span className="text-blue-400">92%</span></div>
                              <div>• Flood Probability: <span className="text-blue-400">84%</span></div>
                              <div>• Est. Population: <span className="text-blue-400">{selectedItem.data.population}</span></div>
                            </div>
                            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs leading-relaxed text-zinc-400">
                              Sector elevation maps indicate a low basin. Evacuation corridors are active near Khammam Stadium Safe Zone.
                            </div>
                          </div>
                        )}
                        {selectedItem.type === 'report' && (
                          <div className="space-y-3">
                            <h3 className="text-sm font-bold text-rose-500">{selectedItem.data.type} Call</h3>
                            <div className="p-2.5 bg-zinc-950 rounded-lg text-[10px] font-mono space-y-1">
                              <div>• Reported by: {selectedItem.data.name}</div>
                              <div>• Priority Index: <span className="text-rose-500">92/100</span></div>
                              <div>• Status: {selectedItem.data.status}</div>
                            </div>
                            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs leading-relaxed text-zinc-400">
                              "{selectedItem.data.description}"
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4 border-t border-zinc-800 bg-[#162030]/20">
                        <button onClick={() => setSelectedItem(null)} className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-white font-bold text-xs py-2 rounded-xl transition-colors">
                          Back to Copilot
                        </button>
                      </div>
                    </div>
                  ) : (
                    <ChatCopilot 
                      sectors={sectors}
                      shelters={shelters}
                      hospitals={hospitals}
                      responders={responders}
                      reports={reports}
                      roads={roads}
                      weatherCondition={weatherCondition}
                      rainRate={rainRate}
                      savedCount={savedCount}
                    />
                  )}
                </div>
              </section>

              {/* Automatic Doppler telemetry & self-updating timeline */}
              <section>
                {/* Automatic Doppler Weather Station & Predictive Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Weather Doppler Radar Intel */}
                  <div className="bg-[#1E293B] border border-zinc-800 p-4 rounded-xl shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start pb-2.5 border-b border-zinc-800">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                          Doppler Radar Weather Intelligence
                        </h3>
                        <span className="text-[9px] text-zinc-500 font-medium">Automatic Scanning: Active (IMD Feed Sync)</span>
                      </div>
                      
                      {/* Radar pulse animation */}
                      <div className="w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center relative overflow-hidden shrink-0 bg-blue-500/5">
                        <div className="absolute inset-0 border border-blue-500/10 rounded-full animate-[ping_1.8s_infinite]"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-3 text-xs font-mono">
                      <div className="p-2.5 bg-zinc-950 rounded-lg">
                        <span className="text-[10px] text-zinc-500 block mb-0.5">Precipitation</span>
                        <span className="text-sm font-bold text-blue-500">{rainRate} mm/hr</span>
                      </div>
                      <div className="p-2.5 bg-zinc-950 rounded-lg">
                        <span className="text-[10px] text-zinc-500 block mb-0.5">Wind Velocity</span>
                        <span className="text-sm font-bold text-zinc-300">
                          {rainRate === 0 ? '8' : rainRate < 10 ? '14' : rainRate < 25 ? '24' : '36'} km/h
                        </span>
                      </div>
                      <div className="p-2.5 bg-zinc-950 rounded-lg">
                        <span className="text-[10px] text-zinc-500 block mb-0.5">Saturations</span>
                        <span className="text-sm font-bold text-zinc-300">
                          {rainRate === 0 ? '12%' : rainRate < 10 ? '42%' : rainRate < 25 ? '78%' : '94%'}
                        </span>
                      </div>
                      <div className="p-2.5 bg-zinc-950 rounded-lg">
                        <span className="text-[10px] text-zinc-500 block mb-0.5">Status</span>
                        <span className="text-sm font-bold text-emerald-500">Auto-Tracking</span>
                      </div>
                    </div>
                    
                    <p className="text-[10px] text-zinc-500 leading-normal bg-zinc-950/40 p-2 rounded-lg italic">
                      *Weather intelligence scanner receives Doppler telemetry packages from IMD API automatically. Manual simulation controls are locked.
                    </p>
                  </div>

                  {/* AI Predictive Flood Timeline List */}
                  <div className="bg-[#1E293B] border border-zinc-800 p-4 rounded-xl shadow-sm flex flex-col justify-between">
                    <div className="pb-2.5 border-b border-zinc-800 flex justify-between items-center">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                          AI Predictive Flood Timeline (Self-Updating)
                        </h3>
                        <span className="text-[9px] text-zinc-500 font-medium">Digital Twin: Auto-Simulating | Frame: T + {predictionHour}h</span>
                      </div>
                      <span className="text-[10px] bg-blue-950/40 text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded font-mono font-bold animate-pulse">
                        LIVE TIMELINE
                      </span>
                    </div>

                    {/* List entries */}
                    <div className="space-y-2 py-3 overflow-y-auto max-h-[140px]">
                      <div className="flex justify-between items-center text-xs p-1.5 rounded bg-zinc-950/30 border border-zinc-850">
                        <span className="font-semibold font-mono">T + 0 min</span>
                        <span className="text-[10px] text-zinc-500">Baseline Hydrology</span>
                        <span className="text-[10px] font-bold text-emerald-500 font-mono">Safe</span>
                      </div>
                      <div className="flex justify-between items-center text-xs p-1.5 rounded bg-zinc-950/30 border border-zinc-850">
                        <span className="font-semibold font-mono">T + 20 min</span>
                        <span className="text-[10px] text-zinc-500">Low Flood Risk (Alerts Active)</span>
                        <span className={`text-[10px] font-bold font-mono ${rainRate > 5 ? 'text-amber-500' : 'text-zinc-500'}`}>
                          {rainRate > 5 ? 'Active Risk' : 'Standby'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs p-1.5 rounded bg-zinc-950/30 border border-zinc-850">
                        <span className="font-semibold font-mono">T + 45 min</span>
                        <span className="text-[10px] text-zinc-500">Roads Begin Flooding (Rerouting)</span>
                        <span className={`text-[10px] font-bold font-mono ${rainRate > 15 ? 'text-amber-500' : 'text-zinc-500'}`}>
                          {rainRate > 15 ? 'Flooding' : 'Standby'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs p-1.5 rounded bg-zinc-950/30 border border-zinc-850">
                        <span className="font-semibold font-mono">T + 1 hr</span>
                        <span className="text-[10px] text-zinc-500">Residential Areas Impacted</span>
                        <span className={`text-[10px] font-bold font-mono ${rainRate > 25 ? 'text-rose-500 animate-pulse' : 'text-zinc-500'}`}>
                          {rainRate > 25 ? 'Evacuations' : 'Standby'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs p-1.5 rounded bg-zinc-950/30 border border-zinc-850">
                        <span className="font-semibold font-mono">T + 1.5 hr</span>
                        <span className="text-[10px] text-zinc-500">Hospital Entrance Blocked</span>
                        <span className={`text-[10px] font-bold font-mono ${rainRate > 30 ? 'text-red-500 animate-pulse' : 'text-zinc-500'}`}>
                          {rainRate > 30 ? 'Critical block' : 'Standby'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW G: LIVE GPS GOOGLE MAPS TRACKING VIEW */}
          {/* ========================================== */}
          {activePage === 'Live Tracking' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* GPS coordinates ticker board */}
                <div className="xl:col-span-1 bg-[#1E293B] border border-zinc-800 p-4 rounded-xl flex flex-col justify-between h-[520px]">
                  <div className="pb-2.5 border-b border-zinc-800 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">GPS Fleet Tracking Feed</span>
                      <span className="text-[9px] text-zinc-500 block mt-0.5">Real-time coordinates telemetry.</span>
                    </div>
                    <span className="text-[9px] bg-blue-950/40 text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded font-mono font-bold animate-pulse">
                      LIVE TRACKING
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto py-3 space-y-3 pr-1 font-mono text-[10px]">
                    {responders.map(r => {
                      const lat = (17.3850 + (300 - r.coords.y) * 0.0006).toFixed(5);
                      const lng = (78.4867 + (r.coords.x - 400) * 0.0006).toFixed(5);
                      const isMoving = r.status === 'Dispatched';
                      
                      return (
                        <div key={r.id} className="p-3 bg-zinc-950/40 border border-zinc-800 rounded-xl space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-zinc-200">{r.name}</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                              isMoving ? 'bg-blue-950/50 text-blue-400 border border-blue-900/40 animate-pulse' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                            }`}>
                              {isMoving ? '📡 Moving' : 'Standby'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-zinc-455">
                            <div>Lat: <span className="text-blue-400 font-bold">{lat}° N</span></div>
                            <div>Lng: <span className="text-blue-400 font-bold">{lng}° E</span></div>
                          </div>
                          
                          {isMoving && r.targetCoords && (
                            <div className="text-[9px] text-zinc-500 leading-normal border-t border-zinc-900/60 pt-1">
                              • Heading to coordinate target node. Dispatch delay 0.0s.
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Google Maps Live Iframe Embed */}
                <div className="xl:col-span-2 bg-[#1E293B] border border-zinc-800 rounded-xl p-4 h-[520px] flex flex-col justify-between">
                  <div className="pb-2.5 border-b border-zinc-800 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Google Maps Live Tracking Portal</span>
                    <span className="text-[9px] bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded font-mono">
                      ONLINE - HYD_CENTRAL
                    </span>
                  </div>

                  <div className="flex-1 my-3 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-850">
                    <iframe 
                      src="https://maps.google.com/maps?q=17.3850,78.4867&z=12&output=embed" 
                      className="w-full h-full border-none opacity-85 hover:opacity-100 transition-opacity" 
                      title="Google Maps Live Feed"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-1">
                    <span className="text-[9.5px] text-zinc-500 italic block select-text">
                      *Google Maps coordinates sync with live mobile GPS cell towers. Click on the map directly to explore areas.
                    </span>
                    <button 
                      onClick={() => openExternalMap(17.3850, 78.4867)}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9.5px] px-3.5 py-1.5 rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 uppercase font-mono tracking-wider select-none border border-blue-500/20 shrink-0 cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5 animate-pulse" />
                      Open Maps Mobile App
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW B: INCIDENT MANAGEMENT VIEW           */}
          {/* ========================================== */}
          {activePage === 'Incidents' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                
                {/* Incidents checklist with dispatch action */}
                <div className="bg-[#1E293B] border border-zinc-850 p-4 rounded-xl flex flex-col justify-between h-[360px] overflow-y-auto">
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Active Emergency Incident Queue</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={triggerAIOptimization}
                        disabled={isOptimizing}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-1 rounded transition-all shadow-[0_0_8px_rgba(37,99,235,0.3)] disabled:opacity-50"
                      >
                        {isOptimizing ? 'Optimizing...' : '⚡ OR-Tools Auto-Route'}
                      </button>
                      <span className="text-[9px] bg-red-950/40 text-red-500 border border-red-900/50 px-2 py-0.5 rounded font-mono font-bold animate-pulse">
                        {reports.filter(r => r.status !== 'Resolved').length} ACTIVE
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pt-3 space-y-3 pr-1 select-text">
                    {reports.map((rep) => (
                      <div key={rep.id} className="p-3 bg-zinc-950/40 border border-zinc-800/80 rounded-xl space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded font-mono uppercase mr-2 ${
                              rep.severity === 'Critical' ? 'bg-red-950 text-red-400 border border-red-900/50' : 'bg-amber-950 text-amber-400 border border-amber-900/40'
                            }`}>
                              {rep.severity}
                            </span>
                            <span className="text-xs font-extrabold text-zinc-100">{rep.type}</span>
                            <span className="text-[10px] text-zinc-500 block mt-0.5 font-semibold">Location: {rep.sector_id.toUpperCase()}</span>
                          </div>
                          
                          {/* Dispatch select menu */}
                          {rep.status === 'Pending' ? (
                            <select
                              onChange={(e) => {
                                const responderId = e.target.value;
                                if (responderId) handleUpdateResponder(responderId, 'Dispatched', rep.id, rep.coords);
                              }}
                              className="bg-blue-600/10 border border-blue-500/25 rounded px-2 py-1 text-[9px] font-bold text-blue-400 cursor-pointer focus:outline-none"
                            >
                              <option value="">⚡ Dispatch Agent...</option>
                              {responders.filter(r => r.status === 'Idle').map(r => (
                                <option key={r.id} value={r.id}>{r.name} ({r.type})</option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-[9px] bg-blue-950/40 text-blue-400 border border-blue-900/40 px-2 py-0.5 rounded font-bold uppercase font-mono">
                              {rep.status}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-zinc-400 leading-normal">"{rep.description}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Volunteer matched portal */}
                <Volunteers sectors={sectors} reports={reports} clickedMapCoords={clickedMapCoords} />
              </div>

              {/* AI Multi-Agent Coordination Mesh terminal console logs */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block pl-1">AI incident command inter-agent collaboration mesh</span>
                <AgentsConsole reports={reports} />
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW C: AI DETECTION VIEW (HACKATHON FOCUS)*/}
          {/* ========================================== */}
          {activePage === 'AI Detection' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Simulated Drone Camera Feed with YOLO boxes overlay */}
                <div className="bg-[#1E293B] border border-zinc-800 rounded-xl p-4 flex flex-col justify-between h-[380px]">
                  <div className="flex justify-between items-center pb-2.5 border-b border-zinc-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></span>
                      Drone Surveillance Feed (YOLOv8 Segmentation)
                    </span>
                    <button
                      onClick={handleDroneScan}
                      disabled={isScanningDrone}
                      className="text-[9.5px] bg-purple-600 hover:bg-purple-700 text-white border border-purple-500/35 px-2.5 py-1 rounded font-bold uppercase tracking-wider font-mono transition-all disabled:opacity-50"
                    >
                      {isScanningDrone ? 'SCANNING...' : '📸 CAPTURE & SCAN'}
                    </button>
                  </div>

                  {/* YOLO canvas mock overlay */}
                  <div className="flex-grow bg-zinc-950 rounded-lg my-3 border border-zinc-850 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-cover bg-center opacity-40"></div>
                    <div className="absolute inset-0 border border-purple-500/20 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent"></div>
                    
                    {/* Bounding box graphics */}
                    <div className="absolute top-1/4 left-1/3 border-2 border-yellow-500 rounded p-1 text-[8px] font-bold text-yellow-500 font-mono animate-pulse">
                      [ROOF_TRAPPED 91% CONF]
                    </div>
                    <div className="absolute bottom-1/4 right-1/4 border-2 border-red-500 rounded p-1 text-[8px] font-bold text-red-500 font-mono animate-pulse">
                      [STRUCTURAL_COLLAPSE 94% CONF]
                    </div>

                    <div className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-md px-2 py-1 rounded text-[9px] font-mono text-zinc-400 border border-zinc-800">
                      CAM_GRID: DS-04 | ALT: 120m
                    </div>

                    {isScanningDrone && (
                      <div className="absolute inset-x-0 h-1 bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)] animate-[scanLine_1.5s_infinite_linear] z-20"></div>
                    )}

                    <div className="text-center space-y-2 z-10 p-4">
                      <Bot className={`w-8 h-8 text-purple-500 mx-auto ${isScanningDrone ? 'animate-spin' : 'animate-bounce'}`} />
                      <div className="text-xs font-bold text-zinc-300">Live Aerial CV Change Detection Feed</div>
                      <div className="text-[10px] text-zinc-550 font-mono">
                        {isScanningDrone ? 'Scanning raster telemetry cells...' : 'System status normal - ready to scan.'}
                      </div>
                    </div>
                  </div>

                  <div className="text-[9.5px] font-mono text-zinc-500 select-text leading-normal">
                    {droneScanResults ? (
                      <span className="text-purple-400 font-bold">✔ {droneScanResults}</span>
                    ) : (
                      <span>*Computer vision automatically scans and segments video packets, reporting trapped citizens.</span>
                    )}
                  </div>
                </div>

                {/* Satellite Image change detection verification */}
                <div className="bg-[#1E293B] border border-zinc-800 rounded-xl p-4 flex flex-col justify-between h-[380px]">
                  <div className="flex justify-between items-start pb-2.5 border-b border-zinc-800">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Satellite Change Detection (Segment Anything Model)</span>
                      <span className="text-[9px] text-zinc-500 block mt-0.5">Sentinel-2 & Landsat bands compared automatically.</span>
                    </div>
                    <span className="text-[9px] bg-blue-950/40 text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded font-mono font-bold">
                      SAM ENGINE
                    </span>
                  </div>

                  {/* Segment Anything Mock graphic */}
                  <div className="flex-1 bg-zinc-950 rounded-lg my-3 border border-zinc-850 relative overflow-hidden flex flex-col justify-between p-4 font-mono text-[10px] text-zinc-400 select-text">
                    <div className="border-b border-zinc-900 pb-2 flex justify-between items-center text-zinc-500">
                      <span>MODEL_INFERENCE: ViT_Geospatial</span>
                      <span className="text-emerald-500">Consensus Achieved</span>
                    </div>
                    
                    <div className="space-y-1.5 my-2">
                      <div>• Detected change type: <span className="text-blue-400">Flood Boundary Expansion</span></div>
                      <div>• Boundary flow speed: <span className="text-blue-400">1.8 m/s</span></div>
                      <div>• Estimated flood boundary: <span className="text-blue-400">Musi River Basin banks (+0.8m)</span></div>
                      <div>• Infrastructure impact: <span className="text-red-400 font-bold">Osmania hospital entry flooded</span></div>
                      <div>• Population at risk: <span className="text-blue-400">18,500 citizens in Nalgonda/Khammam</span></div>
                    </div>

                    <div className="p-2.5 bg-zinc-900 rounded-lg text-xs leading-normal">
                      💡 **AI Recommendation**: Dispatch 2 rescue boats immediately to Musi basin bank coordinates. Update public alert notifications for Khammam/Nalgonda mobile cells.
                    </div>
                  </div>

                  <span className="text-[9.5px] text-zinc-500 italic block">
                    *Satellite segmentation updates the Digital Twin continuously. No manual triggers required.
                  </span>
                </div>

              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW D: RESOURCE MANAGEMENT VIEW           */}
          {/* ========================================== */}
          {activePage === 'Resources' && (
            <div className="space-y-6">
              
              {/* Detailed Lists of emergency resources */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Responders Asset checklist */}
                <div className="bg-[#1E293B] border border-zinc-850 p-4 rounded-xl flex flex-col justify-between h-[420px] overflow-y-auto">
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Emergency Dispatched Assets Inventory</span>
                    <span className="text-[10px] bg-zinc-950 text-zinc-500 px-2 py-0.5 rounded font-mono">
                      {responders.length} units
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto pt-3 space-y-2.5 pr-1">
                    {responders.map((res) => (
                      <div key={res.id} className="p-3 bg-zinc-950/40 border border-zinc-800/80 rounded-xl flex justify-between items-center text-xs">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-zinc-500 font-bold">[{res.id.toUpperCase()}]</span>
                            <span className="font-extrabold text-zinc-100">{res.name}</span>
                          </div>
                          <div className="text-[9.5px] text-zinc-400 font-mono mt-0.5">
                            Type: <span className="font-bold">{res.type}</span> | Coords: X:{res.coords.x} Y:{res.coords.y}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {res.battery !== undefined && (
                            <span className={`text-[10px] font-bold font-mono ${res.battery < 20 ? 'text-red-500 animate-pulse' : 'text-zinc-400'}`}>
                              🔋 {res.battery}%
                            </span>
                          )}
                          <span className={`text-[9px] px-2.5 py-0.5 rounded font-bold uppercase font-mono border ${
                            res.status === 'Idle' 
                              ? 'bg-zinc-950 text-zinc-500 border-zinc-800' 
                              : 'bg-blue-950/40 text-blue-400 border-blue-900/40 animate-pulse'
                          }`}>
                            {res.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medical Supplies inventory statistics */}
                <div className="bg-[#1E293B] border border-zinc-850 p-4 rounded-xl flex flex-col justify-between h-[420px] overflow-y-auto">
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-800 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Medical supplies & logistics index</span>
                    <span className="text-[10px] bg-zinc-950 text-zinc-500 px-2 py-0.5 rounded font-mono">
                      Stock: 92%
                    </span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3">
                    <div className="p-3 bg-zinc-950/35 border border-zinc-850 rounded-xl space-y-1.5">
                      <div className="flex justify-between text-xs text-zinc-300 font-bold">
                        <span>📦 Emergency Food Kits</span>
                        <span className="font-mono">12,850 / 15,000 units</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: '85.6%' }}></div>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-950/35 border border-zinc-850 rounded-xl space-y-1.5">
                      <div className="flex justify-between text-xs text-zinc-300 font-bold">
                        <span>💊 Critical Medical Supplies</span>
                        <span className="font-mono">4,210 / 5,000 units</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84.2%' }}></div>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-950/35 border border-zinc-850 rounded-xl space-y-1.5">
                      <div className="flex justify-between text-xs text-zinc-300 font-bold">
                        <span>⛺ Inflatable Shelters & Tents</span>
                        <span className="font-mono">82 / 100 units</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                  </div>

                  <span className="text-[9.5px] text-zinc-500 italic block mt-3">
                    *Logistics stock levels synchronizing with local edge database nodes. Critical alert generated when inventory falls below 20%.
                  </span>
                </div>

              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW E: ANALYTICS VIEW                    */}
          {/* ========================================== */}
          {activePage === 'Analytics' && (
            <div className="space-y-6">
              {/* Renders our beautiful custom Analytics component */}
              <Analytics sectors={sectors} savedCount={savedCount} reports={reports} />
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: DIGITAL TWIN SANDBOX                 */}
          {/* ========================================== */}
          {activePage === 'Sandbox' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Top Row: Simulation Config Controls */}
              <div className="bg-[#1E293B] border border-zinc-800 p-6 rounded-xl shadow-sm space-y-4">
                <div className="pb-2.5 border-b border-zinc-850 flex justify-between items-center">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Tactical Disaster Prediction Sandbox</h3>
                    <p className="text-[10px] text-zinc-550 mt-0.5">Simulate severe climate parameters to calculate hydrological runoff and road flooding.</p>
                  </div>
                  <span className="text-[9px] bg-blue-950/40 text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded font-mono font-bold animate-pulse">
                    DIGITAL TWIN ONLINE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Slider 1: Rain Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-350">Precipitation Rate:</span>
                      <span className="font-extrabold text-blue-400">{rainRate} mm/hr</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="45" 
                      value={rainRate} 
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setRainRate(val);
                        handleRainRateChange(val);
                      }}
                      className="w-full h-1 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                    <div className="flex gap-1.5 pt-1.5">
                      <button onClick={() => { setRainRate(0); handleRainRateChange(0); }} className="px-2 py-1 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 rounded text-[9px] text-zinc-400 uppercase font-bold font-mono">Clear</button>
                      <button onClick={() => { setRainRate(18); handleRainRateChange(18); }} className="px-2 py-1 bg-amber-600/10 hover:bg-amber-600/20 border border-amber-500/20 rounded text-[9px] text-amber-400 uppercase font-bold font-mono">Storm</button>
                      <button onClick={() => { setRainRate(35); handleRainRateChange(35); }} className="px-2 py-1 bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 rounded text-[9px] text-red-450 uppercase font-bold font-mono">Cloudburst</button>
                    </div>
                  </div>

                  {/* Slider 2: Prediction Hour */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-350">Accumulation Frame:</span>
                      <span className="font-extrabold text-purple-400">T + {predictionHour} hours</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="6" 
                      step="0.5"
                      value={predictionHour} 
                      onChange={(e) => setPredictionHour(parseFloat(e.target.value))}
                      className="w-full h-1 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-purple-600" 
                    />
                    <p className="text-[9.5px] text-zinc-550 italic leading-snug">
                      Simulates prolonged rainfall to calculate saturation decay levels.
                    </p>
                  </div>

                  {/* Slider 3: Wind Speeds */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-350">Cyclone Wind Speed:</span>
                      <span className="font-extrabold text-orange-400">{simWindSpeed} km/h</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="110" 
                      value={simWindSpeed} 
                      onChange={(e) => setSimWindSpeed(parseInt(e.target.value))}
                      className="w-full h-1 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-orange-500" 
                    />
                    <p className="text-[9.5px] text-zinc-550 leading-snug">
                      *Speeds above 65 km/h trigger drone auto-recall warning parameters.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Flow canvas and impact indicators */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 2D Contour flow simulator */}
                <div className="bg-[#1E293B] border border-zinc-800 p-4 rounded-xl flex flex-col justify-between h-[340px]">
                  <div className="pb-2 border-b border-zinc-850 flex justify-between items-center mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">2D Hydrological Runoff Digital Twin Flow Map</span>
                    <span className="text-[9px] bg-blue-950/40 text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded font-mono font-bold animate-pulse">
                      60FPS_FLOW
                    </span>
                  </div>
                  
                  <div className="flex-grow flex items-center justify-center p-2">
                    <HydrologySimulatorCanvas rainRate={rainRate} predictionHour={predictionHour} />
                  </div>
                </div>

                {/* Flood Severity Indicators & Impact reports */}
                <div className="bg-[#1E293B] border border-zinc-800 p-4 rounded-xl flex flex-col justify-between h-[340px] overflow-y-auto">
                  <div className="pb-2 border-b border-zinc-850 flex justify-between items-center mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">AI Calculated Flood Impact Audit</span>
                    <span className="text-[9px] bg-red-950/40 text-red-500 border border-red-900/50 px-2 py-0.5 rounded font-mono font-bold">
                      HYD_IMPACT
                    </span>
                  </div>

                  <div className="flex-grow space-y-3 text-[11px] font-mono">
                    <div className="p-3 bg-zinc-950/50 border border-zinc-850 rounded-xl space-y-2">
                      <div className="flex justify-between text-xs font-bold border-b border-zinc-900 pb-1.5">
                        <span className="text-zinc-200">METRIC ANALYSIS</span>
                        <span className="text-zinc-400">VAL</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Musi River Level Depth:</span>
                        <span className={`font-extrabold ${(rainRate * 0.12) >= 2.8 ? 'text-red-400 animate-pulse' : 'text-zinc-200'}`}>
                          {(rainRate * 0.12).toFixed(2)} meters
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Predicted Evacuees:</span>
                        <span className="text-zinc-200">{Math.round(rainRate * 18 * (1 + predictionHour * 0.4))} citizens</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Highways Blocked:</span>
                        <span className={`font-extrabold ${rainRate > 15 ? 'text-red-400' : 'text-emerald-400'}`}>
                          {rainRate > 15 ? '3 Closed (Musi Basin)' : '0 (Clear)'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Cyclone Storm State:</span>
                        <span className={`font-extrabold ${simWindSpeed > 65 ? 'text-amber-400 animate-pulse' : 'text-zinc-400'}`}>
                          {simWindSpeed > 65 ? 'WIND BEACON ALERT' : 'NORMAL WIND'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-zinc-950/20 border border-zinc-850 rounded-xl p-3 text-[10px] leading-relaxed text-zinc-400 font-sans">
                      💡 **Simulation Insight**: {rainRate === 0 ? (
                        <span>System registers clear weather conditions. High-elevation runoff channel Madhapur (600m) is dry. Musi basin shows baseline flow (0.0m).</span>
                      ) : rainRate < 15 ? (
                        <span>Light storm rainfall is active. Madhapur (600m) drainage grids are handling runoff capacity. Minor cautions near low river banks.</span>
                      ) : (
                        <span className="text-red-400 font-medium">⚠️ Severe precipitation cloudburst simulated! Madhapur (600m) runoff channels are oversaturated, sending gravity-fed water cascading down to low-lying Musi Basin (80m). Initiate immediate NDRF alerts!</span>
                      )}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================== */}
          {/* VIEW F: SYSTEM SETTINGS VIEW               */}
          {/* ========================================== */}
          {activePage === 'Settings' && (
            <div className="space-y-6">
              <div className="bg-[#1E293B] border border-zinc-850 p-6 rounded-xl space-y-6 max-w-2xl">
                <div className="space-y-1.5 border-b border-zinc-800 pb-3">
                  <h3 className="text-sm font-extrabold text-zinc-100 uppercase tracking-wider">Sentinel System Settings</h3>
                  <p className="text-xs text-zinc-400">Configure real-time telemetry, Doppler radar parameters, and system thresholds.</p>
                </div>

                <div className="space-y-4">
                  {/* Dark Mode toggle */}
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <div className="font-bold text-zinc-200">Force Dark Slate Theme</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Enforces dark slate command deck palette for better visibility.</div>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="px-3.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-300"
                    >
                      {darkMode ? 'ON (Slate)' : 'OFF (Light)'}
                    </button>
                  </div>

                  {/* Telemetry Refresh slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-zinc-200 font-sans">Doppler Radar Refresh Rate</span>
                      <span className="text-blue-500 font-mono">1.0s (Live)</span>
                    </div>
                    <input type="range" min="1" max="10" defaultValue="1" className="w-full h-1 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  </div>

                  {/* Local Session cache clear */}
                  <div className="flex justify-between items-center text-xs pt-2.5 border-t border-zinc-800">
                    <div>
                      <div className="font-bold text-zinc-200">Clean Local Session Cache</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Clears registered users list and resets defaults.</div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-red-950/20 hover:bg-red-950/40 border border-red-900/35 text-red-400 font-bold text-xs">
                      Clear Cache
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
