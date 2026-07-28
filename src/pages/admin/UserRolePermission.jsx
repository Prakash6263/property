import React, { useState } from 'react';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';

const USERS = [
  { id: 'U001', name: 'Sara Khalid', email: 'sara@pm.com', role: 'Property Manager', dept: 'Operations', status: 'Active', joined: '2024-01-15' },
  { id: 'U002', name: 'Omar Yusuf', email: 'omar@pm.com', role: 'Tenant Management', dept: 'Tenant Services', status: 'Active', joined: '2024-02-08' },
  { id: 'U003', name: 'Layla Ahmed', email: 'layla@pm.com', role: 'Maintenance Manager', dept: 'Maintenance', status: 'Active', joined: '2024-01-20' },
  { id: 'U004', name: 'Khalid Ibrahim', email: 'khalid@pm.com', role: 'Maintenance Staff', dept: 'Maintenance', status: 'Inactive', joined: '2024-03-05' },
  { id: 'U005', name: 'Nour Al-Din', email: 'nour@pm.com', role: 'Accounts Team', dept: 'Finance', status: 'Active', joined: '2024-01-10' },
  { id: 'U006', name: 'Yasmine Tariq', email: 'yasmine@pm.com', role: 'Support Team', dept: 'Customer Support', status: 'Active', joined: '2024-02-14' },
];

const PERMISSIONS = ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export', 'Assign'];
const MODULES = ['Dashboard', 'Properties', 'Tenants', 'Maintenance', 'Accounts', 'Reports', 'Settings'];

const ROLES_LIST = [
  { name: 'Admin', users: 1, color: '#dc3545' },
  { name: 'Property Manager', users: 4, color: '#004aad' },
  { name: 'Management', users: 2, color: '#6f42c1' },
  { name: 'Booking Team', users: 6, color: '#00B5AD' },
  { name: 'Tenant Management', users: 3, color: '#fd7e14' },
  { name: 'Maintenance Manager', users: 2, color: '#28a745' },
  { name: 'Maintenance Staff', users: 12, color: '#ffc107' },
  { name: 'Accounts Team', users: 3, color: '#17a2b8' },
  { name: 'Support Team', users: 5, color: '#6c757d' },
];

export default function UserRolePermission() {
  const [activeTab, setActiveTab] = useState('users');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Property Manager');

  const filteredUsers = USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashLayout>
      <PageHeader
        title="User, Role & Permission Management"
        sub="Administration"
        actions={
          <button className="btn btn-sm" style={{ background: 'linear-gradient(90deg,#00B5AD,#00D2CB)', color: '#fff', borderRadius: 20 }} onClick={() => setShowModal(true)}>
            <i className="fe fe-user-plus me-1"></i>Add User
          </button>
        }
      />

      {/* Tabs */}
      <ul className="nav nav-pills mb-4">
        {['users', 'roles', 'permissions'].map(t => (
          <li key={t} className="nav-item">
            <button className={`nav-link ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize' }}>
              {t === 'users' ? <><i className="fe fe-users me-1"></i>Users</> :
               t === 'roles' ? <><i className="fe fe-shield me-1"></i>Roles</> :
               <><i className="fe fe-lock me-1"></i>Permission Matrix</>}
            </button>
          </li>
        ))}
      </ul>

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">User List</h5>
            <div className="input-group" style={{ width: 260 }}>
              <input type="text" className="form-control form-control-sm" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
              <span className="input-group-text"><i className="fe fe-search"></i></span>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>User ID</th><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Status</th><th>Joined</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <tr key={i}>
                      <td><code>{u.id}</code></td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#002B5C,#00B5AD)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                            {u.name.charAt(0)}
                          </div>
                          <span>{u.name}</span>
                        </div>
                      </td>
                      <td>{u.email}</td>
                      <td><span className="badge" style={{ background: '#002B5C20', color: '#002B5C', fontSize: '0.72rem' }}>{u.role}</span></td>
                      <td>{u.dept}</td>
                      <td><span className={`badge-${u.status === 'Active' ? 'active' : 'blocked'}`}>{u.status}</span></td>
                      <td>{u.joined}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <button className="btn btn-sm btn-outline-primary" title="Edit"><i className="fe fe-edit"></i></button>
                          <button className="btn btn-sm btn-outline-warning" title="Toggle Status"><i className="fe fe-toggle-left"></i></button>
                          <button className="btn btn-sm btn-outline-danger" title="Delete"><i className="fe fe-trash-2"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ROLES TAB */}
      {activeTab === 'roles' && (
        <div className="row g-3">
          {ROLES_LIST.map((r, i) => (
            <div key={i} className="col-xl-3 col-md-4 col-sm-6">
              <div className="card" style={{ borderLeft: `4px solid ${r.color}` }}>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="fw-bold" style={{ fontSize: '0.9rem' }}>{r.name}</span>
                    <span className="badge" style={{ background: r.color + '20', color: r.color }}>{r.users} users</span>
                  </div>
                  <div className="d-flex gap-1 mt-2">
                    <button className="btn btn-sm btn-outline-primary" style={{ fontSize: '0.75rem' }}><i className="fe fe-edit me-1"></i>Edit</button>
                    <button className="btn btn-sm btn-outline-secondary" style={{ fontSize: '0.75rem' }}><i className="fe fe-lock me-1"></i>Permissions</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PERMISSION MATRIX */}
      {activeTab === 'permissions' && (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Permission Matrix</h5>
            <div className="d-flex align-items-center gap-2">
              <label className="mb-0 fw-500" style={{ fontSize: '0.85rem' }}>Role:</label>
              <select className="form-select form-select-sm" value={selectedRole} onChange={e => setSelectedRole(e.target.value)} style={{ width: 200 }}>
                {ROLES_LIST.map(r => <option key={r.name}>{r.name}</option>)}
              </select>
              <button className="btn btn-sm" style={{ background: 'linear-gradient(90deg,#00B5AD,#00D2CB)', color: '#fff' }}>Save Changes</button>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered perm-matrix mb-0">
                <thead className="thead-light">
                  <tr>
                    <th style={{ width: 160 }}>Module</th>
                    {PERMISSIONS.map(p => <th key={p}>{p}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {MODULES.map((m, i) => (
                    <tr key={i}>
                      <td className="fw-500">{m}</td>
                      {PERMISSIONS.map((p, j) => (
                        <td key={j}>
                          <div className="form-check form-switch d-flex justify-content-center">
                            <input className="form-check-input" type="checkbox" defaultChecked={Math.random() > 0.3} style={{ cursor: 'pointer' }} />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showModal && (
        <div className="modal show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content" style={{ borderRadius: 16 }}>
              <div className="modal-header" style={{ background: 'linear-gradient(90deg,#002B5C,#00B5AD)' }}>
                <h5 className="modal-title text-white"><i className="fe fe-user-plus me-2"></i>Add New User</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6"><label className="form-label">Full Name</label><input type="text" className="form-control" placeholder="Full Name" /></div>
                  <div className="col-md-6"><label className="form-label">Email</label><input type="email" className="form-control" placeholder="Email Address" /></div>
                  <div className="col-md-6"><label className="form-label">Phone</label><input type="tel" className="form-control" placeholder="Phone Number" /></div>
                  <div className="col-md-6"><label className="form-label">Role</label>
                    <select className="form-select">{ROLES_LIST.map(r => <option key={r.name}>{r.name}</option>)}</select>
                  </div>
                  <div className="col-md-6"><label className="form-label">Department</label><input type="text" className="form-control" placeholder="Department" /></div>
                  <div className="col-md-6"><label className="form-label">Status</label>
                    <select className="form-select"><option>Active</option><option>Inactive</option></select>
                  </div>
                  <div className="col-md-6"><label className="form-label">Password</label><input type="password" className="form-control" placeholder="Temporary Password" /></div>
                  <div className="col-md-6"><label className="form-label">Confirm Password</label><input type="password" className="form-control" placeholder="Confirm Password" /></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-turquoise">Create User</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
