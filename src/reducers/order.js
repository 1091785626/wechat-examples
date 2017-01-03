import * as types from '../constants/actions/order';
const initialState = {
	isFetching: 0,      //是否已经获取 
	isFetching: 0,      //是否已经获取 
	didInvalidate: 1,   //是否失效
	is_direct: 1,		//是否显示运费
	addr:{},
	amounts:{},
	logis:{},
	itemArr:[],        //拆分出来的id
	itemObj:{} 
};
function initItemMain (data){
	let itemArr = [];
	let itemObj = {};
	for (let i = 0; i < data.order_goods.length; i++) {
		itemArr = [...itemArr,data.order_goods[i].id];
		itemObj[data.order_goods[i].id] = data.order_goods[i];
	}
	addr = data.addr;
	amounts = data.amounts;
	let {addr,amounts,logis,is_direct} = data;
	return {itemArr,itemObj,addr,amounts,logis,is_direct};
}
export default function(state = initialState, action) {
	/**
	 * common
	 */
	let newState,items;
	/**
	 * order
	 */
	let id,quantity,logis_type;
	/**
	 * orderlist
	 */
	let type,curPage,totalPage,isEnd;
	switch (action.type) {
		case types.ORDER_MAIN_CLICK:
			state = {
				isFetching: 0,      //是否已经获取 
				text:"2"
			};
			return state;
		default:
			return state;
	}
};