import * as types from '../constants/actions/user';
const initialState = {
	isFetching: 0,      //是否已经获取 
	text:"test"
};
export default function(state = initialState, action) {
	switch (action.type) {
		case types.USER_MAIN_GET + '_SUCCESS':
			state = Object.assign({}, state, action.data, {
				isFetching: 1
			});
			return state;
		default:
			return state;
	}
};