import React from 'react';
import { calculatePrice } from '../utils/index';
import { useSelector } from 'react-redux';

function ConfirmationModal({ cartItems, handleSubmitOrder, isProcessingOrder }) {

  const cart = useSelector(state => state.cart)

  const output = cartItems ? (
    <div>
      <h4 className='center'>
         {cart === 1 ? <span> You have {cart} item </span> : <span> You have {cart} items </span> }
      </h4>
      {cartItems.map(item => {
        return (
          <ul className='collection' key={item._id}>
            <li
              className='collection-item white-text red'
              style={{ fontSize: '16px' }}
            >
              {item.name} - {item.quantity} x $
              {(item.quantity * item.price).toFixed(2)}
            </li>
          </ul>
        );
      })}
      <div className='divider' />
      <h5> Your total: {calculatePrice(cartItems)} </h5>
    </div>
  ) : (
    <div>You have nothing in the cart </div>
  );

  return (
    <div id='confirmationmodal' className='modal'>
      <div className='modal-content'>{output}</div>
      {isProcessingOrder ? (
        <div className='center'>
          <div className='preloader-wrapper big active'>
            <div className='spinner-layer spinner-indigo-only'>
              <div className='circle-clipper right'>
                <div className='circle' />
              </div>
              <div className='gap-patch'>
                <div className='circle' />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='modal-footer'>
          <button
            className='btn waves-effect waves-light'
            type='submit'
            onClick={handleSubmitOrder}
            style={{ marginRight: '4px' }}
          >
            Confirm
          </button>
          <button className='btn modal-close waves-effect waves-light'> Cancel </button>
        </div>
      )}
    </div>
  );
}

export default ConfirmationModal;
