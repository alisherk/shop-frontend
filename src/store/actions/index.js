import { GET_URL, CLEAR_URL, SET_CART_COUNT, CLEAR_CART_COUNT } from './types';
import { storeState, clearState } from '../../components/utils'; 

export const storeDestUrl = url => ({
  type: GET_URL,
  payload: url
});

export const clearUrl = () => ({
  type: CLEAR_URL,
  payload: ''
});

export const setCartCount = cartItems => {
  storeState(cartItems);
  return {
    type: SET_CART_COUNT,
    payload: cartItems
  };
};

export const clearCartCount = () => {
  clearState(); 
  return {
    type: CLEAR_CART_COUNT, 
    payload: ''
  }
};
