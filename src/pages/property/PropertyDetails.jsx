import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

export default function PropertyDetails() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fe-info' },
    { id: 'units', label: 'Units', icon: 'fe-grid' },
    { id: 'rooms', label: 'Rooms & Beds', icon: 'fe-layers' },
    { id: 'media', label: 'Media (Photos/Videos)', icon: 'fe-image' },
    { id: 'tenants', label: 'Tenants', icon: 'fe-users' },
    { id: 'maintenance', label: 'Maintenance', icon: 'fe-tool' },
    { id: 'financials', label: 'Financial Summary', icon: 'fe-dollar-sign' },
    { id: 'history', label: 'Activity History', icon: 'fe-activity' },
  ];

  return (
    <DashLayout>
      <PageHeader title="Marina Heights" sub="Dubai Marina · Property ID: P001" actions={
        <>
          <button className="btn btn-sm btn-outline-secondary"><i className="fe fe-edit me-1"></i>Edit Property</button>
          <button className="btn btn-sm btn-turquoise"><i className="fe fe-plus me-1"></i>Add Unit</button>
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
        <div className="card-body">
          {activeTab === 'overview' && (
            <div>
              <div className="row g-4">
                <div className="col-md-4">
                  <div style={{ height: 220, background: 'linear-gradient(135deg, #002B5C, #00B5AD)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fe fe-home text-white" style={{ fontSize: '4rem', opacity: 0.6 }}></i>
                  </div>
                </div>
                <div className="col-md-8">
                  <h4 className="fw-bold" style={{ color: '#002B5C' }}>Property Profile</h4>
                  <p className="text-muted"><i className="fe fe-map-pin me-1"></i>Dubai Marina, Dubai, United Arab Emirates</p>
                  <hr />
                  <div className="row g-3">
                    <div className="col-md-6"><strong>Property Code:</strong> <code>PM-MARINA-01</code></div>
                    <div className="col-md-6"><strong>Property Type:</strong> Residential Tower</div>
                    <div className="col-md-6"><strong>Assigned Manager:</strong> Sara Khalid</div>
                    <div className="col-md-6"><strong>Total Units:</strong> 120 Units</div>
                    <div className="col-md-6"><strong>Amenities:</strong> Gym, Swimming Pool, 24/7 Security, Parking</div>
                    <div className="col-md-6"><strong>Description:</strong> Luxury high-rise residential apartments with scenic views of Dubai Marina.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'units' && (
            <div>
              <h5 className="fw-bold mb-3">Units in Marina Heights</h5>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr><th>Unit #</th><th>Type</th><th>Monthly Rent</th><th>Status</th><th>Current Tenant</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>101</strong></td>
                      <td>1BHK Apartment</td>
                      <td>AED 6,500</td>
                      <td><span className="badge badge-occupied">Occupied</span></td>
                      <td>Nour Al-Din</td>
                      <td><button className="btn btn-sm btn-outline-primary"><i className="fe fe-eye"></i></button></td>
                    </tr>
                    <tr>
                      <td><strong>302</strong></td>
                      <td>2BHK Apartment</td>
                      <td>AED 8,000</td>
                      <td><span className="badge badge-occupied">Occupied</span></td>
                      <td>Ahmed Al-Mansoori</td>
                      <td><button className="btn btn-sm btn-outline-primary"><i className="fe fe-eye"></i></button></td>
                    </tr>
                    <tr>
                      <td><strong>405</strong></td>
                      <td>Studio Apartment</td>
                      <td>AED 4,200</td>
                      <td><span className="badge badge-vacant">Vacant</span></td>
                      <td>--</td>
                      <td><button className="btn btn-sm btn-outline-primary"><i className="fe fe-eye"></i></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'rooms' && (
            <div>
              <div className="alert alert-info">Manage individual rooms and bed allocations (ideal for student housing, shared spaces, or staff accommodation).</div>
              <h5 className="fw-bold mb-3">Beds & Rooms Availability</h5>
              <p className="text-muted">No bed allocations configured for this building.</p>
            </div>
          )}

          {activeTab === 'media' && (
            <div>
              <h5 className="fw-bold mb-3">Building Media Gallery</h5>
              <div className="row g-3">
                {[1, 2, 3].map(n => (
                  <div key={n} className="col-md-4">
                    <div style={{ height: 160, background: '#f5f5f5', border: '2px dashed #ddd', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <i className="fe fe-image text-muted" style={{ fontSize: '2rem' }}></i>
                      <span className="text-muted small mt-2">Upload Photo / Video</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tenants' && (
            <div>
              <h5 className="fw-bold mb-3">Active Tenants</h5>
              <table className="table table-hover">
                <thead>
                  <tr><th>Tenant ID</th><th>Name</th><th>Unit</th><th>Contract Expiry</th><th>Payment Status</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>T001</code></td>
                    <td>Ahmed Al-Mansoori</td>
                    <td>302</td>
                    <td>2026-12-31</td>
                    <td><span className="badge bg-success">Paid</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div>
              <h5 className="fw-bold mb-3">Active Maintenance Tickets</h5>
              <table className="table table-hover">
                <thead>
                  <tr><th>Ticket #</th><th>Issue</th><th>Unit</th><th>Priority</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>MT-001</code></td>
                    <td>AC not cooling</td>
                    <td>302</td>
                    <td><span className="priority-high">High</span></td>
                    <td><span className="badge bg-warning">In Progress</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'financials' && (
            <div>
              <h5 className="fw-bold mb-3">Property Financial Summary (Current Month)</h5>
              <div className="row g-3 text-center">
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded">
                    <h6 className="text-muted mb-1">Expected Rent</h6>
                    <h4 className="fw-bold text-primary">AED 960,000</h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded">
                    <h6 className="text-muted mb-1">Collected Rent</h6>
                    <h4 className="fw-bold text-success">AED 840,000</h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded">
                    <h6 className="text-muted mb-1">Outstanding Balance</h6>
                    <h4 className="fw-bold text-danger">AED 120,000</h4>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h5 className="fw-bold mb-3">Property History log</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0"><strong>2026-07-16:</strong> Maintenance job MT-001 started on Unit 302</li>
                <li className="list-group-item px-0"><strong>2026-07-15:</strong> Contract created for Nour Al-Din on Unit 101</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </DashLayout>
  );
}
