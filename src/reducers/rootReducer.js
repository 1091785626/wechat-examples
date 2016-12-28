import { combineReducers } from '../libs/redux.js';
import cart from './cart';
import test from './test';
const rootReducer = combineReducers({
	cart,
	test
});

export default rootReducer;