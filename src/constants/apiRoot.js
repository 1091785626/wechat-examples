import { DEV_WITH_PHP } from './constants';
import cart from './api/cart';
const API = Object.assign({},
	cart
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