import {connect} from '../../../libs/wechat-redux.js';
import {bindActionCreators} from '../../../libs/redux.js';
import * as userAddrActions from '../../../actions/user';
function mapStateToData(state) {
	return state.userAddr;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(userAddrActions, dispatch)
	};
}
const pageConfig = {
	onLoad(){
		console.log(this.data);
	}
};
const resultConfig = connect(mapStateToData, mapDispatchToActions)(pageConfig);
Page(resultConfig);