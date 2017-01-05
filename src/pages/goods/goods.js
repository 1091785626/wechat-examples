import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as goodsActions from '../../actions/goods';
import * as types from '../../constants/actions/goods';
import skuConfig from '../../components/sku/sku';
import toastConfig from '../../components/toast/toast';
import routeConfig from '../../components/route/route';
function mapStateToData(state) {
	return Object.assign({},state.goods,{$route:state.route});
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(goodsActions, dispatch)
	};
}
const pageConfig = {
	onShow(){
		const {query} = this.data.$route;
		if(query.pathName==="/pages/goods/goods") return;
		let { id } = query;
		this.actions.initMain(id);
		if(!this.data.main.id){
			let url = types.GOODS_MAIN_GET;
			let param = {id};
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
	handleSku(event){
		const product_id = event.currentTarget.id;
		this.$skuPopup({
			product_id,
			btnType:0
		}).then((res)=>{
			this.actions.addUserCart();
		}).catch((res)=>{
		});
	},
	handleTabs(event){
		this.actions.changeTab(event.currentTarget.id);
	},
};
const combineConfig = Object.assign({},skuConfig,toastConfig,routeConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);