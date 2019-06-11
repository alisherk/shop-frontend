import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignedinLinks = ({ handleSignOut }) => {
  const cart = useSelector(state => state.cart);

  function renderCartCount() {
    if (cart > 0)
      return (
        <span
          style={{
            position: 'relative',
            margin: '15px auto',
            fontSize: '15px'
          }}
          className='badge red white-text new'
        >
          {cart}
        </span>
      );
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
              {/*eslint-disable-next-line*/}
              <a className='btn-floating' onClick={handleSignOut}>
                <i className='material-icons'> exit_to_app </i>
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

export default SignedinLinks;
