import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

const CONVERSATIONS = [
  { id: 1, name: 'Ahmed Al-Mansoori', type: 'prospect', phone: '+971 50 111 2222', msg: 'Can I see the 2BHK apartment?', time: '10:32 AM', unread: 3, online: true },
  { id: 2, name: 'Priya Sharma', type: 'tenant', phone: '+971 55 222 3333', msg: 'My AC is not working since yesterday', time: '9:45 AM', unread: 1, online: false },
  { id: 3, name: 'David Chen', type: 'tenant', phone: '+971 52 333 4444', msg: 'Thank you for the update', time: 'Yesterday', unread: 0, online: false },
  { id: 4, name: 'Maria Santos', type: 'prospect', phone: '+971 58 444 5555', msg: 'What is the deposit amount?', time: 'Yesterday', unread: 2, online: true },
  { id: 5, name: 'Khalid Ibrahim', type: 'staff', phone: '+971 54 555 6666', msg: 'Job MT-001 completed ✓', time: '2 days ago', unread: 0, online: true },
];

const MESSAGES = {
  1: [
    { from: 'in', text: 'Hello, I saw your listing for a 2BHK apartment in Marina Heights. Is it still available?', time: '10:20 AM' },
    { from: 'out', text: 'Yes! The 2BHK is available. Would you like to schedule a viewing?', time: '10:22 AM' },
    { from: 'in', text: 'Can I see it this weekend?', time: '10:30 AM' },
    { from: 'out', text: 'We have Saturday 2 PM available. Shall I book that for you?', time: '10:31 AM' },
    { from: 'in', text: 'Can I see the 2BHK apartment?', time: '10:32 AM' },
  ],
};

const FILTER_TYPES = ['All', 'Prospects', 'Tenants', 'Staff', 'Unread', 'Assigned to me'];

export default function WhatsAppInbox() {
  const [selected, setSelected] = useState(CONVERSATIONS[0]);
  const [filter, setFilter] = useState('All');
  const [message, setMessage] = useState('');
  const [showActions, setShowActions] = useState(false);

  const msgs = MESSAGES[selected?.id] || [];

  const filtered = CONVERSATIONS.filter(c => {
    if (filter === 'All') return true;
    if (filter === 'Unread') return c.unread > 0;
    if (filter === 'Prospects') return c.type === 'prospect';
    if (filter === 'Tenants') return c.type === 'tenant';
    if (filter === 'Staff') return c.type === 'staff';
    return true;
  });

  const handleSend = () => {
    if (message.trim()) setMessage('');
  };

  return (
    <DashLayout>
      <PageHeader title="WhatsApp Inbox" sub="Support Team" actions={
        <div className="badge" style={{ background: 'linear-gradient(90deg,#25D366,#128C7E)', color: '#fff', fontSize: '0.8rem', padding: '6px 12px' }}>
          <i className="fe fe-wifi me-1"></i>Connected
        </div>
      } />

      <div className="whatsapp-inbox">
        {/* LEFT: Conversation list */}
        <div className="wa-sidebar">
          {/* Search */}
          <div className="p-2 border-bottom">
            <div className="input-group input-group-sm">
              <span className="input-group-text border-0 bg-light"><i className="fe fe-search"></i></span>
              <input type="text" className="form-control border-0 bg-light" placeholder="Search conversations..." />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="p-2 border-bottom">
            <div className="d-flex flex-wrap gap-1">
              {FILTER_TYPES.slice(0, 4).map(f => (
                <button key={f} className={`btn btn-xs ${filter === f ? 'btn-primary-navy' : 'btn-outline-secondary'}`}
                  onClick={() => setFilter(f)} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 20 }}>{f}</button>
              ))}
            </div>
          </div>

          {/* Conversation list */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.map((conv, i) => (
              <div key={i} className={`wa-conv-item ${selected?.id === conv.id ? 'active' : ''}`} onClick={() => setSelected(conv)}>
                <div className="d-flex align-items-center gap-2">
                  <div className="position-relative flex-shrink-0">
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: conv.type === 'prospect' ? 'linear-gradient(135deg,#004aad,#00B5AD)' : conv.type === 'tenant' ? 'linear-gradient(135deg,#6f42c1,#00B5AD)' : 'linear-gradient(135deg,#28a745,#00B5AD)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                      {conv.name.charAt(0)}
                    </div>
                    {conv.online && <span style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#25D366', border: '2px solid #fff' }}></span>}
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="d-flex justify-content-between">
                      <span className="fw-500" style={{ fontSize: '0.85rem' }}>{conv.name}</span>
                      <span className="text-muted" style={{ fontSize: '0.7rem' }}>{conv.time}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted text-truncate" style={{ fontSize: '0.78rem', maxWidth: 180 }}>{conv.msg}</span>
                      {conv.unread > 0 && <span className="badge rounded-pill" style={{ background: '#25D366', color: '#fff', fontSize: '0.65rem' }}>{conv.unread}</span>}
                    </div>
                    <span className="badge" style={{ background: conv.type === 'prospect' ? '#004aad20' : conv.type === 'tenant' ? '#6f42c120' : '#28a74520', color: conv.type === 'prospect' ? '#004aad' : conv.type === 'tenant' ? '#6f42c1' : '#28a745', fontSize: '0.65rem' }}>{conv.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: Chat */}
        <div className="wa-chat">
          {/* Chat header */}
          <div style={{ padding: '10px 16px', background: 'var(--card-bg)', borderBottom: '1px solid #e9ecef', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="d-flex align-items-center gap-2">
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#002B5C,#00B5AD)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {selected?.name?.charAt(0)}
              </div>
              <div>
                <div className="fw-bold" style={{ fontSize: '0.9rem' }}>{selected?.name}</div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>{selected?.phone}</div>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowActions(!showActions)} title="Actions"><i className="fe fe-more-vertical"></i></button>
              <button className="btn btn-sm btn-outline-info" title="Create Ticket"><i className="fe fe-tool"></i></button>
              <button className="btn btn-sm btn-outline-success" title="Create Lead"><i className="fe fe-user-plus"></i></button>
              <button className="btn btn-sm btn-outline-primary" title="Schedule Viewing"><i className="fe fe-calendar"></i></button>
            </div>
          </div>

          {/* Messages */}
          <div className="wa-message-area">
            <div className="text-center text-muted mb-3" style={{ fontSize: '0.75rem' }}>Today</div>
            {msgs.map((m, i) => (
              <div key={i} className={m.from === 'out' ? 'wa-bubble-out' : 'wa-bubble-in'}>
                <p className="mb-1" style={{ fontSize: '0.87rem' }}>{m.text}</p>
                <div style={{ fontSize: '0.68rem', textAlign: 'right', opacity: 0.7 }}>{m.time} {m.from === 'out' && <i className="fe fe-check-circle ms-1"></i>}</div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="wa-input-area">
            <button className="btn btn-sm btn-outline-secondary"><i className="fe fe-paperclip"></i></button>
            <input type="text" className="form-control" placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()} style={{ borderRadius: 20 }} />
            <button className="btn btn-sm btn-outline-secondary"><i className="fe fe-align-left"></i></button>
            <button className="btn btn-sm" style={{ background: '#25D366', color: '#fff', borderRadius: 20, minWidth: 40 }} onClick={handleSend}>
              <i className="fe fe-send"></i>
            </button>
          </div>
        </div>

        {/* RIGHT: Customer details */}
        <div className="wa-details p-3">
          <div className="text-center mb-3">
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#002B5C,#00B5AD)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.4rem', margin: '0 auto 8px' }}>
              {selected?.name?.charAt(0)}
            </div>
            <div className="fw-bold">{selected?.name}</div>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>{selected?.phone}</div>
            <span className="badge mt-1" style={{ background: 'linear-gradient(90deg,#00B5AD,#00D2CB)', color: '#fff', fontSize: '0.72rem' }}>{selected?.type}</span>
          </div>

          {/* Detail tabs */}
          <ul className="nav nav-pills nav-fill mb-3" style={{ fontSize: '0.72rem' }}>
            <li className="nav-item"><button className="nav-link active py-1 px-2">Profile</button></li>
            <li className="nav-item"><button className="nav-link py-1 px-2">History</button></li>
            <li className="nav-item"><button className="nav-link py-1 px-2">Notes</button></li>
          </ul>

          <div style={{ fontSize: '0.82rem' }}>
            {selected?.type === 'prospect' ? (
              <>
                <div className="mb-2 p-2" style={{ background: 'rgba(0,181,173,0.07)', borderRadius: 8 }}>
                  <div className="fw-500 mb-1" style={{ color: '#00B5AD' }}>Requirements</div>
                  <div><span className="text-muted">Type:</span> 2BHK Apartment</div>
                  <div><span className="text-muted">Budget:</span> AED 8,000/mo</div>
                  <div><span className="text-muted">Area:</span> Dubai Marina / JBR</div>
                  <div><span className="text-muted">Move-in:</span> Aug 2026</div>
                </div>
                <button className="btn btn-sm btn-outline-primary w-100 mb-2"><i className="fe fe-home me-1"></i>Match Properties</button>
                <button className="btn btn-sm btn-outline-success w-100"><i className="fe fe-calendar me-1"></i>Schedule Viewing</button>
              </>
            ) : (
              <>
                <div className="mb-2 p-2" style={{ background: 'rgba(0,181,173,0.07)', borderRadius: 8 }}>
                  <div className="fw-500 mb-1" style={{ color: '#00B5AD' }}>Active Tenancy</div>
                  <div><span className="text-muted">Unit:</span> 115 / JBR Apts</div>
                  <div><span className="text-muted">Rent:</span> AED 12,000/mo</div>
                  <div><span className="text-muted">Expiry:</span> Mar 2026</div>
                </div>
                <div className="mb-2 p-2" style={{ background: 'rgba(220,53,69,0.07)', borderRadius: 8 }}>
                  <div className="fw-500 mb-1" style={{ color: '#dc3545' }}>Open Tickets</div>
                  <div>MT-002: AC Issue</div>
                </div>
                <button className="btn btn-sm btn-outline-warning w-100"><i className="fe fe-tool me-1"></i>Create Ticket</button>
              </>
            )}

            {/* Add note */}
            <div className="mt-3">
              <label className="fw-500 mb-1" style={{ fontSize: '0.8rem' }}>Internal Note</label>
              <textarea className="form-control form-control-sm" rows="2" placeholder="Add a note..."></textarea>
              <button className="btn btn-sm btn-outline-secondary w-100 mt-1">Save Note</button>
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
