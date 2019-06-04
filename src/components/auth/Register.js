import React, { Component } from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import { setToken } from '../utils';
import { withRouter } from 'react-router-dom';
import M from 'materialize-css';

const apiUrl = process.env.REACT_APP_API_URL;
const strapi = new Strapi(apiUrl);

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    loading: false
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (this.IsFormEmpty(this.state)) {
      return M.toast({html: 'Fill in all fields', classes: 'rounded' }, 3000);
    }
    if (!this.validatePasswordStrength(password)){
      return M.toast({html: 'Password must be 6 characters long with one digit & uppercase', classes: 'rounded' }, 3000);
    }
    const authmodal = document.getElementById('authmodal');
    const instance = M.Modal.getInstance(authmodal);
    try {
      //set loading to true
      this.setState({ loading: true });
      //make a request to server to register user
      const res = await strapi.register(username, email, password);
      //set loading false
      this.setState({ loading: false });
      //put token to manage user session
      setToken(res.jwt);
      //redirect message to home page
      this.props.history.push('/');
      //close modal
      instance.close();
    } catch (err) {
      this.setState({ loading: false });
      M.toast({ html: err.message, classes: 'rounded' }, 3000);
    }
  };

  //ensure that form is not empty 
  IsFormEmpty = ({ username, email, password }) => {
    return !username || !email || !password;  
  };

  //ensure password is at least 6 characters with one uppercase and one digit
  validatePasswordStrength = password => {
    const reg = /(?=.*[\d])(?=.*[A-Z])[A-Za-z\d]{6,}$/;
    return reg.test(password); 
  }

  render() {
    return (
      <div className='container'>
        <div id='register'>
          <h4 className='center indigo-text'>Register</h4>
          <form onSubmit={this.handleSubmit}>
            <div className='input-field'>
              <input
                type='text'
                id='username'
                autoComplete='none'
                onChange={this.handleChange}
              />
              <label htmlFor='username'>Username</label>
            </div>
            <div className='input-field'>
              <input
                type='email'
                id='email'
                autoComplete='none'
                onChange={this.handleChange}
              />
              <label htmlFor='email'>Email</label>
            </div>
            <div className='input-field'>
              <input
                type='password'
                id='password'
                autoComplete='none'
                onChange={this.handleChange}
              />
              <label htmlFor='password'>Password</label>
            </div>
            <div className='input-field center'>
              <button
                className='btn indigo waves-effect waves-light'
                type='submit'
                disabled={this.state.loading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Register);
