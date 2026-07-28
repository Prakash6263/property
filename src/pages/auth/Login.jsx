import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth, ROLES } from '../../context/AuthContext';

const DEMO_USERS = [
  { id: 1, name: 'Ahmad Al-Rashid', role: ROLES.ADMIN, email: 'admin@propmanager.com' },
  { id: 2, name: 'Sara Khalid', role: ROLES.PROPERTY_MANAGER, email: 'property@propmanager.com' },
  { id: 3, name: 'Mohammed Hassan', role: ROLES.MANAGEMENT, email: 'management@propmanager.com' },
  { id: 4, name: 'Fatima Al-Zahra', role: ROLES.BOOKING_TEAM, email: 'booking@propmanager.com' },
  { id: 5, name: 'Omar Yusuf', role: ROLES.TENANT_MANAGEMENT, email: 'tenant@propmanager.com' },
  { id: 6, name: 'Layla Ahmed', role: ROLES.MAINTENANCE_MANAGER, email: 'maintenance@propmanager.com' },
  { id: 7, name: 'Khalid Ibrahim', role: ROLES.MAINTENANCE_STAFF, email: 'mstaff@propmanager.com' },
  { id: 8, name: 'Nour Al-Din', role: ROLES.ACCOUNTS_TEAM, email: 'accounts@propmanager.com' },
  { id: 9, name: 'Yasmine Tariq', role: ROLES.SUPPORT_TEAM, email: 'support@propmanager.com' },
];

const ROLE_DASHBOARDS = {
  [ROLES.ADMIN]: '/admin/dashboard',
  [ROLES.PROPERTY_MANAGER]: '/property/dashboard',
  [ROLES.MANAGEMENT]: '/management/dashboard',
  [ROLES.BOOKING_TEAM]: '/booking/dashboard',
  [ROLES.TENANT_MANAGEMENT]: '/tenant/list',
  [ROLES.MAINTENANCE_MANAGER]: '/maintenance/dashboard',
  [ROLES.MAINTENANCE_STAFF]: '/mstaff/tasks',
  [ROLES.ACCOUNTS_TEAM]: '/accounts/dashboard',
  [ROLES.SUPPORT_TEAM]: '/support/inbox',
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        title: 'Fields Required',
        text: 'Please fill in the email field.',
        icon: 'warning',
        confirmButtonColor: '#002B5C'
      });
      return;
    }
    setLoading(true);
    setError('');

    // Static Authentication Flow
    setTimeout(() => {
      setLoading(false);
      const trimmedEmail = email.trim().toLowerCase();
      const demoUser = DEMO_USERS.find(u => u.email.toLowerCase() === trimmedEmail);
      
      // Default to Administrator if email is not in demo list
      const userData = demoUser ? demoUser : {
        id: 1,
        name: 'Administrator',
        role: ROLES.ADMIN,
        email: email.trim()
      };

      login(userData);

      Swal.fire({
        title: 'Welcome Back!',
        text: `Logged in successfully as ${userData.name}.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#fff',
        customClass: {
          title: 'fw-bold',
          popup: 'rounded-3'
        }
      }).then(() => {
        const dashboardRoute = ROLE_DASHBOARDS[userData.role] || '/dashboard';
        navigate(dashboardRoute);
      });
    }, 600);
  };

  return (
    <section className="hero" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f1f8ff 0%, #c3d8f0 100%)', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="row justify-content-center align-items-center g-4">
          {/* Left branding panel */}
          <div className="col-lg-5 d-none d-lg-block text-center">
            <div style={{ padding: '40px 20px' }}>
              <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#002B5C,#00B5AD)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <i className="fe fe-home text-white" style={{ fontSize: '2.5rem' }}></i>
              </div>
              <h2 className="fw-bold mb-2" style={{ color: '#002B5C' }}>PropManager</h2>
              <p className="text-muted mb-4">Complete Property Management Solution</p>
              <div className="row g-3">
                {[
                  { icon: 'fe-home', label: 'Property Management' },
                  { icon: 'fe-users', label: 'Tenant Management' },
                  { icon: 'fe-tool', label: 'Maintenance Tracking' },
                  { icon: 'fe-dollar-sign', label: 'Financial Reports' },
                  { icon: 'fe-message-circle', label: 'WhatsApp Integration' },
                  { icon: 'fe-cpu', label: 'AI Assistant' },
                ].map((f, i) => (
                  <div key={i} className="col-6">
                    <div className="d-flex align-items-center gap-2 p-2" style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 10 }}>
                      <span style={{ width: 32, height: 32, background: 'linear-gradient(90deg,#00B5AD,#00D2CB)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className={`fe ${f.icon} text-white`} style={{ fontSize: '0.85rem' }}></i>
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 500 }}>{f.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Login card */}
          <div className="col-lg-5 col-md-8 col-sm-10">
            <div className="card border-0 shadow-lg" style={{ borderRadius: 24, overflow: 'visible' }}>
              {/* Circular icon overlap */}
              <div className="position-absolute top-0 start-50 translate-middle shadow"
                style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#002B5C,#00B5AD)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #fff', zIndex: 10 }}>
                <i className="fe fe-lock text-white" style={{ fontSize: '2rem' }}></i>
              </div>

              <div className="card-body p-4 pt-5 mt-3">
                <div className="text-center mb-4 mt-2">
                  <h4 className="fw-bold" style={{ color: '#002B5C' }}>Welcome Back</h4>
                  <p className="text-muted" style={{ fontSize: '0.87rem' }}>Sign in to your dashboard</p>
                </div>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="fe fe-alert-circle me-2"></i>{error}
                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label fw-500">Email / Username</label>
                    <div className="input-group">
                      <span className="input-group-text border-0" style={{ background: '#f0f2f5', borderRadius: '50px 0 0 50px', paddingLeft: 16 }}>
                        <i className="fe fe-mail text-muted"></i>
                      </span>
                      <input type="email" className="form-control border-0" placeholder="Enter your email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required
                        style={{ background: '#f0f2f5', borderRadius: '0 50px 50px 0', height: 50, boxShadow: 'none' }} />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label fw-500">Password</label>
                    <div className="input-group position-relative">
                      <span className="input-group-text border-0" style={{ background: '#f0f2f5', borderRadius: '50px 0 0 50px', paddingLeft: 16 }}>
                        <i className="fe fe-lock text-muted"></i>
                      </span>
                      <input type={showPassword ? 'text' : 'password'} className="form-control border-0"
                        placeholder="••••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                        style={{ background: '#f0f2f5', borderRadius: '0 50px 50px 0', height: 50, boxShadow: 'none', paddingRight: 50 }} />
                      <button type="button" className="btn position-absolute top-50 end-0 translate-middle-y border-0 pe-4"
                        onClick={() => setShowPassword(!showPassword)} style={{ zIndex: 10, background: 'transparent' }}>
                        <i className={`fe ${showPassword ? 'fe-eye-off' : 'fe-eye'} text-muted`}></i>
                      </button>
                    </div>
                  </div>

                  {/* Remember + forgot */}
                  <div className="d-flex justify-content-between align-items-center mb-4 px-2" style={{ fontSize: '0.85rem' }}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                      <label className="form-check-label text-muted" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <Link to="/forgot-password" className="text-decoration-none text-muted" style={{ fontStyle: 'italic' }}>Forgot Password?</Link>
                  </div>

                  <button type="submit" className="btn btn-turquoise w-100 rounded-pill fw-bold text-uppercase"
                    disabled={loading} style={{ height: 50, fontSize: '1rem', letterSpacing: 1 }}>
                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                    {loading ? 'Signing in...' : 'Login'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
