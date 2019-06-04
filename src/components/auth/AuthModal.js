import React, { Component } from 'react';
import Register from './Register';
import Signin from './Signin';
import M from 'materialize-css';

class AuthModal extends Component {
  
  componentDidMount() {
    const tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);
  }

  render() {
    return (
      <div className='container'>
        <div id='authmodal' className='modal'>
          <div className='center'>
            <ul className='tabs s12 l6'>
            <li className='tab col'>
                <a href='#loginmodal' className='indigo-text text-darken-4'>
                  Login
                </a>
              </li>
              <li className='tab col s6'>
                <a href='#register' className='indigo-text text-darken-4'>
                  Register
                </a>
              </li>
            </ul>
          </div>
          <div className='section'>
             <Register />
             <Signin/>
          </div> 
        </div>
      </div>
    );
  }
}

export default AuthModal;
