import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as types from '../../constants/actions/order';
import * as orderActions from '../../actions/order';
import toastConfig from '../../components/toast/toast';
import payConfig from '../../components/pay/pay';
import addrConfig from '../../components/addr/addr';
import addrListConfig from '../../components/addr/addrList';
import logisConfig from '../../components/logis/logis';
function mapStateToData(state) {
	return state.order;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(orderActions, dispatch)
	};
}
const pageConfig = {
	inputMemo:null,
	onShow(){
		if (this.data.isFetching === 0) {
			let url = types.ORDER_MAIN_GET;
			let param = {};
			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: (res) => {
				},
				onError: (res) => {
					this.$toastInfo(res.msg);
				}
			};
			this.actions.request(url, params, {});
		}
	},
	handleCreateAddr(){
		this.$addrPopup({
			id:null,
			data:{},
			type:"create"
		}).then((res)=>{
			let url = types.ORDER_MAIN_ADDR_PUT;
			let param = Object.assign({},res);
			let params = {
				param: param,
				ajaxType: 'POST',//创建地址
				onSuccess: (res)=> {
					console.log('传回完整的单条数据');
				},
				onError: (res)=> {
					this.$toastInfo(res.msg);
				}
			};
			this.actions.request(url, params, {});
		}).catch((res)=>{
		});
	},
	handleShowAddrList(){
		this.$addrListPopup({
			addr_id:this.data.addr.id
		}).then((res)=>{
			let url = types.ORDER_MAIN_ADDR_SELECT_POST;
			let param = Object.assign({},{addr_id:res.id});
			let params = {
				param: param,
				ajaxType: 'PUT',//编辑地址
				onSuccess: (res)=> {
					console.log('传回完整的单条数据');
				},
				onError: (res)=> {
					this.$toastInfo(res.msg);
				}
			};
			this.actions.request(url, params, {});
		}).catch((res)=>{
		});
	},
	handleEditAddr(data){
		const id = data.id;
		this.$addrPopup({
			id,
			data:data,
			type:"edit"
		}).then((res)=>{
			let url = types.ORDER_MAIN_ADDR_PUT;
			let param = Object.assign({},{id},res);
			let params = {
				param: param,
				ajaxType: 'POST',//编辑地址
				onSuccess: (res)=> {
					console.log('传回完整的单条数据');
				},
				onError: (res)=> {
					this.$toastInfo(res.msg);
				}
			};
			this.actions.request(url, params, {});
		}).catch((res)=>{
		});
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
		const addr_id = this.data.addr.id;
		if(!addr_id){
			this.$toastInfo('请填写地址');
			return;
		}
		let url = types.ORDER_MAIN_GOODS_PUT;
		let param = {
			id,
			quantity,
			addr_id
		};

		let params = {
			param: param,
			ajaxType: 'PUT',
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
	},
	handleInput(event){
		this.inputMemo = event.detail.value;
	},
	handleLogis(event){
		const addr_id =this.data.addr.id;
		if(!addr_id){
			this.$toastInfo('请填写地址');
			return;
		}
		const info = event.currentTarget.id.split('_');
		const logis_id = info[0];
		const template_id = info[1];
		this.$logisPopup({
			logis_id,
			template_id,
			addr_id
		}).then((res)=>{
			let url = types.ORDER_MAIN_LOGIS_PUT;
			let param = {
					id:res.id,
					addr_id:this.data.addr.id
				};
			let params = {
				param: param,
				ajaxType: 'PUT',//物流选择
				onSuccess: (res)=> {
					console.log('传回完整的单条数据');
				},
				onError: (res)=> {
					this.$toastInfo(res.msg);
				}
			};
			this.actions.request(url, params, {});
		}).catch((res)=>{
		});
	},
	handleSureOrder(){
		const {addr,logis} = this.data;
		if (!addr.id) {
			this.$toastInfo('请先选择地址');
			this.handleCreateAddr();
			return;
		};
		let template = {};
		for(let i in logis){
			template[i] = logis[i].id;
			console.log(logis[i].id);
		}
		this.$payPopup({
			addr_id: addr.id,
			memo: this.inputMemo||"",
			template
		}).then((res={})=>{
			this.actions.updateList();
			if(res.is_btn){//点击确认离开
				wx.navigateTo({
					url:'/pages/order/list/list?type=topay'
				});
			}else{
				wx.navigateTo({
					url:'/pages/order/list/list?type=tosend'
				});
			}
		}).catch(()=>{
			this.actions.updateList();
			wx.navigateTo({
				url:'/pages/order/list/list?type=topay'
			});
		});
	},
	onShareAppMessage(){
		return {
			title: '店铺首页',
			desc: '',
			path: '/pages/index/index'
		};
	}
};
const combineConfig = Object.assign({},toastConfig,payConfig,addrConfig,addrListConfig,logisConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);