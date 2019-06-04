import { combineReducers } from 'redux';
import urlReducer from './url';
import cartReduce from './cart';


export default combineReducers({
   redirectUrl: urlReducer,
   cart: cartReduce
});