import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../../context/AuthContext';

const ROLE_MENUS = {
  [ROLES.ADMIN]: [
    { label: 'Admin Dashboard', icon: 'fe fe-home', route: '/admin/dashboard', type: 'single' },
    {
      label: 'Properties', icon: 'fe fe-map-pin', type: 'menu', subs: [
        { label: 'Property List', route: '/property/list' },
        { label: 'Unit Management', route: '/property/units' }
      ]
    },
    {
      label: 'Tenants', icon: 'fe fe-users', type: 'menu', subs: [
        { label: 'Tenant List', route: '/tenant/list' },
        { label: 'Add Tenant', route: '/tenant/add' }
      ]
    },
    {
      label: 'Bookings & Leads', icon: 'fe fe-calendar', type: 'menu', subs: [
        { label: 'Lead Dashboard', route: '/booking/dashboard' },
        { label: 'Leads & Matching', route: '/booking/leads' },
        { label: 'Viewings Pipeline', route: '/booking/viewings' }
      ]
    },
    {
      label: 'Maintenance', icon: 'fa-solid fa-wrench', type: 'menu', subs: [
        { label: 'Maintenance Dashboard', route: '/maintenance/dashboard' },
        { label: 'Ticket Details', route: '/maintenance/tickets' },
        { label: 'Staff Workload', route: '/maintenance/staff' }
      ]
    },
    {
      label: 'Finance & Accounts', icon: 'fe fe-dollar-sign', type: 'menu', subs: [
        { label: 'Accounts Dashboard', route: '/accounts/dashboard' },
        { label: 'Invoices & Payments', route: '/accounts/invoices' },
        { label: 'Deposits & Refunds', route: '/accounts/deposits' }
      ]
    },
    {
      label: 'Management Overview', icon: 'fe fe-award', type: 'menu', subs: [
        { label: 'Management Dashboard', route: '/management/dashboard' },
        { label: 'Reports & Analytics', route: '/management/reports' },
        { label: 'AI Assistant', route: '/management/ai' }
      ]
    },
    { label: 'WhatsApp Live Inbox', icon: 'fe fe-message-circle', route: '/support/inbox', type: 'single' },
    { label: 'Shared Calendar', icon: 'fe fe-calendar', route: '/calendar', type: 'single' },
    {
      label: 'User & Role Management', icon: 'fe fe-user-check', type: 'menu', subs: [
        { label: 'User List', route: '/admin/users' },
        { label: 'Roles & Permissions', route: '/admin/roles' }
      ]
    },
    {
      label: 'System Settings', icon: 'fe fe-settings', type: 'menu', subs: [
        { label: 'Company Settings', route: '/admin/settings/company' },
        { label: 'WhatsApp Config', route: '/admin/settings/whatsapp' },
        { label: 'Payment Config', route: '/admin/settings/payment' },
        { label: 'Audit Logs', route: '/admin/settings/audit' }
      ]
    }
  ],
  [ROLES.PROPERTY_MANAGER]: [
    { label: 'Dashboard', icon: 'fe fe-home', route: '/property/dashboard', type: 'single' },
    {
      label: 'Properties', icon: 'fe fe-map-pin', type: 'menu', subs: [
        { label: 'Property List', route: '/property/list' },
        { label: 'Add Property', route: '/property/add' },
      ]
    },
    { label: 'Unit Management', icon: 'fe fe-grid', route: '/property/units', type: 'single' },
  ],
  [ROLES.MANAGEMENT]: [
    { label: 'Dashboard', icon: 'fe fe-home', route: '/management/dashboard', type: 'single' },
    { label: 'Reports & Analytics', icon: 'fe fe-bar-chart-2', route: '/management/reports', type: 'single' },
    { label: 'AI Assistant', icon: 'fe fe-cpu', route: '/management/ai', type: 'single' },
  ],
  [ROLES.BOOKING_TEAM]: [
    { label: 'Lead Dashboard', icon: 'fe fe-home', route: '/booking/dashboard', type: 'single' },
    { label: 'Lead Details', icon: 'fe fe-user-check', route: '/booking/leads', type: 'single' },
    { label: 'Viewings & Bookings', icon: 'fe fe-calendar', route: '/booking/viewings', type: 'single' },
    { label: 'Calendar', icon: 'fe fe-calendar', route: '/calendar', type: 'single' },
  ],
  [ROLES.TENANT_MANAGEMENT]: [
    { label: 'Tenant List', icon: 'fe fe-users', route: '/tenant/list', type: 'single' },
    { label: 'Add Tenant', icon: 'fe fe-user-plus', route: '/tenant/add', type: 'single' },
    { label: 'Calendar', icon: 'fe fe-calendar', route: '/calendar', type: 'single' },
  ],
  [ROLES.MAINTENANCE_MANAGER]: [
    { label: 'Dashboard', icon: 'fe fe-home', route: '/maintenance/dashboard', type: 'single' },
    { label: 'Ticket Details', icon: 'fe fe-clipboard', route: '/maintenance/tickets', type: 'single' },
    { label: 'Staff Workload', icon: 'fe fe-users', route: '/maintenance/staff', type: 'single' },
    { label: 'Calendar', icon: 'fe fe-calendar', route: '/calendar', type: 'single' },
  ],
  [ROLES.MAINTENANCE_STAFF]: [
    { label: 'My Tasks', icon: 'fe fe-check-square', route: '/mstaff/tasks', type: 'single' },
    { label: 'Job Details', icon: 'fe fe-tool', route: '/mstaff/jobs', type: 'single' },
  ],
  [ROLES.ACCOUNTS_TEAM]: [
    { label: 'Dashboard', icon: 'fe fe-home', route: '/accounts/dashboard', type: 'single' },
    {
      label: 'Finance', icon: 'fe fe-dollar-sign', type: 'menu', subs: [
        { label: 'Invoices & Payments', route: '/accounts/invoices' },
        { label: 'Deposits & Refunds', route: '/accounts/deposits' },
      ]
    },
  ],
  [ROLES.SUPPORT_TEAM]: [
    { label: 'WhatsApp Inbox', icon: 'fe fe-message-circle', route: '/support/inbox', type: 'single' },
    { label: 'Customer Details', icon: 'fe fe-user', route: '/support/customers', type: 'single' },
    { label: 'Calendar', icon: 'fe fe-calendar', route: '/calendar', type: 'single' },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const menu = user ? (ROLE_MENUS[user.role] || []) : [];

  const isActive = (path) => path && (pathname === path || pathname.startsWith(path + '/'));

  useEffect(() => {
    // Find if current route has a submenu to keep it open initially
    menu.forEach((item, idx) => {
      if (item.type === 'menu' && item.subs?.some(s => isActive(s.route))) {
        setOpenSubmenu(idx);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, user]);

  const handleSubmenuToggle = (idx, e) => {
    e.preventDefault();
    setOpenSubmenu(openSubmenu === idx ? null : idx);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Inline style helpers — these win over all external stylesheets
  const getLinkStyle = (active) => ({
    color: '#ffffff',
  });

  const getSubLinkStyle = (active) => ({
    color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
    display: 'block',
    transition: 'all 0.2s',
  });

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul className="sidebar-vertical">
            {menu.map((item, i) => {
              if (item.type === 'single') {
                const active = isActive(item.route);
                return (
                  <li key={i}>
                    <Link to={item.route} className={active ? 'active' : ''} style={getLinkStyle(active)}>
                      <i className={item.icon} style={{ color: '#ffffff' }}></i>{' '}
                      <span style={{ color: '#ffffff' }}>{item.label}</span>
                    </Link>
                  </li>
                );
              }
              const isSubOpen = openSubmenu === i;
              const hasActive = item.subs?.some(s => isActive(s.route));
              return (
                <li key={i} className={`submenu ${isSubOpen ? 'active' : ''}`}>
                  <a
                    href="#"
                    className={`${hasActive ? 'active' : ''} ${isSubOpen ? 'subdrop' : ''}`}
                    onClick={(e) => handleSubmenuToggle(i, e)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#ffffff',
                      background: 'transparent',
                      padding: '10px 15px',
                      textDecoration: 'none',
                    }}
                  >
                    <i
                      className={item.icon}
                      style={{ color: '#ffffff', fontSize: '16px', minWidth: '20px', marginRight: '10px', flexShrink: 0 }}
                    ></i>
                    <span style={{ color: '#ffffff', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.label}
                    </span>
                    <span
                      className="menu-arrow"
                      style={{ color: '#ffffff', marginLeft: '8px', flexShrink: 0 }}
                    ></span>
                  </a>
                  <ul style={{ display: isSubOpen ? 'block' : 'none' }}>
                    {item.subs?.map((sub, j) => {
                      const subActive = isActive(sub.route);
                      return (
                        <li key={j}>
                          <Link
                            to={sub.route}
                            className={subActive ? 'active' : ''}
                            style={getSubLinkStyle(subActive)}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}

            {/* Notifications */}
            <li>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#ffffff' }}>
                <i className="fe fe-bell" style={{ color: '#ffffff' }}></i>{' '}
                <span style={{ color: '#ffffff' }}>Notifications</span>
              </a>
            </li>

            {/* Profile */}
            <li>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#ffffff' }}>
                <i className="fe fe-user" style={{ color: '#ffffff' }}></i>{' '}
                <span style={{ color: '#ffffff' }}>Profile</span>
              </a>
            </li>

            {/* Logout */}
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} style={{ color: '#ffffff' }}>
                <i className="fe fe-power" style={{ color: '#ffffff' }}></i>{' '}
                <span style={{ color: '#ffffff' }}>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
