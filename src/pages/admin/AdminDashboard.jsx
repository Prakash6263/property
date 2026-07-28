import React from 'react';
import { DashLayout, KPICard, PageHeader } from '../../components/common/DashboardComponents';
import { Link } from 'react-router-dom';

const kpis = [
  { title: 'Total Users', value: '248', icon: 'fa-solid fa-users', colorClass: 'card-purple', trend: 12, sub: 'vs last month' },
  { title: 'Total Properties', value: '64', icon: 'fa-solid fa-building', colorClass: 'card-blue', trend: 5, sub: 'vs last month' },
  { title: 'Active Tenants', value: '312', icon: 'fa-solid fa-user-check', colorClass: 'card-green', trend: 8, sub: 'vs last month' },
  { title: 'Active Staff', value: '38', icon: 'fa-solid fa-id-badge', colorClass: 'card-pink', trend: -2, sub: 'vs last month' },
  { title: 'Open Maintenance', value: '29', icon: 'fa-solid fa-wrench', colorClass: 'card-orange', trend: -15, sub: 'tickets open' },
  { title: 'Pending Payments', value: 'AED 84,200', icon: 'fa-solid fa-clock-rotate-left', colorClass: 'card-purple', trend: -7, sub: 'to collect' },
  { title: 'Integrations Active', value: '4 / 6', icon: 'fa-solid fa-plug', colorClass: 'card-blue', sub: 'WhatsApp, SMS, Email...' },
  { title: 'System Uptime', value: '99.8%', icon: 'fa-solid fa-server', colorClass: 'card-green', sub: 'Last 30 days' },
];

const recentActivities = [
  { user: 'Sara Khalid', action: 'Added new property: Marina Heights', time: '5 min ago', icon: 'fe-home', color: '#00B5AD' },
  { user: 'Ahmed Al-Rashid', action: 'Updated WhatsApp template "Rent Reminder"', time: '18 min ago', icon: 'fe-message-circle', color: '#004aad' },
  { user: 'System', action: 'Automated rent reminders sent: 45 tenants', time: '1h ago', icon: 'fe-send', color: '#fd7e14' },
  { user: 'Omar Yusuf', action: 'Approved refund for Tenant #T-092: AED 3,200', time: '2h ago', icon: 'fe-dollar-sign', color: '#28a745' },
  { user: 'Layla Ahmed', action: 'Closed maintenance ticket #MT-072', time: '3h ago', icon: 'fe-check-circle', color: '#28a745' },
  { user: 'System', action: 'Backup completed successfully', time: '6h ago', icon: 'fe-database', color: '#6c757d' },
];

const integrationStatus = [
  { name: 'WhatsApp Business', status: 'Connected', icon: 'fe-message-circle', color: '#25D366' },
  { name: 'SMS Gateway', status: 'Connected', icon: 'fe-phone', color: '#00B5AD' },
  { name: 'Email SMTP', status: 'Connected', icon: 'fe-mail', color: '#004aad' },
  { name: 'Payment Gateway', status: 'Connected', icon: 'fe-credit-card', color: '#6f42c1' },
  { name: 'Document Storage', status: 'Warning', icon: 'fe-hard-drive', color: '#ffc107' },
  { name: 'AI Engine', status: 'Disconnected', icon: 'fe-cpu', color: '#dc3545' },
];

const alerts = [
  { type: 'danger', icon: 'fe-alert-triangle', msg: '3 tenants overdue by more than 30 days — Total: AED 12,400' },
  { type: 'warning', icon: 'fe-clock', msg: '8 contracts expiring within next 30 days' },
  { type: 'info', icon: 'fe-tool', msg: '5 maintenance tickets overdue (priority: high)' },
  { type: 'success', icon: 'fe-trending-up', msg: 'Occupancy rate increased by 3.2% this month' },
];

export default function AdminDashboard() {

  return (
    <DashLayout>
      <PageHeader
        title="Admin Dashboard"
        sub="Overview"
        actions={
          <>
            <button className="btn btn-sm btn-outline-secondary"><i className="fe fe-download me-1"></i>Export Report</button>
            <button className="btn btn-sm" style={{ background: 'linear-gradient(90deg,#00B5AD,#00D2CB)', color: '#fff', borderRadius: 20 }}>
              <i className="fe fe-plus me-1"></i>Quick Add
            </button>
          </>
        }
      />

      {/* Alerts */}
      <div className="row g-2 mb-3">
        {alerts.map((a, i) => (
          <div key={i} className="col-md-6">
            <div className={`alert alert-${a.type} mb-0 py-2 px-3 d-flex align-items-center gap-2`} style={{ fontSize: '0.83rem' }}>
              <i className={`fe ${a.icon}`}></i>{a.msg}
            </div>
          </div>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        {kpis.map((k, i) => (
          <div key={i} className="col-xl-3 col-sm-6 col-12">
            <KPICard {...k} />
          </div>
        ))}
      </div>

      <div className="row g-3">
        {/* Integration Status */}
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0"><i className="fe fe-plug me-2" style={{ color: '#00B5AD' }}></i>Integration Status</h5>
              <Link to="/admin/settings/company" className="text-decoration-none" style={{ fontSize: '0.82rem', color: '#00B5AD' }}>Configure</Link>
            </div>
            <div className="card-body p-0">
              {integrationStatus.map((s, i) => (
                <div key={i} className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ width: 32, height: 32, borderRadius: 8, background: s.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={`fe ${s.icon}`} style={{ color: s.color, fontSize: '0.85rem' }}></i>
                    </span>
                    <span style={{ fontSize: '0.85rem' }}>{s.name}</span>
                  </div>
                  <span className={`badge ${s.status === 'Connected' ? 'bg-success' : s.status === 'Warning' ? 'bg-warning text-dark' : 'bg-danger'}`} style={{ fontSize: '0.72rem' }}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0"><i className="fe fe-activity me-2" style={{ color: '#00B5AD' }}></i>Recent System Activity</h5>
              <button className="btn btn-sm btn-outline-secondary" style={{ fontSize: '0.78rem' }}>View All</button>
            </div>
            <div className="card-body">
              <div className="timeline">
                {recentActivities.map((a, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot" style={{ background: a.color, boxShadow: `0 0 0 2px ${a.color}` }}></div>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <p className="mb-0 fw-600" style={{ fontSize: '0.85rem' }}>{a.user}</p>
                        <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>{a.action}</p>
                      </div>
                      <span className="text-muted" style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', marginLeft: 12 }}>{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
