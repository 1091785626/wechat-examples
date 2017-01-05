import * as types from '../constants/actions/user';
import { ROUTER_CHANGE } from '../constants/actions/_common';
import { ORDER_BTN_PAYMENT, ORDER_BTN_POST } from '../constants/actions/order';
const initialState = {
	isFetching: 0,      //是否已经获取 
	user:{},
	order:{},
	shop:{}
};
export default function(state = initialState, action) {
	//因为es7 ...无法在微信小程序上使用，浅复制，深复制需要注意
	switch (action.type) {
		case types.USER_MAIN_GET + '_SUCCESS':
			state = Object.assign({}, state, action.data, {
				isFetching: 1
			});
			return state;
		/**
		 * 清理数据
		 */
		case ROUTER_CHANGE: //慎用
		case ORDER_BTN_PAYMENT:
		case ORDER_BTN_POST + '_SUCCESS':
			return initialState;
		default:
			return state;
	}
};