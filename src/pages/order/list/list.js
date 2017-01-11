import {connect} from '../../../libs/wechat-redux.js';
import {bindActionCreators} from '../../../libs/redux.js';
import * as orderListActions from '../../../actions/order';
import * as types from '../../../constants/actions/order';
import toastConfig from '../../../components/toast/toast';
import payConfig from '../../../components/pay/pay';
import orderBtnConfig from '../../../components/order/btn/btn';
function mapStateToData(state) {
	return state.orderList;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(orderListActions, dispatch)
	};
}
const pageConfig = {
	onLoad(query = {}) {
		let {
			type = 'all'
		} = query;
		this.actions.initListTab(type);
		//setData是同步的
		if (this.data.list[type].curPage == 0) {
			this.loadDataForScroll();
		}
	},
	onPullDownRefresh(){
		const {
			curTab
		} = this.data;
		this.actions.initList(curTab);
		this.loadDataForScroll();
	},
	loadDataForScroll(){
		const {
			curTab,
			list
		} = this.data;
		const listInfo = list[curTab];
		//console.log(this.props);
		if(listInfo.isEnd>0){ //只有状态为0时才可以加载数据
			return false;
		}
		let url = types.ORDER_LIST_GET;
		let param = {
			page:listInfo.curPage+1,
			type:curTab
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res)=> {
				wx.stopPullDownRefresh();
			},
			onError: (res)=> {
				this.$toastInfo(res.msg);
			}
		};
		this.actions.request(url, params, {});
	},
	scrollBottom(){
		this.loadDataForScroll();
	},
	handleTab(event){
		let tab = event.currentTarget.id;
		
		this.actions.changeTab(tab);
		//setData是同步的
		const {curTab,list} = this.data;
		if(list[curTab].curPage==0){
			this.loadDataForScroll();
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