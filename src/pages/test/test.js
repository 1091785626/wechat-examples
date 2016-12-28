import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as testActions from '../../actions/test';
function mapStateToData(state) {
	return {
		test: state.test
	};
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(testActions, dispatch)
	};
}
const pageConfig = {
	onLoad(){
		console.log(this.data);
	}
};
const nextPageConfig = connect(mapStateToData, mapDispatchToActions)(pageConfig);
Page(nextPageConfig);