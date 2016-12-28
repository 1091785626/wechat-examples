import * as types from '../../constants/actions/sku';
export function skuSelect(id) {
	return { 
		type: types.SKU_SELECT, 
		id
	};
}