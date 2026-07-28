import React from 'react';
import { DashLayout, KPICard, PageHeader } from '../../components/common/DashboardComponents';

const kpis = [
  { title: 'Total Vacancies', value: '108', icon: 'fa-solid fa-door-open', colorClass: 'card-blue', trend: -5 },
  { title: 'Occupied Units', value: '748', icon: 'fa-solid fa-user-check', colorClass: 'card-green', trend: 8 },
  { title: 'Monthly Revenue', value: 'AED 2.4M', icon: 'fa-solid fa-sack-dollar', colorClass: 'card-purple', trend: 12 },
  { title: 'Rent Collected', value: 'AED 2.1M', icon: 'fa-solid fa-money-bill-wave', colorClass: 'card-pink', trend: 9 },
  { title: 'Outstanding Rent', value: 'AED 320K', icon: 'fa-solid fa-file-invoice-dollar', colorClass: 'card-orange', trend: -18 },
  { title: 'Collection %', value: '87.5%', icon: 'fa-solid fa-percent', colorClass: 'card-blue', trend: 3 },
  { title: 'Pending Maintenance', value: '29', icon: 'fa-solid fa-wrench', colorClass: 'card-pink', trend: -22 },
  { title: 'Viewings Today', value: '12', icon: 'fa-solid fa-calendar-check', colorClass: 'card-green', sub: '8 confirmed' },
];

const staffPerf = [
  { name: 'Yasmine T.', role: 'Support', leads: 48, bookings: 12, rating: 4.8, trend: 'up' },
  { name: 'Khalid I.', role: 'Maintenance', jobs: 38, avg: '2.3h', rating: 4.6, trend: 'up' },
  { name: 'Omar Y.', role: 'Tenant Mgmt', tenants: 95, renewed: 22, rating: 4.5, trend: 'same' },
  { name: 'Nour A.', role: 'Accounts', invoices: 210, collected: '98%', rating: 4.9, trend: 'up' },
];

export default function ManagementDashboard() {
  return (
    <DashLayout>
      <PageHeader title="Management Dashboard" sub="Overview" actions={
        <>
          <select className="form-select form-select-sm" style={{ width: 160 }}>
            <option>This Month</option><option>Last Month</option><option>This Quarter</option>
          </select>
          <button className="btn btn-sm" style={{ background: 'linear-gradient(90deg,#00B5AD,#00D2CB)', color: '#fff', borderRadius: 20 }}>
            <i className="fe fe-download me-1"></i>Export Report
          </button>
        </>
      } />

      <div className="row g-3 mb-4">
        {kpis.map((k, i) => (
          <div key={i} className="col-xl-3 col-sm-6 col-12"><KPICard {...k} /></div>
        ))}
      </div>

      {/* Charts row */}
      <div className="row g-3 mb-4">
        {[
          { title: 'Occupancy Trend', color: '#00B5AD', icon: 'fe-home' },
          { title: 'Rent Collection', color: '#004aad', icon: 'fe-dollar-sign' },
          { title: 'Maintenance Stats', color: '#fd7e14', icon: 'fe-tool' },
          { title: 'Lead Conversion', color: '#6f42c1', icon: 'fe-users' },
        ].map((chart, i) => (
          <div key={i} className="col-xl-3 col-md-6">
            <div className="card h-100">
              <div className="card-header"><h6 className="card-title mb-0"><i className={`fe ${chart.icon} me-2`} style={{ color: chart.color }}></i>{chart.title}</h6></div>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                {/* Donut chart placeholder */}
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: `conic-gradient(${chart.color} 0% 72%, #e9ecef 72% 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: 65, height: 65, borderRadius: '50%', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', color: chart.color }}>72%</div>
                </div>
                <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.8rem' }}>vs target 80%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Staff Performance */}
      <div className="card mb-4">
        <div className="card-header"><h5 className="card-title mb-0"><i className="fe fe-award me-2" style={{ color: '#00B5AD' }}></i>Staff Performance</h5></div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="thead-light">
                <tr><th>Staff</th><th>Role</th><th>Key Metric 1</th><th>Key Metric 2</th><th>Rating</th><th>Trend</th></tr>
              </thead>
              <tbody>
                {staffPerf.map((s, i) => (
                  <tr key={i}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#002B5C,#00B5AD)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>{s.name.charAt(0)}</div>
                        {s.name}
                      </div>
                    </td>
                    <td><span className="badge" style={{ background: '#004aad20', color: '#004aad', fontSize: '0.72rem' }}>{s.role}</span></td>
                    <td>{s.leads ? `${s.leads} Leads` : s.jobs ? `${s.jobs} Jobs` : s.tenants ? `${s.tenants} Tenants` : `${s.invoices} Invoices`}</td>
                    <td>{s.bookings ? `${s.bookings} Bookings` : s.avg ? `Avg: ${s.avg}` : s.renewed ? `${s.renewed} Renewed` : `Collected: ${s.collected}`}</td>
                    <td>
                      <div className="d-flex gap-1">
                        {[1,2,3,4,5].map(n => <i key={n} className={`fe fe-star${n <= Math.floor(s.rating) ? '' : '-empty'}`} style={{ color: '#ffc107', fontSize: '0.75rem' }}></i>)}
                        <span style={{ fontSize: '0.78rem' }}> {s.rating}</span>
                      </div>
                    </td>
                    <td>
                      <i className={`fe ${s.trend === 'up' ? 'fe-trending-up' : 'fe-minus'}`} style={{ color: s.trend === 'up' ? '#28a745' : '#6c757d' }}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
