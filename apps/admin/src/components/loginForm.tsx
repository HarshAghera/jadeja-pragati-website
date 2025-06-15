import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { toast, ToastContainer } from 'react-toastify';
import bgImage from '../images/bg.webp';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL!;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bgLoaded, setBgLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = bgImage;
    img.onload = () => setBgLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Both fields are required.');
      return;
    }

    try {
      const { data } = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });
      const { access_token } = data.data;

      localStorage.setItem('authToken', access_token);

      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: unknown) {
      let message = 'Login failed. Please try again.';

      if (
        error instanceof Error &&
        typeof (error as Error & { response?: { data?: { message?: string } } })
          .response?.data?.message === 'string'
      ) {
        message = (
          error as Error & { response?: { data?: { message?: string } } }
        ).response!.data!.message!;
      }

      toast.error(message);
    }
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  return (
    <div className={`login-container ${bgLoaded ? 'bg-loaded' : 'bg-loading'}`}>
      <ToastContainer position="bottom-right" autoClose={2500} />
      <div className="card login-card">
        <div className="text-center mb-4">
          <h2 className="text-navy font-playfair ">Login</h2>
          <p className="text-muted font-inter">
            Welcome back! Please enter your credentials.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-navy font-inter">
              Email
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

          <div className="mb-4">
            <label
              htmlFor="password"
              className="form-label text-navy font-inter"
            >
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

          <button type="submit" className="btn btn-navy w-100 mb-3 font-inter">
            Login
          </button>
        </form>

        <div className="text-end">
          <button
            className="btn btn-link p-0 text-navy font-inter"
            onClick={handleForgotPasswordClick}
          >
            Forgot Password?
          </button>
        </div>
      </div>

      <p className="footer-text">©2025 JADEJA PRAGATI (I) PRIVATE LIMITED.</p>
    </div>
  );
};

export default Login;
