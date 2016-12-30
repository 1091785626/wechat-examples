//app.js
import configureStore from './stores/configureStore';
import { initialState } from './stores/stores';
const store = configureStore(initialState);

App({
	onLaunch() {
		console.log("app start!");
	},
	getUserInfo(cb) {
		if (!this.userInfo) {
			//调用登录接口
			wx.login({
				success: () => {
					wx.getUserInfo({
						success: (res) => {
							this.userInfo = res;
							typeof cb == "function" && cb(this.userInfo);
						}
					});
				}
			});
		} else {
			typeof cb == "function" && cb(this.userInfo);
		}
	},
	userInfo: null,
	store
});