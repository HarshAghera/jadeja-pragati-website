import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from "./components/loginForm";
import ForgotPassword from "./components/forgotPassword";
import Loader from "./components/loader";
import PageNotFound from "./components/pageNotFound";
import Dashboard from "./pages/dashboard/dashboard";
import Layout from "./components/layout";
import Blog from "./pages/blog/blog";
import CreateBlog from "./pages/blog/createBlog";
import UpdateBlog from "./pages/blog/updateBlog";
import ProtectedRoute from "./components/protect-route";
import ContactPage from "./pages/contact/contactPage"; 


const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/blog"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Blog />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/create"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CreateBlog />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs/:id/edit"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UpdateBlog />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ContactPage/>
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <ToastContainer position="top-right" autoClose={3000} />
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
