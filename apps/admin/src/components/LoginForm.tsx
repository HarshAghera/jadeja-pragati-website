// apps/admin/src/components/LoginForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🧭 import for page navigation

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // 🧭 React Router hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Both fields are required.');
    } else {
      setErrorMessage('');
      console.log('Login successful');
    }
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password'); // 🧭 go to the Forgot Password page
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
          minHeight: '450px',
          width: '100%',
          backgroundColor: '#ffffff',
          color: '#001f3f',
          border: '1px solid #e2e8f0',
        }}
      >
        <div className="text-center mb-4">
          <h2 style={{ color: '#001f3f' }}>Login</h2>
          <p className="text-muted" style={{ fontSize: '16px' }}>
            Welcome back! Please enter your credentials.
          </p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger text-center py-2">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: '#001f3f' }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: email ? '#e6f0ff' : '' }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label" style={{ color: '#001f3f' }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{
              backgroundColor: '#001f3f',
              color: 'white',
              border: '1px solid #001f3f',
            }}
          >
            Login
          </button>
        </form>

        <div className="text-end">
          <button
            className="btn btn-link px-0"
            style={{ fontSize: '17px', color: '#001f3f' }}
            onClick={handleForgotPasswordClick} // 👈 This will go to /forgot-password
          >
            Forgot Password?
          </button>
        </div>
      </div>

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

export default Login;
