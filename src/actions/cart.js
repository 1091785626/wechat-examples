import * as types from '../constants/actions/cart';
/**
 * 引入共用的action
 * ajax
 */
export { request } from './_common/request';
export { sku } from './_common/sku';
export { toast } from './_common/toast';
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