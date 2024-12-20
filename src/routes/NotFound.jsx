import React from 'react';
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', flexGrow: '1', height: '100%' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default NotFound;