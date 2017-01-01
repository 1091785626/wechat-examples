import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as categoryActions from '../../actions/category';
function mapStateToData(state) {
	return state.category;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(categoryActions, dispatch)
	};
}
const pageConfig = {
	onLoad(){
		console.log(this.data);
	}
};
const resultConfig = connect(mapStateToData, mapDispatchToActions)(pageConfig);
Page(resultConfig);