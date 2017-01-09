import * as types from '../constants/actions/order';
import { ROUTER_CHANGE } from '../constants/actions/_common';

const initialState = {
	isFetching: 0,      //是否已经获取 
	addr:{},
	amounts:{},
	logis:{},
	items:0,       //item数量
	itemArr:[],        //拆分出来的id
	itemObj:{} 
};
function initItemMain (data){
	let itemArr = [];
	let itemObj = {};
	for (let i = 0; i < data.order_goods.length; i++) {
		itemArr = [...itemArr,data.order_goods[i].id];
		itemObj[data.order_goods[i].id] = data.order_goods[i];
	}
	addr = data.addr;
	amounts = data.amounts;
	let {addr,amounts,logis} = data;
	return {itemArr,itemObj,addr,amounts,logis,items:itemArr.length-1};
}
export default function(state = initialState, action) {
	/**
	 * common
	 */
	let newState,items;
	/**
	 * order
	 */
	let id,quantity,template_id;
	/**
	 * orderlist
	 */
	let type,curPage,totalPage,isEnd;
	//因为es7 ...无法在微信小程序上使用，浅复制，深复制需要注意
	switch (action.type) {
		/**
		 * order
		 */
		case types.ORDER_MAIN_GET + '_SUCCESS':
			state = Object.assign(
						{}, 
						state, 
						initItemMain(action.data), 
						{isFetching: 1}
					);
			return state;
		case types.ORDER_MAIN_ADDR_SELECT_POST + '_SUCCESS'://需要返回的数据
		case types.ORDER_MAIN_ADDR_PUT + '_SUCCESS'://需要返回的数据
			state = Object.assign(
						{}, 
						state, 
						{
							addr:action.data.addr,
							logis:action.data.logis,
							amounts:action.data.amounts
						}
					);
			return state;
		case types.ORDER_MAIN_GOODS_PUT + '_SUCCESS'://需要返回的数据
			id = action.param.id;
			state.itemObj[id].quantity = action.param.quantity;
			state = Object.assign(
						{}, 
						state, 
						{
							addr:action.data.addr,
							logis:action.data.logis,
							amounts:action.data.amounts
						}
					);
			return state;
		case types.ORDER_MAIN_LOGIS_PUT + '_SUCCESS'://需要返回的数据
			//template_id = action.param.template_id;
			//id = action.param.id;
			//state.logis[template_id] = action.param;
			state = Object.assign(
						{}, 
						state, 
						{
							logis:action.data.logis,
							amounts:action.data.amounts
						}
					);
			return state;
		/**
		 * 清理
		 */
		case types.ORDER_MAIN_LIST_UPDATE:
		case ROUTER_CHANGE:
			//为了方便，直接清理数据
			state = initialState;
			return state;
		default:
			return state;
	}
};