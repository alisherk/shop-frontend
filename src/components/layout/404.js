import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='container'>
      <h3>Page not found </h3>
      <Link to='/'> Return home </Link>
    </div>
  );
}

export default NotFound;
