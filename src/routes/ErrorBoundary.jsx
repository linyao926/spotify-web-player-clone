import React from 'react';
import { Link } from "react-router";

const ErrorBoundary = ({error}) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', flexGrow: '1', height: '100%' }}>
      <h2>Something went wrong!</h2>
      <p>{error?.statusText || "An unexpected error occurred."}</p>
      <p>Please try again later or go back to the home page.</p>
      <Link to="/" style={{
        color: 'var(--text-base)'
      }}>Go Back to Home</Link>
    </div>
  );
};

export default ErrorBoundary;