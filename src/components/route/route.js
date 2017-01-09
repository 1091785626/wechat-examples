/**
 * 商城首页需要自定义链接，navigetor组件的type不好判断，统一写以个路由跳转事件以及中间件
 */
import {parseUrl} from '../../utils/utils';

const routeConfig = {
	$routeHandlePush(event){
		let type = 'navigate';//redirect
		const info = event.currentTarget.id;
		const pathName = parseUrl(info).pathName;
		const tabUrl = ['/pages/index/index','/pages/category/category','/pages/cart/cart','/pages/user/user'];
		if(tabUrl.includes(pathName)){
			type = 'tab';
		}
		this.actions.route(info,type);
	}
};
export default routeConfig;