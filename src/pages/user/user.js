import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as types from '../../constants/actions/user';
import * as userActions from '../../actions/user';
import toastConfig from '../../components/toast/toast';
function mapStateToData(state) {
	return state.user;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(userActions, dispatch)
	};
}
const pageConfig = {
	onShow(){
		if (this.data.isFetching === 0) {
			this.loadData();
		}
	},
	loadData(){
		let url = types.USER_MAIN_GET;
		let param = {};
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
		this.loadData();
	},
	handleCalling(){
		wx.makePhoneCall({phoneNumber: this.data.shop.tel});
	},
	onShareAppMessage(){
		return {
			title: '店铺首页',
			desc: '',
			path: '/pages/index/index'
		};
	}
};
const combineConfig = Object.assign({},toastConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);