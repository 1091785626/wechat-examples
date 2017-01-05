import {connect} from '../../../libs/wechat-redux.js';
import {bindActionCreators} from '../../../libs/redux.js';
import * as orderDetailActions from '../../../actions/order';
import * as types from '../../../constants/actions/order';
import toastConfig from '../../../components/toast/toast';
import payConfig from '../../../components/pay/pay';
function mapStateToData(state) {
	return Object.assign({},state.orderDetail,{$route:state.route});
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(orderDetailActions, dispatch)
	};
}
const pageConfig = {
	onShow(){
		const {query} = this.data.$route;
		if(query.pathName==="/pages/order/detail/detail") return;
		let { id } = query;
		this.actions.initDetail(id);
		if(!this.data.main.id){
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
};
const combineConfig = Object.assign({},toastConfig,payConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);