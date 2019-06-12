import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Strapi from 'strapi-sdk-javascript/build/main';
import { NavLink } from 'react-router-dom';
import { calculatePrice, setCart, getCart } from '../utils/index';
import { setCartCount } from '../../store/actions';
import Loader from './Loader'; 

//get server uri from env variables and init a new strapi object
const apiUrl = process.env.REACT_APP_API_URL;
const strapi = new Strapi(apiUrl);

function Products(props) {

  const [items, setItems ] = useState(null);
  const [brand, setBrands] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch(); 

  useEffect(() => {
      fetchDate();
  }, []);
  

  const fetchDate = async () => {
   let id = props.match.params.id;
    try {
      const { data } = await strapi.request('POST', '/graphql', {
        data: {
          query: `query {
                brand(id:"${id}") {
                  _id 
                  name 
                  items {
                    _id
                    name
                    description
                    price
                    image {
                      url
                    }
                  } 
                }
              } `
        }
      });
      setItems(data.brand.items); 
      setBrands(data.brand.name); 
      setCartItems(getCart()); 

    } catch (err) {
      console.log(err.message);
    }
  }
  
 const addToCart = item => {
    const alreadyInCart = cartItems.findIndex(cartItem => cartItem._id === item._id);
    if (alreadyInCart === -1) {
      const updatedItems = cartItems.concat({ ...item, quantity: 1 });
      setCartItems(updatedItems); 
      setCart(updatedItems); 
      dispatch(setCartCount(updatedItems)); 

    } else {
      const updatedItems = [...cartItems];
      updatedItems[alreadyInCart].quantity += 1;
      setCartItems(updatedItems);
      setCart(updatedItems);
      dispatch(setCartCount(updatedItems)); 
    }
  };

 const renderProducts = () => {
    if (!items || !brand) {
      return <Loader top={'7vw'} />  
    }
    return (
      <div>
        <h4 className='center red-text darken-3'> {brand} </h4>
        {items &&
          items.map(item => {
            return (
              <div className='col l5' key={item._id}>
                <div className='card z-depth-2' style={{maxHeight:'100%'}}>
                  <div className='card-image'>
                    <img
                      className='responsive-img'
                      src={item.image.url}
                      alt=''
                    />
                    <button onClick={() => addToCart(item)}
                      className='btn-floating halfway-fab red pulse'
                    >
                      <i className='material-icons'>add</i>
                    </button>
                  </div>
                  <div className='card-content'>
                  <span className='card-title'> {item.name} </span>
                    <p> {item.description} </p>
                    <h5 className='center indigo-text'> <strong> ${item.price} </strong></h5>
                    </div> 
                </div>
              </div>
            );
          })}
      </div>
    );
  }

  const deleteItemFromCart = itemToDeleteId => {
    const deletedItems = cartItems.filter(item => item._id !== itemToDeleteId); 
    setCartItems(deletedItems); 
    setCart(deletedItems);
    dispatch(setCartCount(deletedItems)); 
  }

 const renderCartItems = () => {
    return (
      <div>
        <span className='card-title center'>Your cart</span>
        {cartItems.length === 0 && <p className='orange-text'> Please select items </p>}
        
        {cartItems.map(item => {
          return (
            <ul className='collection' key={item._id}> 
            <li className='collection-item white-text red' style={{fontSize:'15px'}}>
              {item.name} - {item.quantity} x ${(item.quantity * item.price).toFixed(2)}
              <span onClick={() => deleteItemFromCart(item._id)} className='secondary-content' style={{cursor:'pointer'}}> 
                <i className='material-icons white-text'> close </i>
              </span>
            </li>
            </ul>
          );
        })}
        <div className='divider' />
        <h6> Your total: {calculatePrice(cartItems)} </h6>
      </div>
    );
  }
    return (
      <div className='container'>
        <div className='row' style={{display:'flex', flexWrap:'wrap-reverse'}}>

         {/*  {Products desplayed with a helper function above } */}
          <div className='col s12 l8'>{renderProducts()}</div>

          {/* Shopping Cart rendered with a helper function above */}
          <div className='col s12 l4'>
            <div
              className='card blue-grey darken-1'
              style={{ marginTop: '6vw' }}
            >
              <div className='card-content white-text'>

                {renderCartItems()}

                <div className='section center'>
                  <NavLink to='/checkout' className='orange-text'>
                    CHECKOUT
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default Products;
