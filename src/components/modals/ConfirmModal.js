import React from 'react';
import { calculatePrice } from '../utils/index';

function ConfirmModal({ cartItems, handleSubmitOrder, isProcessingOrder }) {

  const output = cartItems.map(item => {
    return (
      <div>
        <h4 className='indigo-text center'> Your items </h4>
        <ul className='collection' key={item._id}>
          <li
            className='collection-item white-text red'
            style={{ fontSize: '16px' }}
          >
            {item.name} - {item.quantity} x $
            {(item.quantity * item.price).toFixed(2)}
          </li>
        </ul>
        <div className='divider' />
        <h5> Your total: {calculatePrice(cartItems)} </h5>
      </div>
    );
  });

  return (
    <div id='confirm-modal' className='modal'>
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
          <div className='center'> 
          <button
            className='btn waves-effect waves-light center'
            type='submit'
            onClick={handleSubmitOrder}
            style={{ marginRight: '4px' }}
          >
            Confirm
          </button>
          <button className='btn modal-close waves-effect waves-light'>
            Cancel
          </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmModal;
