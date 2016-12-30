import {connect} from '../../libs/wechat-redux.js';
import {bindActionCreators} from '../../libs/redux.js';
import * as types from '../../constants/actions/user';
import * as userActions from '../../actions/user';
function mapStateToData(state) {
	return state.user;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(userActions, dispatch)
	};
}
const pageConfig = {
	onLoad(){
		if (this.data.isFetching === 0) {
			let url = types.USER_MAIN_GET;
			let param = {};
			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: (res) => {
				},
				onError: (res) => {
				}
			};
			this.actions.request(url, params, {});
		}
	},
	_calling(){
		wx.makePhoneCall({phoneNumber: '15968763535'});
	}
};
const resultConfig = connect(mapStateToData, mapDispatchToActions)(pageConfig);
Page(resultConfig);