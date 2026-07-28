import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import { adminLogin } from '../../services/userService';

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
    if (!email || !password) {
      Swal.fire({
        title: 'Fields Required',
        text: 'Please fill in both email and password fields.',
        icon: 'warning',
        confirmButtonColor: '#002B5C'
      });
      return;
    }
    setLoading(true);
    setError('');

    try {
      // Call the admin login API
      console.log('[v0] Attempting login with email:', email);
      const response = await adminLogin(email, password);
      console.log('[v0] Login response:', response);

      // Extract user data from response
      const userData = {
        id: response.user?.id,
        name: response.user?.full_name || response.user?.name,
        full_name: response.user?.full_name,
        email: response.user?.email,
        role: response.user?.role,
        phone_number: response.user?.phone_number,
        whatsapp_number: response.user?.whatsapp_number,
        is_phone_verified: response.user?.is_phone_verified,
        is_email_verified: response.user?.is_email_verified,
        status: response.user?.status,
        created_at: response.user?.created_at,
        last_login: response.user?.last_login,
      };

      // Store tokens in localStorage for future API calls
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        console.log('[v0] Access token stored');
      }
      if (response.refresh_token) {
        localStorage.setItem('refresh_token', response.refresh_token);
        console.log('[v0] Refresh token stored');
      }

      // Update auth context
      login(userData);
      console.log('[v0] User logged in successfully:', userData);

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
        // Map role to dashboard route
        const roleDashboard = {
          'admin': '/admin/dashboard',
          'property_manager': '/property/dashboard',
          'management': '/management/dashboard',
          'booking_team': '/booking/dashboard',
          'tenant_management': '/tenant/list',
          'maintenance_manager': '/maintenance/dashboard',
          'maintenance_staff': '/mstaff/tasks',
          'accounts_team': '/accounts/dashboard',
          'support_team': '/support/inbox',
        };
        const dashboardRoute = roleDashboard[userData.role] || '/dashboard';
        navigate(dashboardRoute);
      });
    } catch (err) {
      console.error('[v0] Login error:', err);
      setLoading(false);
      const errorMessage = err.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      Swal.fire({
        title: 'Login Failed',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#002B5C'
      });
    }
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
