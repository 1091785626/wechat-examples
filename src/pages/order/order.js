import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as orderActions from '../../actions/order';
import toastConfig from '../../components/toast/toast';
import payConfig from '../../components/pay/pay';
import addrConfig from '../../components/addr/addr';
import addrListConfig from '../../components/addr/addrList';
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
const combineConfig = Object.assign({},toastConfig,payConfig,addrConfig,addrListConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);