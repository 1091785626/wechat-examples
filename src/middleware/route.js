/**
 * 商城首页需要自定义链接，navigetor组件的type不好判断，统一写以个路由跳转事件以及中间件
 */
import {parseUrl} from '../utils/utils';
export default store => next => action => {
	let API_OPT = action['URL'];

	if (!API_OPT) {
		return next(action);
	}

	let ACTION_TYPE = action['type'];//仍然是是这个type
	let {
		urlName,
		type
	} = API_OPT;
	
	let result = next({type:ACTION_TYPE,param:parseUrl(urlName)});
	setTimeout(() => {
		switch (type) {
			case "navigate":
				wx.navigateTo({
					url: urlName
				});
				return;
			case "redirect":
				wx.redirectTo({
					url: urlName
				});
				return;
			case "tab":
				wx.switchTab({
					url: urlName
				});
				return;
			default:
				return;
		}
	}, 0);
	return;
};