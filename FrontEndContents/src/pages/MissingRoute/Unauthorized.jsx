import React from 'react'
import "./unauthorized.scss"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Unauthorized() {
  const navigate=useNavigate()
    return (
        <div className="not-found">
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <p onClick={()=>navigate(-1)} className='back'>Go back</p>
        </div>
      );
}

export default Unauthorized
