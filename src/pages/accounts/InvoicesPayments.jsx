import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

const INVOICES = [
  { no: 'INV-2026-001', tenant: 'Ahmed Al-M.', property: 'Marina Heights', due: '2026-07-01', total: 8000, paid: 8000, balance: 0, status: 'Paid' },
  { no: 'INV-2026-002', tenant: 'Priya Sharma', property: 'JBR Apartments', due: '2026-07-01', total: 12000, paid: 0, balance: 12000, status: 'Overdue' },
];

const PAYMENTS = [
  { ref: 'TRF-984920', tenant: 'Ahmed Al-M.', method: 'Bank Transfer', amount: 8000, date: '2026-07-01', invoice: 'INV-2026-001' },
];

const VERIFICATIONS = [
  { id: 'PV-001', tenant: 'Nour Al-Din', invoice: 'INV-2026-006', amount: 7500, method: 'Bank Transfer', ref: 'TRF-887654', submitted: '2026-07-16 10:30 AM' },
];

export default function InvoicesPayments() {
  const [activeTab, setActiveTab] = useState('invoices');

  return (
    <DashLayout>
      <PageHeader title="Invoices & Rent Payments" sub="Finance Operations" actions={
        <button className="btn btn-sm btn-turquoise"><i className="fe fe-plus me-1"></i>Create Invoice</button>
      } />

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4" style={{ borderBottom: '2px solid #dee2e6' }}>
        {['invoices', 'payments', 'verification', 'ledger'].map(t => (
          <li key={t} className="nav-item">
            <button
              onClick={() => setActiveTab(t)}
              className={`nav-link border-0 ${activeTab === t ? 'active' : ''}`}
              style={{
                background: 'transparent',
                borderBottom: activeTab === t ? '3px solid #00B5AD' : 'none',
                color: activeTab === t ? '#00B5AD' : '#6c757d',
                fontWeight: activeTab === t ? '600' : '400',
                padding: '12px 16px',
                fontSize: '0.88rem',
              }}
            >
              {t === 'invoices' ? 'Invoices' :
               t === 'payments' ? 'Payments Log' :
               t === 'verification' ? 'Payment Verification' : 'Tenant Ledger'}
            </button>
          </li>
        ))}
      </ul>

      {/* Content */}
      <div className="card">
        <div className="card-body p-4">
          {activeTab === 'invoices' && (
            <div>
              <h5 className="fw-bold mb-3">All Invoices</h5>
              <table className="table table-hover">
                <thead>
                  <tr><th>Invoice #</th><th>Tenant</th><th>Property</th><th>Due Date</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {INVOICES.map((inv, idx) => (
                    <tr key={idx}>
                      <td><code>{inv.no}</code></td>
                      <td>{inv.tenant}</td>
                      <td>{inv.property}</td>
                      <td>{inv.due}</td>
                      <td>AED {inv.total}</td>
                      <td className="text-success">AED {inv.paid}</td>
                      <td className="text-danger">AED {inv.balance}</td>
                      <td><span className={`badge ${inv.status === 'Paid' ? 'bg-success' : 'bg-danger'}`}>{inv.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <h5 className="fw-bold mb-3">Recorded Payments Log</h5>
              <table className="table table-hover">
                <thead>
                  <tr><th>Ref Transaction</th><th>Tenant</th><th>Method</th><th>Amount</th><th>Date</th><th>Invoice</th></tr>
                </thead>
                <tbody>
                  {PAYMENTS.map((p, idx) => (
                    <tr key={idx}>
                      <td><code>{p.ref}</code></td>
                      <td>{p.tenant}</td>
                      <td>{p.method}</td>
                      <td><strong>AED {p.amount}</strong></td>
                      <td>{p.date}</td>
                      <td><code>{p.invoice}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'verification' && (
            <div>
              <h5 className="fw-bold mb-3">Pending Payment Verifications</h5>
              {VERIFICATIONS.map((pv, idx) => (
                <div key={idx} className="card p-3 border mb-3">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div style={{ height: 160, background: '#f5f5f5', border: '2px dashed #ddd', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fe fe-file-text text-muted" style={{ fontSize: '2.5rem' }}></i>
                        <span className="text-muted small mt-2">Receipt Preview</span>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <h6 className="fw-bold text-primary">{pv.tenant}</h6>
                      <p className="small text-muted mb-2">Invoice: <code>{pv.invoice}</code> · Submitted: {pv.submitted}</p>
                      <div className="row g-2 small mb-3">
                        <div className="col-6">Payment Amount: <strong>AED {pv.amount}</strong></div>
                        <div className="col-6">Method: <strong>{pv.method}</strong></div>
                        <div className="col-12">Transaction Reference: <code>{pv.ref}</code></div>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-success px-4" onClick={() => alert('Approved!')}><i className="fe fe-check me-1"></i>Approve</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => alert('Rejected!')}><i className="fe fe-x me-1"></i>Reject</button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => alert('Marked Duplicate')}><i className="fe fe-copy me-1"></i>Mark Duplicate</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ledger' && (
            <div>
              <h5 className="fw-bold mb-3">Tenant Ledger Statement</h5>
              <div className="alert alert-info">Select a tenant to view complete transaction statement.</div>
            </div>
          )}
        </div>
      </div>
    </DashLayout>
  );
}
