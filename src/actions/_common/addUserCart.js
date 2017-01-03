import * as types from '../../constants/actions/_common';
/**
 * 有商品加入购物车（用户端）
 */
export function addUserCart() {
	return {
		type: types.USER_CART_ADD
	};
}