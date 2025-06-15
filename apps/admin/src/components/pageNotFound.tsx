import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="fs-3">Oops! Page not found.</p>
      <p className="lead">
        The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn"
        style={{ backgroundColor: '#001f3f', color: 'white' }}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
