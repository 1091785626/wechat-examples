import * as types from '../constants/actions/list';
/**
 * 引入共用的action
 * ajax
 */
export { request } from './_common/request';
export { route } from './_common/route';
export { addUserCart } from './_common/addUserCart';


/**
 * 初始化分页数据，用于搜索
 */
export function initMain(keyword) {
	return { 
		type: types.LIST_MAIN_INIT,
		keyword
	};
}
/**
 * 搜索的内容
 */
export function searchInfo(keyword) {
	return { 
		type: types.LIST_MAIN_SEARCH,
		keyword
	};
}
/**
 * 改变样式
 */
export function changeType() {
	return { 
		type: types.LIST_MAIN_CHANGETYPE
	};
}
/**
 * 筛选排序
 */
export function reSort(column) {
	return { 
		type: types.LIST_MAIN_RESORT,
		column
	};
}

