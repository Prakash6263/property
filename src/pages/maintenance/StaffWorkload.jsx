import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

const STAFF = [
  { name: 'Khalid Ibrahim', spec: 'HVAC / AC', properties: 'Marina Heights', jobs: 3, avail: 'Available', rating: 4.8, speed: '2.5h' },
  { name: 'Ali Hassan', spec: 'Plumbing', properties: 'JBR Apartments', jobs: 1, avail: 'On Duty', rating: 4.6, speed: '3.1h' },
  { name: 'Yousef Ahmed', spec: 'Electrical', properties: 'Al Barsha Villa', jobs: 0, avail: 'Available', rating: 4.9, speed: '1.8h' },
  { name: 'Sajid Khan', spec: 'Painting & Masonry', properties: 'Downtown Business Tower', jobs: 5, avail: 'Busy', rating: 4.2, speed: '4.5h' },
];

export default function StaffWorkload() {
  const [filterSpec, setFilterSpec] = useState('All');

  const specs = ['All', 'HVAC / AC', 'Plumbing', 'Electrical', 'Painting & Masonry'];

  const filtered = STAFF.filter(s => filterSpec === 'All' || s.spec === filterSpec);

  return (
    <DashLayout>
      <PageHeader title="Staff Workload & Assignment" sub="Maintenance Staff Management" actions={
        <button className="btn btn-sm btn-turquoise"><i className="fe fe-calendar me-1"></i>View Workload Calendar</button>
      } />

      {/* Specialization Filter */}
      <div className="card mb-3">
        <div className="card-body py-2">
          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted fw-bold me-2">Specialization:</span>
            {specs.map(sp => (
              <button key={sp} className={`btn btn-sm ${filterSpec === sp ? 'btn-primary-navy' : 'btn-outline-secondary'}`}
                onClick={() => setFilterSpec(sp)} style={{ fontSize: '0.78rem' }}>{sp}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="row g-3">
        {filtered.map((staff, idx) => (
          <div key={idx} className="col-md-6">
            <div className="card staff-card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#002B5C,#00B5AD)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {staff.name.charAt(0)}
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">{staff.name}</h6>
                      <span className="badge bg-light text-dark small" style={{ fontSize: '0.7rem' }}>{staff.spec}</span>
                    </div>
                  </div>
                  <span className={`badge ${staff.avail === 'Available' ? 'bg-success' : staff.avail === 'Busy' ? 'bg-danger' : 'bg-warning'}`}>{staff.avail}</span>
                </div>

                <div className="row g-2 small text-muted mb-3">
                  <div className="col-6">Assigned Properties: <strong className="text-dark">{staff.properties}</strong></div>
                  <div className="col-6">Current Jobs: <strong className="text-dark">{staff.jobs} Active</strong></div>
                  <div className="col-6">Avg Completion Speed: <strong className="text-dark">{staff.speed}</strong></div>
                  <div className="col-6">Performance Rating: <strong className="text-dark">{staff.rating} / 5.0</strong></div>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary flex-grow-1"><i className="fe fe-calendar me-1"></i>View Tasks</button>
                  <button className="btn btn-sm btn-turquoise flex-grow-1"><i className="fe fe-plus-circle me-1"></i>Assign Task</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashLayout>
  );
}
