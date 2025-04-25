import React, { useEffect, useState } from 'react';
import '../styles/forgotPassword.css';
import { toast, ToastContainer } from 'react-toastify';
import bgImage from '../images/bg.webp';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = bgImage;
    img.onload = () => setBgLoaded(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error('All fields are required.');
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
    } else {
      toast.success('Password has been reset successfully.');
      console.log('Password reset for:', email);
    }
  };

  return (
    <div
      className={`forgotpassword-container ${
        bgLoaded ? 'bg-loaded' : 'bg-loading'
      }`}
    >
      <ToastContainer position="bottom-right" autoClose={2500} />

      <div className="card forgot-password-card">
        <div className="text-center mb-4">
          <h2 className="text-navy font-playfair">Reset Password</h2>
          <p className="text-muted font-inter">
            Enter your email and new password.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-navy font-inter">
              Email Address
            </label>
            <input
              type="email"
              className={`form-control ${email ? 'bg-light' : ''}`}
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label text-navy font-inter"
            >
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="form-label text-navy font-inter"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-navy w-100 mb-3 font-inter">
            Reset Password
          </button>
        </form>
      </div>

      <p className="footer-text">©2025 JADEJA PRAGATI (I) PRIVATE LIMITED.</p>
    </div>
  );
};

export default ForgotPassword;
