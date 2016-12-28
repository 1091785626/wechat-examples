import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as cartActions from '../../actions/cart';
function mapStateToData(state) {
	return {
		cart: state.cart
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
	handleClick(){
		this.actions.cartSelect(1);
		wx.navigateTo({
  			url: '/pages/test/test?id=1'
		});
	}
};
const nextPageConfig = connect(mapStateToData, mapDispatchToActions)(pageConfig);
Page(nextPageConfig);