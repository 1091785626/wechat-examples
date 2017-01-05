import * as types from '../constants/actions/user';
import {initItem} from '../utils/utils'; 
const initialState = {
	isFetching: 0,      //是否已经获取 
	itemArr:[],
	itemObj:{}
};
export default function(state = initialState, action) {
	let newState,id,itemArr;
	//因为es7 ...无法在微信小程序上使用，浅复制，深复制需要注意
	switch (action.type) {
		case types.USER_ADDR_GET + '_SUCCESS':
			state = Object.assign(
						{}, 
						state, 
						initItem(action.data), 
						{isFetching: 1}
					);
			return state;
		case types.USER_ADDR_DELETE_POST +'_SUCCESS':
			id=action.param.id;//删除地址的id
			itemArr=state.itemArr.filter(value => value != id);
			state = Object.assign(
						{}, 
						state, 
						{itemArr:[...itemArr]}
					);
			return state;
		case types.USER_ADDR_SELECT_POST +'_SUCCESS':
			id=action.param.id;
			itemArr=[id,...state.itemArr.filter(value => value != id)];
			state = Object.assign(
						{}, 
						state, 
						{itemArr:[...itemArr]}
					);
			return state;
		case types.USER_ADDR_EDIT_POST +'_SUCCESS':
			//暂时先用浅复制
			state.itemObj[action.data.id]=action.data;
			return state;
		case types.USER_ADDR_CREATE_POST +'_SUCCESS':
			//暂时先用浅复制
			state.itemArr=[...state.itemArr,action.data.id];
			state.itemObj[action.data.id]=action.data;
			return state;
		default:
			return state;
	}
};