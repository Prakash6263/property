import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

const VIEWINGS = [
  { id: 'VW-1001', customer: 'Ahmed Al-Mansoori', property: 'Marina Heights 302', time: '2026-07-18 10:00 AM', status: 'Scheduled', feedback: 'Pending viewing' },
  { id: 'VW-1002', customer: 'Priya Sharma', property: 'JBR Apartments 115', time: '2026-07-18 02:00 PM', status: 'Confirmed', feedback: 'Customer confirmed arrival' },
  { id: 'VW-1003', customer: 'David Chen', property: 'Downtown Business Tower B-1204', time: '2026-07-16 11:30 AM', status: 'Completed', feedback: 'Liked the unit, checking deposit' },
  { id: 'VW-1004', customer: 'Maria Santos', property: 'Al Barsha Villa V-08', time: '2026-07-15 03:00 PM', status: 'Cancelled', feedback: 'Rescheduled to next week' },
];

export default function ViewingBooking() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = VIEWINGS.filter(v => statusFilter === 'All' || v.status === statusFilter);

  return (
    <DashLayout>
      <PageHeader title="Viewing & Booking Management" sub="Leasing Pipeline" actions={
        <button className="btn btn-sm btn-turquoise" onClick={() => setShowAddForm(true)}>
          <i className="fe fe-plus me-1"></i>Schedule Viewing
        </button>
      } />

      <div className="row g-3">
        {/* Scheduled list and filter */}
        <div className="col-lg-8">
          <div className="card mb-3">
            <div className="card-body py-2">
              <div className="d-flex gap-2">
                {['All', 'Scheduled', 'Confirmed', 'Completed', 'Cancelled'].map(st => (
                  <button key={st} className={`btn btn-sm ${statusFilter === st ? 'btn-primary-navy' : 'btn-outline-secondary'}`}
                    onClick={() => setStatusFilter(st)} style={{ fontSize: '0.78rem' }}>{st}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h5 className="card-title mb-0">Scheduled Viewings</h5></div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer Name</th>
                      <th>Property & Unit</th>
                      <th>Time Slot</th>
                      <th>Status</th>
                      <th>Customer Feedback</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((vw, idx) => (
                      <tr key={idx}>
                        <td><code>{vw.id}</code></td>
                        <td><strong>{vw.customer}</strong></td>
                        <td>{vw.property}</td>
                        <td style={{ fontSize: '0.82rem' }}>{vw.time}</td>
                        <td>
                          <span className={`badge ${
                            vw.status === 'Completed' ? 'bg-success' :
                            vw.status === 'Confirmed' ? 'bg-info' :
                            vw.status === 'Cancelled' ? 'bg-danger' : 'bg-warning'
                          }`}>{vw.status}</span>
                        </td>
                        <td className="small text-muted">{vw.feedback}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <button className="btn btn-sm btn-outline-success" title="Mark Completed"><i className="fe fe-check"></i></button>
                            <button className="btn btn-sm btn-outline-danger" title="Cancel"><i className="fe fe-x"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar availability info */}
        <div className="col-lg-4">
          <div className="card mb-3">
            <div className="card-header"><h6 className="card-title mb-0">Agent Availability Status</h6></div>
            <div className="card-body py-2 small">
              <div className="d-flex justify-content-between mb-2"><span>Yasmine Tariq (Agent 1)</span><span className="text-success fw-bold">Available</span></div>
              <div className="d-flex justify-content-between mb-2"><span>Omar Yusuf (Agent 2)</span><span className="text-warning fw-bold">On Viewing</span></div>
            </div>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="modal show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: 16 }}>
              <div className="modal-header" style={{ background: 'linear-gradient(90deg,#002B5C,#00B5AD)' }}>
                <h5 className="modal-title text-white">Schedule Viewing Form</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowAddForm(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Prospect Customer</label>
                    <input className="form-control" defaultValue="Ahmed Al-Mansoori" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Select Unit</label>
                    <select className="form-select">
                      <option>Marina Heights 302</option>
                      <option>JBR Apartments 115</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" defaultValue="2026-07-18" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Time</label>
                    <input type="time" className="form-control" defaultValue="10:00" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Assigned Agent</label>
                    <select className="form-select">
                      <option>Yasmine Tariq</option>
                      <option>Omar Yusuf</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                <button className="btn btn-turquoise" onClick={() => setShowAddForm(false)}>Schedule</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
