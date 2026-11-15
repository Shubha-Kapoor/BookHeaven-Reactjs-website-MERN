import React, { useState } from 'react';
import API from "../../services/api";
import './Auth.css';

function Auth({ setCurrentPage }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [authForm, setAuthForm] = useState({ email: '', password: '', username: '' });
  
  // Independent field-specific error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
    setSuccessMsg('');

    let isValid = true;

    // 1. Email Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authForm.email)) {
      setEmailError('⚠️ Please enter a valid email address (e.g., user@gmail.com).');
      isValid = false;
    }

    // 2. Password Length Validation (Min 6 chars)
    if (authForm.password.length < 6) {
      setPasswordError('⚠️ Password must be at least 6 characters long.');
      isValid = false;
    }

    // If any validation fails, stop submission
    if (!isValid) return;

    setLoading(true); 

    try {
      if (isLoginView) {
        // Login API Call
        const { data } = await API.post('/auth/login', {
          email: authForm.email,
          password: authForm.password,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setSuccessMsg("Successfully Signed In! Redirecting...");
      } else {
        // Register API Call
        const { data } = await API.post('/auth/register', {
          name: authForm.username,
          email: authForm.email,
          password: authForm.password,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setSuccessMsg("Account Created Successfully! Redirecting...");
      }

      setLoading(false);
      
      setTimeout(() => {
        setCurrentPage('home');
      }, 1200);
    } catch (err) {
      setLoading(false);
      setGeneralError(err.response?.data?.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLoginView ? "Welcome Back!" : "Create Account"}</h2>
        <p className="auth-subtitle">Access your personal BookHeaven oasis shelf</p>
        
        {/* General API Error or Success Banners */}
        {generalError && <div className="auth-error-banner" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '10px 14px', borderRadius: '8px', marginBottom: '15px', fontSize: '13px', fontWeight: '600' }}>{generalError}</div>}
        {successMsg && <div className="auth-success-banner" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#22c55e', padding: '10px 14px', borderRadius: '8px', marginBottom: '15px', fontSize: '13px', fontWeight: 'bold' }}>{successMsg}</div>}

        {/* noValidate stops native browser popup tooltips */}
        <form onSubmit={handleAuthSubmit} className="auth-form" noValidate>
          {!isLoginView && (
            <div className="auth-group">
              <label>Username / Name</label>
              <input 
                type="text" 
                required 
                value={authForm.username} 
                onChange={(e) => setAuthForm({...authForm, username: e.target.value})} 
                placeholder="Enter your name"
              />
            </div>
          )}
          
          <div className="auth-group">
            <label>Email Address</label>
            <input 
              type="text" 
              required 
              value={authForm.email} 
              onChange={(e) => setAuthForm({...authForm, email: e.target.value})} 
              placeholder="name@example.com"
              style={{ borderColor: emailError ? '#ef4444' : undefined }}
            />
            {emailError && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block', fontWeight: '600' }}>{emailError}</span>}
          </div>

          <div className="auth-group">
            <label>Password (Min 6 chars)</label>
            <input 
              type="password" 
              required 
              value={authForm.password} 
              onChange={(e) => setAuthForm({...authForm, password: e.target.value})} 
              placeholder="••••••••"
              style={{ borderColor: passwordError ? '#ef4444' : undefined }}
            />
            {passwordError && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block', fontWeight: '600' }}>{passwordError}</span>}
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Processing..." : (isLoginView ? "Sign In" : "Register Now")}
          </button>
        </form>

        <div className="auth-toggle-row">
          {isLoginView ? (
            <p>Don't have an account? <span onClick={() => { setIsLoginView(false); setEmailError(''); setPasswordError(''); setGeneralError(''); setSuccessMsg(''); }}>Register here</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => { setIsLoginView(true); setEmailError(''); setPasswordError(''); setGeneralError(''); setSuccessMsg(''); }}>Sign In here</span></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;