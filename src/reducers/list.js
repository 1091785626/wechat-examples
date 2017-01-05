import * as types from '../constants/actions/list';
import {initItem,initObj} from '../utils/utils'; 
const notShadowObj = JSON.stringify(initObj);
const initialState = {
	keyword:'all',
	column:'default',
	direction:'',//desc降序（9-0）,asc升序（0-9）；默认降序
	style:false,//0 1两种样式
	list:{
		all:JSON.parse(notShadowObj)
	}
};
export default function(state = initialState, action) {
	let newState,items,curPage,totalPage,type,keyword;
	//因为es7 ...无法在微信小程序上使用，浅复制，深复制需要注意
	switch (action.type) {
		case types.LIST_MAIN_INIT:
			keyword = action.keyword;
			state.keyword = keyword;
			//这里要使用这样方式，否则浅复制很危险
			state.list[keyword] = Object.assign({},JSON.parse(notShadowObj));
			return state;
		case types.LIST_MAIN_SEARCH:
			keyword = action.keyword;
			state.keyword = keyword; 
			if(!state.list[keyword]){
				state.column = 'default';
				state.direction = '';
				state.list[keyword] = Object.assign({},JSON.parse(notShadowObj));
			}
			return state;
		case types.LIST_MAIN_GET + '_ON':
			keyword = action.opts.keyword;
			state.list[keyword].isEnd = 1;
			return state;
		case types.LIST_MAIN_GET + '_SUCCESS':
			keyword = action.opts.keyword;
			//curPage = action.data.curPage;
			curPage = state.list[keyword].curPage+1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.item_list);
			state.list[keyword].curPage = curPage;
			state.list[keyword].totalPage = totalPage;
			state.list[keyword].itemArr = [...state.list[keyword].itemArr,...items.itemArr];
			state.list[keyword].itemObj = Object.assign({},state.list[keyword].itemObj,items.itemObj);
			state.list[keyword].isEnd = curPage+1>totalPage?2:0;
			return state;
		case types.LIST_MAIN_GET + '_ERROR':
			keyword = action.opts.keyword;
			state.list[keyword].isEnd = 3;
			return state;
		case types.LIST_MAIN_CHANGETYPE:
			state.style =!state.style;
			return state;
		case types.LIST_MAIN_RESORT:
			state.column = action.column;
			state.direction = action.column=="default"?"":(state.direction=="desc"?"asc":"desc");
			//这里要使用这样方式，否则浅复制很危险
			state.list[state.keyword] = Object.assign({},JSON.parse(notShadowObj));
		default:
			return state;
	}
};