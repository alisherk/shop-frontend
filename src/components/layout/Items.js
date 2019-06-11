import React, { Component } from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import { NavLink } from 'react-router-dom';
import { calculatePrice, setCart, getCart } from '../utils/index';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

//get server uri from env variables and init a new strapi object
const apiUrl = process.env.REACT_APP_API_URL;
const strapi = new Strapi(apiUrl);

class Items extends Component {
  
  state = {
    items: null,
    brand: null,
    cartItems: []
  };

  async componentDidMount() {
    let id = this.props.match.params.id;
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
      this.setState({
        items: data.brand.items,
        brand: data.brand.name, 
        cartItems: getCart()
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  addToCart = item => {
    const alreadyInCart = this.state.cartItems.findIndex(
      cartItem => cartItem._id === item._id
    );
    if (alreadyInCart === -1) {
      const updatedItems = this.state.cartItems.concat({
        ...item,
        quantity: 1
      });
      this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
      this.props.setCartCount(updatedItems); 
    } else {
      const updatedItems = [...this.state.cartItems];
      updatedItems[alreadyInCart].quantity += 1;
      this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
      this.props.setCartCount(updatedItems); 
    }
  };

  renderProducts() {
    const { items, brand } = this.state;
    if (!items || !brand) {
      return (
        <div
          className='progress col s12 l6 offset-l3'
          style={{ marginTop: '7vw' }}
        >
          <div className='indeterminate' />
        </div>
      );
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
                    <button
                      onClick={() => this.addToCart(item)}
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

  deleteItemFromCart = itemToDeleteId => {
    const deletedItems = this.state.cartItems.filter(item => item._id !== itemToDeleteId); 
    this.setState({ cartItems: deletedItems }, () => setCart(deletedItems)); 
    this.props.setCartCount(deletedItems);
  }

  renderCartItems() {
    const { cartItems } = this.state;
    return (
      <div>
        <span className='card-title center'>Your cart</span>
        {cartItems.length === 0 && <p className='orange-text'> Please select items </p>}
        
        {cartItems.map(item => {
          return (
            <ul className='collection' key={item._id}> 
            <li className='collection-item white-text red' style={{fontSize:'12px'}}>
              {item.name} - {item.quantity} x ${(item.quantity * item.price).toFixed(2)}
              <span onClick={() => this.deleteItemFromCart(item._id)} className='secondary-content' style={{cursor:'pointer'}}> 
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

  render() {
    return (
      <div className='container'>
        <div className='row' style={{display:'flex', flexWrap:'wrap-reverse'}}>

         {/*  {Products desplayed with a helper function above } */}
          <div className='col s12 l8'>{this.renderProducts()}</div>

          {/* Shopping Cart rendered with a helper function above */}
          <div className='col s12 l4'>
            <div
              className='card blue-grey darken-1'
              style={{ marginTop: '6vw' }}
            >
              <div className='card-content white-text'>

                {this.renderCartItems()}

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
}

export default connect(null, actions)(Items);
