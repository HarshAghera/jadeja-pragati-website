import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { toast, ToastContainer } from "react-toastify";
import bgImage from "../images/bg.webp";

const apiUrl = import.meta.env.VITE_API_URL;


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bgLoaded, setBgLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = bgImage;
    img.onload = () => setBgLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Login failed. Please try again.");
        return;
      }

      const responseData: { value: { access_token: string } } =
        await res.json();

      localStorage.setItem("authToken", responseData.value.access_token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  return (
    <div className={`login-container ${bgLoaded ? "bg-loaded" : "bg-loading"}`}>
      <ToastContainer position="bottom-right" autoClose={2500} />
      <div className="card login-card">
        <div className="text-center mb-4">
          <h2 className="text-navy font-playfair">Login</h2>
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
              id="email"
              className={`form-control ${email ? "bg-light" : ""}`}
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
              id="password"
              className="form-control"
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
