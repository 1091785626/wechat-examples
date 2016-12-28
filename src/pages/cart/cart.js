import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as cartActions from '../../actions/cart';
import skuConfig from '../../components/_common/sku/sku';
function mapStateToData(state) {
	return {
		cart: state.cart,
		sku:state.sku,
		toast:state.toast
	};
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(cartActions, dispatch)
	};
}
const pageConfig = {
	data:{
		is_show:1
	},
	onLoad(){
		console.log(this.data);
	},
	handleClick(event){
		this.actions.cartSelect(1);
		return;
		wx.navigateTo({
			url: '/pages/test/test?id=1'
		});
	}
};
const combineConfig = Object.assign({},skuConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);