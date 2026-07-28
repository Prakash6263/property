import React, { useState } from 'react';
import { DashLayout, KPICard, PageHeader } from '../../components/common/DashboardComponents';
import { useNavigate } from 'react-router-dom';

const kpis = [
  { title: 'Expected Rent', value: 'AED 2.4M', icon: 'fa-solid fa-file-invoice-dollar', colorClass: 'card-blue' },
  { title: 'Rent Collected', value: 'AED 2.1M', icon: 'fa-solid fa-money-bill-wave', colorClass: 'card-green', trend: 9 },
  { title: 'Outstanding Rent', value: 'AED 320K', icon: 'fa-solid fa-circle-exclamation', colorClass: 'card-orange', trend: -18 },
  { title: 'Collection %', value: '87.5%', icon: 'fa-solid fa-percent', colorClass: 'card-purple', trend: 3 },
  { title: 'Overdue Invoices', value: '24', icon: 'fa-solid fa-file-excel', colorClass: 'card-pink', trend: -12 },
  { title: 'Pending Verification', value: '11', icon: 'fa-solid fa-hourglass-half', colorClass: 'card-blue' },
  { title: 'Deposits Held', value: 'AED 890K', icon: 'fa-solid fa-vault', colorClass: 'card-green' },
  { title: 'Pending Refunds', value: '7', icon: 'fa-solid fa-rotate-left', colorClass: 'card-pink' },
];

const INVOICES = [
  { no: 'INV-2026-001', tenant: 'Ahmed Al-M.', property: 'Marina Heights', due: '2026-07-01', total: 8000, paid: 8000, balance: 0, status: 'Paid' },
  { no: 'INV-2026-002', tenant: 'Priya Sharma', property: 'JBR Apartments', due: '2026-07-01', total: 12000, paid: 0, balance: 12000, status: 'Overdue' },
  { no: 'INV-2026-003', tenant: 'David Chen', property: 'Downtown Tower', due: '2026-07-01', total: 20000, paid: 20000, balance: 0, status: 'Paid' },
  { no: 'INV-2026-004', tenant: 'Maria Santos', property: 'Al Barsha', due: '2026-07-15', total: 6500, paid: 3250, balance: 3250, status: 'Partial' },
  { no: 'INV-2026-005', tenant: 'John Williams', property: 'Silicon Oasis', due: '2026-07-15', total: 5000, paid: 0, balance: 5000, status: 'Pending' },
];

const STATUS_COLORS = { Paid: '#28a745', Overdue: '#dc3545', Partial: '#ffc107', Pending: '#004aad' };

const PENDING_VERIFICATIONS = [
  { id: 'PV-001', tenant: 'Nour Al-Din', invoice: 'INV-2026-006', amount: 7500, method: 'Bank Transfer', ref: 'TRF-887654', submitted: '2026-07-16 10:30 AM' },
  { id: 'PV-002', tenant: 'Yasmine T.', invoice: 'INV-2026-007', amount: 4200, method: 'Cheque', ref: 'CHQ-001234', submitted: '2026-07-16 09:00 AM' },
];

export default function AccountsDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('invoices');

  return (
    <DashLayout>
      <PageHeader title="Accounts Dashboard" sub="Finance" actions={
        <button className="btn btn-sm btn-turquoise text-white" style={{ borderRadius: 20 }} onClick={() => navigate('/accounts/invoices')}>
          <i className="fe fe-plus me-1"></i>New Invoice
        </button>
      } />

      <div className="row g-3 mb-4">
        {kpis.map((k, i) => (
          <div key={i} className="col-xl-3 col-sm-6 col-12"><KPICard {...k} /></div>
        ))}
      </div>

      {/* Collection progress */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-1">
            <span className="fw-500">Monthly Collection Progress</span>
            <span className="fw-bold" style={{ color: '#00B5AD' }}>87.5%</span>
          </div>
          <div className="progress" style={{ height: 18, borderRadius: 10 }}>
            <div className="progress-bar" style={{ width: '87.5%', background: 'linear-gradient(90deg,#00B5AD,#00D2CB)', borderRadius: 10 }}></div>
          </div>
          <div className="d-flex justify-content-between mt-1">
            <span className="text-muted" style={{ fontSize: '0.78rem' }}>Collected: AED 2.1M</span>
            <span className="text-muted" style={{ fontSize: '0.78rem' }}>Outstanding: AED 320K</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-pills mb-3">
        {['invoices', 'verification', 'deposits'].map(t => (
          <li key={t} className="nav-item">
            <button className={`nav-link ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>
              {t === 'invoices' ? <><i className="fe fe-file-text me-1"></i>Invoices</> :
               t === 'verification' ? <><i className="fe fe-shield me-1"></i>Payment Verification <span className="badge bg-danger ms-1" style={{ fontSize: '0.65rem' }}>{PENDING_VERIFICATIONS.length}</span></> :
               <><i className="fe fe-archive me-1"></i>Deposits & Refunds</>}
            </button>
          </li>
        ))}
      </ul>

      {/* INVOICES */}
      {activeTab === 'invoices' && (
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="thead-light">
                  <tr><th>Invoice #</th><th>Tenant</th><th>Property</th><th>Due Date</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {INVOICES.map((inv, i) => (
                    <tr key={i}>
                      <td><code>{inv.no}</code></td>
                      <td>{inv.tenant}</td>
                      <td>{inv.property}</td>
                      <td>{inv.due}</td>
                      <td>AED {inv.total.toLocaleString()}</td>
                      <td style={{ color: '#28a745' }}>AED {inv.paid.toLocaleString()}</td>
                      <td style={{ color: inv.balance > 0 ? '#dc3545' : '#28a745' }}>AED {inv.balance.toLocaleString()}</td>
                      <td><span className="badge" style={{ background: (STATUS_COLORS[inv.status] || '#6c757d') + '20', color: STATUS_COLORS[inv.status] || '#6c757d', fontSize: '0.72rem' }}>{inv.status}</span></td>
                      <td>
                        <div className="d-flex gap-1">
                          <button className="btn btn-sm btn-outline-primary" title="View Details" onClick={() => navigate('/accounts/invoices')}><i className="fe fe-eye"></i></button>
                          <button className="btn btn-sm btn-outline-secondary" title="Send Reminder"><i className="fe fe-send"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT VERIFICATION */}
      {activeTab === 'verification' && (
        <div className="row g-3">
          {PENDING_VERIFICATIONS.map((pv, i) => (
            <div key={i} className="col-md-6">
              <div className="card" style={{ borderLeft: '4px solid #ffc107' }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <code className="fw-bold">{pv.id}</code>
                    <span className="badge badge-pending">Pending Verification</span>
                  </div>
                  <div className="row g-1 mb-3" style={{ fontSize: '0.85rem' }}>
                    <div className="col-6"><span className="text-muted">Tenant:</span> <strong>{pv.tenant}</strong></div>
                    <div className="col-6"><span className="text-muted">Invoice:</span> <code>{pv.invoice}</code></div>
                    <div className="col-6"><span className="text-muted">Amount:</span> <strong style={{ color: '#00B5AD' }}>AED {pv.amount.toLocaleString()}</strong></div>
                    <div className="col-6"><span className="text-muted">Method:</span> {pv.method}</div>
                    <div className="col-6"><span className="text-muted">Ref:</span> <code>{pv.ref}</code></div>
                    <div className="col-6"><span className="text-muted">Submitted:</span> {pv.submitted}</div>
                  </div>
                  {/* Receipt preview placeholder */}
                  <div style={{ height: 80, background: '#f9f9f9', borderRadius: 8, border: '2px dashed #dee2e6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}><i className="fe fe-image me-1"></i>Receipt Preview</span>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-success flex-grow-1" onClick={() => navigate('/accounts/invoices')}><i className="fe fe-check me-1"></i>Verify Details</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => alert('Verification rejected')}><i className="fe fe-x me-1"></i>Reject</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DEPOSITS */}
      {activeTab === 'deposits' && (
        <div className="card">
          <div className="card-body">
            <div className="alert alert-info"><i className="fe fe-info me-2"></i>Deposits & Refunds module — manage tenant security deposits, deductions, and refund approvals.</div>
            <table className="table table-hover">
              <thead className="thead-light">
                <tr><th>Tenant</th><th>Unit</th><th>Deposit</th><th>Outstanding</th><th>Deductions</th><th>Refund Amount</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>David Chen</td><td>B-1204</td><td>AED 40,000</td><td>AED 0</td><td>AED 3,500</td><td><strong style={{ color: '#28a745' }}>AED 36,500</strong></td>
                  <td><span className="badge-pending">Pending Approval</span></td>
                  <td>
                    <div className="d-flex gap-1">
                      <button className="btn btn-sm btn-success" onClick={() => navigate('/accounts/deposits')}>Approve</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => navigate('/accounts/deposits')}>Reject</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
