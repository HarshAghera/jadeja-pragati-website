// apps/admin/src/App.tsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginForm from './components/loginForm';
import ForgotPassword from './components/forgotPassword';
import Loader from './components/loader';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      setLoading(false); // No delay, just hide loader when ready
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
    }

    return () => window.removeEventListener('load', handlePageLoad);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
