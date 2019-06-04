import { SET_CART_COUNT } from '../actions/types';

export default (state = 0, { type, payload }) => {
  switch (type) {
    case SET_CART_COUNT:
      const cartItems = payload.reduce((total, curItem) => total + curItem.quantity, 0);
      return state = cartItems; 
    default:
      return state;
  }
};
