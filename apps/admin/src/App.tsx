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
import Page from "./pages/page/page";
import CreatePage from "./pages/page/createPage";
import UpdatePage from "./pages/page/updatePage";
import SuperAdminPage from "./components/SuperAdminPage";
import CreateUser from "./components/AddAdmin";
import UpdatePassword from "./components/UpdatePassword";
import UserProfile from "./components/userProfile";

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
                    <ContactPage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/pages"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Page />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pages/create"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CreatePage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/pages/:id/edit"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UpdatePage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/pages/update/:slug"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UpdatePage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/superadmin"
              element={
                <ProtectedRoute>
                  <Layout>
                    <SuperAdminPage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/superadmin/AddAdmin"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CreateUser />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/superadmin/update-password/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UpdatePassword />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/userprofile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UserProfile />
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
