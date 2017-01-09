import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as types from '../../constants/actions/category';
import * as categoryActions from '../../actions/category';
import searchConfig from '../../components/diy/search/search';
import toastConfig from '../../components/toast/toast';
function mapStateToData(state) {
	return state.category;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(categoryActions, dispatch)
	};
}
const pageConfig = {
	data:{
		$search:{title:"搜索商品"}
	},
	onShow(options){
		if (this.data.isFetching === 0) {
			let url = types.CATEGORY_MAIN_GET;
			let param = {};
			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: (res) => {
					this.loadDataRight(res.data[0].id);
				},
				onError: (res) => {
					this.$toastInfo(res.msg);
				}
			};
			this.actions.request(url, params, {});
		}
	},
	handleChangeId(event){
		const id = event.currentTarget.id;
		const {curId} =this.data;
		if(curId==id){ return !1;}//id相同无视
		this.actions.categoryChange(id);
		this.loadDataRight(id);
	},
	loadDataRight(id){
		if (!this.data.dataRight[id]) {
			let url = types.CATEGORY_MAIN_LIST_GET;
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
const combineConfig = Object.assign({},searchConfig,toastConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);