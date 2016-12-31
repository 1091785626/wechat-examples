/*使用redux强化管理*/
import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as cartActions from '../../actions/cart';
import * as types from '../../constants/actions/cart';
import skuConfig from '../../components/sku/sku';
import toastConfig from '../../components/toast/toast';
function mapStateToData(state) {
	return state.cart;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(cartActions, dispatch)
	};
}
const pageConfig = {
	data:{
		edit:!1,//编辑状态
	},
	onLoad(){
		console.log('cart start');
		if (this.data.isFetching === 0) {
			let url = types.CART_MAIN_GET;
			let param = {};
			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: (res) => {
				},
				onError: (res) => {
				}
			};
			this.actions.request(url, params, {});
		}
	},
	handleEdit(){
		this.setData({
			edit:!this.data.edit
		});
	},
	handleDel(event){
		const id = event.currentTarget.id;
		const {carts,carts_lose} = this.data;
		let url = types.CART_MAIN_DELETE;
		let param = {
			id:id=="all"?carts:(id=="lose"?carts_lose:id)
		};
		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res) => {
			},
			onError: (res) => {
				this.$toastInfo(res.msg);
			}
		};
		if(param.id instanceof Array &&param.id.length==0){
			this.$toastInfo('至少删除1件');
			return;
		}
		wx.showModal({
			title: '删除',
			content: '确定删除么?',
			success: (res)=> {
				res.confirm&&this.actions.request(url, params);
			}
		});
	},
	handleSelect(event){
		const id = event.currentTarget.id;
		this.actions.cartSelect(id!='all'?id:null);
	},
	handleQuantity(event){
		const info = (event.currentTarget.id).split("_");
		const type = info[0];
		const id = info[1];
		const {itemObj} = this.data;
		const itemData = itemObj[id];
		let quantity;
		let curQuantity = parseInt(itemData.quantity);
		if(type == 'minus'){
			quantity = curQuantity - 1;
			quantity = this._compareWithStock(quantity,itemData);
		}else if(type == 'plus'){
			quantity = curQuantity + 1;
			quantity = this._compareWithStock(quantity,itemData);
		}else{
			quantity = this._compareWithStock(event.detail.value,itemData);
			if(itemData.stock==itemData.quantity||(quantity==1&&itemData.quantity==1)){
				//使用this.setData，我们不用redux这个hack(输入临界bug),可以使用浅复制
				const itemObj = this.data.itemObj;
				itemObj[id].quantity = itemData.quantity;
				this.setData({
					itemObj
				});
				return;
			}
		}
		let url = types.CART_MAIN_PUT;
		let param = {
			id,
			quantity
		};

		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res) => {
			},
			onError: (res) => {
				this.$toastInfo(res.msg);
			}
		};
		if(curQuantity != quantity){//数量变化时
			this.actions.request(url,params);
		}
	},
	handleSku(event){
		const info = (event.currentTarget.id).split("_");
		const id = info[0];
		const product_id = info[1];
		this.$skuPopup({
			product_id,
			sku_id:this.data.itemObj[id].sku_id,
			btnType:3
		}).then((res)=>{

		}).catch((res)=>{

		});
	},
	handleBuy(){
		let {carts}=this.data;
		if(carts.length==0){
			this.$toastInfo('至少购买1件');
		}else{
			let url = types.CART_MAIN_POST;
			let param = {
				ids:carts
			};
			let params = {
				param: param,
				ajaxType: 'POST',
				onSuccess: (res) => {
					wx.navigateTo({url:'/pages/order/order'});
				},
				onError: (res) => {
				}
			};
			this.actions.request(url, params);
		}
	},
	_compareWithStock(quantity,itemData){
		let stock = parseInt(itemData.stock);
		if (isNaN(quantity) || quantity <= 0) {
			this.$toastInfo('至少要购买1件',1.5);
			quantity = 1;
		} else if (quantity > stock) {
			this.$toastInfo('最多可购买' + stock + '件',1.5);
			quantity = stock;
		}
		return quantity;
	}
};
const combineConfig = Object.assign({},skuConfig,toastConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);