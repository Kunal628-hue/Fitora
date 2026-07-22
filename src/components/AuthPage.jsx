import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

// Gym motivational quotes
const GYM_QUOTES = [
  { quote: "The only bad workout is the one that didn't happen.", author: "Unknown" },
  { quote: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { quote: "Success starts with self-discipline.", author: "Unknown" },
  { quote: "Train hard. Eat right. Stay consistent.", author: "Fitora" },
  { quote: "Your body can stand almost anything. It's your mind you have to convince.", author: "Unknown" },
  { quote: "Be stronger than your excuses.", author: "Unknown" },
  { quote: "Sweat now, shine later.", author: "Unknown" },
];

// Animated background particles
function FloatingOrbs() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />
    </div>
  );
}

// App Logo component
function FitoraLogo({ size = 'md' }) {
  const sizes = {
    sm: { icon: 40, text: '1.2rem', sub: '0.65rem' },
    md: { icon: 64, text: '1.7rem', sub: '0.75rem' },
    lg: { icon: 80, text: '2.2rem', sub: '0.85rem' },
  };
  const s = sizes[size];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{
        width: s.icon, height: s.icon,
        background: 'linear-gradient(135deg, #C8FF00 0%, #a8e600 50%, #6bcc00 100%)',
        borderRadius: '18px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 30px rgba(200,255,0,0.40), 0 4px 20px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Shine overlay */}
        <div style={{
          position: 'absolute', top: 0, left: '-60%', width: '40%', height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
          transform: 'skewX(-20deg)',
        }} />
        {/* Dumbbell icon */}
        <svg width={s.icon * 0.55} height={s.icon * 0.55} viewBox="0 0 48 48" fill="none">
          <rect x="4" y="19" width="7" height="10" rx="3" fill="#050607"/>
          <rect x="37" y="19" width="7" height="10" rx="3" fill="#050607"/>
          <rect x="10" y="16" width="5" height="16" rx="2.5" fill="#050607"/>
          <rect x="33" y="16" width="5" height="16" rx="2.5" fill="#050607"/>
          <rect x="14" y="21" width="20" height="6" rx="3" fill="#050607"/>
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: s.text,
          background: 'linear-gradient(135deg, #ffffff 0%, #C8FF00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
        }}>FITORA</div>
        <div style={{
          fontSize: s.sub,
          color: 'rgba(200,255,0,0.85)',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: '-2px',
        }}>Your AI Fitness Coach</div>
      </div>
    </div>
  );
}

// Google Icon SVG
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

// Persistent Mock Database Helper functions
const getMockUsers = () => {
  const usersJson = localStorage.getItem('fitora_mock_users');
  if (!usersJson) {
    const defaultUsers = [{ email: 'demo@fitora.app', name: 'Demo User', password: 'password123' }];
    localStorage.setItem('fitora_mock_users', JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  try {
    return JSON.parse(usersJson);
  } catch {
    return [];
  }
};

const saveMockUser = (user) => {
  const users = getMockUsers();
  users.push(user);
  localStorage.setItem('fitora_mock_users', JSON.stringify(users));
};

// Input field component
function AuthInput({ icon, type, placeholder, value, onChange, showToggle, onToggle, showPassword }) {
  return (
    <div style={{ position: 'relative' }}>
      {icon && (
        <span style={{
          position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
          color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center',
        }}>
          {icon}
        </span>
      )}
      <input
        type={showToggle ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.05)',
          border: '1.5px solid rgba(255,255,255,0.08)',
          borderRadius: '14px',
          padding: `0.9rem ${showToggle ? '3rem' : '1rem'} 0.9rem ${icon ? '2.8rem' : '1rem'}`,
          color: '#fff',
          fontSize: '0.9rem',
          fontFamily: "'Inter', sans-serif",
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'rgba(198,241,53,0.5)';
          e.target.style.background = 'rgba(198,241,53,0.04)';
          e.target.style.boxShadow = '0 0 0 3px rgba(198,241,53,0.08)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'rgba(255,255,255,0.08)';
          e.target.style.background = 'rgba(255,255,255,0.05)';
          e.target.style.boxShadow = 'none';
        }}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          style={{
            position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center',
            padding: 0,
          }}
        >
          {showPassword ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
              <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

// ── Login Screen ────────────────────────────────────────────────────────────
function LoginScreen({ onSwitch, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quoteIdx] = useState(() => Math.floor(Math.random() * GYM_QUOTES.length));

  const quote = GYM_QUOTES[quoteIdx];

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    
    const sanitizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) { setError('Please enter a valid email address.'); return; }

    setLoading(true); setError('');
    if (!supabase) {
      // Mock login validation
      setTimeout(() => {
        setLoading(false);
        const users = getMockUsers();
        const foundUser = users.find(u => u.email === sanitizedEmail);
        if (!foundUser) {
          setError('No account found with this email. Please sign up.');
          return;
        }
        if (foundUser.password !== password) {
          setError('Incorrect password.');
          return;
        }
        onLogin({ email: sanitizedEmail, name: foundUser.name });
      }, 800);
      return;
    }
    const { data, error: err } = await supabase.auth.signInWithPassword({ email: sanitizedEmail, password });
    setLoading(false);
    if (err) {
      setError(err.message);
    } else if (data?.user) {
      onLogin({
        email: data.user.email,
        name: data.user.user_metadata?.full_name || data.user.email.split('@')[0]
      });
    }
  };

  const handleGoogleLogin = async () => {
    if (!supabase) {
      const users = getMockUsers();
      if (!users.some(u => u.email === 'demo@fitora.app')) {
        saveMockUser({ email: 'demo@fitora.app', name: 'Demo User', password: 'password123' });
      }
      onLogin({ email: 'demo@fitora.app', name: 'Demo User' });
      return;
    }
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (err) setError(err.message);
  };

  return (
    <div className="auth-screen">
      <FloatingOrbs />

      <div className="auth-card auth-card-login">
        {/* Logo */}
        <FitoraLogo size="lg" />

        {/* Quote */}
        <div className="auth-quote">
          <div className="auth-quote-bar" />
          <div>
            <p className="auth-quote-text">"{quote.quote}"</p>
            <p className="auth-quote-author">— {quote.author}</p>
          </div>
        </div>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontFamily: "'Outfit',sans-serif", fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
            Let's Login You In
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.5 }}>
            Pick up where you left off. Your habits, streaks,<br />and progress are waiting for you.
          </p>
        </div>

        {/* Google Button */}
        <button className="auth-google-btn" onClick={handleGoogleLogin} type="button">
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="auth-divider"><span>or login with email</span></div>

        {/* Form */}
        <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <AuthInput
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
            type="email" placeholder="Email address"
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <AuthInput
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>}
            type="password" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)}
            showToggle onToggle={() => setShowPassword(v => !v)} showPassword={showPassword}
          />

          {error && (
            <div className="auth-error">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>
              {error}
            </div>
          )}

          <button className="auth-primary-btn" type="submit" disabled={loading}>
            {loading ? <span className="auth-spinner"/> : 'Login with Email'}
          </button>
        </form>

        {/* Switch */}
        <p className="auth-switch-text">
          Don't have an account?{' '}
          <button className="auth-link-btn" onClick={onSwitch}>Create An Account</button>
        </p>



      </div>
    </div>
  );
}

// ── Signup Screen ────────────────────────────────────────────────────────────
function SignupScreen({ onSwitch, onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) { setError('Please fill in all fields.'); return; }
    
    const sanitizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) { setError('Please enter a valid email address.'); return; }

    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (!agreed) { setError('Please agree to the Terms & Conditions.'); return; }

    setLoading(true); setError('');

    if (!supabase) {
      // Mock signup check
      setTimeout(() => {
        setLoading(false);
        const users = getMockUsers();
        const foundUser = users.find(u => u.email === sanitizedEmail);
        if (foundUser) {
          setError('An account with this email already exists. Please log in instead.');
          return;
        }
        saveMockUser({ email: sanitizedEmail, name: name.trim(), password });
        onLogin({ email: sanitizedEmail, name: name.trim() });
      }, 900);
      return;
    }

    const { data, error: err } = await supabase.auth.signUp({
      email: sanitizedEmail, password,
      options: { data: { full_name: name } },
    });

    setLoading(false);
    if (err) {
      setError(err.message);
    } else if (data?.session) {
      // If email confirmation is disabled, log in immediately
      onLogin({ email: sanitizedEmail, name: name.trim() });
    } else {
      setSuccess('Account created! Please check your email to verify your account.');
    }
  };

  const handleGoogleSignup = async () => {
    if (!supabase) {
      const users = getMockUsers();
      if (!users.some(u => u.email === 'demo@fitora.app')) {
        saveMockUser({ email: 'demo@fitora.app', name: 'Demo User', password: 'password123' });
      }
      onLogin({ email: 'demo@fitora.app', name: 'Demo User' });
      return;
    }
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (err) setError(err.message);
  };

  const passwordStrength = () => {
    if (!password) return null;
    if (password.length < 6) return { level: 1, label: 'Weak', color: '#e60000' };
    if (password.length < 10) return { level: 2, label: 'Fair', color: '#f59e0b' };
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) return { level: 4, label: 'Strong', color: '#e60000' };
    return { level: 3, label: 'Good', color: '#22c55e' };
  };
  const strength = passwordStrength();

  return (
    <div className="auth-screen">
      <FloatingOrbs />

      <div className="auth-card auth-card-signup">
        {/* Back button */}
        <button className="auth-back-btn" onClick={onSwitch} type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
        </button>

        {/* Logo small */}
        <FitoraLogo size="sm" />

        {/* Heading */}
        <div style={{ textAlign: 'center', margin: '1rem 0 1.5rem' }}>
          <h1 style={{ fontSize: '1.7rem', fontFamily: "'Outfit',sans-serif", fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
            Create An Account
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.5 }}>
            Set goals, track your progress, and stay<br />motivated every step of the way.
          </p>
        </div>

        {success ? (
          <div className="auth-success">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e60000" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
            <p>{success}</p>
            <button className="auth-primary-btn" onClick={onSwitch} style={{ marginTop: '0.5rem' }}>
              Go to Login
            </button>
          </div>
        ) : (
          <>
            {/* Form */}
            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <AuthInput
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                type="text" placeholder="Full Name"
                value={name} onChange={e => setName(e.target.value)}
              />
              <AuthInput
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                type="email" placeholder="Email address"
                value={email} onChange={e => setEmail(e.target.value)}
              />
              <div>
                <AuthInput
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>}
                  type="password" placeholder="Password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  showToggle onToggle={() => setShowPassword(v => !v)} showPassword={showPassword}
                />
                {/* Password strength */}
                {strength && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <div style={{ flex: 1, height: '3px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                      <div style={{
                        width: `${(strength.level / 4) * 100}%`, height: '100%',
                        background: strength.color, borderRadius: '4px',
                        transition: 'width 0.3s, background 0.3s',
                      }} />
                    </div>
                    <span style={{ fontSize: '0.72rem', color: strength.color, fontWeight: 600, minWidth: '40px' }}>
                      {strength.label}
                    </span>
                  </div>
                )}
              </div>
              <AuthInput
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>}
                type="password" placeholder="Confirm Password"
                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                showToggle onToggle={() => setShowConfirm(v => !v)} showPassword={showConfirm}
              />

              {/* Terms */}
              <label className="auth-terms-label">
                <div
                  className={`auth-checkbox ${agreed ? 'checked' : ''}`}
                  onClick={() => setAgreed(v => !v)}
                >
                  {agreed && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#07080b" strokeWidth="3">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                  )}
                </div>
                <span>
                  I agree to the{' '}
                  <span style={{ color: '#e60000', cursor: 'pointer', textDecoration: 'underline' }}>Terms &amp; Conditions</span>
                </span>
              </label>

              {error && (
                <div className="auth-error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>
                  {error}
                </div>
              )}

              <button className="auth-primary-btn" type="submit" disabled={loading}>
                {loading ? <span className="auth-spinner"/> : 'Create an Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="auth-divider"><span>or sign up with</span></div>

            {/* Google */}
            <button className="auth-google-btn" onClick={handleGoogleSignup} type="button">
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            {/* Switch */}
            <p className="auth-switch-text">
              Already have an account?{' '}
              <button className="auth-link-btn" onClick={onSwitch}>Login</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Auth Component ──────────────────────────────────────────────────────
export default function AuthPage({ onAuthSuccess }) {
  const [screen, setScreen] = useState('login'); // 'login' | 'signup'

  // Check Supabase session on mount
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) onAuthSuccess(session.user);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) onAuthSuccess(session.user);
    });
    return () => subscription.unsubscribe();
  }, [onAuthSuccess]);

  const handleMockLogin = (user) => onAuthSuccess(user);

  return screen === 'login'
    ? <LoginScreen onSwitch={() => setScreen('signup')} onLogin={handleMockLogin} />
    : <SignupScreen onSwitch={() => setScreen('login')} onLogin={handleMockLogin} />;
}
