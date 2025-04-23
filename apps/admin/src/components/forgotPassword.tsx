import React, { useState } from "react";
import "../styles/forgotPassword.css";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required.");
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    } else {
      toast.success("Password has been reset successfully.");
      console.log("Password reset for:", email);
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <ToastContainer position="bottom-right" autoClose={2500} />

      <div className="forgot-password-card card shadow-lg p-3 ">
        <div className="text-center mb-4 font-playfair">
          <h2>Reset Password</h2>
          <p className="text-muted font-inter" style={{ fontSize: "16px" }}>
            Enter your email and new password.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label forgot-password-label font-inter">
              Email Address
            </label>
            <input
              type="email"
              className="form-control forgot-password-input"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label forgot-password-label font-inter">
              New Password
            </label>
            <input
              type="password"
              className="form-control forgot-password-input"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label forgot-password-label font-inter">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control forgot-password-input"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn w-100 forgot-password-btn font-inter">
            Reset Password
          </button>
        </form>
      </div>

      <p className=" forgot-password-footer">© 2025 JADEJA PRAGATI (I) PRIVATE LIMITED.</p>
    </div>
  );
};

export default ForgotPassword;
