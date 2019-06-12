import { SET_CART_COUNT } from '../actions/types';

export default (state = [], { type, payload }) => {
  switch (type) {
    case SET_CART_COUNT:
      return state = payload.map(item => item)
    default:
      return state;
  }
};
