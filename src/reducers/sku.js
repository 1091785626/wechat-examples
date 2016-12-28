import * as types from '../constants/actions/sku';
const initialState = {
	isFetching: 0,      //是否已经获取 
	text:"test"
};
export default function(state = initialState, action) {
	switch (action.type) {
		case types.SKU_SELECT:
			state = {
				isFetching: 0,      //是否已经获取 
				text:"2"
			};
			return state;
		default:
			return state;
	}
};