import * as types from '../constants/actions/_common';
const initialState = {
	pathName:null,
	path:null,
	query:{}
};

export default function(state = initialState, action) {
	//因为es7 ...无法在微信小程序上使用，浅复制，深复制需要注意
	switch (action.type) {
		case types.URL_PUSH:
			state = Object.assign(
						{}, 
						state,
						action.param
					);
			return state;
		default:
			return state;
	}
};