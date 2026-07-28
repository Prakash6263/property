import React from 'react';
import { useAuth, ROLE_LABELS } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleToggle = (e) => {
    e.preventDefault();
    document.body.classList.toggle('mini-sidebar');
    document.querySelectorAll('.submenu ul').forEach(ul => {
      if (document.body.classList.contains('mini-sidebar')) ul.style.display = '';
    });
  };

  const handleMobileToggle = (e) => {
    e.preventDefault();
    document.body.classList.toggle('slide-nav');
    let ov = document.querySelector('.sidebar-overlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.className = 'sidebar-overlay';
      document.body.appendChild(ov);
    }
    const close = () => {
      document.body.classList.remove('slide-nav');
      ov.removeEventListener('click', close);
      if (ov.parentNode) ov.parentNode.removeChild(ov);
    };
    ov.addEventListener('click', close);
  };


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="header header-one">
      <Link to="/dashboard" className="d-inline-flex d-sm-inline-flex align-items-center d-md-inline-flex d-lg-none align-items-center device-logo">
        <span className="fw-bold" style={{ color: '#00B5AD', fontSize: '1.2rem' }}>PM</span>
      </Link>

      <div className="main-logo d-inline float-start d-lg-flex align-items-center d-none d-sm-none d-md-none">
        <div className="logo-color">
          <Link to="/dashboard" className="d-flex align-items-center gap-2">
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#002B5C,#00B5AD)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fe fe-home text-white" style={{ fontSize: '1rem' }}></i>
            </div>
            <h4 className="img-fluid logo-blue text-white fw-bold mb-0">PropManager</h4>
          </Link>
        </div>
      </div>

      {/* Sidebar Toggle */}
      <a href="#" id="toggle_btn" onClick={handleToggle}>
        <span className="toggle-bars">
          <span className="bar-icons"></span>
          <span className="bar-icons"></span>
          <span className="bar-icons"></span>
          <span className="bar-icons"></span>
        </span>
      </a>

      {/* Mobile toggle */}
      <a className="mobile_btn" id="mobile_btn" onClick={handleMobileToggle} style={{ cursor: 'pointer' }}>
        <i className="fas fa-bars"></i>
      </a>

      {/* Right Header */}
      <ul className="nav nav-tabs user-menu">


        {/* Notifications */}
        <li className="nav-item dropdown">
          <a href="#" className="nav-link position-relative" data-bs-toggle="dropdown">
            <i className="fe fe-bell" style={{ fontSize: '1.2rem' }}></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>5</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end p-0" style={{ width: 320 }}>
            <div className="p-3 border-bottom">
              <h6 className="mb-0 fw-bold">Notifications <span className="badge" style={{ background: 'linear-gradient(90deg,#00B5AD,#00D2CB)', color: '#fff' }}>5 new</span></h6>
            </div>
            {[
              { icon: 'fe-home', text: 'Unit 302 lease expires in 7 days', time: '2 min ago', color: '#fd7e14' },
              { icon: 'fe-tool', text: 'Maintenance ticket #MT-084 assigned', time: '15 min ago', color: '#00B5AD' },
              { icon: 'fe-dollar-sign', text: 'Rent payment received from Tenant #45', time: '1h ago', color: '#28a745' },
              { icon: 'fe-user', text: 'New lead from WhatsApp: Ahmed Al-Rashid', time: '2h ago', color: '#004aad' },
              { icon: 'fe-alert-triangle', text: 'Overdue rent: Unit 115 - 3 days', time: '3h ago', color: '#dc3545' },
            ].map((n, i) => (
              <a key={i} href="#" className="dropdown-item py-2 px-3 border-bottom">
                <div className="d-flex align-items-start gap-2">
                  <span style={{ width: 32, height: 32, borderRadius: '50%', background: n.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={`fe ${n.icon}`} style={{ color: n.color, fontSize: '0.85rem' }}></i>
                  </span>
                  <div>
                    <div style={{ fontSize: '0.82rem', lineHeight: '1.3' }}>{n.text}</div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>{n.time}</div>
                  </div>
                </div>
              </a>
            ))}
            <div className="p-2 text-center">
              <a href="#" className="text-decoration-none" style={{ color: '#00B5AD', fontSize: '0.83rem' }}>View all notifications</a>
            </div>
          </div>
        </li>


        {/* User profile */}
        <li className="nav-item dropdown">
          <a href="#" className="user-link nav-link" data-bs-toggle="dropdown">
            <span className="user-img">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#002B5C,#00B5AD)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
              <span className="animate-circle"></span>
            </span>
            <span className="user-content">
              <span className="user-details">{ROLE_LABELS[user?.role] || 'User'}</span>
              <span className="user-name">{user?.name || 'User'}</span>
            </span>
          </a>
          <div className="dropdown-menu menu-drop-user">
            <div className="profilemenu">
              <div className="subscription-logout">
                <ul>
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      <i className="fe fe-user me-2"></i>My Profile
                    </Link>
                  </li>
                  <li className="pb-0">
                    <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                      <i className="fe fe-log-out me-2"></i>Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
