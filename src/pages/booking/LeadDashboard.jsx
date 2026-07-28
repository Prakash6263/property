import React, { useState } from 'react';
import { DashLayout, KPICard, PageHeader } from '../../components/common/DashboardComponents';
import { useNavigate } from 'react-router-dom';

const kpis = [
  { title: 'New Leads', value: '48', icon: 'fa-solid fa-user-plus', colorClass: 'card-blue', trend: 15 },
  { title: 'Qualified Leads', value: '31', icon: 'fa-solid fa-user-check', colorClass: 'card-green', trend: 8 },
  { title: 'Viewings Scheduled', value: '12', icon: 'fa-solid fa-calendar-check', colorClass: 'card-purple', sub: 'Today' },
  { title: 'Reservations', value: '8', icon: 'fa-solid fa-bookmark', colorClass: 'card-pink', trend: 25 },
  { title: 'Confirmed Bookings', value: '22', icon: 'fa-solid fa-handshake', colorClass: 'card-orange', trend: 18 },
  { title: 'Lost Leads', value: '9', icon: 'fa-solid fa-user-xmark', colorClass: 'card-purple', trend: -30 },
  { title: 'Conversion Rate', value: '45.8%', icon: 'fa-solid fa-chart-line', colorClass: 'card-blue', trend: 5 },
  { title: 'Avg Response Time', value: '8 min', icon: 'fa-solid fa-clock', colorClass: 'card-green', sub: 'WhatsApp leads' },
];

const LEADS = [
  { name: 'Ahmed Al-Mansoori', phone: '+971 50 123 4567', area: 'Dubai Marina', budget: 'AED 8,000/mo', moveIn: '2026-08-01', agent: 'Yasmine T.', status: 'Viewing Scheduled', last: '2h ago' },
  { name: 'Priya Sharma', phone: '+971 55 234 5678', area: 'JBR', budget: 'AED 12,000/mo', moveIn: '2026-09-01', agent: 'Yasmine T.', status: 'Qualified', last: '5h ago' },
  { name: 'David Chen', phone: '+971 52 345 6789', area: 'Downtown', budget: 'AED 20,000/mo', moveIn: '2026-08-15', agent: 'Omar Y.', status: 'Interested', last: '1d ago' },
  { name: 'Maria Santos', phone: '+971 58 456 7890', area: 'Al Barsha', budget: 'AED 6,500/mo', moveIn: '2026-07-25', agent: 'Yasmine T.', status: 'Reserved', last: '3d ago' },
  { name: 'John Williams', phone: '+971 54 567 8901', area: 'Silicon Oasis', budget: 'AED 5,000/mo', moveIn: '2026-08-01', agent: 'Omar Y.', status: 'New', last: '10 min ago' },
];

const STATUS_COLORS = {
  'Viewing Scheduled': '#004aad',
  'Qualified': '#28a745',
  'Interested': '#ffc107',
  'Reserved': '#fd7e14',
  'New': '#00B5AD',
  'Confirmed': '#6f42c1',
  'Lost': '#dc3545',
};

export default function LeadDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  const statuses = ['All', 'New', 'Qualified', 'Interested', 'Viewing Scheduled', 'Reserved', 'Confirmed'];

  const filtered = LEADS.filter(l =>
    (statusFilter === 'All' || l.status === statusFilter) &&
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashLayout>
      <PageHeader title="Lead Dashboard" sub="Booking Team" actions={
        <button className="btn btn-sm btn-turquoise" style={{ borderRadius: 20 }} onClick={() => setShowAddForm(true)}>
          <i className="fe fe-user-plus me-1"></i>Add Lead
        </button>
      } />

      <div className="row g-3 mb-4">
        {kpis.map((k, i) => (
          <div key={i} className="col-xl-3 col-sm-6 col-12"><KPICard {...k} /></div>
        ))}
      </div>

      {/* Filters */}
      <div className="card mb-3">
        <div className="card-body py-2">
          <div className="d-flex flex-wrap align-items-center gap-2">
            <div className="input-group" style={{ width: 220 }}>
              <input type="text" className="form-control form-control-sm" placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} />
              <span className="input-group-text"><i className="fe fe-search"></i></span>
            </div>
            {statuses.map(s => (
              <button key={s} className={`btn btn-sm ${statusFilter === s ? 'btn-primary-navy' : 'btn-outline-secondary'}`} onClick={() => setStatusFilter(s)}
                style={{ fontSize: '0.78rem' }}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="card">
        <div className="card-header"><h5 className="card-title mb-0"><i className="fe fe-users me-2" style={{ color: '#00B5AD' }}></i>Leads</h5></div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="thead-light">
                <tr>
                  <th>Customer</th><th>Phone</th><th>Preferred Area</th><th>Budget</th><th>Move-In</th><th>Assigned Agent</th><th>Status</th><th>Last Interaction</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => (
                  <tr key={i}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#002B5C,#00B5AD)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>{l.name.charAt(0)}</div>
                        <span className="fw-500">{l.name}</span>
                      </div>
                    </td>
                    <td>{l.phone}</td>
                    <td>{l.area}</td>
                    <td>{l.budget}</td>
                    <td>{l.moveIn}</td>
                    <td>{l.agent}</td>
                    <td>
                      <span className="badge" style={{ background: (STATUS_COLORS[l.status] || '#6c757d') + '20', color: STATUS_COLORS[l.status] || '#6c757d', fontSize: '0.72rem' }}>
                        {l.status}
                      </span>
                    </td>
                    <td className="text-muted" style={{ fontSize: '0.82rem' }}>{l.last}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-outline-primary" title="View Details" onClick={() => navigate('/booking/leads')}><i className="fe fe-eye"></i></button>
                        <button className="btn btn-sm btn-outline-success" title="Schedule Viewing" onClick={() => navigate('/booking/viewings')}><i className="fe fe-calendar"></i></button>
                        <button className="btn btn-sm btn-outline-info" title="WhatsApp" onClick={() => navigate('/support/inbox')}><i className="fe fe-message-circle"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="modal show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: 16 }}>
              <div className="modal-header" style={{ background: 'linear-gradient(90deg,#002B5C,#00B5AD)' }}>
                <h5 className="modal-title text-white">Add New Lead</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowAddForm(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12"><label className="form-label">Customer Name</label><input type="text" className="form-control" placeholder="Full name" /></div>
                  <div className="col-md-6"><label className="form-label">Phone</label><input type="tel" className="form-control" placeholder="+971 50..." /></div>
                  <div className="col-md-6"><label className="form-label">Preferred Area</label><input type="text" className="form-control" placeholder="e.g. Dubai Marina" /></div>
                  <div className="col-md-6"><label className="form-label">Budget Limit (AED)</label><input type="text" className="form-control" placeholder="e.g. 8000" /></div>
                  <div className="col-md-6"><label className="form-label">Expected Move-In</label><input type="date" className="form-control" /></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                <button className="btn btn-turquoise" onClick={() => setShowAddForm(false)}>Add Lead</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
