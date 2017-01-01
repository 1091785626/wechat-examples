import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as listActions from '../../actions/list';
function mapStateToData(state) {
	return state.list;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(listActions, dispatch)
	};
}
const pageConfig = {
	onLoad(){
		console.log(this.data);
	}
};
const resultConfig = connect(mapStateToData, mapDispatchToActions)(pageConfig);
Page(resultConfig);