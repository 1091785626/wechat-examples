import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as goodsActions from '../../actions/goods';
function mapStateToData(state) {
	return state.goods;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(goodsActions, dispatch)
	};
}
const pageConfig = {
	onLoad(){
		console.log(this.data);
	}
};
const resultConfig = connect(mapStateToData, mapDispatchToActions)(pageConfig);
Page(resultConfig);