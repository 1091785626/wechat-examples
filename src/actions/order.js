import * as types from '../constants/actions/order';
/**
 * 引入共用的action
 * ajax
 */
export { request } from './_common/request';
/**
 * 订单详情-立即支付
 */
export function orderListDetail() {
	return { 
		type: types.ORDER_BTN_LIST_DETAIL_INIT,
	};
}

/**
 * 更新我的进货订单列表
 */
export function updateList(){
	return {
		type:types.ORDER_MAIN_LIST_UPDATE
	};
}
/**
 * 初始化
 */
export function initList(tab) {
	return { 
		type: types.ORDER_LIST_INIT,
		tab
	};
}
/**
 * 改变tab
 */
export function changeTab(tab) {
	return { 
		type: types.ORDER_LIST_CHANGE_TAB,
		tab
	};
}

/**
 * 初始化
 */
export function initDetail(id) {
	return { 
		type: types.ORDER_DETAIL_INIT,
		id
	};
}