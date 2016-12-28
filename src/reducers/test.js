import * as types from '../constants/actions/test';
const initialState = {
	isFetching: 0,      //是否已经获取 
	didInvalidate: 1,   //是否失效
	text:"test"
};
export default function(state = initialState, action) {
	switch (action.type) {
		case types.TEST_MAIN_CLICK:
			state = {
				isFetching: 0,      //是否已经获取 
				didInvalidate: 1,   //是否失效
				text:"2"
			};
			return state;
		default:
			return state;
	}
};