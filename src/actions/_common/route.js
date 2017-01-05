import * as types from '../../constants/actions/_common';
/**
 * api->页面跳转
 * @param   urlName
 * @return                 next
 */
export function route(urlName,type) {
	return (dispatch, getState) => {
		let action = {
			'URL': {
				urlName: urlName,
				type:type||"navigate"
			},
			type: types.URL_PUSH
		};
		return dispatch(action);
	};
}