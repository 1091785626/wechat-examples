/**
 * 商城首页需要自定义链接，navigetor组件的type不好判断，统一写以个路由跳转事件以及中间件
 * 当然也可以不这么设计，放在index.js下也可以
 * 目前想保留中间件的一个设计，所以暂不改变
 */
import * as types from '../../constants/actions/_common';
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