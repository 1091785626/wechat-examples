import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as types from '../../constants/actions/index';
import * as indexActions from '../../actions/index';
import diyConfig from '../../components/diy/diy';
import skuConfig from '../../components/sku/sku';
import toastConfig from '../../components/toast/toast';
import routeConfig from '../../components/route/route';
function mapStateToData(state) {
	return state.index;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(indexActions, dispatch)
	};
}
const pageConfig = {
	onShow(){
		if (this.data.isFetching === 0) {
			this.loadData();
		}
	},
	loadData(){
		let url = types.INDEX_MAIN_GET;
		let param = {};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
				let title = res.data.shop.title;
				if(title){
					wx.setNavigationBarTitle({
						title: title
					});	
				}
				
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
	onShareAppMessage(){
		return {
			title: '店铺首页',
			desc: '',
			path: '/pages/index/index'
		};
	}
};
const combineConfig = Object.assign({},diyConfig,skuConfig,toastConfig,routeConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);