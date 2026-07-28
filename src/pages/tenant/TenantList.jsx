import React, { useState } from 'react';
import { DashLayout, KPICard, PageHeader } from '../../components/common/DashboardComponents';
import { useNavigate } from 'react-router-dom';

const kpis = [
  { title: 'Total Tenants', value: '312', icon: 'fa-solid fa-users', colorClass: 'card-blue', trend: 8 },
  { title: 'Active Contracts', value: '298', icon: 'fa-solid fa-file-contract', colorClass: 'card-green', trend: 5 },
  { title: 'Expiring Soon', value: '18', icon: 'fa-solid fa-calendar-xmark', colorClass: 'card-orange', sub: 'Next 30 days' },
  { title: 'Overdue Rent', value: '24', icon: 'fa-solid fa-circle-exclamation', colorClass: 'card-pink', trend: -12 },
];

const TENANTS = [
  { id: 'T001', name: 'Ahmed Al-Mansoori', phone: '+971 50 111 2222', property: 'Marina Heights', unit: '302', rent: 8000, start: '2025-01-01', end: '2026-12-31', payment: 'Paid', status: 'Active' },
  { id: 'T002', name: 'Priya Sharma', phone: '+971 55 222 3333', property: 'JBR Apartments', unit: '115', rent: 12000, start: '2025-03-15', end: '2026-03-14', payment: 'Overdue', status: 'Active' },
  { id: 'T003', name: 'David Chen', phone: '+971 52 333 4444', property: 'Downtown Tower', unit: 'B-1204', rent: 20000, start: '2024-09-01', end: '2025-08-31', payment: 'Paid', status: 'Vacating' },
  { id: 'T004', name: 'Maria Santos', phone: '+971 58 444 5555', property: 'Al Barsha Villa', unit: 'V-08', rent: 6500, start: '2025-05-01', end: '2026-04-30', payment: 'Partial', status: 'Active' },
  { id: 'T005', name: 'John Williams', phone: '+971 54 555 6666', property: 'Silicon Oasis', unit: 'SO-422', rent: 5000, start: '2025-07-01', end: '2026-06-30', payment: 'Paid', status: 'Active' },
];

const PAYMENT_COLORS = { Paid: '#28a745', Overdue: '#dc3545', Partial: '#ffc107', Unpaid: '#dc3545' };
const STATUS_COLORS = { Active: '#00B5AD', Vacating: '#fd7e14', Inactive: '#6c757d' };

export default function TenantList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');

  const filtered = TENANTS.filter(t =>
    (statusFilter === 'All' || t.status === statusFilter) &&
    (paymentFilter === 'All' || t.payment === paymentFilter) &&
    (t.name.toLowerCase().includes(search.toLowerCase()) || t.unit.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashLayout>
      <PageHeader title="Tenant Management" sub="Tenant List" actions={
        <button onClick={() => navigate('/tenant/add')} className="btn btn-sm btn-turquoise" style={{ borderRadius: 20 }}>
          <i className="fe fe-user-plus me-1"></i>Add Tenant
        </button>
      } />

      <div className="row g-3 mb-4">
        {kpis.map((k, i) => (
          <div key={i} className="col-xl-3 col-sm-6 col-12"><KPICard {...k} /></div>
        ))}
      </div>

      {/* Filters */}
      <div className="card mb-3">
        <div className="card-body py-2">
          <div className="row g-2 align-items-center">
            <div className="col-md-3">
              <div className="input-group input-group-sm">
                <input type="text" className="form-control" placeholder="Search tenant/unit..." value={search} onChange={e => setSearch(e.target.value)} />
                <span className="input-group-text"><i className="fe fe-search"></i></span>
              </div>
            </div>
            <div className="col-md-2">
              <select className="form-select form-select-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option><option>Active</option><option>Vacating</option><option>Inactive</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select form-select-sm" value={paymentFilter} onChange={e => setPaymentFilter(e.target.value)}>
                <option value="All">All Payments</option><option>Paid</option><option>Overdue</option><option>Partial</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select form-select-sm"><option>All Properties</option><option>Marina Heights</option><option>JBR Apartments</option></select>
            </div>
            <div className="col-md-2">
              <input type="month" className="form-control form-control-sm" placeholder="Contract Expiry" />
            </div>
            <div className="col-md-1">
              <button className="btn btn-sm btn-outline-secondary w-100"><i className="fe fe-refresh-cw"></i></button>
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Table */}
      <div className="card">
        <div className="card-header"><h5 className="card-title mb-0"><i className="fe fe-users me-2" style={{ color: '#00B5AD' }}></i>Tenants ({filtered.length})</h5></div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="thead-light">
                <tr>
                  <th>Tenant ID</th><th>Name</th><th>Phone</th><th>Property</th><th>Unit</th><th>Monthly Rent</th><th>Contract Start</th><th>Payment</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={i}>
                    <td><code>{t.id}</code></td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#002B5C,#00B5AD)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>{t.name.charAt(0)}</div>
                        <span className="fw-500">{t.name}</span>
                      </div>
                    </td>
                    <td>{t.phone}</td>
                    <td>{t.property}</td>
                    <td><code>{t.unit}</code></td>
                    <td><strong>AED {t.rent.toLocaleString()}</strong></td>
                    <td>{t.start}</td>
                    <td><span className="badge" style={{ background: (PAYMENT_COLORS[t.payment] || '#6c757d') + '20', color: PAYMENT_COLORS[t.payment] || '#6c757d', fontSize: '0.72rem' }}>{t.payment}</span></td>
                    <td><span className="badge" style={{ background: (STATUS_COLORS[t.status] || '#6c757d') + '20', color: STATUS_COLORS[t.status] || '#6c757d', fontSize: '0.72rem' }}>{t.status}</span></td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-outline-primary" title="View" onClick={() => navigate('/tenant/details')}><i className="fe fe-eye"></i></button>
                        <button className="btn btn-sm btn-outline-secondary" title="Edit" onClick={() => navigate('/tenant/add')}><i className="fe fe-edit"></i></button>
                        <button className="btn btn-sm btn-outline-info" title="WhatsApp" onClick={() => navigate('/support/inbox')}><i className="fe fe-message-circle"></i></button>
                      </div>
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
