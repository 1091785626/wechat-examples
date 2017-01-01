import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as orderActions from '../../actions/order';
function mapStateToData(state) {
	return state.order;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(orderActions, dispatch)
	};
}
const pageConfig = {
	onLoad(){
		console.log(this.data);
	}
};
const resultConfig = connect(mapStateToData, mapDispatchToActions)(pageConfig);
Page(resultConfig);