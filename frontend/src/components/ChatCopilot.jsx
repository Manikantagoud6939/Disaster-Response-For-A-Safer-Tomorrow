import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, CornerDownLeft, Sparkles } from 'lucide-react';

export default function ChatCopilot({ 
  sectors, 
  shelters, 
  hospitals, 
  responders, 
  reports, 
  roads, 
  weatherCondition,
  rainRate,
  savedCount
}) {
  const [messages, setMessages] = useState([
    {
      id: 'msg_welcome',
      sender: 'bot',
      text: "Hello! I am your **Disaster Command Copilot**. Ask me anything about the live status, hospital beds, shelter vacancies, battery diagnostics, or active road blockages.",
      time: '13:45'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processQuery = (query) => {
    const q = query.toLowerCase();
    
    // 1. Status overview
    if (q.includes('status') || q.includes('overview') || q.includes('summary') || q.includes('how is it')) {
      const pending = reports.filter(r => r.status === 'Pending').length;
      const dispatched = reports.filter(r => r.status === 'Dispatched').length;
      return `### 🚨 Command Center Summary
- **Weather Condition**: ${weatherCondition}
- **Rain Rate**: ${rainRate} mm/hour
- **Active Citizen Alerts**: **${pending}** pending, **${dispatched}** in progress
- **Citizens Saved**: **${savedCount}**
- **Sectors Affected**: ${sectors.filter(s => s.water_depth > 0.3).length} sectors with active flooding.`;
    }

    // 2. Hospital Beds
    if (q.includes('bed') || q.includes('hospital') || q.includes('icu') || q.includes('medical')) {
      const details = hospitals.map(h => {
        const floodText = h.is_flooded ? '⚠️ Restricted Access (Flooded entrance)' : '✅ Normal';
        return `- **${h.name}**: ${h.icu_beds_available}/${h.icu_beds_total} ICU beds free. (Status: ${floodText})`;
      }).join('\n');
      return `### 🏥 ICU Bed Availability\n${details}\n\n*Osmania General Hospital is experiencing slight flooding near the lobby; check routing before sending critical ambulances.*`;
    }

    // 3. Shelters
    if (q.includes('shelter') || q.includes('safe zone') || q.includes('capacity')) {
      const details = shelters.map(s => {
        const remaining = s.capacity - s.occupied;
        return `- **${s.name}**: ${s.occupied}/${s.capacity} occupied (**${remaining} slots left**). Medicine: ${s.medicine_stock}, Food: ${s.food_stock}.`;
      }).join('\n');
      return `### 🏛️ Emergency Shelter Occupancy\n${details}\n\n*HITEX Exhibition Center (Hitech City) is running low on critical medical supplies. Drones should prioritize medicine dispatches there.*`;
    }

    // 4. Drones / Battery
    if (q.includes('drone') || q.includes('battery') || q.includes('diagnostics')) {
      const drones = responders.filter(r => r.type === 'Drone');
      const details = drones.map(d => {
        return `- **${d.name}**: Status: **${d.status}** | Battery: **${d.battery}%**`;
      }).join('\n');
      return `### 🚁 Med-Drone Fleet Diagnostics\n${details}\n\n*Note: Drones require charging at base stations (Hyderabad or Khammam) if battery drops below 20%.*`;
    }

    // 5. Blocked Roads
    if (q.includes('road') || q.includes('blocked') || q.includes('closed') || q.includes('route') || q.includes('flood')) {
      const blocked = roads.filter(r => r.blocked);
      if (blocked.length === 0) {
        return `### 🛣️ Road Corridor Status\nAll main road corridors are currently open and clear for emergency transport vehicles.`;
      }
      const details = blocked.map(r => {
        const fromName = sectors.find(s => s.id === r.from)?.name.split(' ')[0];
        const toName = sectors.find(s => s.id === r.to)?.name.split(' ')[0];
        return `- **${fromName} ↔ ${toName}**: Closed due to deep water (>0.8m).`;
      }).join('\n');
      return `### ⚠️ Flooded Road Corridors\n${details}\n\n*Rescue vehicles and ambulances should reroute through elevated Madhapur/Hitech City highways.*`;
    }

    // 6. Active Reports
    if (q.includes('alert') || q.includes('pending') || q.includes('citizen') || q.includes('queue')) {
      const active = reports.filter(r => r.status !== 'Resolved');
      if (active.length === 0) {
        return `### 📋 Active Incident Queue\nThere are no active citizen emergency alerts currently. All reported cases resolved.`;
      }
      const details = active.map(r => {
        return `- **[${r.severity}] ${r.type}** in ${sectors.find(s => s.id === r.sector_id)?.name.split(' ')[0]} - *"${r.description}"* (Status: ${r.status})`;
      }).join('\n');
      return `### 📋 Active Incident Queue\n${details}`;
    }

    // 7. General Help fallback
    return `I parsed your query: *" ${query} "*. As your AI Commander, here is what you can ask me:
1. **Disaster summary**: "Show overall status"
2. **Medical capacities**: "Are there ICU beds available?"
3. **Shelter capacity**: "What is the shelter status?"
4. **Drones**: "Drone battery diagnostics"
5. **Road blocks**: "List all blocked roads"
6. **Alert Queue**: "Show active citizen alerts"`;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI thinking and output response
    setTimeout(() => {
      const botResponse = {
        id: `msg_bot_${Date.now()}`,
        sender: 'bot',
        text: processQuery(input),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 450);
  };

  // Convert markdown-style response to HTML blocks (simple regex)
  const formatMarkdown = (text) => {
    return text.split('\n').map((line, idx) => {
      let content = line;
      
      // Headers ###
      if (content.startsWith('### ')) {
        return <h4 key={idx} className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-2 mb-1">{content.replace('### ', '')}</h4>;
      }
      
      // Bullet list items
      if (content.trim().startsWith('- ')) {
        const cleanContent = content.trim().replace('- ', '');
        // Replace bold tags **...**
        const formatted = replaceBoldTags(cleanContent);
        return <li key={idx} className="text-xs text-zinc-600 dark:text-zinc-300 ml-4 list-disc mb-0.5">{formatted}</li>;
      }
      
      // Number list items
      if (/^\d+\.\s/.test(content.trim())) {
        const cleanContent = content.trim().replace(/^\d+\.\s/, '');
        const formatted = replaceBoldTags(cleanContent);
        return <li key={idx} className="text-xs text-zinc-600 dark:text-zinc-300 ml-4 list-decimal mb-0.5">{formatted}</li>;
      }
      
      // Default paragraphs
      if (content.trim() !== '') {
        const formatted = replaceBoldTags(content);
        return <p key={idx} className="text-xs text-zinc-600 dark:text-zinc-300 mb-1 leading-relaxed">{formatted}</p>;
      }
      
      return <div key={idx} className="h-1" />;
    });
  };

  // Quick helper to render bold text in lines
  const replaceBoldTags = (str) => {
    const parts = str.split('**');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-bold text-zinc-950 dark:text-zinc-50">{part}</strong>;
      }
      // Replace italic markers *...*
      if (part.includes('*')) {
        const subparts = part.split('*');
        return subparts.map((sp, i) => i % 2 === 1 ? <em key={i} className="italic text-zinc-400">{sp}</em> : sp);
      }
      return part;
    });
  };

  return (
    <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-[580px] w-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Disaster Copilot Assistant</span>
        </div>
        <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
          AI Online
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div key={msg.id} className={`flex gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                isBot 
                  ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400' 
                  : 'bg-blue-600 border-blue-500 text-white'
              }`}>
                {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={`flex flex-col max-w-[80%] ${isBot ? 'items-start' : 'items-end'}`}>
                <div className={`px-3.5 py-2.5 rounded-2xl shadow-sm border ${
                  isBot 
                    ? 'bg-zinc-50 dark:bg-[#111116] border-zinc-200/50 dark:border-zinc-800/80 rounded-tl-none' 
                    : 'bg-blue-600 border-blue-500 text-white rounded-tr-none'
                }`}>
                  {isBot ? (
                    <div className="space-y-1">{formatMarkdown(msg.text)}</div>
                  ) : (
                    <span className="text-xs">{msg.text}</span>
                  )}
                </div>
                <span className="text-[9px] text-zinc-400 mt-1">{msg.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-zinc-100 dark:border-zinc-800 flex gap-2 items-center bg-zinc-50/50 dark:bg-zinc-900/10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Copilot about shelters, beds, or diagnostics..."
          className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
