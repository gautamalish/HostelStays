import React from 'react'
import "./unauthorized.scss"
import { Link } from 'react-router-dom';
function Unauthorized() {
    return (
        <div className="not-found">
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <Link to="/">Go to Login</Link>
        </div>
      );
}

export default Unauthorized
