import { DEV_WITH_PHP } from './constants';
import _common from './api/_common';
import index from './api/index';
import category from './api/category';
import cart from './api/cart';
import user from './api/user';
import order from './api/order';
import goods from './api/goods';
import list from './api/list';
const API = Object.assign({},
	_common,
	index,
	category,
	cart,
	user,
	order,
	goods,
	list
);
let baseUrl;
if (!DEV_WITH_PHP) {
	//开发环境-前端自模拟
	baseUrl = 'http://localhost:3000';
} else {
	//开发环境-后端数据
	baseUrl = 'http://test.ruishan66.com';
}
for (let i in API) {
	API[i] = baseUrl + API[i];
}
export default API;