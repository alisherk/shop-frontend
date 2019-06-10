import React, { useState } from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import M from 'materialize-css';

//get server uri from env variables and init a new strapi object
const apiUrl = process.env.REACT_APP_API_URL;
const strapi = new Strapi(apiUrl);

function ForgotPassword() {
  
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email) {
      return M.toast({html: 'Please enter your email', classes: 'rounded'}, 3000);
    }
    try {
      await strapi.forgotPassword(email, `${process.env.REACT_APP_RESETPASS_URL}`);
      M.toast({html: 'Email is on the way', classes: 'rounded' }, 3000);
      document.getElementById('reset-email').value = '';
    } catch (err) {
      console.log(err);
      M.toast({html: err.message, classes: 'rounded' }, 3000);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12 l8 offset-l1'>
          <form className='section' onSubmit={handleSubmit}>
            <div className='input-field'>
              <input
                type='email'
                id='reset-email'
                className='validate'
                onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor='reset-email'>Please enter valid email</label>
              <i className='material-icons prefix'>email </i>
            </div>
            <button className='btn'> Submit </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
