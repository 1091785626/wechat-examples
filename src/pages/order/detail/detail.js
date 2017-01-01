import {connect} from '../../../libs/wechat-redux.js';
import {bindActionCreators} from '../../../libs/redux.js';
import * as orderDetailActions from '../../../actions/order';
function mapStateToData(state) {
	return state.orderDetail;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(orderDetailActions, dispatch)
	};
}
const pageConfig = {
	onLoad(){
		console.log(this.data);
	}
};
const resultConfig = connect(mapStateToData, mapDispatchToActions)(pageConfig);
Page(resultConfig);