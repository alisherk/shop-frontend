import React from 'react';

function Footer() {
  return (
    <footer className='page-footer indigo'>
      <div className='container'>
        <div className='row'>
          <div className='col s12 l6'>
            <h5> Disclaimer </h5>
            <p>
              Proin check out this crunk. Boofron sizzle pizzle diam et massa
              funky fresh pellentesque. In izzle erat. Vivamizzle things sapien,
              mofo sizzle yo mamma, vulputate vitae, condimentum izzle, nizzle.
            </p>
          </div>
          <div className='col s12 l4 offset-l2'>
            <h5>Connect </h5>
            <ul className='valign-wrapper'>
              <li style={{ marginRight: '10px' }}>
                <i className='fa small fa-facebook' />
              </li>
              <li>
                <i className='fa small fa-twitter' />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className='container center-align'>
          &copy; Paul's {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
