import * as types from '../constants/actions/cart';
import { USER_CART_ADD } from '../constants/actions/_common';
const initialState = {
	isFetching: 0,      //是否已经获取 
	itemArr:[],        //拆分出来的id
	itemObj:{},
	carts:[],
	carts_temp:[],
	_price:null,
	_count:null,
	_invalid:null,
	_quantity:null,
	_select:!0//默认全选
};
function initItemMain (data){
	let _select = !0;//默认全选
	let itemArr = [];
	let itemObj = {};
	/*
		以上渲染的时候用，
		以下购物车逻辑处理
	*/
	let carts = []; //表示选中的商品

	let carts_lose = []; // 失效商品

	let carts_temp = []; // 可以编辑的全部商品 id 用于全选

	let _count = 0; //表示购物车商品类型数量
	let _invalid = 0; //失效数量
	for (let i = 0; i < data.length; i++) {
		itemArr = [...itemArr,data[i].id];
		itemObj[data[i].id] = data[i];
		if (!data[i].status) { //["status": 1]
			carts_lose = [...carts_lose,data[i].id]; //表示过期的商品
			_invalid++;
		} else {
			carts = [...carts,data[i].id]; //可编辑商品
			carts_temp = [...carts_temp,data[i].id];

			itemObj[data[i].id].select = !0;//默认选中
		}
		_count++;
	}
	let { _price,_quantity } = sumCommon( carts,carts_temp,itemObj ); // 计算当前价格和数量
	return {itemArr,itemObj,carts,carts_lose,carts_temp,_price,_quantity,_invalid,_count,_select};
}
function sumCommon(carts,carts_temp,itemObj){
	let _price = 0;
	let _quantity = 0;
	let _select = carts.sort().toString() == carts_temp.sort().toString();//是否全选
	for (let i = 0; i < carts.length; i++) { //选中的商品
		_price += itemObj[carts[i]].price * itemObj[carts[i]].quantity;
		_quantity += itemObj[carts[i]].quantity;
	}
	for (let i = 0; i < carts_temp.length; i++) { //选中的商品
		if(carts.includes(carts_temp[i])){
			itemObj[carts_temp[i]].select = !0;//选中
		}else{
			itemObj[carts_temp[i]].select = !1;
		}
	}
	_price = parseFloat(_price).toFixed(2); //保留两位；
	return {_price,_quantity,_select,itemObj};
}
function deleteCommon(itemArr,carts,carts_temp,carts_lose,_count,_invalid,id){
	if(!(id instanceof Array)){
		itemArr = itemArr.filter(value => value != id); // 过滤掉一样的值
		carts = carts.filter(value => value != id); // 过滤掉一样的值
		carts_temp = carts_temp.filter(value => value != id); // 过滤掉一样的值
		_count--;
	}else{
		let status = 0;
		let arr;
		if(carts_lose.join(';')==id.join(';')){//清空失效购物车
			status = 1;
			arr = carts_lose;
			_invalid=0;
		}else{//正常删除
			arr = carts;
		}
		for(let i=0;i<arr.length;i++){
			itemArr = itemArr.filter(value => value != arr[i]); // 过滤掉一样的值
			carts = carts.filter(value => value != arr[i]); // 过滤掉一样的值
			carts_temp = carts_temp.filter(value => value != arr[i]); // 过滤掉一样的值
			_count--;
		}
	}
	return {itemArr,carts,carts_temp,_count,_invalid};
}
export default function(state = initialState, action) {
	let newState, items, isTrue, carts, carts_temp, carts_lose, itemArr, id, sum, _count, _invalid, deleteData, quantity;
	switch (action.type) {
		case types.CART_MAIN_GET + '_SUCCESS':
			state = Object.assign(
						{}, 
						state, 
						initItemMain(action.data), 
						{isFetching: 1}
					);
			return state;
		case types.CART_MAIN_SELECT:
			//选择
			carts = state.carts; // carts 选中的id数组
			carts_temp = state.carts_temp; // carts 选中的id数组
			id = action.id; //当前操作的id
			if (id) { //单选
				isTrue = (carts).includes(id);
				if (isTrue) {
					carts = carts.filter(value => value != id); // 过滤掉一样的值
				} else {
					//carts.push(id);
					carts = [...carts, id];
				}
			} else { //全选
				if (carts.length > 0) {
					carts = [];
				} else {
					carts = carts_temp;
				}
			}
			sum = sumCommon(carts,carts_temp,state.itemObj);
			state = Object.assign({}, state, {carts}, sum);
			return state;
		case types.CART_MAIN_DELETE + '_SUCCESS':
			//删除
			carts = state.carts; // carts 选中的id数组
			carts_temp = state.carts_temp; // carts 选中的id数组
			carts_lose = state.carts_lose; // carts_lose 失效
			itemArr = state.itemArr; // 全部id数组;
			_count = state._count; // 全部id数组
			_invalid = state._invalid;
			id = action.param.id;
			deleteData = deleteCommon(itemArr, carts, carts_temp, carts_lose, _count, _invalid, id);
			sum = sumCommon(deleteData.carts, deleteData.carts_temp,state.itemObj);
			state = Object.assign({}, state, deleteData, sum);
			return state;
		case types.CART_MAIN_PUT + '_SUCCESS':
			//更新数据
		    carts = state.carts; // carts 选中的id数组
		    carts_temp = state.carts_temp; // carts 选中的id数组
			id = action.param.id;
			//暂时先用浅复制
			state.itemObj[id].quantity = action.param.quantity;
			sum = sumCommon(carts,carts_temp,state.itemObj);
			state = Object.assign({}, state, sum);
			return state;
		case types.CART_MAIN_PROPS:
			//更新数据
			id = parseInt(action.param.cart_id);
			//暂时先用浅复制
			state.itemObj[id].img = action.param.img;
			state.itemObj[id].props_str = action.param.props_str;
			state.itemObj[id].sku_id = action.param.sku_id;
			state.itemObj[id].price = action.param.price;
			carts = state.carts; // carts 选中的id数组
			carts_temp = state.carts_temp; // carts 选中的id数组
			sum = sumCommon(carts,carts_temp,state.itemObj);
			state = Object.assign({}, state, sum);
			return state;
		case USER_CART_ADD:
		case types.CART_MAIN_POST + '_SUCCESS':
			//结算；为了方便，暂时考虑是清空购物车数据
			return initialState;
		default:
			return state;
	}
};