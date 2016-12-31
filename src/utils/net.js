/* @example
	net.ajax({
		url: APIROOT['_GLOBAL_USER_MAIN_'],
		param: data,
		type: 'GET',
		success: function(data){
			// alert(data);
		},
		error: function(xhr){
		}
	});

**/
import { GUID } from "../config";
import { getItem, setItem ,delItem } from './utils';
function ajax(options) {
	//console.log(options);
	let url = options.url;
	let paramObj = options.param;
	let success_cb = options.success;
	let error_cb = options.error;
	let uploadProgress = options.uploadProgress;
	let method = options.type || 'GET';
	method = method.toUpperCase(); //默认转化为大写
	if (!url) {
		console.error('请求地址不存在');
	}

	let onDataReturn = data => {
		wx.hideToast();
		data.sessionId&&setItem('sessionId',data.sessionId);
		switch (data.status) {
			case 1:
			case true:
				success_cb && success_cb(data);
				return;
			case -1://登录失败
				delItem('sessionId',data.sessionId);
				wx.showModal({
					content: data.msg,
					success:()=>{
						wx.switchTab({
							url: '/pages/index/index'
						});
					}
				});
				return;
			default:
				error_cb && error_cb(data);
				return;
		}
	};

	/**
	 * 如果本地已经从别的地方获取到数据，就不用请求了
	 */
	if (options.localData) {
		onDataReturn(options.localData);
		return;
	}

	try {
		const app = getApp();
		app.getUserInfo((res = {},sessionId) => { //获取用户信息
			wx.showToast({
			  title: '加载中',
			  icon: 'loading',
			  duration: 10000
			});
			let header;
			if(sessionId){
				header={
					'content-type': 'application/json',
					'cookie': sessionId,
					GUID
				};
			}else{
				header={
					'content-type': 'application/json',
					'encryptedData': res.encryptedData,
					'iv': res.iv,
					'code':res.code,
					GUID
				};
			}
			//更新数据
			wx.request({
				url,
				data: paramObj,
				header,
				method,
				success: (res) => {
					//微信封装后的参数
					onDataReturn(res.data);
				},
				fail: (res) => { //接口调用失败的回调函数
					wx.showModal({
						content: '数据异常->(The xhrStatus is not 200)'
					});
				}
			});
		});
	} catch (e) {
		console.error(e);
	}
}

let net = {
	ajax
};

export default net;