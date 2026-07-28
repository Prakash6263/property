import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState('company');

  const tabs = [
    { id: 'company', label: 'Company Settings', icon: 'fe-briefcase' },
    { id: 'branches', label: 'Branches', icon: 'fe-git-branch' },
    { id: 'whatsapp', label: 'WhatsApp Configuration', icon: 'fe-message-circle' },
    { id: 'templates', label: 'Message Templates', icon: 'fe-file-text' },
    { id: 'calendar', label: 'Calendar Configuration', icon: 'fe-calendar' },
    { id: 'payment', label: 'Payment Configuration', icon: 'fe-credit-card' },
    { id: 'notifications', label: 'Notification Settings', icon: 'fe-bell' },
    { id: 'categories', label: 'Maintenance Categories', icon: 'fe-tool' },
    { id: 'reminders', label: 'Rent Reminders', icon: 'fe-clock' },
    { id: 'audit', label: 'Audit Logs', icon: 'fe-database' },
  ];

  return (
    <DashLayout>
      <PageHeader title="System Settings" sub="Administration" actions={
        <button className="btn btn-sm btn-turquoise" onClick={() => alert('Settings saved successfully!')}>
          <i className="fe fe-save me-1"></i>Save All Changes
        </button>
      } />

      <div className="row g-3">
        {/* Left tabs menu */}
        <div className="col-lg-3">
          <div className="card">
            <div className="card-body p-0">
              <div className="list-group list-group-flush" style={{ borderRadius: 12 }}>
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`list-group-item list-group-item-action border-0 d-flex align-items-center gap-2 py-3 px-4 ${activeTab === t.id ? 'active' : ''}`}
                    style={{
                      background: activeTab === t.id ? 'linear-gradient(90deg, #00B5AD, #00D2CB)' : 'transparent',
                      color: activeTab === t.id ? '#fff' : 'inherit',
                      fontSize: '0.88rem',
                      fontWeight: activeTab === t.id ? '600' : '400',
                      transition: 'all 0.2s',
                    }}
                  >
                    <i className={`fe ${t.icon}`} style={{ fontSize: '1rem' }}></i>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right content panel */}
        <div className="col-lg-9">
          <div className="card">
            <div className="card-body p-4">
              {activeTab === 'company' && (
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: '#002B5C' }}><i className="fe fe-briefcase me-2" style={{ color: '#00B5AD' }}></i>Company Profile Settings</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Company Name</label>
                      <input type="text" className="form-control" defaultValue="PropManager Real Estate" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Company Code</label>
                      <input type="text" className="form-control" defaultValue="PMRE" disabled />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Primary Email</label>
                      <input type="email" className="form-control" defaultValue="info@propmanager.com" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Contact Number</label>
                      <input type="text" className="form-control" defaultValue="+971 4 123 4567" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <textarea className="form-control" rows="2" defaultValue="Office 1204, Marina Plaza, Dubai Marina, Dubai, UAE"></textarea>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Default Currency</label>
                      <select className="form-select">
                        <option>AED - UAE Dirham</option>
                        <option>USD - US Dollar</option>
                        <option>SAR - Saudi Riyal</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Tax Registration Number (TRN)</label>
                      <input type="text" className="form-control" defaultValue="100234567800003" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'branches' && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0" style={{ color: '#002B5C' }}><i className="fe fe-git-branch me-2" style={{ color: '#00B5AD' }}></i>Branch Offices</h5>
                    <button className="btn btn-sm btn-turquoise rounded-pill"><i className="fe fe-plus me-1"></i>Add Branch</button>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Branch Name</th>
                          <th>Location</th>
                          <th>Manager</th>
                          <th>Contact</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Dubai Marina</strong></td>
                          <td>Marina Plaza</td>
                          <td>Sara Khalid</td>
                          <td>+971 4 111 2222</td>
                          <td><span className="badge badge-active">Active</span></td>
                          <td>
                            <button className="btn btn-sm btn-outline-secondary me-1"><i className="fe fe-edit"></i></button>
                            <button className="btn btn-sm btn-outline-danger"><i className="fe fe-trash"></i></button>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Downtown Dubai</strong></td>
                          <td>Boulevard Plaza</td>
                          <td>Mohammed Hassan</td>
                          <td>+971 4 222 3333</td>
                          <td><span className="badge badge-active">Active</span></td>
                          <td>
                            <button className="btn btn-sm btn-outline-secondary me-1"><i className="fe fe-edit"></i></button>
                            <button className="btn btn-sm btn-outline-danger"><i className="fe fe-trash"></i></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'whatsapp' && (
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: '#002B5C' }}><i className="fe fe-message-circle me-2" style={{ color: '#00B5AD' }}></i>WhatsApp Business API Config</h5>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="alert alert-info">
                        <i className="fe fe-info me-2"></i>Configure the connection to the WhatsApp Business API Cloud server to enable automated messages and live customer chat.
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number ID</label>
                      <input type="text" className="form-control" defaultValue="108447835692015" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">WhatsApp Business Account ID</label>
                      <input type="text" className="form-control" defaultValue="209846328710594" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Permanent Access Token</label>
                      <input type="password" className="form-control" defaultValue="EAAGx1826dh283h12938hdwajhsdgajshdg..." />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Webhook Verification Token</label>
                      <input type="text" className="form-control" defaultValue="verify_token_propmanager_2026" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Webhook Status</label>
                      <div className="d-flex align-items-center gap-2 mt-2">
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#25D366' }}></span>
                        <span className="fw-bold text-success">Connected</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'templates' && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0" style={{ color: '#002B5C' }}><i className="fe fe-file-text me-2" style={{ color: '#00B5AD' }}></i>Message Templates</h5>
                    <button className="btn btn-sm btn-turquoise rounded-pill"><i className="fe fe-plus me-1"></i>New Template</button>
                  </div>
                  <div className="list-group">
                    {[
                      { name: 'Rent Due Reminder', code: 'rent_reminder_v1', text: 'Dear {{1}}, your rent of {{2}} for Unit {{3}} is due on {{4}}. Please complete the payment.', status: 'Approved' },
                      { name: 'Maintenance Ticket Created', code: 'ticket_created_v1', text: 'Hello {{1}}, maintenance ticket #{{2}} has been successfully registered for issue: {{3}}.', status: 'Approved' },
                      { name: 'Viewing Confirmation', code: 'viewing_confirm_v1', text: 'Hi {{1}}, your viewing of {{2}} is scheduled for {{3}} with agent {{4}}.', status: 'Approved' },
                    ].map((tmp, idx) => (
                      <div key={idx} className="list-group-item p-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <h6 className="mb-0 fw-bold">{tmp.name} <code>({tmp.code})</code></h6>
                          <span className="badge bg-success">{tmp.status}</span>
                        </div>
                        <p className="text-muted mb-0 small">{tmp.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'calendar' && (
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: '#002B5C' }}><i className="fe fe-calendar me-2" style={{ color: '#00B5AD' }}></i>Calendar Integration</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-check form-switch mt-2">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                        <label className="form-check-label">Google Calendar Sync</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check form-switch mt-2">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                        <label className="form-check-label">Outlook Calendar Sync</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Working Hours Start</label>
                      <input type="time" className="form-control" defaultValue="09:00" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Working Hours End</label>
                      <input type="time" className="form-control" defaultValue="18:00" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Weekend Days</label>
                      <div className="d-flex gap-3">
                        <div className="form-check"><input className="form-check-input" type="checkbox" defaultChecked /><label className="form-check-label">Saturday</label></div>
                        <div className="form-check"><input className="form-check-input" type="checkbox" defaultChecked /><label className="form-check-label">Sunday</label></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: '#002B5C' }}><i className="fe fe-credit-card me-2" style={{ color: '#00B5AD' }}></i>Payment Gateways</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="card p-3 border">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold">Stripe</span>
                          <div className="form-check form-switch"><input className="form-check-input" type="checkbox" defaultChecked /></div>
                        </div>
                        <label className="form-label small">Publishable Key</label>
                        <input type="text" className="form-control form-control-sm mb-2" defaultValue="pk_live_51N..." />
                        <label className="form-label small">Secret Key</label>
                        <input type="password" className="form-control form-control-sm" defaultValue="sk_live_51N..." />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card p-3 border">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold">PayGate UAE</span>
                          <div className="form-check form-switch"><input className="form-check-input" type="checkbox" /></div>
                        </div>
                        <label className="form-label small">Merchant ID</label>
                        <input type="text" className="form-control form-control-sm mb-2" />
                        <label className="form-label small">Secure Secret</label>
                        <input type="password" className="form-control form-control-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: '#002B5C' }}><i className="fe fe-bell me-2" style={{ color: '#00B5AD' }}></i>Notification Rules</h5>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="list-group">
                        {[
                          { label: 'Notify Manager on new maintenance ticket', email: true, sms: false, wa: true },
                          { label: 'Send rent receipt automatically after approval', email: true, sms: false, wa: true },
                          { label: 'Notify admin on integration failure', email: true, sms: true, wa: false },
                          { label: 'Send booking confirmation to prospective tenant', email: true, sms: true, wa: true },
                        ].map((rule, idx) => (
                          <div key={idx} className="list-group-item d-flex justify-content-between align-items-center py-3">
                            <span style={{ fontSize: '0.88rem' }}>{rule.label}</span>
                            <div className="d-flex gap-2">
                              <label className="badge bg-light text-dark"><input type="checkbox" defaultChecked={rule.email} className="me-1" /> Email</label>
                              <label className="badge bg-light text-dark"><input type="checkbox" defaultChecked={rule.sms} className="me-1" /> SMS</label>
                              <label className="badge bg-light text-dark"><input type="checkbox" defaultChecked={rule.wa} className="me-1" /> WhatsApp</label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'categories' && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0" style={{ color: '#002B5C' }}><i className="fe fe-tool me-2" style={{ color: '#00B5AD' }}></i>Maintenance Categories</h5>
                    <button className="btn btn-sm btn-turquoise rounded-pill"><i className="fe fe-plus me-1"></i>New Category</button>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {['HVAC / Air Conditioning', 'Plumbing', 'Electrical', 'Carpentry', 'Painting & Masonry', 'Elevator', 'Fire Safety', 'Pest Control', 'Cleaning Services'].map((cat, idx) => (
                      <span key={idx} className="badge p-3 bg-light text-dark border d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }}>
                        <span>{cat}</span>
                        <i className="fe fe-x text-muted" style={{ cursor: 'pointer' }}></i>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reminders' && (
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: '#002B5C' }}><i className="fe fe-clock me-2" style={{ color: '#00B5AD' }}></i>Automated Rent Reminders</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">1st Reminder Date</label>
                      <select className="form-select">
                        <option>7 days before due date</option>
                        <option>10 days before due date</option>
                        <option>15 days before due date</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">2nd Reminder Date</label>
                      <select className="form-select">
                        <option>3 days before due date</option>
                        <option>5 days before due date</option>
                        <option>1 day before due date</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Overdue Reminder Interval</label>
                      <select className="form-select">
                        <option>Every 3 days after due date</option>
                        <option>Every 5 days after due date</option>
                        <option>Weekly after due date</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Reminder Channel Priority</label>
                      <select className="form-select">
                        <option>WhatsApp, fallback to Email</option>
                        <option>Email only</option>
                        <option>WhatsApp only</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'audit' && (
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: '#002B5C' }}><i className="fe fe-database me-2" style={{ color: '#00B5AD' }}></i>System Audit Logs</h5>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Timestamp</th>
                          <th>User</th>
                          <th>Action</th>
                          <th>IP Address</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ fontSize: '0.8rem' }}>2026-07-16 14:10:35</td>
                          <td><strong>Ahmad Al-Rashid</strong> (Admin)</td>
                          <td><span className="badge bg-primary">LOGIN</span></td>
                          <td><code>192.168.1.110</code></td>
                          <td>Successful Admin log in</td>
                        </tr>
                        <tr>
                          <td style={{ fontSize: '0.8rem' }}>2026-07-16 13:45:12</td>
                          <td><strong>Sara Khalid</strong> (Manager)</td>
                          <td><span className="badge bg-success">UPDATE_PROPERTY</span></td>
                          <td><code>192.168.1.115</code></td>
                          <td>Updated Rent for Unit 302 / Marina Heights</td>
                        </tr>
                        <tr>
                          <td style={{ fontSize: '0.8rem' }}>2026-07-16 12:20:04</td>
                          <td><strong>System Agent</strong></td>
                          <td><span className="badge bg-info">AUTO_BATCH</span></td>
                          <td><code>localhost</code></td>
                          <td>Sent 45 automated WhatsApp reminders</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
