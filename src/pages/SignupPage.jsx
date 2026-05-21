import { useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../services/supabase';
import '../styles/pages/login.css';

function SignupPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] =
        useState('');

    async function handleSignup() {
        if (
            !fullName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            alert('Please complete all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Check if account already exists
        const { data: loginData } =
            await supabase.auth.signInWithPassword({
                email,
                password
            });

        if (loginData?.user) {
            alert(
                'An account with this email already exists. Try logging in instead.'
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
            alert(error.message);
            return;
        }

        alert(
            'Account created successfully. Please check your email.'
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
    );
}

export default SignupPage;