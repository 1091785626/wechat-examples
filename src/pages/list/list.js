import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as listActions from '../../actions/list';
import * as types from '../../constants/actions/list';
import searchConfig from '../../components/diy/search/search';
import skuConfig from '../../components/sku/sku';
import toastConfig from '../../components/toast/toast';
function mapStateToData(state) {
	return state.list;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(listActions, dispatch)
	};
}
const pageConfig = {
	onLoad(query = {}) {
		let {
			keyword = 'all', cat_id
		} = query;
		if (cat_id) {
			keyword = `cat__${cat_id}`;
		}
		if (!this.data.list[keyword]) {
			this.actions.initMain(keyword);
		}
		//setData是同步的
		if (this.data.list[keyword].curPage == 0) {
			this.loadDataForScroll();
		}
	},
	loadDataForScroll(){
		const {
			column,
			direction,
			list,
			keyword
		} = this.data;
		const listInfo = list[keyword];
		if(listInfo.isEnd>0){ //只有状态为0时才可以加载数据
			return false;
		}
		let url = types.LIST_MAIN_GET;
		let param = {
			page:listInfo.curPage+1,
			column,
			direction
		};
		if(keyword!='all'){//如果是all，参数就不传递
			if(isNaN(keyword)&&keyword.indexOf('cat__')!=-1){
				param.cat_id = keyword.split('cat__')[1];
			}else{
				param.keyword = keyword;
			}
		}
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
		this.actions.request(url, params, {keyword});
	},
	scrollBottom(){
		this.loadDataForScroll();
	},
	handleSku(event){
		const info = event.currentTarget.id.split('_');
		const product_id = info[0];
		const btnType = info[1];
		this.$skuPopup({
			product_id,
			btnType:0
		}).then((res)=>{
			this.actions.addUserCart();
		}).catch((res)=>{
		});
	},
	handleShowType(event){
		this.actions.changeType();
	},
	handleSort(event){
		const {
			column,
			direction
		} = this.data;
		let type = event.currentTarget.id;
		if(type=="default"&&type==column){
			return false;
		}
		this.actions.reSort(type);
		//setData是同步的
		const {keyword,list} = this.data;
		if(list[keyword].curPage==0){
			this.loadDataForScroll();
		}
	},
	coverSearchSubmit(value){
		let val = value || 'all';
		this.actions.searchInfo(val);
		const {keyword,list} = this.data;
		if(list[keyword].curPage==0){
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
const combineConfig = Object.assign({},searchConfig,skuConfig,toastConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);