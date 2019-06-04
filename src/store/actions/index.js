import { GET_URL, CLEAR_URL, SET_CART_COUNT } from './types';

export const storeDestUrl = url => ({
  type: GET_URL,
  payload: url
});

export const clearUrl = () => ({
  type: CLEAR_URL,
  payload: ''
});

export const setCartCount = cartItems => ({
  type: SET_CART_COUNT, 
  payload: cartItems 
}); 
