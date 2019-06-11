import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignedoutLinks = () => {
  
  const cart = useSelector(state => state.cart);

  function renderCartCount() {
    return cart > 0 ? (
      <span style={{ position: 'relative', margin: '15px auto', fontSize: '15px' }}
        className='badge red white-text new'
      >
        {cart}
      </span>
    ) : null;
  }
  return (
    <nav>
      <div className='nav-wrapper indigo darken-2'>
        <div className='container'>
          <NavLink to='/' className='brand-logo left'>
            Paul's
            <i className='material-icons'>store</i>
          </NavLink>
          <ul id='nav-mobile' className='right'>
            <li>
              <a href='#authmodal' className='modal-trigger btn-floating'>
                <i className='material-icons'> vpn_key </i>
              </a>
            </li>
            {renderCartCount()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SignedoutLinks;
