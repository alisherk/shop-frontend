import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { getToken, clearToken, clearCart } from '../utils';
import SignedinLinks from '../auth/SignedinLinks'; 
import SignedoutLinks from '../auth/SignedoutLinks';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import M from 'materialize-css'; 
import SignoutMessage from '../auth/SignoutMessage';

class Navbar extends Component {

  componentDidMount(){
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  }

  handleSignOut = () => {
    clearToken(); 
    clearCart(); 
    this.props.history.push('/');
    const signoutModal = document.getElementById('signoutmessage'); 
    const instance = M.Modal.init(signoutModal); 
    instance.open();
    this.props.clearUrl();
  }
  render() {
    return (
    <Fragment> 
    {getToken() !== null ? <SignedinLinks handleSignOut={this.handleSignOut}/> : <SignedoutLinks />}
    <SignoutMessage />
    </Fragment>
    );
  }
}

export default (withRouter(connect(null, actions)(Navbar)));
