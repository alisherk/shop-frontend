import React from 'react'; 
import { NavLink } from 'react-router-dom'; 

const SignedoutLinks = () => {
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
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default SignedoutLinks; 