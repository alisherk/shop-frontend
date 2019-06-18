import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getToken, clearToken, clearCart } from '../utils';
import SignedinLinks from '../auth/SignedinLinks'; 
import SignedoutLinks from '../auth/SignedoutLinks';
import { clearCartCount } from '../../store/actions';
import SignoutMessage from '../modals/SignoutMessage';
import { useDispatch } from 'react-redux';
import M from 'materialize-css'; 

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
    M.Modal.init(signoutModal).open(); 
    dispatch(clearCartCount()); 
  }
 
    return (
    <Fragment> 
      {getToken() !== null ? <SignedinLinks handleSignOut={handleSignOut}/> : <SignedoutLinks />}
      <SignoutMessage />
    </Fragment>
    );  
}

export default withRouter(Navbar);
