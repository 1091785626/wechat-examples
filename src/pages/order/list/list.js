import {connect} from '../../../libs/wechat-redux.js';
import {bindActionCreators} from '../../../libs/redux.js';
import * as orderListActions from '../../../actions/order';
import * as types from '../../../constants/actions/order';
import toastConfig from '../../../components/toast/toast';
import payConfig from '../../../components/pay/pay';
function mapStateToData(state) {
	return Object.assign({},state.orderList,{$route:state.route});;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(orderListActions, dispatch)
	};
}
const pageConfig = {
	onShow(){
		const {query} = this.data.$route;
		if(query.pathName==="/pages/order/list/list") return;
		let { type='all' } = query;
		this.actions.initList(type);
		//setData是同步的
		if(this.data.list[type].curPage==0){
			this.loadDataForScroll();
		}
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
				//console.log(data);
			},
			onError: (res)=> {
				this.$toastInfo(res.msg);
			}
		};
		this.actions.request(url, params, {});
	},
	handleTab(event){
		let tab = event.currentTarget.id;
		
		this.actions.changeTab(tab);
		//setData是同步的
		const {curTab,list} = this.data;
		if(list[curTab].curPage==0){
			this.loadDataForScroll();
		}
	}
};
const combineConfig = Object.assign({},toastConfig,payConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);