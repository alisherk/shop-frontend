import React, { useState } from 'react';
import { validatePasswordStrength } from '../utils/index';
import queryString from 'query-string';
import Strapi from 'strapi-sdk-javascript/build/main';
import M from 'materialize-css';

//get server uri from env variables and init a new strapi object
const apiUrl = process.env.REACT_APP_API_URL;
const strapi = new Strapi(apiUrl);

function ResetPassword(props) {

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');


  const handleSubmit = async e => {
    e.preventDefault();
    if (!password || !passwordConfirmation) {
      return M.toast({ html: 'Please fill in all fields', classes: 'rounded' }, 3000);
    }
    if (password !== passwordConfirmation) {
      return M.toast({ html: "Passwords don't match ", classes: 'rounded' }, 3000);
    }

    if(!validatePasswordStrength(password)) {
      return M.toast({ html: 'Password must have 6 characters including a digit and uppercase letter', classes: 'rounded' }, 3000);
    }
      try {
      const parsed = queryString.parse(props.location.search);
      await strapi.resetPassword(parsed.code, password, passwordConfirmation);
      M.toast({ html: 'Your password is reset', classes: 'rounded' }, 3000);
      document.getElementById('reset-password-form').reset();
    } catch (err) {
      console.log(err);
      return M.toast({ html: err.message, classes: 'rounded' }, 3000);
    } 
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12 l8 offset-l1'>
          <form
            id='reset-password-form'
            className='section'
            onSubmit={handleSubmit}
          >
            <div className='input-field'>
              <input
                type='password'
                id='reset-password'
                onChange={e => setPassword(e.target.value)}
                autoComplete='none'
              />
              <label htmlFor='confirm-password'>New password</label>
            </div>
            <div className='input-field'>
              <input
                type='password'
                id='confirm-reset-password'
                onChange={e => setPasswordConfirmation(e.target.value)}
                autoComplete='none'
              />
              <label htmlFor='repeat-password'>Repeat password</label>
            </div>
            <button className='btn'> Submit </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
