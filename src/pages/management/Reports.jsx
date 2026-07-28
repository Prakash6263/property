import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

const REPORTS = [
  { id: 'occupancy', label: 'Occupancy Report', desc: 'Detailed occupancy rates and vacancy trends.', icon: 'fe-home', color: '#00B5AD' },
  { id: 'rent', label: 'Rent Collection', desc: 'Monthly rent collection summaries and status.', icon: 'fe-dollar-sign', color: '#28a745' },
  { id: 'outstanding', label: 'Outstanding Balance', desc: 'Overdue tenant rent ledger balances.', icon: 'fe-alert-triangle', color: '#dc3545' },
  { id: 'revenue', label: 'Revenue Analysis', desc: 'Gross revenue, expenses, and net profit margins.', icon: 'fe-trending-up', color: '#6f42c1' },
  { id: 'maintenance', label: 'Maintenance Cost', desc: 'Maintenance ticket resolution speeds and costs.', icon: 'fe-tool', color: '#fd7e14' },
  { id: 'leads', label: 'Lead Conversion', desc: 'Conversion funnel analytics and agent stats.', icon: 'fe-users', color: '#004aad' },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('occupancy');
  const [propertyFilter, setPropertyFilter] = useState('All');
  const [dateRange, setDateRange] = useState('2026-07');

  return (
    <DashLayout>
      <PageHeader title="Reports & Analytics" sub="Management Analytics" actions={
        <>
          <button className="btn btn-sm btn-outline-danger"><i className="fe fe-file-text me-1"></i>Export PDF</button>
          <button className="btn btn-sm btn-success"><i className="fe fe-download me-1"></i>Export Excel</button>
        </>
      } />

      {/* Filter panel */}
      <div className="card mb-4">
        <div className="card-body py-2">
          <div className="row g-2 align-items-center">
            <div className="col-md-3">
              <label className="form-label small mb-1">Select Property</label>
              <select className="form-select form-select-sm" value={propertyFilter} onChange={e => setPropertyFilter(e.target.value)}>
                <option value="All">All Properties</option>
                <option>Marina Heights</option>
                <option>Al Barsha Villa Complex</option>
                <option>Downtown Business Tower</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small mb-1">Date Period</label>
              <input type="month" className="form-control form-control-sm" value={dateRange} onChange={e => setDateRange(e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label small mb-1">Branch</label>
              <select className="form-select form-select-sm">
                <option>All Branches</option>
                <option>Dubai Marina</option>
                <option>Downtown Dubai</option>
              </select>
            </div>
            <div className="col-md-3 mt-4 text-end">
              <button className="btn btn-sm btn-turquoise w-100"><i className="fe fe-refresh-cw me-1"></i>Apply Filters</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {/* Left reports menu */}
        <div className="col-md-4">
          <div className="row g-2">
            {REPORTS.map(rep => (
              <div key={rep.id} className="col-12" onClick={() => setSelectedReport(rep.id)} style={{ cursor: 'pointer' }}>
                <div className="card mb-0 h-100" style={{ borderLeft: selectedReport === rep.id ? `4px solid ${rep.color}` : 'none' }}>
                  <div className="card-body py-3 d-flex align-items-center gap-3">
                    <span style={{ width: 36, height: 36, borderRadius: '50%', background: rep.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fe ${rep.icon}`} style={{ color: rep.color }}></i>
                    </span>
                    <div>
                      <h6 className="mb-0 fw-bold">{rep.label}</h6>
                      <p className="text-muted mb-0 small" style={{ fontSize: '0.78rem' }}>{rep.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right report detail/chart */}
        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                {REPORTS.find(r => r.id === selectedReport)?.label} Overview
              </h5>
              <span className="badge bg-light text-dark">{dateRange}</span>
            </div>
            <div className="card-body">
              {selectedReport === 'occupancy' && (
                <div>
                  <div className="row g-3 mb-4 text-center">
                    <div className="col-3">
                      <h3 className="fw-bold" style={{ color: '#002B5C' }}>83.8%</h3><span className="text-muted small">Occupancy Rate</span>
                    </div>
                    <div className="col-3">
                      <h3 className="fw-bold" style={{ color: '#28a745' }}>748</h3><span className="text-muted small">Occupied Units</span>
                    </div>
                    <div className="col-3">
                      <h3 className="fw-bold" style={{ color: '#6c757d' }}>108</h3><span className="text-muted small">Available Vacant</span>
                    </div>
                    <div className="col-3">
                      <h3 className="fw-bold" style={{ color: '#00B5AD' }}>856</h3><span className="text-muted small">Total Configured Units</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedReport === 'rent' && (
                <div>
                  <div className="row g-3 mb-4 text-center">
                    <div className="col-4">
                      <h3>AED 2.1M</h3><span className="text-muted small">Collected Rent</span>
                    </div>
                    <div className="col-4">
                      <h3>AED 320K</h3><span className="text-muted small">Outstanding</span>
                    </div>
                    <div className="col-4">
                      <h3>87.5%</h3><span className="text-muted small">Collection Rate</span>
                    </div>
                  </div>
                  <div style={{ height: 180, background: '#f8f9fa', borderRadius: 8, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '16px' }}>
                    {[1.2, 1.4, 1.6, 1.8, 2.0, 2.1].map((val, idx) => (
                      <div key={idx} className="d-flex flex-column align-items-center" style={{ width: '12%' }}>
                        <span className="small fw-bold" style={{ fontSize: '0.7rem' }}>{val}M</span>
                        <div style={{ width: '100%', height: `${val * 60}px`, background: '#28a745', borderRadius: '4px 4px 0 0' }}></div>
                        <span className="text-muted small" style={{ fontSize: '0.68rem', marginTop: 4 }}>Feb +{idx}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedReport !== 'occupancy' && selectedReport !== 'rent' && (
                <div className="text-center py-5">
                  <i className="fe fe-bar-chart-2" style={{ fontSize: '3rem', color: '#00B5AD', opacity: 0.5 }}></i>
                  <h6 className="mt-2 text-muted">Chart preview and analytics tables populate dynamically when database is synced.</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
