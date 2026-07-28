import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

const DEPOSITS = [
  { id: 'DP-001', tenant: 'David Chen', property: 'Downtown Business Tower B-1204', deposit: 40000, outstanding: 0, deduction: 3500, refund: 36500, status: 'Pending Approval' },
];

export default function DepositsRefunds() {
  const [deductions, setDeductions] = useState(3500);

  return (
    <DashLayout>
      <PageHeader title="Deposits & Refund Management" sub="Lease Closures" />

      <div className="row g-3">
        {/* Left Column: Refunds awaiting review */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header"><h5 className="card-title mb-0">Pending Refund Approvals</h5></div>
            <div className="card-body">
              {DEPOSITS.map((dep, idx) => (
                <div key={idx} className="card p-3 border mb-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="fw-bold text-primary">{dep.tenant}</h6>
                      <p className="small text-muted mb-0">{dep.property}</p>
                    </div>
                    <span className="badge bg-warning">{dep.status}</span>
                  </div>

                  <div className="row g-2 small my-3 text-muted">
                    <div className="col-6">Original Deposit: <strong className="text-dark">AED {dep.deposit}</strong></div>
                    <div className="col-6">Outstanding Balance: <strong className="text-dark">AED {dep.outstanding}</strong></div>
                    <div className="col-6">Damage Deductions: <strong className="text-dark">AED {deductions}</strong></div>
                    <div className="col-6">Final Refund Amount: <strong className="text-success">AED {dep.deposit - deductions}</strong></div>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Add Damage Deduction Amount (AED)</label>
                    <div className="input-group input-group-sm" style={{ width: 220 }}>
                      <input type="number" className="form-control" value={deductions} onChange={e => setDeductions(Number(e.target.value))} />
                      <button className="btn btn-turquoise" onClick={() => alert('Deduction updated!')}>Update</button>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-success px-3" onClick={() => alert('Refund approved!')}><i className="fe fe-check me-1"></i>Approve Refund</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => alert('Refund rejected')}><i className="fe fe-x me-1"></i>Reject</button>
                    <button className="btn btn-sm btn-outline-warning" onClick={() => alert('Changes requested')}><i className="fe fe-edit me-1"></i>Request Changes</button>
                    <button className="btn btn-sm btn-turquoise px-3" onClick={() => alert('Payment processed')}><i className="fe fe-dollar-sign me-1"></i>Process Refund Payment</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Move-out Inspection Summary */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header"><h6 className="card-title mb-0">Move-out Inspection Summary</h6></div>
            <div className="card-body small">
              <p><strong>Inspection Status:</strong> Completed ✓</p>
              <p><strong>Inspector:</strong> Sara Khalid</p>
              <p><strong>Deduction details:</strong> Living room wall paint touch-up (AED 1,500), bedroom ceiling light replacement (AED 2,000).</p>
              <button className="btn btn-sm btn-outline-secondary w-100"><i className="fe fe-eye me-1"></i>View Inspection Report</button>
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
