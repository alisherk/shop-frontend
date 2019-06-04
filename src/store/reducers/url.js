import { GET_URL, CLEAR_URL } from '../actions/types';

const INITIAL_STATE = {
  url: ''
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_URL:
      return { url: payload };
    case CLEAR_URL:
      return { url: payload };
    default:
      return state;
  }
};
