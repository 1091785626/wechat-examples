import * as types from '../constants/actions/index';
const initialState = {
	isFetching: 0,//是否已经获取 
	itemArr:[],//自定义模版
	itemObj:{},//自定义模版数据
	header:{},//头部导航
	shop:{}
};
function initItemMain(res){
	let itemArr = [];
	let itemObj = {};
	for (let i = 0; i < res.diy.length; i++) {
		const type=`${res.diy[i].type}#${i}`;
		itemArr = [...itemArr,{type:type,_type:res.diy[i].type}];
		itemObj[type] = res.diy[i].content;
	}
	let {shop,header}= res;
	return {itemArr,itemObj,header,shop};
}
export default function(state = initialState, action) {
	let items;
	//因为es7 ...无法在微信小程序上使用，浅复制，深复制需要注意
	switch (action.type) {
		case types.INDEX_MAIN_GET + '_SUCCESS':
			items = initItemMain(action.data);
			state = Object.assign({},state,items,{isFetching: 1});
			return state;
		default:
			return state;
	}
};