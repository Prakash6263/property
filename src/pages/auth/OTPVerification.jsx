import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (timer === 0) { setResendEnabled(true); return; }
    const t = setTimeout(() => setTimer(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const fmt = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) document.getElementById(`otp-${i - 1}`)?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter the 6-digit OTP'); return; }
    setLoading(true);
    setError('');
    
    try {
      // TODO: Call OTP verification API endpoint here
      console.log('[v0] Verifying OTP:', code);
      
      // Placeholder for actual API call
      await new Promise(r => setTimeout(r, 800));
      
      setError('OTP verification is not yet configured. Please contact support.');
    } catch (err) {
      setError(err.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setTimer(120);
    setResendEnabled(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
  };

  return (
    <section className="hero" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f1f8ff 0%, #c3d8f0 100%)', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-sm-10 mt-5">
            <div className="card border-0 shadow-lg position-relative" style={{ borderRadius: 24 }}>
              <div className="position-absolute top-0 start-50 translate-middle shadow"
                style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#002B5C,#00B5AD)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #fff', zIndex: 10 }}>
                <i className="fe fe-smartphone text-white" style={{ fontSize: '2rem' }}></i>
              </div>

              <div className="card-body p-4 pt-5 mt-3">
                <div className="text-center mb-4 mt-2">
                  <h4 className="fw-bold" style={{ color: '#002B5C' }}>OTP Verification</h4>
                  <p className="text-muted" style={{ fontSize: '0.87rem' }}>
                    Enter the 6-digit code sent to your registered email/phone
                  </p>
                </div>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show">
                    <i className="fe fe-alert-circle me-2"></i>{error}
                    <button className="btn-close" onClick={() => setError('')}></button>
                  </div>
                )}

                <form onSubmit={handleVerify}>
                  <div className="d-flex justify-content-center gap-2 mb-4">
                    {otp.map((v, i) => (
                      <input key={i} id={`otp-${i}`} type="text" maxLength={1} value={v}
                        onChange={e => handleOtpChange(i, e.target.value)}
                        onKeyDown={e => handleKeyDown(i, e)}
                        style={{ width: 48, height: 52, textAlign: 'center', fontSize: '1.4rem', fontWeight: 700, borderRadius: 10, border: v ? '2px solid #00B5AD' : '2px solid #dee2e6', outline: 'none', background: '#f9f9f9' }}
                      />
                    ))}
                  </div>

                  {/* Countdown */}
                  <div className="text-center mb-4">
                    {!resendEnabled ? (
                      <p className="text-muted mb-0" style={{ fontSize: '0.88rem' }}>
                        Resend OTP in <span className="fw-bold" style={{ color: '#00B5AD' }}>{fmt(timer)}</span>
                      </p>
                    ) : (
                      <button type="button" className="btn btn-link p-0 text-decoration-none" style={{ color: '#00B5AD' }} onClick={handleResend}>
                        <i className="fe fe-refresh-cw me-1"></i>Resend OTP
                      </button>
                    )}
                  </div>

                  <button type="submit" className="btn btn-turquoise w-100 rounded-pill fw-bold text-uppercase"
                    disabled={loading} style={{ height: 50, fontSize: '1rem', letterSpacing: 1 }}>
                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>

                  <div className="text-center mt-3">
                    <Link to="/login" className="text-muted small text-decoration-none">
                      <i className="fe fe-arrow-left me-1"></i>Back to Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
