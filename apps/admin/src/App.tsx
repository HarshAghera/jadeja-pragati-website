import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import LoginForm from "./components/loginForm";
import ForgotPassword from "./components/forgotPassword";
import Loader from "./components/loader";
import PageNotFound from "./components/pageNotFound";
import Dashboard from "./pages/dashboard/dashboard";
import Layout from "./components/layout";
import Blog from "./pages/blog/blog"; 
import CreateBlog from "./pages/blog/createBlog"; 

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // simulate load
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />

          <Route
            path="/blog"
            element={
              <Layout>
                <Blog />
              </Layout>
            }
          />
          <Route
            path="/blog/create"
            element={
              <Layout>
                <CreateBlog />
              </Layout>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
