import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

export default function TenantDetails() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fe-info' },
    { id: 'tenancy', label: 'Tenancy Agreement', icon: 'fe-file-text' },
    { id: 'documents', label: 'Documents', icon: 'fe-file' },
    { id: 'ledger', label: 'Rent Ledger', icon: 'fe-book' },
    { id: 'payments', label: 'Payments', icon: 'fe-dollar-sign' },
    { id: 'maintenance', label: 'Maintenance Requests', icon: 'fe-tool' },
    { id: 'whatsapp', label: 'WhatsApp History', icon: 'fe-message-circle' },
    { id: 'vacating', label: 'Vacating Status', icon: 'fe-log-out' },
  ];

  return (
    <DashLayout>
      <PageHeader title="Tenant Profile & Details" sub="Tenant: Ahmed Al-Mansoori" actions={
        <>
          <button className="btn btn-sm btn-outline-secondary"><i className="fe fe-edit me-1"></i>Edit Tenant</button>
          <button className="btn btn-sm btn-turquoise"><i className="fe fe-message-circle me-1"></i>WhatsApp Support</button>
        </>
      } />

      {/* Summary KPI Cards */}
      <div className="row g-3 mb-4">
        {[
          { title: 'Monthly Rent', value: 'AED 8,000', icon: 'fa-solid fa-wallet', color: 'card-pm-teal' },
          { title: 'Outstanding Balance', value: 'AED 0', icon: 'fa-solid fa-clock-rotate-left', color: 'card-pm-green' },
          { title: 'Contract Expiry', value: '2026-12-31', icon: 'fa-solid fa-calendar-xmark', color: 'card-pm-blue' },
          { title: 'Security Deposit', value: 'AED 8,000', icon: 'fa-solid fa-shield-halved', color: 'card-pm-teal' },
          { title: 'Open Tickets', value: '1 Active', icon: 'fa-solid fa-wrench', color: 'card-pm-orange' },
        ].map((c, i) => (
          <div key={i} className="col">
            <div className={`card ${c.color}`} style={{ minWidth: 160 }}>
              <div className="card-body p-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="text-muted small fw-bold">{c.title}</span>
                  <i className={c.icon} style={{ color: '#00B5AD' }}></i>
                </div>
                <h5 className="fw-bold mb-0">{c.value}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

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
          {activeTab === 'overview' && (
            <div>
              <h5 className="fw-bold mb-3">General Information</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6"><strong>Full Name:</strong> Ahmed Al-Mansoori</div>
                <div className="col-md-6"><strong>Tenant ID:</strong> <code>T001</code></div>
                <div className="col-md-6"><strong>Primary Phone:</strong> +971 50 111 2222</div>
                <div className="col-md-6"><strong>Email:</strong> ahmed@example.com</div>
                <div className="col-md-6"><strong>Nationality:</strong> Emirati</div>
                <div className="col-md-6"><strong>Visa Status:</strong> Resident</div>
              </div>
            </div>
          )}

          {activeTab === 'tenancy' && (
            <div>
              <h5 className="fw-bold mb-3">Tenancy Agreement Details</h5>
              <div className="row g-3">
                <div className="col-md-6"><strong>Assigned Property:</strong> Marina Heights</div>
                <div className="col-md-6"><strong>Assigned Unit:</strong> Unit 302</div>
                <div className="col-md-6"><strong>Start Date:</strong> 2025-01-01</div>
                <div className="col-md-6"><strong>End Date:</strong> 2026-12-31</div>
                <div className="col-md-6"><strong>Monthly Rent:</strong> AED 8,000</div>
                <div className="col-md-6"><strong>Security Deposit:</strong> AED 8,000 (Refundable)</div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <h5 className="fw-bold mb-3">Submitted Documents Status</h5>
              <div className="list-group mb-4">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="fe fe-file text-turquoise me-2"></i>Passport Copy.pdf</span>
                  <span className="badge bg-success">Verified</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="fe fe-file text-turquoise me-2"></i>Visa Copy / Emirates ID.pdf</span>
                  <span className="badge bg-success">Verified</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="fe fe-file text-turquoise me-2"></i>Signed Tenancy Contract.pdf</span>
                  <span className="badge bg-success">Verified</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ledger' && (
            <div>
              <h5 className="fw-bold mb-3">Rent Ledger</h5>
              <table className="table table-striped">
                <thead>
                  <tr><th>Date</th><th>Description</th><th>Debit (AED)</th><th>Credit (AED)</th><th>Balance (AED)</th></tr>
                </thead>
                <tbody>
                  <tr><td>2026-07-01</td><td>Rent invoice INV-001</td><td>8,000</td><td>0</td><td>8,000</td></tr>
                  <tr><td>2026-07-01</td><td>Payment received for INV-001</td><td>0</td><td>8,000</td><td>0</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <h5 className="fw-bold mb-3">Payments History</h5>
              <table className="table table-hover">
                <thead>
                  <tr><th>Receipt #</th><th>Amount</th><th>Payment Date</th><th>Payment Method</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td><code>REC-88492</code></td><td>AED 8,000</td><td>2026-07-01</td><td>Credit Card</td><td><span className="badge bg-success">Success</span></td></tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div>
              <h5 className="fw-bold mb-3">Maintenance Tickets</h5>
              <table className="table table-hover">
                <thead>
                  <tr><th>Ticket #</th><th>Issue</th><th>Created</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td><code>MT-001</code></td><td>AC not cooling</td><td>2026-07-15</td><td><span className="badge bg-warning">In Progress</span></td></tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'whatsapp' && (
            <div>
              <h5 className="fw-bold mb-3">WhatsApp Support Conversations Log</h5>
              <p className="text-muted">Linked conversation available on the Support/WhatsApp inbox screen.</p>
            </div>
          )}

          {activeTab === 'vacating' && (
            <div>
              <h5 className="fw-bold mb-3">Vacating Notice & Refunds Status</h5>
              <div className="alert alert-warning">Tenant has not submitted any vacating notice yet. Contract is active.</div>
            </div>
          )}
        </div>
      </div>
    </DashLayout>
  );
}
