import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

const STEPS = [
  'Personal & Contact',
  'Identity & Unit',
  'Tenancy Terms & Deposit',
  'Emergency & Docs'
];

export default function AddTenant() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleSave = () => {
    alert('Tenant saved successfully!');
    window.location.href = '/tenant/list';
  };

  return (
    <DashLayout>
      <PageHeader title="Add New Tenant" sub="Tenant Management" />

      {/* Step Indicator */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="step-indicator">
            {STEPS.map((step, idx) => (
              <div key={idx} className={`step-item ${currentStep === idx ? 'active' : currentStep > idx ? 'completed' : ''}`}>
                {idx < STEPS.length - 1 && <div className="step-line"></div>}
                <div className="step-circle">{idx + 1}</div>
                <div className="step-label mt-2 small fw-bold" style={{ color: currentStep === idx ? '#00B5AD' : '#6c757d' }}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Forms */}
      <div className="card">
        <div className="card-body p-4">
          {currentStep === 0 && (
            <div>
              <h5 className="fw-bold mb-4" style={{ color: '#002B5C' }}>Personal & Contact Information</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="John Doe" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="john.doe@example.com" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" placeholder="+971 50 123 4567" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Nationality</label>
                  <input type="text" className="form-control" placeholder="Canadian" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h5 className="fw-bold mb-4" style={{ color: '#002B5C' }}>Identification Details & Unit Assignment</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Passport / ID Number</label>
                  <input type="text" className="form-control" placeholder="Passport number" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Visa Status</label>
                  <select className="form-select">
                    <option>Residence Visa</option>
                    <option>Tourist Visa</option>
                    <option>Student Visa</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Assign Property</label>
                  <select className="form-select">
                    <option>Marina Heights</option>
                    <option>Al Barsha Villa Complex</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Assign Unit</label>
                  <select className="form-select">
                    <option>Unit 302</option>
                    <option>Unit 405 (Vacant)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h5 className="fw-bold mb-4" style={{ color: '#002B5C' }}>Tenancy Terms & Deposit Details</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Contract Start Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Contract End Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Monthly Rent (AED)</label>
                  <input type="number" className="form-control" placeholder="8000" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Security Deposit (AED)</label>
                  <input type="number" className="form-control" placeholder="8000" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h5 className="fw-bold mb-4" style={{ color: '#002B5C' }}>Emergency Contact & Document Upload</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Emergency Contact Name</label>
                  <input type="text" className="form-control" placeholder="Jane Doe" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Emergency Contact Phone</label>
                  <input type="tel" className="form-control" placeholder="+971 55 123 4567" />
                </div>
                <div className="col-12">
                  <label className="form-label">Upload Documents (Passport, Visa Copy, Tenancy Contract)</label>
                  <div style={{ height: 120, background: '#f8f9fa', border: '2px dashed #ddd', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <i className="fe fe-upload-cloud text-muted" style={{ fontSize: '2rem' }}></i>
                    <span className="text-muted small mt-2">Click to select files or drag & drop</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="d-flex justify-content-between align-items-center mt-5 pt-3 border-top">
            <button className="btn btn-outline-secondary" onClick={handlePrev} disabled={currentStep === 0}>
              <i className="fe fe-chevron-left me-1"></i>Previous
            </button>
            {currentStep < STEPS.length - 1 ? (
              <button className="btn btn-turquoise" onClick={handleNext}>
                Next<i className="fe fe-chevron-right ms-1"></i>
              </button>
            ) : (
              <button className="btn btn-success" onClick={handleSave}>
                <i className="fe fe-save me-1"></i>Save Tenant Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
