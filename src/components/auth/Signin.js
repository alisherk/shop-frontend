import React, { Component } from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Link } from 'react-router-dom';
import { setToken } from '../utils';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css';

//initializing strapi
const apiUrl = process.env.REACT_APP_API_URL;
const strapi = new Strapi(apiUrl);

class Signin extends Component {

  state = {
    email: '',
    password: '',
    loading: false, 
  };

  handleChange = name => e => {
    this.setState({[name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    const authmodal = document.getElementById('authmodal');
    const instance = M.Modal.getInstance(authmodal);
    if (this.isFormEmpty(this.state)) {
      M.toast({html: 'Fill in all fields', classes: 'rounded' }, 3000);
    }
    try {
      //set loading to true
      this.setState({ loading: true });
      //make a request to login existing user
      const res = await strapi.login(email, password);
      //set loading false
      this.setState({ loading: false });
      //put token to manage user session
      setToken(res.jwt);
      //redirect message to home page
      let redirect = this.props.redirectUrl || '/';
      this.redirectUser(redirect);
      //close modal 
      instance.close();
    } catch (err) {
      this.setState({ loading: false });
      M.toast({html: err.message, classes: 'rounded' }, 3000)
    }
  };
  redirectUser = path => this.props.history.push(path);

  isFormEmpty = ({ email, password }) => {
    return !email || !password;
  };

  //close modal upon clickin on to reset password form
  closeModal = () => {
    const authmodal = document.getElementById('authmodal');
    M.Modal.getInstance(authmodal).close();
  }
 
  render() {
    return (
      <div className='container'>
        <div id='loginmodal'>
            <h4 className='center indigo-text'>Welcome back</h4>
            <form onSubmit={this.handleSubmit}>
              <div className='input-field'>
                <input type='text' id='authedmail' autoComplete='authedemail' onChange={this.handleChange('email')}/>
                <label htmlFor='authedemail'>Email</label>
              </div>
              <div className='input-field'>
                <input type='password' id='authedpassword' autoComplete='none' onChange={this.handleChange('password')} />
                <label htmlFor='authedpassword'>Password</label>
              </div>
              <div className='input-field center'>
                <button className='btn indigo waves-effect waves-light' disabled={this.state.loading}>
                   Submit
                </button>
              </div>
            </form>
            <div className='center section'> 
                <Link to='/forgetpassword' onClick={this.closeModal}> Forgot password </Link>
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps({ redirectUrl }){
  return {
    redirectUrl: redirectUrl.url
  }
}

export default connect(mapStateToProps)(withRouter(Signin));
