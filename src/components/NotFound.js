import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => (
<div className="notfound">
  <h2>404</h2>
  <h3>Page not found</h3>
  <p>It looks like you're lost </p>
  <Link to="/" className="notFoundButton">Return to Dashboard</Link>
</div>
);
export default NotFound;