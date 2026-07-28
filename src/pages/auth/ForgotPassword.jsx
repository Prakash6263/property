import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const STEPS = ['Enter Email', 'Reset Password', 'Success'];

export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checks = [
    { label: 'At least 8 characters', ok: newPassword.length >= 8 },
    { label: 'One uppercase letter', ok: /[A-Z]/.test(newPassword) },
    { label: 'One number', ok: /\d/.test(newPassword) },
    { label: 'One special character', ok: /[^A-Za-z0-9]/.test(newPassword) },
  ];

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError('Please enter your email'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setStep(1);
    setError('');
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    if (checks.some(c => !c.ok)) { setError('Please meet all password requirements'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setStep(2);
  };

  return (
    <section className="hero" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f1f8ff 0%, #c3d8f0 100%)', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-sm-10 mt-5">
            <div className="card border-0 shadow-lg position-relative" style={{ borderRadius: 24 }}>
              <div className="position-absolute top-0 start-50 translate-middle shadow"
                style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#002B5C,#00B5AD)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #fff', zIndex: 10 }}>
                <i className={`fe ${step === 2 ? 'fe-check' : 'fe-key'} text-white`} style={{ fontSize: '2rem' }}></i>
              </div>

              <div className="card-body p-4 pt-5 mt-3">
                {/* Step indicator */}
                <div className="d-flex justify-content-center gap-2 mb-4">
                  {STEPS.map((s, i) => (
                    <React.Fragment key={i}>
                      <div className="d-flex flex-column align-items-center">
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: i <= step ? 'linear-gradient(90deg,#00B5AD,#00D2CB)' : '#e9ecef', color: i <= step ? '#fff' : '#6c757d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, transition: 'all 0.3s' }}>
                          {i < step ? <i className="fe fe-check" style={{ fontSize: '0.75rem' }}></i> : i + 1}
                        </div>
                        <span style={{ fontSize: '0.65rem', color: i <= step ? '#00B5AD' : '#6c757d', marginTop: 2, whiteSpace: 'nowrap' }}>{s}</span>
                      </div>
                      {i < STEPS.length - 1 && <div style={{ width: 40, height: 2, background: i < step ? '#00B5AD' : '#e9ecef', marginTop: 14, transition: 'background 0.3s' }}></div>}
                    </React.Fragment>
                  ))}
                </div>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show">
                    <i className="fe fe-alert-circle me-2"></i>{error}
                    <button className="btn-close" onClick={() => setError('')}></button>
                  </div>
                )}

                {/* Step 0: Email */}
                {step === 0 && (
                  <>
                    <h4 className="fw-bold text-center mb-1" style={{ color: '#002B5C' }}>Forgot Password</h4>
                    <p className="text-muted text-center mb-4" style={{ fontSize: '0.87rem' }}>Enter your registered email address</p>
                    <form onSubmit={handleEmailSubmit}>
                      <div className="mb-4">
                        <label className="form-label fw-500">Email Address</label>
                        <div className="input-group">
                          <span className="input-group-text border-0" style={{ background: '#f0f2f5', borderRadius: '50px 0 0 50px', paddingLeft: 16 }}>
                            <i className="fe fe-mail text-muted"></i>
                          </span>
                          <input type="email" className="form-control border-0" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required
                            style={{ background: '#f0f2f5', borderRadius: '0 50px 50px 0', height: 50, boxShadow: 'none' }} />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-turquoise w-100 rounded-pill fw-bold text-uppercase" disabled={loading} style={{ height: 50 }}>
                        {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                        Send Reset Link
                      </button>
                    </form>
                  </>
                )}

                {/* Step 1: New Password */}
                {step === 1 && (
                  <>
                    <h4 className="fw-bold text-center mb-1" style={{ color: '#002B5C' }}>Set New Password</h4>
                    <p className="text-muted text-center mb-4" style={{ fontSize: '0.87rem' }}>Create a strong password for your account</p>
                    <form onSubmit={handleResetSubmit}>
                      <div className="mb-3">
                        <label className="form-label fw-500">New Password</label>
                        <div className="input-group position-relative">
                          <span className="input-group-text border-0" style={{ background: '#f0f2f5', borderRadius: '50px 0 0 50px', paddingLeft: 16 }}>
                            <i className="fe fe-lock text-muted"></i>
                          </span>
                          <input type={showNew ? 'text' : 'password'} className="form-control border-0" placeholder="New password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required
                            style={{ background: '#f0f2f5', borderRadius: '0 50px 50px 0', height: 50, boxShadow: 'none', paddingRight: 50 }} />
                          <button type="button" className="btn position-absolute top-50 end-0 translate-middle-y border-0 pe-4" onClick={() => setShowNew(!showNew)} style={{ zIndex: 10, background: 'transparent' }}>
                            <i className={`fe ${showNew ? 'fe-eye-off' : 'fe-eye'} text-muted`}></i>
                          </button>
                        </div>
                        {/* Requirements */}
                        <div className="mt-2">
                          {checks.map((c, i) => (
                            <div key={i} className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: '0.78rem' }}>
                              <i className={`fe ${c.ok ? 'fe-check-circle' : 'fe-circle'}`} style={{ color: c.ok ? '#28a745' : '#adb5bd', fontSize: '0.78rem' }}></i>
                              <span style={{ color: c.ok ? '#28a745' : '#6c757d' }}>{c.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="form-label fw-500">Confirm Password</label>
                        <div className="input-group position-relative">
                          <span className="input-group-text border-0" style={{ background: '#f0f2f5', borderRadius: '50px 0 0 50px', paddingLeft: 16 }}>
                            <i className="fe fe-lock text-muted"></i>
                          </span>
                          <input type={showConfirm ? 'text' : 'password'} className="form-control border-0" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
                            style={{ background: '#f0f2f5', borderRadius: '0 50px 50px 0', height: 50, boxShadow: 'none', paddingRight: 50 }} />
                          <button type="button" className="btn position-absolute top-50 end-0 translate-middle-y border-0 pe-4" onClick={() => setShowConfirm(!showConfirm)} style={{ zIndex: 10, background: 'transparent' }}>
                            <i className={`fe ${showConfirm ? 'fe-eye-off' : 'fe-eye'} text-muted`}></i>
                          </button>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-turquoise w-100 rounded-pill fw-bold text-uppercase" disabled={loading} style={{ height: 50 }}>
                        {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                        Reset Password
                      </button>
                    </form>
                  </>
                )}

                {/* Step 2: Success */}
                {step === 2 && (
                  <div className="text-center py-3">
                    <div style={{ width: 64, height: 64, background: 'rgba(40,167,69,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <i className="fe fe-check-circle" style={{ fontSize: '2rem', color: '#28a745' }}></i>
                    </div>
                    <h5 className="fw-bold mb-2" style={{ color: '#002B5C' }}>Password Reset Successful!</h5>
                    <p className="text-muted mb-4" style={{ fontSize: '0.87rem' }}>Your password has been updated. You can now log in with your new password.</p>
                    <Link to="/login" className="btn btn-turquoise w-100 rounded-pill fw-bold text-uppercase" style={{ height: 50, lineHeight: '34px' }}>
                      Back to Login
                    </Link>
                  </div>
                )}

                {step < 2 && (
                  <div className="text-center mt-3">
                    <Link to="/login" className="text-muted small text-decoration-none">
                      <i className="fe fe-arrow-left me-1"></i>Back to Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
