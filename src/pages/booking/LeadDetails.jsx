import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

const MATCHED_PROPERTIES = [
  { name: 'Marina Heights 302', area: 'Dubai Marina', type: '2BHK Apartment', price: 'AED 8,000/mo', deposit: 'AED 8,000', avail: 'Immediately', match: '95%', img: 'fe-home', color: '#004aad' },
  { name: 'JBR Apartments 115', area: 'JBR', type: '2BHK Apartment', price: 'AED 12,000/mo', deposit: 'AED 12,000', avail: '2026-08-01', match: '80%', img: 'fe-home', color: '#6f42c1' },
];

export default function LeadDetails() {
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('2026-07-18');

  return (
    <DashLayout>
      <PageHeader title="Lead Details & Property Matching" sub="Lead: Ahmed Al-Mansoori" actions={
        <>
          <button className="btn btn-sm btn-outline-info"><i className="fe fe-message-circle me-1"></i>WhatsApp Customer</button>
          <button className="btn btn-sm btn-turquoise"><i className="fe fe-calendar me-1"></i>Schedule Viewing</button>
        </>
      } />

      <div className="row g-3">
        {/* Left Column: Customer Profile */}
        <div className="col-lg-4">
          <div className="card mb-3">
            <div className="card-header"><h6 className="card-title mb-0">Customer Profile</h6></div>
            <div className="card-body">
              <div className="text-center mb-3">
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#002B5C,#00B5AD)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.4rem', margin: '0 auto 8px' }}>
                  A
                </div>
                <h6 className="fw-bold mb-0">Ahmed Al-Mansoori</h6>
                <span className="text-muted small">+971 50 123 4567</span>
              </div>
              <div className="row g-2 small">
                <div className="col-5 text-muted">Lead Source:</div>
                <div className="col-7">WhatsApp Business</div>
                <div className="col-5 text-muted">Agent Assigned:</div>
                <div className="col-7">Yasmine Tariq</div>
                <div className="col-5 text-muted">Lead Status:</div>
                <div className="col-7"><span className="badge bg-primary">Qualified</span></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h6 className="card-title mb-0">Preferences & Requirements</h6></div>
            <div className="card-body small">
              <p><strong>Location:</strong> Dubai Marina or JBR</p>
              <p><strong>Property Type:</strong> 2BHK Apartment</p>
              <p><strong>Budget Limit:</strong> AED 8,500 / month</p>
              <p><strong>Expected Move-In:</strong> 2026-08-01</p>
              <p><strong>Amenities Preferred:</strong> Swimming Pool, Parking Space, Gym</p>
            </div>
          </div>
        </div>

        {/* Center Column: Property Matching */}
        <div className="col-lg-5">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0">Matched Properties</h6>
              <span className="badge bg-turquoise">2 matches found</span>
            </div>
            <div className="card-body">
              {MATCHED_PROPERTIES.map((prop, idx) => (
                <div key={idx} className="card p-3 border mb-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="fw-bold mb-1">{prop.name}</h6>
                      <p className="text-muted mb-0 small"><i className="fe fe-map-pin me-1"></i>{prop.area} · {prop.type}</p>
                    </div>
                    <span className="badge" style={{ background: '#28a74520', color: '#28a745' }}>{prop.match} Match</span>
                  </div>
                  <div className="row g-2 small text-muted mb-3">
                    <div className="col-6">Rent: <strong className="text-dark">{prop.price}</strong></div>
                    <div className="col-6">Deposit: <strong className="text-dark">{prop.deposit}</strong></div>
                    <div className="col-6">Available: <strong className="text-dark">{prop.avail}</strong></div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary flex-grow-1"><i className="fe fe-send me-1"></i>Send WhatsApp</button>
                    <button className="btn btn-sm btn-turquoise flex-grow-1"><i className="fe fe-calendar me-1"></i>Book Viewing</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interaction details & Follow Up */}
        <div className="col-lg-3">
          <div className="card mb-3">
            <div className="card-header"><h6 className="card-title mb-0">Next Follow-Up</h6></div>
            <div className="card-body">
              <input type="date" className="form-control form-control-sm mb-2" value={followUpDate} onChange={e => setFollowUpDate(e.target.value)} />
              <button className="btn btn-sm btn-turquoise w-100"><i className="fe fe-clock me-1"></i>Set Follow-up</button>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-header"><h6 className="card-title mb-0">Notes</h6></div>
            <div className="card-body">
              <textarea className="form-control form-control-sm mb-2" rows="3" placeholder="Add follow-up notes..." value={notes} onChange={e => setNotes(e.target.value)}></textarea>
              <button className="btn btn-sm btn-turquoise w-100" onClick={() => alert('Notes saved!')}>Save Notes</button>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h6 className="card-title mb-0">Activity Timeline</h6></div>
            <div className="card-body p-0" style={{ maxHeight: 200, overflowY: 'auto' }}>
              <div className="p-3">
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot" style={{ background: '#00B5AD' }}></div>
                    <div className="small">
                      <div className="fw-bold">Lead Created</div>
                      <span className="text-muted">July 16, 2026</span>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot" style={{ background: '#28a745' }}></div>
                    <div className="small">
                      <div className="fw-bold">Verified budget requirement</div>
                      <span className="text-muted">July 16, 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
