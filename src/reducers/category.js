import * as types from '../constants/actions/category';
import {initItem} from '../utils/utils'; 

const initialState = {
	isFetching: 0,      //是否已经获取 
	curId:null,//当前的id
	dataLeft:[],//左边数据
	dataRight:{},//右边数据
};
export default function(state = initialState, action) {
	let newState,items,id;
	//因为es7 ...无法在微信小程序上使用，浅复制，深复制需要注意
	switch (action.type) {
		case types.CATEGORY_MAIN_GET + '_SUCCESS':
			items = initItem(action.data,'id');
			state = {
				curId:items.itemArr[0],
				dataLeft:action.data,
				dataRight:{},
				isFetching: 1,
			};
			return state;
		case types.CATEGORY_MAIN_CHANGE:
			state = Object.assign({},state,{curId:action.id});
			return state;
		case types.CATEGORY_MAIN_LIST_GET + '_SUCCESS':
			id = action.param.id;
			items = initItem(action.data,'id');
			for (let key in items.itemObj){
				items.itemObj[key] =Object.assign(
						{
							id:items.itemObj[key].id,
							name:items.itemObj[key].name,
						},
						initItem(items.itemObj[key].children)
					);
			}
			state.dataRight[id] = items;
			return state;
		default:
			return state;
	}
};