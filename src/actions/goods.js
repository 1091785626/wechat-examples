import * as types from '../constants/actions/goods';
/**
 * 引入共用的action
 * ajax
 */
export { request } from './_common/request';
export { route } from './_common/route';

/**
 * 初始化数据
 */
export function initMain(id) {
	return { 
		type: types.GOODS_MAIN_INIT,
		id
	};
}
/**
 * 改变tab
 */
export function changeTab(tab) {
	return { 
		type: types.GOODS_MAIN_CHANGE_TAB,
		tab
	};
}
