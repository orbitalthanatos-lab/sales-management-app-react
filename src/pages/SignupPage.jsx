import { useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../services/supabase';
import '../styles/pages/login.css';
import Notification from '../components/notifications/Notification';

function SignupPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] =
        useState('');
    const [notification, setNotification] =
        useState({
            visible: false,
            message: '',
            type: 'success'
        });

    function showNotification(message, type) {
        setNotification({
            visible: true,
            message,
            type
        });

        setTimeout(() => {
            setNotification((prev) => ({
                ...prev,
                visible: false
            }));
        }, 3000);
    }

    async function handleSignup() {
        if (
            !fullName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            showNotification(
                'Please complete all fields.',
                'error'
            );
            return;
        }

        if (password !== confirmPassword) {
            showNotification(
                'Passwords do not match.',
                'error'
            );
            return;
        }

        // Check if account already exists
        const { data: loginData } =
            await supabase.auth.signInWithPassword({
                email,
                password
            });

        if (loginData?.user) {
            showNotification(
                'An account with this email already exists.',
                'info'
            );

            return;
        }

        // Create account
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });

        if (error) {
            showNotification(error.message, 'error');
            return;
        }

        showNotification(
            'Account created successfully. Please check your email.',
            'success'
        );
    }

    async function handleGoogleSignup() {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });
    }

    return (
        <>
            <Notification
                visible={notification.visible}
                message={notification.message}
                type={notification.type}
            />

            <div className="login-page">
                <div className="login-layout">
                    {/* LEFT PANEL */}
                    <div className="login-showcase">
                        <div className="login-showcase-overlay"></div>

                        <div className="login-showcase-content">
                            <div className="login-badge">
                                Sales Management App
                            </div>

                            <h1 className="login-showcase-title">
                                Create Your Business Workspace
                            </h1>

                            <p className="login-showcase-description">
                                Start managing products, inventory,
                                customers, and sales from one modern
                                dashboard.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="login-card">
                        <div className="login-brand">
                            <div className="login-logo">📦</div>

                            <p className="login-app-name">
                                Sales Management App
                            </p>
                        </div>

                        <h2>Create Account</h2>

                        <p className="login-subtitle">
                            Start your free account and begin managing
                            your business today.
                        </p>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) =>
                                setFullName(e.target.value)
                            }
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />

                        <button
                            className="btn-login"
                            onClick={handleSignup}
                        >
                            Create Account
                        </button>

                        <div className="divider">
                            <span>OR</span>
                        </div>

                        <button
                            className="btn-google"
                            onClick={handleGoogleSignup}
                        >
                            Continue with Google
                        </button>

                        <p className="signup-text">
                            Already have an account?{' '}

                            <Link
                                to="/login"
                                className="signup-link"
                            >
                                Log in
                            </Link>
                        </p>

                        <p className="security-text">
                            🔒 Secure signup powered by Supabase
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignupPage;