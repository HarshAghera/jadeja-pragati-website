import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError('Both fields are required.');
      setSuccess('');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
    } else {
      setError('');
      setSuccess('Password has been reset successfully.');
      console.log('Password reset');
     
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center position-relative"
      style={{ backgroundColor: '#001f3f' }}
    >
      <div
        className="card shadow-lg p-3"
        style={{
          maxWidth: '450px',
          minHeight: '400px',
          width: '100%',
          backgroundColor: '#ffffff',
          color: '#001f3f',
          border: '1px solid #e2e8f0',
        }}
      >
        <div className="text-center mb-4">
          <h2 style={{ color: '#001f3f' }}>Reset Password</h2>
          <p className="text-muted" style={{ fontSize: '16px' }}>
            Enter your new password.
          </p>
        </div>

        {error && <div className="alert alert-danger text-center py-2">{error}</div>}
        {success && <div className="alert alert-success text-center py-2">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: '#001f3f' }}>
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
            <label htmlFor="confirmPassword" className="form-label" style={{ color: '#001f3f' }}>
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

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: '#001f3f',
              color: 'white',
              border: '1px solid #001f3f',
            }}
          >
            Reset Password
          </button>
        </form>
      </div>

      {/* Footer */}
      <p
        className="text-white text-center position-absolute w-100"
        style={{
          bottom: '10px',
          fontSize: '14px',
        }}
      >
        © {new Date().getFullYear()} JADEJA PRAGATI (I) PRIVATE LIMITED. All rights reserved.
      </p>
    </div>
  );
};

export default ForgotPassword;
