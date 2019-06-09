import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import 'materialize-css/dist/css/materialize.min.css';

//Components
import Navbar from './layout/Navbar';
import Items from './layout/Items';
import Brands from './layout/Brands';
import AuthModal from './auth/AuthModal';
import Checkout from './layout/Checkout';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import NotFound from './layout/404';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <AuthModal />
        <Switch>
          <Route exact path='/' component={Brands} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/forgotpass' component={ForgotPassword} />
          <Route path='/resetpass' component={ResetPassword} /> 
          <Route path='/:id' component={Items} />
          <Route path='*' component={NotFound} /> 
       
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
