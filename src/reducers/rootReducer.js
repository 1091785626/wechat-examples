import { combineReducers } from '../libs/redux.js';
import test from './test';
import index from './index';
import category from './category';
import cart from './cart';
import user from './user';
const rootReducer = combineReducers({
	test,
	index,
	category,
	cart,
	user,
});

export default rootReducer;