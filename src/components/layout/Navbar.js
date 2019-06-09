import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getToken, clearToken, clearCart } from '../utils';
import SignedinLinks from '../auth/SignedinLinks'; 
import SignedoutLinks from '../auth/SignedoutLinks';
import { clearUrl } from '../../store/actions';
import M from 'materialize-css'; 
import SignoutMessage from '../auth/SignoutMessage';
import { useDispatch } from 'react-redux';

function Navbar(props) {

useEffect(()=> {
   initAuthModal(); 
},[])
  
const initAuthModal = () => {
  const authmodal = document.getElementById('authmodal'); 
  M.Modal.init(authmodal);
}

const dispatch = useDispatch(); 

 const handleSignOut = () => {
    clearToken(); 
    clearCart(); 
    props.history.push('/');
    const signoutModal = document.getElementById('signoutmessage'); 
    const instance = M.Modal.init(signoutModal); 
    instance.open();
    dispatch(clearUrl()); 
  }
 
    return (
    <Fragment> 
      {getToken() !== null ? <SignedinLinks handleSignOut={handleSignOut}/> : <SignedoutLinks />}
      <SignoutMessage />
    </Fragment>
    );  
}

export default withRouter(Navbar);
