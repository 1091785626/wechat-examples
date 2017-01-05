import * as types from '../constants/actions/category';
/**
 * 引入共用的action
 * ajax
 */
export { request } from './_common/request';
export { route } from './_common/route';
/**
 * 点击选择分类按钮
 */
export function categoryChange(id) {
	return { 
		type: types.CATEGORY_MAIN_CHANGE, 
		id
	};
}