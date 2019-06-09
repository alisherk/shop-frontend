import { SET_CART_COUNT } from '../actions/types';

export default (state = 0, { type, payload }) => {
  switch (type) {
    case SET_CART_COUNT:
      //takes an arrya passed from component and add quntity starting at 0 as default
      const cartItems = payload.reduce((total, curItem) => total + curItem.quantity, 0);
      //changes state based on items passed
      return state = cartItems; 
    default:
      return state;
  }
};
