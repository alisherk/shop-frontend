import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeDestUrl } from '../../store/actions';
import { getToken } from '../utils/index';
import M from 'materialize-css';

export default ChildComponent => {
  class ComposedComponent extends Component {
    
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const authmodal = document.getElementById('authmodal');
      const instance = M.Modal.init(authmodal, {
        dismissible: false
      });
      let redirectUrl = this.props.location.pathname;
      if (getToken() == null) {
        instance.open();
        this.props.storeDestUrl(redirectUrl);
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return connect(null,{ storeDestUrl } )(ComposedComponent);

};
