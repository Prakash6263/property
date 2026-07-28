import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hello! I'm your Property Management AI Assistant. I can help you with analytics, reports, tenant insights, or answer any questions about your portfolio. What would you like to know?", time: '10:00 AM' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const SUGGESTIONS = [
    'Show top 3 properties by occupancy',
    'Which tenants have overdue rent?',
    'Summarize this month\'s maintenance costs',
    'Generate rent collection report',
    'Which units are expiring next month?',
  ];

  const BOT_RESPONSES = {
    'top': 'Here are your top 3 properties by occupancy:\n1. JBR Serviced Apartments: 90% (72/80 units)\n2. Marina Heights: 90% (108/120 units)\n3. Al Barsha Villa Complex: 88.9% (40/45 units)',
    'overdue': 'Tenants with overdue rent:\n1. Priya Sharma – Unit 115 – AED 12,000 (12 days overdue)\n2. Maria Santos – Unit V-08 – AED 3,250 balance\n3. 22 other tenants with minor delays',
    'maintenance': 'This month\'s maintenance summary:\n- Total tickets: 89\n- Completed: 72 (80.9%)\n- Avg cost per ticket: AED 580\n- Total maintenance cost: AED 41,760',
    'rent': 'July Rent Collection Report:\n- Expected: AED 2,400,000\n- Collected: AED 2,100,000 (87.5%)\n- Outstanding: AED 300,000 from 24 tenants',
    'expiring': 'Contracts expiring in Aug 2026:\n- Unit 302 – Marina Heights – Ahmed Al-Mansoori\n- Unit B-1204 – Downtown Tower – David Chen\n+ 6 more contracts expiring',
  };

  const handleSend = async (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    const userMsg = { from: 'user', text: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const key = Object.keys(BOT_RESPONSES).find(k => msg.toLowerCase().includes(k));
    const botReply = key ? BOT_RESPONSES[key] : "I understand your query. Let me analyze the property data... Based on the current portfolio data, I'd recommend focusing on the top performing properties while addressing the 24 overdue rent cases. Would you like a detailed breakdown?";
    setMessages(prev => [...prev, { from: 'bot', text: botReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setLoading(false);
  };

  return (
    <DashLayout>
      <PageHeader title="AI Assistant" sub="Management" actions={
        <span className="badge" style={{ background: 'linear-gradient(90deg,#6f42c1,#00B5AD)', color: '#fff', fontSize: '0.8rem', padding: '6px 12px' }}>
          <i className="fe fe-cpu me-1"></i>AI Powered
        </span>
      } />

      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card" style={{ height: 'calc(100vh - 200px)' }}>
            <div className="card-header" style={{ background: 'linear-gradient(135deg,#002B5C,#00B5AD)', borderRadius: '12px 12px 0 0' }}>
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fe fe-cpu text-white"></i>
                </div>
                <div>
                  <div className="text-white fw-bold" style={{ fontSize: '0.9rem' }}>PropManager AI</div>
                  <div className="text-white-50" style={{ fontSize: '0.75rem' }}>Online · Analyzing your portfolio</div>
                </div>
                <div className="ms-auto">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#25D366', display: 'inline-block' }}></span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="ai-messages flex-grow-1" style={{ overflowY: 'auto' }}>
              {messages.map((m, i) => (
                <div key={i} className={m.from === 'user' ? 'ai-bubble-user' : 'ai-bubble-bot'}>
                  {m.from === 'bot' && (
                    <div className="d-flex align-items-center gap-1 mb-1" style={{ fontSize: '0.72rem', color: '#00B5AD' }}>
                      <i className="fe fe-cpu"></i> PropManager AI
                    </div>
                  )}
                  <p className="mb-1" style={{ fontSize: '0.85rem', whiteSpace: 'pre-line' }}>{m.text}</p>
                  <div style={{ fontSize: '0.68rem', opacity: 0.7, textAlign: 'right' }}>{m.time}</div>
                </div>
              ))}
              {loading && (
                <div className="ai-bubble-bot">
                  <div className="d-flex gap-1 align-items-center py-1">
                    {[1, 2, 3].map(n => (
                      <div key={n} style={{ width: 8, height: 8, borderRadius: '50%', background: '#00B5AD', animation: `pulse ${n * 0.3}s ease-in-out infinite alternate` }}></div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid #e9ecef', display: 'flex', gap: 8 }}>
              <input type="text" className="form-control" placeholder="Ask about your property portfolio..." value={input}
                onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} style={{ borderRadius: 20 }} />
              <button className="btn" style={{ background: 'linear-gradient(90deg,#00B5AD,#00D2CB)', color: '#fff', borderRadius: 20, minWidth: 44 }} onClick={() => handleSend()}>
                <i className="fe fe-send"></i>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Suggestions & Insights */}
        <div className="col-lg-4">
          <div className="card mb-3">
            <div className="card-header"><h6 className="card-title mb-0"><i className="fe fe-zap me-2" style={{ color: '#00B5AD' }}></i>Quick Questions</h6></div>
            <div className="card-body p-2">
              {SUGGESTIONS.map((s, i) => (
                <button key={i} className="btn btn-sm btn-outline-secondary w-100 text-start mb-1" style={{ fontSize: '0.78rem' }} onClick={() => handleSend(s)}>
                  <i className="fe fe-message-square me-2" style={{ color: '#00B5AD' }}></i>{s}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h6 className="card-title mb-0"><i className="fe fe-trending-up me-2" style={{ color: '#00B5AD' }}></i>AI Insights</h6></div>
            <div className="card-body p-2">
              {[
                { icon: 'fe-alert-triangle', text: '3 tenants at risk of churn based on complaint history', color: '#dc3545' },
                { icon: 'fe-trending-up', text: 'JBR units have 18% higher demand this week', color: '#28a745' },
                { icon: 'fe-dollar-sign', text: 'Rent collection rate dropped 2.5% — 8 proactive reminders needed', color: '#ffc107' },
                { icon: 'fe-tool', text: 'AC-related tickets up 40% — seasonal pattern detected', color: '#fd7e14' },
              ].map((ins, i) => (
                <div key={i} className="d-flex align-items-start gap-2 mb-2 p-2" style={{ background: ins.color + '08', borderRadius: 8, borderLeft: `3px solid ${ins.color}` }}>
                  <i className={`fe ${ins.icon} mt-1`} style={{ color: ins.color, fontSize: '0.85rem', flexShrink: 0 }}></i>
                  <span style={{ fontSize: '0.78rem' }}>{ins.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
