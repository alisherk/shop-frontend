import React, { Component } from 'react';
import M from 'materialize-css';

class Cart extends Component {

  componentDidMount(){
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  }
  render() {
    return (
      <div className='container'>

        <div id='cart' className='modal'>
          <div className='modal-content black-text'>
            <h4>Your cart</h4>
            <p>You have 0 items in your cart</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
