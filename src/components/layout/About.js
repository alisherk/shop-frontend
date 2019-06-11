import React, { Fragment, useState, useEffect } from 'react';
import ParallaxImage from '../../images/parallax-img.jpg';
import M from 'materialize-css';
import Strapi from 'strapi-sdk-javascript/build/main';

//get server uri from env variables and init a new strapi object
const apiUrl = process.env.REACT_APP_API_URL;
const strapi = new Strapi(apiUrl);

function About() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    initParallax();
  }, []);

  const initParallax = () => {
    const parallax = document.querySelector('.parallax');
    M.Parallax.init(parallax);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name || !email || !message) {
      return M.toast(
        { html: 'please fill in all fields', classes: 'rounded' },
        3000
      );
    }
    const res = await strapi.request('POST', '/email', {
      data: {
        to: 'alisherkabildjanov@yahoo.com',
        subject: `Inquiry from ${name}`,
        text: `you got new email`,
        html: `<p> ${message} </p> <hr> <p> This customer can be contacted at ${email}. </p>`
      }
    });
    M.toast({ html: res, classes: 'rounded' }, 3000);
    document.getElementById('contact-form').reset();
  };

  return (
    <Fragment>
      <div className='parallax-container' style={{ height: '250px' }}>
        <div className='parallax'>
          <img src={ParallaxImage} alt='' />
        </div>
      </div>

      <div id='about' className='container section scrollspy'>
        <div className='row'>
          <div className='col s12 l5'>
            <h3 className='indigo-text'> About </h3>
            <p>
              We refurbish all famous brands. Our brands include Bosch, Sumsung,
              Sony and many more and provide quality apliances to families at
              budget prices. Our team of professionals can assess your needs and
              choose an appliance that is right for you. We specialize in
              stoves, washing machines, dryers, fridges and much more. Please
              contact us for a quote
            </p>
          </div>
          <div className='col s12 l5 offset-l1'>
            <h3 className='indigo-text'> Contact us </h3>
            <form id='contact-form' onSubmit={handleSubmit}>
              <div className='input-field'>
              <i className='material-icons prefix'>account_circle</i>
                <input
                  type='text'
                  id='name'
                  onChange={e => setName(e.target.value)}
                />
                <label htmlFor='name'>Name</label>
              
              </div>
              <div className='input-field'>
              <i className='material-icons prefix'>email</i>
                <input
                  type='email'
                  id='contactemail'
                  onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='input-field'>
              <i className='material-icons prefix'>message</i>
                <input
                  type='text'
                  id='message'
                  onChange={e => setMessage(e.target.value)}
                />
                <label htmlFor='message'>Message</label>
              </div>
              <div id='customer-choice' className='input-field'>
                <ul>
                  <li>
                    <label>
                      <input type='checkbox' />
                      <span> Washers</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type='checkbox' />
                      <span> Stoves</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type='checkbox' />
                      <span> Fridges</span>
                    </label>
                  </li>
                </ul>
              </div>
              <div className='input-field center'>
                <button className=' indigo lighten-1 btn waves-effect waves-light'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default About;
