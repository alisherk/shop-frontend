import React from 'react';

const SignoutMessage = () => {
  return (
    <div id='signoutmessage' className='modal'>
      <div className='modal-content'>
        <h4 className='center indigo-text'> Thank your for using our service</h4>
        <h6 className='center'> Please come again ! </h6>
      </div>
      <div className='modal-footer'>
        <button className='modal-close waves-effect btn-flat'>
          <i className='material-icons red-text'> close </i>
        </button>
      </div>
    </div>
  );
};

export default SignoutMessage;
