import React, { useState } from 'react';
import { Shield, Radio, Lock, Mail, Terminal, Sparkles, User, UserPlus, Key, Phone } from 'lucide-react';
import SentinelLogo from './SentinelLogo';

export default function Login({ onLogin, initialSignUp = false, onBackToLanding, lang = 'en', setLang, t }) {
  const [portalType, setPortalType] = useState('Responder'); // 'Responder' or 'Citizen'
  const [isSignUp, setIsSignUp] = useState(initialSignUp);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  
  // Sign In states
  const [email, setEmail] = useState('admin@hyd.disaster.gov');
  const [password, setPassword] = useState('123456');
  
  // Sign Up states (Shared & Role Specific)
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpRole, setSignUpRole] = useState('Admin');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Local database of registered users (Responders & Citizens)
  const [registeredUsers, setRegisteredUsers] = useState([
    { email: 'admin@hyd.disaster.gov', password: '123456', role: 'Admin', name: 'Commander Srinivas', phone: '+91 90000 12345' },
    { email: 'drone.operator@hyd.disaster.gov', password: '123456', role: 'Drone', name: 'Aerial Drone Operator', phone: '+91 98480 22338' },
    { email: 'citizen@gmail.com', password: '123', role: 'Citizen', name: 'Ravi Kumar', phone: '+91 99890 55432' }
  ]);

  const handlePortalSwitch = (type) => {
    setPortalType(type);
    setIsSignUp(false);
    setIsForgotPassword(false);
    setError('');
    setSuccessMsg('');
    
    // Pre-populate standard testing logins
    if (type === 'Responder') {
      setEmail('admin@hyd.disaster.gov');
      setPassword('123456');
    } else {
      setEmail('citizen@gmail.com');
      setPassword('123');
    }
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const user = registeredUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase().trim()
      );

      if (!user) {
        setError('No record found with this email. Please Sign Up first.');
        setIsLoading(false);
        return;
      }

      // Check portal type compatibility
      if (portalType === 'Responder' && user.role === 'Citizen') {
        setError('Citizen credentials cannot be used to access the Responder Command Node.');
        setIsLoading(false);
        return;
      }
      if (portalType === 'Citizen' && user.role !== 'Citizen') {
        setError('Responder credentials cannot be used to access the Citizen SOS Portal.');
        setIsLoading(false);
        return;
      }

      if (user.password !== password) {
        setError('Incorrect passcode credentials. Please try again.');
        setIsLoading(false);
        return;
      }

      // Successful login
      onLogin({
        email: user.email,
        role: user.role,
        name: user.name,
        phone: user.phone || '+91 90000 12345'
      });
      setIsLoading(false);
    }, 1200);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const user = registeredUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase().trim()
      );

      if (!user) {
        setError('No registered account found with this email.');
        setIsLoading(false);
        return;
      }

      if (portalType === 'Responder' && user.role === 'Citizen') {
        setError('Email belongs to a Citizen account. Switch to Citizen SOS.');
        setIsLoading(false);
        return;
      }
      if (portalType === 'Citizen' && user.role !== 'Citizen') {
        setError('Email belongs to an Officer account. Switch to Responder.');
        setIsLoading(false);
        return;
      }

      setSuccessMsg(`Recovery successful! Your passcode is: "${user.password}"`);
      setIsLoading(false);
    }, 1000);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    setTimeout(() => {
      if (signUpPassword !== signUpConfirmPassword) {
        setError('Passcodes do not match.');
        setIsLoading(false);
        return;
      }

      const emailExists = registeredUsers.some(
        u => u.email.toLowerCase() === signUpEmail.toLowerCase().trim()
      );

      if (emailExists) {
        setError('An account is already registered with this email.');
        setIsLoading(false);
        return;
      }

      // Create new user block
      const newUser = {
        email: signUpEmail.trim(),
        password: signUpPassword,
        role: portalType === 'Citizen' ? 'Citizen' : signUpRole,
        name: signUpName.trim(),
        phone: signUpPhone.trim() || '+91 90000 12345'
      };

      setRegisteredUsers(prev => [newUser, ...prev]);
      
      // Auto-populate Sign In fields
      setEmail(signUpEmail.trim());
      setPassword(signUpPassword);
      
      setSuccessMsg('Account registered successfully! Sign in to verify authorization.');
      setIsSignUp(false);
      setIsLoading(false);
      
      // Reset signup fields
      setSignUpName('');
      setSignUpEmail('');
      setSignUpPhone('');
      setSignUpPassword('');
      setSignUpConfirmPassword('');
    }, 1200);
  };

  const handleRoleSelect = (roleName) => {
    setSignUpRole(roleName);
    const prefix = roleName.toLowerCase();
    setSignUpEmail(`${prefix}.operator@hyd.disaster.gov`);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      {/* Abstract background blur circles */}
      <div className="absolute top-1/4 left-1/4 w-52 h-52 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[325px] bg-[#1E293B]/90 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-4 relative overflow-hidden transition-all duration-300">
        
        {/* Glow effect at top card border */}
        <div className="absolute top-0 left-0 right-0 h-[1.2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

        {/* Top bar with back to landing and language select */}
        <div className="flex justify-between items-center mb-3">
          <button 
            onClick={onBackToLanding}
            className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-550 hover:text-zinc-350 transition-colors"
          >
            ← Back
          </button>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-zinc-950/60 border border-zinc-850 rounded-md px-1.5 py-0.5 text-[9px] font-bold text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono tracking-wider cursor-pointer h-5"
          >
            <option value="en">🇺🇸 EN</option>
            <option value="te">🇮🇳 తె</option>
            <option value="hi">🇮🇳 हि</option>
            <option value="es">🇪🇸 ES</option>
          </select>
        </div>

        {/* Brand Header */}
        <div className="text-center space-y-1.5 mb-3.5 select-none font-sans">
          <SentinelLogo size={48} showText={false} className="mx-auto mb-0.5" />
          <h2 className="text-xs font-extrabold tracking-widest uppercase text-zinc-50 flex items-center justify-center gap-1 font-sans">
            {t('loginHeader')}
            <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
          </h2>
          <p className="text-[10px] text-zinc-450 leading-snug">
            {t('loginSub')}
          </p>
        </div>

        {/* Dual-Portal Selector Tabs */}
        <div className="grid grid-cols-2 bg-zinc-950 p-0.5 rounded-lg border border-zinc-800/80 mb-3.5 text-[9.5px] font-bold uppercase tracking-wider select-none font-sans">
          <button
            type="button"
            onClick={() => handlePortalSwitch('Citizen')}
            className={`py-1.5 rounded text-center transition-all ${
              portalType === 'Citizen'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-zinc-500 hover:text-zinc-350'
            }`}
          >
            {t('citizenSosTab')}
          </button>
          <button
            type="button"
            onClick={() => handlePortalSwitch('Responder')}
            className={`py-1.5 rounded text-center transition-all ${
              portalType === 'Responder'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-zinc-500 hover:text-zinc-350'
            }`}
          >
            {t('responderTab')}
          </button>
        </div>

        {/* Success message display */}
        {successMsg && (
          <div className="bg-emerald-950/20 border border-emerald-900/40 px-2.5 py-1.5 rounded-lg flex gap-1.5 items-center text-[10px] text-emerald-450 mb-3 animate-pulse">
            <span className="font-bold">✓</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error message display */}
        {error && (
          <div className="bg-red-950/20 border border-red-900/40 px-2.5 py-1.5 rounded-lg flex gap-1.5 items-center text-[10px] text-red-400 mb-3">
            <Shield className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form rendering depending on Sign In / Up / Forgot */}
        {isForgotPassword ? (
          /* Forgot Password / Passcode Recovery Form */
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-3 font-sans">
            <div className="space-y-2.5">
              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-wider block pl-0.5">
                  {t('recoverTitle')}
                </label>
                <p className="text-[8.5px] text-zinc-550 leading-normal pl-0.5">
                  {t('recoverSub')}
                </p>
              </div>

              <div className="space-y-0.5">
                <label className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider block pl-0.5">
                  {t('emailLabel')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-2 w-3.5 h-3.5 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-150 placeholder-zinc-650 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold text-xs py-1.5 rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              {isLoading ? (
                <>
                  <Terminal className="w-3.5 h-3.5 animate-spin" />
                  Accessing logs...
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5" />
                  Decrypt Passcode
                </>
              )}
            </button>

            <div className="text-center pt-2.5 border-t border-zinc-900 select-none">
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setError('');
                  setSuccessMsg('');
                }}
                className="text-[10px] font-bold text-blue-550 hover:text-blue-400 transition-colors inline-flex items-center gap-0.5"
              >
                ← Back to Sign In
              </button>
            </div>
          </form>
        ) : !isSignUp ? (
          /* Sign In Form */
          <form onSubmit={handleSignInSubmit} className="space-y-3">
            <div className="space-y-2.5">
              <div className="space-y-0.5">
                <label className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider block pl-0.5 font-sans">
                  {t('emailLabel')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-2 w-3.5 h-3.5 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-150 placeholder-zinc-650 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                    placeholder="name@example.com"
                  />
                </div>
                {portalType === 'Responder' && (
                  <span className="text-[8px] text-zinc-500 block leading-normal italic pl-0.5 mt-0.5">
                    Demo: email with "drone" or "police" to check specific roles.
                  </span>
                )}
                {portalType === 'Citizen' && (
                  <span className="text-[8px] text-zinc-500 block leading-normal italic pl-0.5 mt-0.5">
                    Demo: email `citizen@gmail.com` with passcode `123`.
                  </span>
                )}
              </div>

              <div className="space-y-0.5">
                <div className="flex justify-between items-center pl-0.5 font-sans">
                  <label className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider block">
                    {t('passcodeLabel')}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setError('');
                      setSuccessMsg('');
                    }}
                    className="text-[8.5px] font-bold text-blue-550 hover:text-blue-400 transition-colors uppercase tracking-wider"
                  >
                    {t('forgotPasscode')}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-2 w-3.5 h-3.5 text-zinc-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-150 placeholder-zinc-650 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                    placeholder="Enter passcode"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold text-xs py-1.5 rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 font-sans"
            >
              {isLoading ? (
                <>
                  <Terminal className="w-3.5 h-3.5 animate-spin" />
                  Connecting Node...
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  {t('signInBtn')}
                </>
              )}
            </button>

            <div className="text-center pt-2.5 border-t border-zinc-900 select-none">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setError('');
                  setSuccessMsg('');
                  setSignUpEmail(portalType === 'Citizen' ? 'citizen.new@gmail.com' : 'admin.operator@hyd.disaster.gov');
                }}
                className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors inline-flex items-center gap-0.5"
              >
                <UserPlus className="w-3 h-3" />
                {t('signUpBtn')}
              </button>
              {onBackToLanding && (
                <button
                  type="button"
                  onClick={onBackToLanding}
                  className="mt-1.5 text-[9px] font-bold text-zinc-550 hover:text-zinc-405 transition-colors block mx-auto uppercase tracking-wider"
                >
                  ← Back to Portal Gateway
                </button>
              )}
            </div>
          </form>
        ) : (
          /* Sign Up Form */
          <form onSubmit={handleSignUpSubmit} className="space-y-3">
            <div className="space-y-2">
              <div className="space-y-0.5">
                <label className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider block pl-0.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-2.5 top-2 w-3.5 h-3.5 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-150 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                    placeholder={portalType === 'Citizen' ? 'Ramesh Reddy' : 'Officer Srinivas'}
                  />
                </div>
              </div>

              {portalType === 'Responder' ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <label className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider block pl-0.5">
                      Agency Role
                    </label>
                    <select
                      value={signUpRole}
                      onChange={(e) => handleRoleSelect(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[10.5px] text-zinc-150 focus:outline-none"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Drone">Drone Op</option>
                      <option value="Boat">NDRF Boat</option>
                      <option value="Police">Police</option>
                      <option value="Fire">Rescue</option>
                      <option value="Ambulance">Medical</option>
                    </select>
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider block pl-0.5">
                      Assigned Email
                    </label>
                    <input
                      type="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[10.5px] text-zinc-400 focus:outline-none font-sans"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <label className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider block pl-0.5">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-2 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type="text"
                        required
                        value={signUpPhone}
                        onChange={(e) => setSignUpPhone(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-150 focus:outline-none font-sans"
                        placeholder="+91 XXXXX"
                      />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider block pl-0.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-150 focus:outline-none font-sans"
                      placeholder="citizen.new@gmail.com"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-0.5">
                  <label className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider block pl-0.5">
                    Passcode
                  </label>
                  <div className="relative">
                    <Key className="absolute left-2.5 top-2 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="password"
                      required
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-150 focus:outline-none font-sans"
                      placeholder="Passcode"
                    />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <label className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider block pl-0.5">
                    Confirm
                  </label>
                  <div className="relative">
                    <Key className="absolute left-2.5 top-2 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="password"
                      required
                      value={signUpConfirmPassword}
                      onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-150 focus:outline-none font-sans"
                      placeholder="Confirm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold text-xs py-1.5 rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              {isLoading ? (
                <>
                  <Terminal className="w-3.5 h-3.5 animate-spin" />
                  Generating Keys...
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  {t('signUpBtn')}
                </>
              )}
            </button>

            <div className="text-center pt-2.5 border-t border-zinc-900 select-none">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError('');
                  setSuccessMsg('');
                }}
                className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors inline-flex items-center gap-0.5"
              >
                <Lock className="w-3 h-3" />
                {t('haveAccount')} Sign In
              </button>
              {onBackToLanding && (
                <button
                  type="button"
                  onClick={onBackToLanding}
                  className="mt-1.5 text-[9px] font-bold text-zinc-550 hover:text-zinc-405 transition-colors block mx-auto uppercase tracking-wider"
                >
                  ← Back to Portal Gateway
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
