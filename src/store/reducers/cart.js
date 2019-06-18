import { SET_CART_COUNT, CLEAR_CART_COUNT } from '../actions/types';

export default (state = [], { type, payload }) => {
  switch (type) {
    case SET_CART_COUNT:
      return state = payload.map(item => item)
    case CLEAR_CART_COUNT: 
      return state = [];
    default:
      return state;
  }
};
