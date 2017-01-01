import { combineReducers } from '../libs/redux.js';
import test from './test';
import index from './index';
import category from './category';
import cart from './cart';
import user from './user';
import userAddr from './userAddr';
import order from './order';
import orderList from './orderList';
import orderDetail from './orderDetail';
import goods from './goods';
import list from './list';
const rootReducer = combineReducers({
	test,
	index,
	category,
	cart,
	user,
	userAddr,
	order,
	orderList,
	orderDetail,
	goods,
	list,
});

export default rootReducer;