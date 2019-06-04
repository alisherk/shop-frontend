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

/* const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
      getToken() !== null ? 
      <Component {...props} /> : <Redirect to={{
        pathname: '/', 
        state: { from: props.location}
      }}/>
  )} />
);  */

const Home = () => <h1> About us </h1>;

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <AuthModal />
        <Switch>
          <Route exact path='/' component={Brands} />
          <Route path='/about' component={Home} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/:id' component={Items} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
