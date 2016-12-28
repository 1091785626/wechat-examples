import * as types from '../constants/actions/test';
/**
 * 引入共用的action
 * ajax
 */
export { request } from './_common/request';
/**
 * 购物车选择
 * 全选/单选
 */
export function testClick(id) {
	return { 
		type: types.TEST_MAIN_CLICK, 
		id
	};
}