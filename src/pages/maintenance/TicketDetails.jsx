import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

export default function TicketDetails() {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Issue Details', icon: 'fe-info' },
    { id: 'media', label: 'Complaint Media', icon: 'fe-image' },
    { id: 'staff', label: 'Assigned Staff', icon: 'fe-user' },
    { id: 'timeline', label: 'Status Timeline', icon: 'fe-activity' },
    { id: 'materials', label: 'Material Requests', icon: 'fe-box' },
    { id: 'notes', label: 'Staff Notes', icon: 'fe-edit' },
    { id: 'comms', label: 'Tenant Communication', icon: 'fe-message-circle' },
  ];

  return (
    <DashLayout>
      <PageHeader title="Ticket Details: MT-001" sub="AC not cooling" actions={
        <>
          <select className="form-select form-select-sm d-inline-block w-auto me-2">
            <option>Change Status: In Progress</option>
            <option>Mark Completed</option>
            <option>Close Ticket</option>
            <option>Reopen Ticket</option>
          </select>
          <button className="btn btn-sm btn-turquoise"><i className="fe fe-user-plus me-1"></i>Assign Staff</button>
        </>
      } />

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4" style={{ borderBottom: '2px solid #dee2e6' }}>
        {tabs.map(t => (
          <li key={t.id} className="nav-item">
            <button
              onClick={() => setActiveTab(t.id)}
              className={`nav-link border-0 ${activeTab === t.id ? 'active' : ''}`}
              style={{
                background: 'transparent',
                borderBottom: activeTab === t.id ? '3px solid #00B5AD' : 'none',
                color: activeTab === t.id ? '#00B5AD' : '#6c757d',
                fontWeight: activeTab === t.id ? '600' : '400',
                padding: '12px 16px',
                fontSize: '0.88rem',
              }}
            >
              <i className={`fe ${t.icon} me-1`}></i>{t.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Content */}
      <div className="card">
        <div className="card-body p-4">
          {activeTab === 'details' && (
            <div>
              <h5 className="fw-bold mb-3">Ticket Information</h5>
              <div className="row g-3">
                <div className="col-md-6"><strong>Ticket Number:</strong> <code>MT-001</code></div>
                <div className="col-md-6"><strong>Priority:</strong> <span className="priority-high">High</span></div>
                <div className="col-md-6"><strong>Category:</strong> HVAC / Air Conditioning</div>
                <div className="col-md-6"><strong>Tenant:</strong> Ahmed Al-Mansoori (Unit 302)</div>
                <div className="col-md-6"><strong>Property:</strong> Marina Heights</div>
                <div className="col-md-6"><strong>Created Date:</strong> 2026-07-15 10:00 AM</div>
                <div className="col-12"><strong>Issue Description:</strong> The master bedroom AC unit is blowing warm air instead of cool air. Filter cleaning done last month, potentially low refrigerant or compressor issue.</div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div>
              <h5 className="fw-bold mb-3">Complaint Photos & Media</h5>
              <div style={{ height: 140, background: '#f5f5f5', border: '2px dashed #ddd', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fe fe-image text-muted" style={{ fontSize: '2.5rem' }}></i>
                <span className="text-muted small mt-2">No photos uploaded by the tenant for this ticket.</span>
              </div>
            </div>
          )}

          {activeTab === 'staff' && (
            <div>
              <h5 className="fw-bold mb-3">Assigned Staff & Specialization</h5>
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded" style={{ maxWidth: 400 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#002B5C,#00B5AD)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>KI</div>
                <div>
                  <h6 className="fw-bold mb-0">Khalid Ibrahim</h6>
                  <span className="text-muted small">Specialization: AC & Ventilation</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div>
              <h5 className="fw-bold mb-3">Status Log Timeline</h5>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot" style={{ background: '#ffc107' }}></div>
                  <div className="small">
                    <div className="fw-bold">Marked: In Progress by Khalid Ibrahim</div>
                    <span className="text-muted">2026-07-16 10:15 AM</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot" style={{ background: '#00B5AD' }}></div>
                  <div className="small">
                    <div className="fw-bold">Assigned to Khalid Ibrahim</div>
                    <span className="text-muted">2026-07-15 02:00 PM</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot" style={{ background: '#004aad' }}></div>
                  <div className="small">
                    <div className="fw-bold">Ticket Created by Tenant</div>
                    <span className="text-muted">2026-07-15 10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Material Requests</h5>
                <button className="btn btn-sm btn-turquoise rounded-pill"><i className="fe fe-plus me-1"></i>Request Material</button>
              </div>
              <table className="table table-hover">
                <thead>
                  <tr><th>Material Name</th><th>Qty</th><th>Estimated Cost</th><th>Approval Status</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>AC Capacitor 45uF</td>
                    <td>1</td>
                    <td>AED 120</td>
                    <td><span className="badge bg-success">Approved</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'notes' && (
            <div>
              <h5 className="fw-bold mb-3">Internal Staff Updates</h5>
              <div className="mb-3">
                <textarea className="form-control" rows="3" placeholder="Add update notes..."></textarea>
                <button className="btn btn-sm btn-turquoise mt-2">Save Update</button>
              </div>
              <div className="list-group list-group-flush">
                <div className="list-group-item px-0">
                  <div className="d-flex justify-content-between">
                    <strong className="small">Khalid Ibrahim</strong>
                    <span className="text-muted small">2026-07-16 11:00 AM</span>
                  </div>
                  <p className="mb-0 small text-muted">Checked compressor capacitor. Replaced and testing cool air flow. Need to verify pressure.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comms' && (
            <div>
              <h5 className="fw-bold mb-3">WhatsApp Tenant Communications Log</h5>
              <div className="alert alert-info">Live synchronization with the WhatsApp Web chatbot for fast, automated support updates.</div>
            </div>
          )}
        </div>
      </div>
    </DashLayout>
  );
}
