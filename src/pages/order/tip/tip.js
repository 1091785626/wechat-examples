import {connect} from '../../../libs/wechat-redux.js';
import {bindActionCreators} from '../../../libs/redux.js';
import * as orderListActions from '../../../actions/order';
function mapStateToData(state) {
	return state.orderList;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(orderListActions, dispatch)
	};
}
const pageConfig = {
	onLoad(){
		console.log(this.data);
	}
};
const resultConfig = connect(mapStateToData, mapDispatchToActions)(pageConfig);
Page(resultConfig);