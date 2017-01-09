import {connect} from '../../../libs/wechat-redux.js';
import {bindActionCreators} from '../../../libs/redux.js';
import * as orderDetailActions from '../../../actions/order';
import * as types from '../../../constants/actions/order';
import toastConfig from '../../../components/toast/toast';
import payConfig from '../../../components/pay/pay';
import orderBtnConfig from '../../../components/order/btn/btn';

function mapStateToData(state) {
	return state.orderDetail;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(orderDetailActions, dispatch)
	};
}
const pageConfig = {
	onLoad(query = {}) {
		let {
			id
		} = query;
		this.actions.initDetail(id);
		this.loadDetailInfo(id);
	},
	loadDetailInfo(id){
		if(!this.data.main[id]){
			let url = types.ORDER_DETAIL_GET;
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
	onShareAppMessage(){
		return {
			title: '店铺首页',
			desc: '',
			path: '/pages/index/index'
		};
	}
};
const combineConfig = Object.assign({},toastConfig,payConfig,orderBtnConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);