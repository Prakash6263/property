import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const EVENT_TYPES = [
  { type: 'viewing',     label: 'Viewing',       color: '#004aad', bg: '#e8f0ff' },
  { type: 'maintenance', label: 'Maintenance',    color: '#fd7e14', bg: '#fff4e6' },
  { type: 'lease',       label: 'Lease/Contract', color: '#6f42c1', bg: '#f3eeff' },
  { type: 'inspection',  label: 'Inspection',     color: '#28a745', bg: '#eafff2' },
  { type: 'payment',     label: 'Payment Due',    color: '#dc3545', bg: '#ffeef0' },
];

const SAMPLE_EVENTS = [
  { id: 1, date: 16, month: 6, type: 'viewing',     label: 'Viewing – Unit 302',           time: '10:00 AM', person: 'Ahmed Al-M.' },
  { id: 2, date: 16, month: 6, type: 'viewing',     label: 'Viewing – JBR 115',            time: '2:00 PM',  person: 'Priya S.' },
  { id: 3, date: 16, month: 6, type: 'maintenance', label: 'MT-001 AC Repair',             time: '11:00 AM', person: 'Khalid I.' },
  { id: 4, date: 17, month: 6, type: 'lease',       label: 'Lease Signing – David C.',     time: '9:00 AM',  person: 'David C.' },
  { id: 5, date: 18, month: 6, type: 'maintenance', label: 'MT-002 Plumbing Fix',          time: '8:00 AM',  person: 'Ali H.' },
  { id: 6, date: 20, month: 6, type: 'inspection',  label: 'Property Inspection – P002',  time: '10:00 AM', person: 'Sara K.' },
  { id: 7, date: 22, month: 6, type: 'lease',       label: 'Contract Renewal – V-08',     time: '3:00 PM',  person: 'Maria S.' },
  { id: 8, date: 25, month: 6, type: 'viewing',     label: 'Viewing – Silicon SO-422',    time: '11:30 AM', person: 'John W.' },
  { id: 9, date: 28, month: 6, type: 'payment',     label: 'Rent Due – Unit 101',         time: '—',        person: 'Admin' },
];

function getTypeInfo(type) {
  return EVENT_TYPES.find(t => t.type === type) || { color: '#888', bg: '#f0f0f0', label: type };
}

export default function SharedCalendar() {
  const today = new Date();
  const [currentYear, setCurrentYear]   = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [filterType, setFilterType]     = useState('all');
  const [showModal, setShowModal]       = useState(false);
  const [events, setEvents]             = useState(SAMPLE_EVENTS);
  const [newEvent, setNewEvent]         = useState({ title: '', type: 'viewing', date: '', time: '', person: '' });

  const firstDay     = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth  = new Date(currentYear, currentMonth + 1, 0).getDate();
  const isToday      = (d) => d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const filtered = events.filter(e =>
    e.month === currentMonth && (filterType === 'all' || e.type === filterType)
  );
  const dayEvents = filtered.filter(e => e.date === selectedDate);

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    const d = new Date(newEvent.date);
    setEvents(prev => [...prev, {
      id: Date.now(), date: d.getDate(), month: d.getMonth(),
      type: newEvent.type, label: newEvent.title,
      time: newEvent.time || '—', person: newEvent.person || '—'
    }]);
    setNewEvent({ title: '', type: 'viewing', date: '', time: '', person: '' });
    setShowModal(false);
  };

  return (
    <DashLayout>
      <PageHeader
        title="Shared Calendar"
        sub="Team-wide scheduling & events"
        actions={
          <button
            className="btn btn-sm"
            style={{ background: 'linear-gradient(135deg,#00B5AD,#004aad)', color: '#fff', borderRadius: 20, padding: '6px 18px', fontSize: '0.82rem' }}
            onClick={() => setShowModal(true)}
          >
            + Add Event
          </button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>

        {/* ── LEFT: Calendar Card ── */}
        <div className="card" style={{ borderRadius: 14, overflow: 'hidden' }}>

          {/* Month navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--text-border)' }}>
            <button onClick={prevMonth} style={navBtnStyle}>‹</button>
            <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: 0.3 }}>
              {MONTHS[currentMonth]} {currentYear}
            </span>
            <button onClick={nextMonth} style={navBtnStyle}>›</button>
          </div>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 6, padding: '10px 16px', flexWrap: 'wrap', borderBottom: '1px solid var(--text-border)' }}>
            <FilterPill label="All" active={filterType === 'all'} color="#004aad" onClick={() => setFilterType('all')} />
            {EVENT_TYPES.map(et => (
              <FilterPill key={et.type} label={et.label} active={filterType === et.type} color={et.color} onClick={() => setFilterType(filterType === et.type ? 'all' : et.type)} />
            ))}
          </div>

          {/* Day names */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '8px 12px 4px' }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5 }}>{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, padding: '4px 12px 14px' }}>
            {Array(firstDay).fill(null).map((_, i) => <div key={`e-${i}`} />)}
            {Array(daysInMonth).fill(null).map((_, i) => {
              const day = i + 1;
              const dayEvs = filtered.filter(e => e.date === day);
              const selected = day === selectedDate;
              const todayDay = isToday(day);
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  style={{
                    borderRadius: 8,
                    padding: '5px 6px',
                    cursor: 'pointer',
                    minHeight: 52,
                    background: selected ? 'linear-gradient(135deg,#004aad,#00B5AD)' : todayDay ? 'rgba(0,181,173,0.1)' : 'transparent',
                    border: todayDay && !selected ? '1.5px solid #00B5AD' : '1px solid transparent',
                    transition: 'all 0.15s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'rgba(0,181,173,0.08)'; }}
                  onMouseLeave={e => { if (!selected) e.currentTarget.style.background = todayDay ? 'rgba(0,181,173,0.1)' : 'transparent'; }}
                >
                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: todayDay ? 700 : 500,
                    color: selected ? '#fff' : todayDay ? '#00B5AD' : 'inherit',
                    marginBottom: 3,
                  }}>
                    {day}
                  </div>
                  {dayEvs.slice(0, 2).map((ev, j) => {
                    const ti = getTypeInfo(ev.type);
                    return (
                      <div key={j} style={{
                        fontSize: '0.6rem',
                        padding: '1px 4px',
                        borderRadius: 3,
                        marginBottom: 2,
                        background: selected ? 'rgba(255,255,255,0.25)' : ti.bg,
                        color: selected ? '#fff' : ti.color,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontWeight: 500,
                      }}>
                        {ev.label}
                      </div>
                    );
                  })}
                  {dayEvs.length > 2 && (
                    <div style={{ fontSize: '0.58rem', color: selected ? 'rgba(255,255,255,0.8)' : '#9ca3af' }}>+{dayEvs.length - 2} more</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Sidebar ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Mini stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'This Month', value: filtered.length, icon: '📅' },
              { label: 'Today', value: events.filter(e => isToday(e.date) && e.month === currentMonth).length, icon: '🔔' },
            ].map((s, i) => (
              <div key={i} className="card" style={{ borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem' }}>{s.icon}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#004aad' }}>{s.value}</div>
                <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="card" style={{ borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: 8, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5 }}>Event Types</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {EVENT_TYPES.map(et => (
                <div key={et.type} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: et.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.78rem' }}>{et.label}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.72rem', fontWeight: 600, color: et.color }}>
                    {filtered.filter(e => e.type === et.type).length}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected day events */}
          <div className="card" style={{ borderRadius: 12, overflow: 'hidden', flex: 1 }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--text-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                {MONTHS[currentMonth].slice(0, 3)} {selectedDate}
              </span>
              <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}</span>
            </div>
            <div style={{ padding: '8px 0', maxHeight: 280, overflowY: 'auto' }}>
              {dayEvents.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 16px', color: '#9ca3af', fontSize: '0.8rem' }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>📭</div>
                  No events scheduled
                </div>
              ) : (
                dayEvents.map((ev, i) => {
                  const ti = getTypeInfo(ev.type);
                  return (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 14px', borderBottom: '1px solid var(--text-border)' }}>
                      <div style={{ width: 3, borderRadius: 2, background: ti.color, flexShrink: 0, alignSelf: 'stretch' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.label}</div>
                        <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: 2 }}>🕐 {ev.time} · 👤 {ev.person}</div>
                      </div>
                      <span style={{ fontSize: '0.62rem', padding: '2px 6px', borderRadius: 10, background: ti.bg, color: ti.color, fontWeight: 600, alignSelf: 'flex-start', whiteSpace: 'nowrap' }}>
                        {ti.label}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
            <div style={{ padding: '10px 14px', borderTop: '1px solid var(--text-border)' }}>
              <button
                onClick={() => setShowModal(true)}
                style={{ width: '100%', padding: '7px', borderRadius: 8, border: '1.5px dashed #00B5AD', background: 'transparent', color: '#00B5AD', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
              >
                + Add Event on {MONTHS[currentMonth].slice(0, 3)} {selectedDate}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Add Event Modal ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--card-bg)', borderRadius: 16, width: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg,#002B5C,#00B5AD)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>📅 Add New Event</span>
              <button onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={labelStyle}>Event Title *</label>
                <input className="form-control form-control-sm" placeholder="e.g. Viewing – Unit 301" value={newEvent.title} onChange={e => setNewEvent(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={labelStyle}>Event Type</label>
                  <select className="form-select form-select-sm" value={newEvent.type} onChange={e => setNewEvent(p => ({ ...p, type: e.target.value }))}>
                    {EVENT_TYPES.map(et => <option key={et.type} value={et.type}>{et.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Date *</label>
                  <input type="date" className="form-control form-control-sm" value={newEvent.date} onChange={e => setNewEvent(p => ({ ...p, date: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>Time</label>
                  <input type="time" className="form-control form-control-sm" value={newEvent.time} onChange={e => setNewEvent(p => ({ ...p, time: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>Assigned To</label>
                  <input className="form-control form-control-sm" placeholder="Staff / Agent" value={newEvent.person} onChange={e => setNewEvent(p => ({ ...p, person: e.target.value }))} />
                </div>
              </div>
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--text-border)', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} className="btn btn-sm btn-outline-secondary">Cancel</button>
              <button onClick={addEvent} style={{ background: 'linear-gradient(135deg,#004aad,#00B5AD)', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 20px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}

/* ─── Sub-components ─── */
function FilterPill({ label, active, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: `1.5px solid ${active ? color : color + '50'}`,
        background: active ? color : color + '15',
        color: active ? '#fff' : color,
        borderRadius: 20,
        padding: '3px 10px',
        fontSize: '0.7rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  );
}

const navBtnStyle = {
  background: 'transparent',
  border: '1px solid var(--text-border)',
  borderRadius: 8,
  width: 30,
  height: 30,
  cursor: 'pointer',
  fontSize: '1.1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const labelStyle = {
  fontSize: '0.72rem',
  fontWeight: 600,
  color: '#6b7280',
  marginBottom: 4,
  display: 'block',
  textTransform: 'uppercase',
  letterSpacing: 0.4,
};
