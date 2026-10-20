import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { playBeep } from '../utils/sound';

export default function Login() {
    const { login, loginWithGoogle, loginWithLocalGoogle } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        playBeep(true);
        setError('');

        if (!email.trim() || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setIsLoading(true);
        const res = await login(email, password);
        setIsLoading(false);

        if (res.success) {
            navigate('/dashboard');
        } else {
            setError(res.error || 'Login failed. Please check your credentials.');
        }
    };

    const handleGoogleLogin = async () => {
        playBeep(true);
        setError('');
        setIsGoogleLoading(true);

        const res = await loginWithGoogle();
        setIsGoogleLoading(false);

        if (res.success) {
            navigate('/dashboard');
        } else {
            setError(res.error || 'Google Sign-In failed.');
        }
    };

    return (
        <section
            id="login"
            className="hero-section"
            style={{
                paddingTop: '150px',
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {/* Standard Background */}
            <div className="hero-bg"></div>
            <div className="hero-overlay" style={{ background: 'rgba(0, 0, 0, 0.6)' }}></div>

            {/* Colorful Blurry Blobs */}
            <div style={{ position: 'absolute', top: '15%', left: '30%', width: '300px', height: '300px', background: '#0088ff', borderRadius: '50%', filter: 'blur(80px)', zIndex: 1, opacity: 0.85 }}></div>
            <div style={{ position: 'absolute', bottom: '10%', right: '28%', width: '350px', height: '350px', background: '#ff5500', borderRadius: '50%', filter: 'blur(90px)', zIndex: 1, opacity: 0.85 }}></div>

            <div className="container" style={{ maxWidth: '480px', zIndex: 10, position: 'relative', width: '100%', padding: '0 20px' }}>
                <div
                    className="glass-panel"
                    style={{
                        padding: '50px 40px',
                        textAlign: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(25px)',
                        WebkitBackdropFilter: 'blur(25px)',
                        borderRadius: '20px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <h2
                        style={{
                            fontFamily: 'var(--font-heading)',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '2.2rem',
                            marginBottom: '40px',
                            letterSpacing: '0.5px'
                        }}
                    >
                        Login
                    </h2>

                    {error && (
                        <div
                            style={{
                                padding: '12px 16px',
                                marginBottom: '20px',
                                borderRadius: '8px',
                                background: 'rgba(239, 68, 68, 0.25)',
                                border: '1px solid rgba(239, 68, 68, 0.45)',
                                color: '#fca5a5',
                                fontSize: '0.9rem',
                                textAlign: 'left'
                            }}
                        >
                            <div>{error}</div>
                            {error.includes('unauthorized-domain') && (
                                <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '10px' }}>
                                    <p style={{ fontSize: '0.82rem', color: '#f1f5f9', marginBottom: '8px', lineHeight: 1.4 }}>
                                        💡 <strong>Quick Fix:</strong> Check your address bar and make sure you are using <strong>http://localhost:5173</strong> (not 127.0.0.1).
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            loginWithLocalGoogle(email || 'demo.traveler@gmail.com', 'Demo Traveler');
                                            navigate('/dashboard');
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            border: '1px solid rgba(255, 255, 255, 0.3)',
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            color: 'white',
                                            fontWeight: 600,
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                    >
                                        🚀 Instant Login with Demo Account
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <form id="login-form" onSubmit={handleSubmit}>
                        <div className="form-group" style={{ textAlign: 'left', marginBottom: '25px' }}>
                            <label style={{ color: 'white', fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '1.05rem' }}>
                                Username
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '16px 20px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    color: 'white',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'background-color 0.3s'
                                }}
                            />
                        </div>

                        <div className="form-group" style={{ textAlign: 'left', marginBottom: '35px' }}>
                            <label style={{ color: 'white', fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '1.05rem' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '16px 20px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    color: 'white',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'background-color 0.3s'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            id="submit-btn"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '8px',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                background: 'white',
                                color: '#1e293b',
                                marginBottom: '25px',
                                transition: 'transform 0.2s, background 0.2s'
                            }}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>

                        <div style={{ marginBottom: '30px' }}>
                            <button
                                type="button"
                                id="google-auth-btn"
                                onClick={handleGoogleLogin}
                                disabled={isGoogleLoading}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'background 0.3s',
                                    fontSize: '0.95rem'
                                }}
                            >
                                <i className="fa-brands fa-google"></i>
                                {isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google'}
                            </button>
                        </div>
                    </form>

                    <div style={{ fontSize: '1rem', color: 'white', fontWeight: 500 }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: 'white', textDecoration: 'underline', fontWeight: 600 }}>
                            Register Here
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
