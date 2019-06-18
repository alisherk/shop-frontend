import React, { useState, useEffect } from 'react';
import { getCart, setCart, calculatePrice, clearCart, calculateAmount, getToken} from '../utils/index';
import { Elements, StripeProvider, CardElement, injectStripe} from 'react-stripe-elements';
import Strapi from 'strapi-sdk-javascript/build/main';
import M from 'materialize-css';
import ConfirmModal from '../modals/ConfirmModal';
import AuthModal from '../modals/AuthModal';
import { useDispatch } from 'react-redux';
import { setCartCount } from '../../store/actions';
import { Link } from 'react-router-dom';

//get server uri from env variables and init a new strapi object
const apiUrl = process.env.REACT_APP_API_URL;
const strapi = new Strapi(apiUrl);

function _CheckoutForm(props) {

  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cardEl, setCardEl] = useState(true);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  //get access to dispatch function to dispatch action to cart reduce in store
  const dispatch = useDispatch();

  const handleConfirmOrder = e => {
    e.preventDefault();
    if(getToken() === null) {
      const authmodal = document.getElementById('authmodal');
      return M.Modal.init(authmodal).open(); 
    }
    if (!address || !postalCode || !city || !email || cardEl) {
      return M.toast(
        {
          html: 'Please complete all fields and credit card info',
          classes: 'rounded'
        },
        3000
      );
    }
    const confirmodal = document.getElementById('confirm-modal');
    M.Modal.init(confirmodal).open(); 
  };

  const deleteItemFromCart = itemToDeleteId => {
    const deletedItems = cartItems.filter(item => item._id !== itemToDeleteId);
    setCartItems(deletedItems);
    setCart(deletedItems);
    dispatch(setCartCount(deletedItems));
  };

  const handleSubmitOrder = async () => {
    //calculate amount to send to stripe 
    const amount = calculateAmount(cartItems);
    //process order
    let token;
    try {
      // processingOrder
      setIsProcessingOrder(true);
      //create stripe token with record in stripe
      const res = await props.stripe.createToken();
      if (res.error) {
        setIsProcessingOrder(false);
        return M.toast({ html: res.error.message, classes: 'rounded' }, 3000);
      } else {
        token = res.token.id;
      }

      //create order in db
      await strapi.createEntry('orders', {
        amount,
        cartItems,
        city,
        postalCode,
        address,
        email,
        token
      });
      //send email to customer 
      await strapi.request('POST', '/email', {
        data: {
          to: email,
          subject: `Order confirmation from Paul ${new Date(Date.now())}`,
          text: `Your order has been processed`,
          html: `<bold> Expect your order to arrive in 2-3 shipping days </bold> <p> You have paid ${amount} for your item </p> <p> Please keep this email as your receipt ! </p>`
        }
      });
      setIsProcessingOrder(false);
      //show success message
      M.toast(
        { html: 'Your order submitted successfully', classes: 'rounded' },
        5000
      );
      //close modal
      const confirmodal = document.getElementById('confirm-modal');
      M.Modal.getInstance(confirmodal).close(); 
      //clear the cart
      setCartItems([]);
      //dispatch the status of cart to store
      dispatch(setCartCount([]));
      //clear everything for local store
      clearCart();
      //redirect to main page 
      props.history.push('/');
    } catch (error) {
      //show error if any
      setIsProcessingOrder(false);
      M.toast({ html: error.message, classes: 'rounded' }, 3000);
    }
  };

  const renderCart = () => {
    return cartItems.length > 0 ? (
      <div className='row'>
        <div className='col s12 l8 offset-l2'>
          <div
            className='card'
            style={{ marginTop: '30px', paddingBottom: '25px' }}
          >
            <div className='card-content'>
              <h4 className='center indigo-text'>Checkout</h4>
              {cartItems.map(item => {
                return (
                  <ul className='collection' key={item._id}>
                    <li
                      className='collection-item white-text red'
                      style={{ fontSize: '16px' }}
                    >
                      {item.name} - {item.quantity} x $
                      {(item.quantity * item.price).toFixed(2)}
                      <span
                        onClick={() => deleteItemFromCart(item._id)}
                        className='secondary-content'
                        style={{ cursor: 'pointer' }}
                      >
                        <i className='material-icons white-text'> close </i>
                      </span>
                    </li>
                  </ul>
                );
              })}
              <div>
                <div className='divider' />
                <h5 className='section'>
                  Your total: {calculatePrice(cartItems)}
                </h5>
              </div>
              <form onSubmit={handleConfirmOrder}>
                <div className='input-field'>
                  <input
                    type='text'
                    id='address'
                    autoComplete='none'
                    onChange={e => setAddress(e.target.value)}
                  />
                  <label htmlFor='address'>Address</label>
                </div>
                <div className='input-field'>
                  <input
                    type='text'
                    id='postal'
                    autoComplete='none'
                    onChange={e => setPostalCode(e.target.value)}
                  />
                  <label htmlFor='postal'>Postal Code</label>
                </div>
                <div className='input-field'>
                  <input
                    type='text'
                    id='city'
                    autoComplete='none'
                    onChange={e => setCity(e.target.value)}
                  />
                  <label htmlFor='city'>City</label>
                </div>
                <div className='input-field'>
                  <input
                    type='text'
                    id='confirmationemail'
                    autoComplete='none'
                    onChange={e => setEmail(e.target.value)}
                  />
                  <label htmlFor='confirmation email'>Email</label>
                </div>
                <div className='input-field'>
                  <CardElement
                    onChange={e => setCardEl(e.empty)}
                    style={{ base: { fontSize: '15.50px' } }}
                  />
                </div>
                <div className='center section'>
                  <button
                    className='btn waves-effect waves-light'
                    type='submit'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className='row'>
        <div className='col s12 l8 offset-l2'>
          <div className='card'>
            <div className='card-content center'>
              <h5> You have no items in you cart right </h5>
              <Link to='/'> Continue to your shopping experience </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='container'>
      {renderCart()}
        <AuthModal />
        <ConfirmModal
        cartItems={cartItems}
        handleSubmitOrder={handleSubmitOrder}
        isProcessingOrder={isProcessingOrder}
         /> 
    </div>
  );
}

const CheckoutForm = injectStripe(_CheckoutForm);

const Checkout = props => {
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
      <Elements>
        <CheckoutForm {...props} />
      </Elements>
    </StripeProvider>
  );
};

export default Checkout;
