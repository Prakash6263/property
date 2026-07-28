import React, { useState } from 'react';
import { DashLayout, KPICard, PageHeader } from '../../components/common/DashboardComponents';
import { useNavigate } from 'react-router-dom';

const kpis = [
  { title: 'New Tickets', value: '14', icon: 'fa-solid fa-ticket', colorClass: 'card-blue', trend: -10 },
  { title: 'In Progress', value: '22', icon: 'fa-solid fa-spinner', colorClass: 'card-orange' },
  { title: 'Completed Today', value: '8', icon: 'fa-solid fa-check-circle', colorClass: 'card-green', trend: 33 },
  { title: 'Overdue Tickets', value: '5', icon: 'fa-solid fa-clock', colorClass: 'card-pink', trend: -25 },
  { title: 'Emergency', value: '2', icon: 'fa-solid fa-triangle-exclamation', colorClass: 'card-purple' },
  { title: 'Waiting Material', value: '7', icon: 'fa-solid fa-boxes-stacking', colorClass: 'card-blue' },
  { title: 'Avg Resolution', value: '4.2h', icon: 'fa-solid fa-hourglass-half', colorClass: 'card-green', trend: -18 },
  { title: 'Total This Month', value: '89', icon: 'fa-solid fa-clipboard-list', colorClass: 'card-pink' },
];

const TICKETS = [
  { id: 'MT-001', issue: 'AC not cooling', tenant: 'Ahmed Al-M.', unit: '302 / Marina Heights', category: 'HVAC', priority: 'High', staff: 'Khalid I.', created: '2026-07-15', due: '2026-07-16', status: 'In Progress' },
  { id: 'MT-002', issue: 'Water leak in bathroom', tenant: 'Priya Sharma', unit: '115 / JBR Apt.', category: 'Plumbing', priority: 'Urgent', staff: 'Ali Hassan', created: '2026-07-16', due: '2026-07-16', status: 'New' },
  { id: 'MT-003', issue: 'Electrical socket sparking', tenant: 'David Chen', unit: 'B-1204 / Downtown', category: 'Electrical', priority: 'Urgent', staff: 'Khalid I.', created: '2026-07-14', due: '2026-07-15', status: 'Overdue' },
  { id: 'MT-004', issue: 'Door lock broken', tenant: 'Maria Santos', unit: 'V-08 / Al Barsha', category: 'Carpentry', priority: 'Medium', staff: 'Unassigned', created: '2026-07-16', due: '2026-07-18', status: 'New' },
  { id: 'MT-005', issue: 'Internet router issue', tenant: 'John Williams', unit: 'SO-422 / Silicon', category: 'Network', priority: 'Low', staff: 'Tech Team', created: '2026-07-15', due: '2026-07-17', status: 'Assigned' },
];

// eslint-disable-next-line no-unused-vars
const PRIORITY_COLORS = { Low: '#28a745', Medium: '#ffc107', High: '#fd7e14', Urgent: '#dc3545' };
const STATUS_COLORS = { New: '#004aad', Assigned: '#00B5AD', 'In Progress': '#ffc107', Overdue: '#dc3545', Completed: '#28a745' };

export default function MaintenanceDashboard() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  const filtered = TICKETS.filter(t =>
    (statusFilter === 'All' || t.status === statusFilter) &&
    (priorityFilter === 'All' || t.priority === priorityFilter)
  );

  return (
    <DashLayout>
      <PageHeader title="Maintenance Dashboard" sub="Maintenance Manager" actions={
        <button className="btn btn-sm btn-turquoise text-white" style={{ borderRadius: 20 }} onClick={() => setShowAddForm(true)}>
          <i className="fe fe-plus me-1"></i>New Ticket
        </button>
      } />

      <div className="row g-3 mb-4">
        {kpis.map((k, i) => (
          <div key={i} className="col-xl-3 col-sm-6 col-12"><KPICard {...k} /></div>
        ))}
      </div>

      {/* Status filter pills */}
      <div className="card mb-3">
        <div className="card-body py-2">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            {['All', 'New', 'Assigned', 'In Progress', 'Overdue', 'Completed'].map(s => (
              <button key={s} className={`btn btn-sm ${statusFilter === s ? 'btn-primary-navy' : 'btn-outline-secondary'}`} onClick={() => setStatusFilter(s)} style={{ fontSize: '0.78rem' }}>{s}</button>
            ))}
            <div className="ms-auto d-flex gap-2">
              <select className="form-select form-select-sm" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} style={{ width: 140 }}>
                <option value="All">All Priorities</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
              </select>
              <select className="form-select form-select-sm" style={{ width: 160 }}><option>All Categories</option><option>HVAC</option><option>Plumbing</option><option>Electrical</option></select>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="card">
        <div className="card-header"><h5 className="card-title mb-0"><i className="fe fe-clipboard me-2" style={{ color: '#00B5AD' }}></i>Maintenance Tickets ({filtered.length})</h5></div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="thead-light">
                <tr><th>Ticket #</th><th>Issue</th><th>Tenant</th><th>Property / Unit</th><th>Category</th><th>Priority</th><th>Assigned Staff</th><th>Created</th><th>Due</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={i}>
                    <td><code className="fw-bold">{t.id}</code></td>
                    <td style={{ maxWidth: 160, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.issue}</td>
                    <td>{t.tenant}</td>
                    <td style={{ fontSize: '0.82rem' }}>{t.unit}</td>
                    <td><span className="badge" style={{ background: '#004aad20', color: '#004aad', fontSize: '0.72rem' }}>{t.category}</span></td>
                    <td><span className={`priority-${t.priority.toLowerCase()}`}>{t.priority}</span></td>
                    <td>{t.staff === 'Unassigned' ? <span className="text-muted fst-italic">Unassigned</span> : t.staff}</td>
                    <td style={{ fontSize: '0.82rem' }}>{t.created}</td>
                    <td style={{ fontSize: '0.82rem', color: t.status === 'Overdue' ? '#dc3545' : 'inherit' }}>{t.due}</td>
                    <td><span className="badge" style={{ background: (STATUS_COLORS[t.status] || '#6c757d') + '20', color: STATUS_COLORS[t.status] || '#6c757d', fontSize: '0.72rem' }}>{t.status}</span></td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-outline-primary" title="View Details" onClick={() => navigate('/maintenance/tickets')}><i className="fe fe-eye"></i></button>
                        <button className="btn btn-sm btn-outline-warning" title="Assign Staff" onClick={() => navigate('/maintenance/staff')}><i className="fe fe-user-plus"></i></button>
                        <button className="btn btn-sm btn-outline-success" title="Mark Complete" onClick={() => navigate('/maintenance/tickets')}><i className="fe fe-check"></i></button>
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
                <h5 className="modal-title text-white">Create New Maintenance Ticket</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowAddForm(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12"><label className="form-label">Issue Summary</label><input type="text" className="form-control" placeholder="AC not cooling, pipe leaking..." /></div>
                  <div className="col-md-6"><label className="form-label">Category</label>
                    <select className="form-select"><option>HVAC</option><option>Plumbing</option><option>Electrical</option><option>Carpentry</option></select>
                  </div>
                  <div className="col-md-6"><label className="form-label">Priority</label>
                    <select className="form-select"><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>
                  </div>
                  <div className="col-md-6"><label className="form-label">Property & Unit</label><input type="text" className="form-control" placeholder="e.g. Unit 302 / Marina Heights" /></div>
                  <div className="col-md-6"><label className="form-label">Tenant Name</label><input type="text" className="form-control" /></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                <button className="btn btn-turquoise" onClick={() => setShowAddForm(false)}>Create Ticket</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
