import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

export default function JobDetails() {
  const [jobStatus, setJobStatus] = useState('In Progress');
  const [showCompleteForm, setShowCompleteForm] = useState(false);

  const handleStart = () => {
    setJobStatus('In Progress');
    alert('Job status updated to In Progress.');
  };

  const handleCompleteSubmit = (e) => {
    e.preventDefault();
    setJobStatus('Completed');
    setShowCompleteForm(false);
    alert('Job has been successfully marked as Completed.');
  };

  return (
    <DashLayout>
      <PageHeader title="Job Details: MT-001" sub="AC not cooling" actions={
        <div className="d-flex gap-2">
          {jobStatus === 'New' && <button className="btn btn-sm btn-success" onClick={handleStart}>Accept & Start Work</button>}
          {jobStatus === 'In Progress' && (
            <button className="btn btn-sm btn-turquoise" onClick={() => setShowCompleteForm(true)}>
              <i className="fe fe-check-circle me-1"></i>Mark Completed
            </button>
          )}
          <button className="btn btn-sm btn-outline-secondary" onClick={() => alert('WhatsApp template sent to tenant.')}>
            <i className="fe fe-message-circle me-1"></i>Contact Tenant
          </button>
        </div>
      } />

      <div className="row g-3">
        {/* Left Panel: Job Details & Instructions */}
        <div className="col-lg-8">
          <div className="card mb-3">
            <div className="card-header"><h5 className="card-title mb-0">Job Information</h5></div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6"><strong>Property:</strong> Marina Heights</div>
                <div className="col-md-6"><strong>Unit Number:</strong> Unit 302</div>
                <div className="col-md-6"><strong>Location details:</strong> Floor 3, Apartment 302, Master Bedroom</div>
                <div className="col-md-6"><strong>Priority:</strong> <span className="priority-high">High</span></div>
                <div className="col-md-6"><strong>Tenant:</strong> Ahmed Al-Mansoori (+971 50 111 2222)</div>
                <div className="col-md-6"><strong>Deadline:</strong> Today 5:00 PM</div>
                <div className="col-12"><strong>Manager Instructions:</strong> Inspect unit compressor. Low refrigerant suspected. Replace components if necessary. Keep track of materials.</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h5 className="card-title mb-0">Complaint Photos</h5></div>
            <div className="card-body py-4 text-center text-muted small">
              <i className="fe fe-image" style={{ fontSize: '2rem' }}></i>
              <p className="mt-2 mb-0">No photos submitted with this request.</p>
            </div>
          </div>
        </div>

        {/* Right Panel: Status & Logs */}
        <div className="col-lg-4">
          <div className="card mb-3">
            <div className="card-header"><h6 className="card-title mb-0">Job Status</h6></div>
            <div className="card-body text-center">
              <h4 className="fw-bold" style={{ color: '#00B5AD' }}>{jobStatus}</h4>
              <span className="text-muted small">Assigned Staff: Khalid Ibrahim</span>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h6 className="card-title mb-0">Request Material</h6></div>
            <div className="card-body">
              <input type="text" className="form-control form-control-sm mb-2" placeholder="Material item name" />
              <input type="number" className="form-control form-control-sm mb-2" placeholder="Quantity" />
              <button className="btn btn-sm btn-turquoise w-100" onClick={() => alert('Request sent to supervisor.')}>
                Request Approval
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCompleteForm && (
        <div className="modal show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: 16 }}>
              <div className="modal-header" style={{ background: 'linear-gradient(90deg,#002B5C,#00B5AD)' }}>
                <h5 className="modal-title text-white">Complete Job: MT-001</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowCompleteForm(false)}></button>
              </div>
              <form onSubmit={handleCompleteSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Completion Notes</label>
                      <textarea className="form-control" rows="2" placeholder="Explain the fix..." required></textarea>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Work Duration (Hours)</label>
                      <input type="number" step="0.5" className="form-control" placeholder="1.5" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Materials Used</label>
                      <input className="form-control" placeholder="Capacitor, refrigerant..." />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Completion Photos</label>
                      <input type="file" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCompleteForm(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success">Mark Completed</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
