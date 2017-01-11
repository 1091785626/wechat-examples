import * as types from '../constants/actions/order';
import { ROUTER_CHANGE } from '../constants/actions/_common';
import {initItem,initObj} from '../utils/utils'; 
const notShadowObj = JSON.stringify(initObj);
const initialState = {
	curTab:'all',
	list:{
		all:JSON.parse(notShadowObj),
		tosend:JSON.parse(notShadowObj),
		topay:JSON.parse(notShadowObj),
		torec:JSON.parse(notShadowObj),
		tocomment:JSON.parse(notShadowObj)
	}
};
export default function(state = initialState, action) {
	/**
	 * orderlist
	 */
	let items,type,curPage,totalPage,isEnd,tab;
	switch (action.type) {
		case types.ORDER_LIST_INIT_TAB:
		case types.ORDER_LIST_CHANGE_TAB:
			tab = action.tab;
			state.curTab = tab;
			return state;
		case types.ORDER_LIST_GET + '_ON':
			type = action.param.type;
			state.list[type].isEnd = 1;
			return state;
		case types.ORDER_LIST_GET + '_SUCCESS':
			type = action.param.type;
			//curPage = action.data.curPage;
			curPage = state.list[type].curPage+1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.item_list);
			state.list[type].curPage = curPage;
			state.list[type].totalPage = totalPage;
			state.list[type].itemArr = [...state.list[type].itemArr,...items.itemArr];
			state.list[type].itemObj = Object.assign({},state.list[type].itemObj,items.itemObj);
			state.list[type].isEnd = curPage+1>totalPage?2:0;
			return state;
		case types.ORDER_LIST_GET + '_ERROR':
			type = action.param.type;
			state.list[type].isEnd = 3;
			return state;
		case types.ORDER_LIST_INIT:
		case types.ORDER_BTN_LIST_DETAIL_INIT:
		case types.ORDER_MAIN_LIST_UPDATE://rder中触发list变化
		case ROUTER_CHANGE:
			//为了方便，直接清理数据
			state = {
				curTab:action.tab||'all',
				list:{
					all:JSON.parse(notShadowObj),
					tosend:JSON.parse(notShadowObj),
					topay:JSON.parse(notShadowObj),
					torec:JSON.parse(notShadowObj),
					tocomment:JSON.parse(notShadowObj)
				}
			};
			return state;
		default:
			return state;
	}
};