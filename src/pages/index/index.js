import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as indexActions from '../../actions/index';
function mapStateToData(state) {
	return state.index;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(indexActions, dispatch)
	};
}
const pageConfig = {
	onLoad(){
		console.log(this.data);
	}
};
const resultConfig = connect(mapStateToData, mapDispatchToActions)(pageConfig);
Page(resultConfig);