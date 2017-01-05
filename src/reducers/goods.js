import * as types from '../constants/actions/goods';
const initialState = {
	curId:null,
	main:{}
};
export default function(state = initialState, action) {
	let id,tab;
	switch (action.type) {
		case types.GOODS_MAIN_INIT:
			id = action.id;
			state.curId = id ||"undefined";
			return state;
		case types.GOODS_MAIN_GET + '_SUCCESS':
			id = action.param.id;
			state.main[id] = action.data;
			state.main[id].curTab = 'info';
			return state;
		case types.GOODS_MAIN_CHANGE_TAB:
			tab = action.tab;
			state.main[state.curId].curTab = tab;
			return state;
		default:
			return state;
	}
};