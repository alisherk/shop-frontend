import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Strapi from 'strapi-sdk-javascript/build/main';
import M from 'materialize-css';

//import about component
import About from './About';
import Footer from './Footer';

//get server uri from env variables and init a new strapi object
const apiUrl = process.env.REACT_APP_API_URL;
const strapi = new Strapi(apiUrl);

function Brands() {
  const [brands, setBrands] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
    initScrollSpy();
  }, []);

  const initScrollSpy = () => {
    const scrollspy = document.querySelectorAll('.scrollspy');
    M.ScrollSpy.init(scrollspy);
  };

  const fetchData = async () => {
    try {
      const res = await strapi.request('POST', '/graphql', {
        data: {
          query: `query {
             brands {
               _id 
               name
               description
               image {
                 url
                 name
               }
             }
           }`
        }
      });
      setBrands(res.data.brands);
    } catch (err) {
      console.error(err);
    }
  };

  //set search terms based on the value typed into input
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  //clear search value
  const removeFilter = () => {
    setSearchTerm('');
    document.getElementById('search_bar').value = '';
  };

  //filter function based on a searh term value is called down below
  const filtered = () => {
    return brands.filter(brand => {
      return (
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const renderBrands = () => {
    //if there are no brands render a loader
    if (!brands) {
      return (
        <div
          className='progress col s12 l6 offset-l3'
          style={{ marginTop: '7vw' }}
        >
          <div className='indeterminate' />
        </div>
      );
    }
    return filtered().map(brand => {
      return (
        <div className='col s12 m6 l4' key={brand._id}>
          <div className='card medium z-depth-2'>
            <div className='card-image'>
              <img
                className='responsive-img'
                style={{ width: '70%' }}
                src={`${apiUrl}${brand.image.url}`}
                alt=''
              />
              <span
                className='halfway-fab btn-floating pink pulse'
                style={{ marginBottom: '25px' }}
              >
                <i className='material-icons'> favorite </i>
              </span>
            </div>
            <div className='card-content'>
              <span className='card-title'> {brand.name} </span>
              {brand.description}
            </div>
            <div className='card-action indigo'>
              <Link to={`/${brand._id}`} className='white-text'>
                Purchase
              </Link>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div className='container'>
        <div className='row section'>
          <div className='col s12 m5 l6'>
            <div className='valign-wrapper'>
             <a href='#about' className='btn-floating' style={{margin:'10px'}}>
                 About 
              </a>
              <h3 className='indigo-text center'>Our brands </h3>
           </div>
          </div>
          <div className='col s12 l6 pull-l1'>
            <div className='input-field alternate-color'>
              <input id='search_bar' type='text' onChange={handleChange} />
              <label htmlFor='search_bar'>Search</label>
              <i style={{cursor:'pointer'}} className='material-icons red-text prefix' onClick={removeFilter}>
                close
              </i>
            </div>
          </div>
        </div>
        <div className='row'>{renderBrands()}</div>
      </div>
      <About />
      <Footer />
    </Fragment>
  );
}

export default Brands;
