import * as types from '../constants/actions/cart';
/**
 * 引入共用的action
 * ajax
 */
export { request } from './_common/request';
export { route } from './_common/route';

/**
 * 购物车选择
 * 全选/单选
 */
export function cartSelect(id) {
	return { 
		type: types.CART_MAIN_SELECT, 
		id
	};
}
/**
 * 购物车修改商品属性
 */
export function cartProps(param) {
	return { 
		type: types.CART_MAIN_PROPS, 
		param
	};
}
