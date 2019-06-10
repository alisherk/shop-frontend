import React from 'react';

function Footer() {
  const address = ' 121 Salter Street\n Winnipeg MB \n R3Y 0Z0';
  return (
    <footer className='page-footer indigo'>
      <div className='container'>
        <div className='row'>
          <div className='col s12 l6 section'>
            <h5> We are located at </h5>
              <div style={{whiteSpace: 'pre-line', fontSize:'16px'}}>
                {address}
              </div>
          </div>
          <div className='col s12 l4 offset-l2 section'>
            <h5>Connect </h5>
            <ul className='valign-wrapper'>
              <li style={{ marginRight: '20px' }}>
                <i className='fa small fa-facebook' />
              </li>
              <li>
                <i className='fa small fa-twitter' />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='center-align section'>
          <h6> &copy; Paul's {new Date().getFullYear()}</h6>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
