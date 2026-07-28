import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';
import { useNavigate } from 'react-router-dom';

const MY_TASKS = [
  { id: 'MT-001', issue: 'AC not cooling - Unit 302', property: 'Marina Heights', unit: '302', priority: 'High', deadline: 'Today 5 PM', status: 'In Progress', location: 'Floor 3, Marina Heights' },
  { id: 'MT-002', issue: 'Bathroom water leak', property: 'JBR Apartments', unit: '115', priority: 'Urgent', deadline: 'Today 12 PM', status: 'New', location: 'Floor 1, JBR Block A' },
  { id: 'MT-005', issue: 'Internet router replacement', property: 'Silicon Oasis', unit: 'SO-422', priority: 'Low', deadline: 'Tomorrow', status: 'Assigned', location: 'Floor 4, Building B' },
  { id: 'MT-008', issue: 'Paint wall - living room', property: 'Al Barsha Villa', unit: 'V-08', priority: 'Medium', deadline: '2026-07-20', status: 'Waiting', location: 'Villa 8, Al Barsha' },
];

const STATUS_TABS = ['All', 'New', 'In Progress', 'Waiting', 'Completed'];
const PRIORITY_COLORS = { Low: '#28a745', Medium: '#ffc107', High: '#fd7e14', Urgent: '#dc3545' };
const STATUS_COLORS = { New: '#004aad', Assigned: '#00B5AD', 'In Progress': '#ffc107', Waiting: '#6c757d', Completed: '#28a745' };

export default function MyTasks() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = MY_TASKS.filter(t => activeTab === 'All' || t.status === activeTab);

  return (
    <DashLayout>
      <PageHeader title="My Tasks" sub="Maintenance Staff" />

      {/* Summary pills */}
      <div className="row g-2 mb-4">
        {[
          { label: 'New', count: 1, color: '#004aad' },
          { label: 'In Progress', count: 1, color: '#ffc107' },
          { label: 'Waiting', count: 1, color: '#6c757d' },
          { label: 'Completed', count: 0, color: '#28a745' },
        ].map((s, i) => (
          <div key={i} className="col-6 col-md-3">
            <div className="card text-center" style={{ borderLeft: `4px solid ${s.color}`, cursor: 'pointer' }} onClick={() => setActiveTab(s.label)}>
              <div className="card-body py-2">
                <div className="fw-bold" style={{ fontSize: '1.5rem', color: s.color }}>{s.count}</div>
                <div className="text-muted" style={{ fontSize: '0.8rem' }}>{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab filter */}
      <ul className="nav nav-pills mb-3">
        {STATUS_TABS.map(t => (
          <li key={t} className="nav-item">
            <button className={`nav-link ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)} style={{ fontSize: '0.83rem' }}>{t}</button>
          </li>
        ))}
      </ul>

      {/* Task Cards */}
      <div className="row g-3">
        {filtered.map((task, i) => (
          <div key={i} className="col-lg-6">
            <div className="card" style={{ borderLeft: `4px solid ${PRIORITY_COLORS[task.priority]}` }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <code className="fw-bold" style={{ color: '#00B5AD' }}>{task.id}</code>
                    <h6 className="mt-1 mb-0 fw-bold">{task.issue}</h6>
                  </div>
                  <span className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                </div>

                <div className="row g-1 mb-3" style={{ fontSize: '0.82rem' }}>
                  <div className="col-6">
                    <i className="fe fe-home me-1 text-muted"></i>{task.property}
                  </div>
                  <div className="col-6">
                    <i className="fe fe-grid me-1 text-muted"></i>Unit: {task.unit}
                  </div>
                  <div className="col-6">
                    <i className="fe fe-clock me-1 text-muted"></i>Due: <span style={{ color: task.deadline.includes('Today') ? '#dc3545' : 'inherit' }}>{task.deadline}</span>
                  </div>
                  <div className="col-6">
                    <i className="fe fe-map-pin me-1 text-muted"></i>{task.location}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge" style={{ background: (STATUS_COLORS[task.status] || '#6c757d') + '20', color: STATUS_COLORS[task.status] || '#6c757d', fontSize: '0.72rem' }}>{task.status}</span>
                  <div className="d-flex gap-1">
                    {task.status === 'New' && <button className="btn btn-sm btn-success" style={{ fontSize: '0.75rem' }} onClick={() => navigate('/mstaff/jobs')}>Accept</button>}
                    {task.status === 'Assigned' && <button className="btn btn-sm btn-primary" style={{ fontSize: '0.75rem' }} onClick={() => navigate('/mstaff/jobs')}>Start Work</button>}
                    {task.status === 'In Progress' && <button className="btn btn-sm" style={{ background: 'linear-gradient(90deg,#00B5AD,#00D2CB)', color: '#fff', fontSize: '0.75rem' }} onClick={() => navigate('/mstaff/jobs')}>Mark Complete</button>}
                    <button className="btn btn-sm btn-outline-secondary" style={{ fontSize: '0.75rem' }} onClick={() => navigate('/mstaff/jobs')}>Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-12 text-center py-5">
            <i className="fe fe-check-circle" style={{ fontSize: '3rem', color: '#28a745', opacity: 0.5 }}></i>
            <p className="text-muted mt-2">No tasks in this category</p>
          </div>
        )}
      </div>
    </DashLayout>
  );
}
