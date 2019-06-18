import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignedoutLinks = () => {
  const cart = useSelector(state => state.cart);

  function renderCartCount() {
    if (cart && cart.length !== 0) {
      return (
        <span
          style={{ position: 'relative', margin: '15px auto', fontSize: '15px'}}
          className='badge red white-text new'
        >
          {cart.length}
        </span>
      );
    } else {
      return null;
    }
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
            <NavLink className='btn-floating' to='/checkout'>
              <i className='material-icons'>shopping_cart </i>
            </NavLink>
            {renderCartCount()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SignedoutLinks;
