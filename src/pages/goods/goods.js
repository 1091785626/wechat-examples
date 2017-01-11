import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as goodsActions from '../../actions/goods';
import * as types from '../../constants/actions/goods';
import skuConfig from '../../components/sku/sku';
import toastConfig from '../../components/toast/toast';
function mapStateToData(state) {
	return state.goods;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(goodsActions, dispatch)
	};
}
const pageConfig = {
	onLoad(query = {}) {
		let {
			id
		} = query;
		this.actions.initMain(id);
		if (!this.data.main[id]) {
			this.loadData(id);
		}
	},
	loadData(id){
		let url = types.GOODS_MAIN_GET;
		let param = {
			id
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
				wx.stopPullDownRefresh();
			},
			onError: (res) => {
				this.$toastInfo(res.msg);
			}
		};
		this.actions.request(url, params, {});
	},
	onPullDownRefresh(){
		const {curId} = this.data;
		this.loadData(curId);
	},
	handleSku(event){
		const info = event.currentTarget.id.split('_');
		const product_id = info[0];
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
	onShareAppMessage(){
		return {
			title: '店铺首页',
			desc: '',
			path: '/pages/index/index'
		};
	}
};
const combineConfig = Object.assign({},skuConfig,toastConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);