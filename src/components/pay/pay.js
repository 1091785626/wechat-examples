/**
 * 不使用redux
 */
import Promise from '../../libs/promise';
import net from '../../utils/net';
import { getItem, setItem ,delItem,showAnimate,hideAnimate,initItem } from '../../utils/utils';
import API_ROOT from '../../constants/apiRoot';
const payConfig = {
	$payPopup(options){
		return new Promise((resolve, reject) => {
			this.$payResolve  = resolve;
			this.$payReject = reject;
			let param = Object.assign({},options);
			net.ajax({
				url: API_ROOT['_PAYMENT_ORDER_POST'],
				type: 'POST',
				param,
				success: (res) => {
					this.setData({
						$pay:{
							isShow:1
						},
						$payOptions:options,
						$payWay:'wxpay',
						$payData:res.data,
						$payAnimation: showAnimate(),
					});
				},
				error: (res) => {
					this.$toastInfo(res.msg);
					this.$payResolve  = null;
					this.$payReject = null;
				}
			});
		});
	},
	$payClose(event){
		if(event.target.id =="close"){
			wx.showModal({
				title: '别走~',
				content: '确定离开么?',
				success: (res)=> {
					if(res.confirm){
						this.$payHide(1,{is_btn:1});
					}else{
						//this.$payHide();
					}
				}
			});
		}
	},
	$payHide(type,res){
		this.setData({
			$pay:{
				isShow:0
			},
			$payAnimation: hideAnimate()
		});
		if(type) {
			this.$payResolve(res);
			return;
		}
		this.$payResolve(res);
	},
	$payHandleSelect(event){
		this.setData({
			$payWay:event.currentTarget.id
		});
	},
	$payHandleSure(){
		const {$payWay,$payOptions,$payData} =this.data;
		let param = {
			order_id:$payData.order_id,
			amount:$payData.amount,
			payway:$payWay
		};
		net.ajax({
			url: API_ROOT['_PAYMENT_MAIN_POST'],
			type: 'POST', 
			param,
			success: (res) => {
				switch(param.payway){
					case 'wxpay':
						const payData = res.data||{};
						wx.requestPayment({
							'timeStamp':payData.timeStamp,
							'nonceStr':payData.nonceStr,
							'package':payData.package,
							'signType': 'MD5',
							'paySign':payData.paySign,
							success: (res) => {
								if(res.errMsg=='requestPayment:ok'){//调用支付成功
									this.$toastInfo('微信支付成功');
									this.$payHide(1,{is_btn:0});
								}
							},
							fail: (res) => {
								if(res.errMsg=='requestPayment:fail cancel'){//调用支付成功
									this.$toastInfo('您已取消支付');
								}else{
									this.$toastInfo('微信支付失败');
								}
							},
							complete:(res) =>{
								if(res.errMsg=='requestPayment:cancel'){//调用支付成功
									this.$toastInfo('您已取消支付');
								}
							}
						});
						return false;
					case 'alipay':
						this.$toastInfo('支付宝成功');
						this.$payHide(1,{is_btn:0});
						return false;
					case 'income':
						this.$toastInfo('货款支付成功');
						this.$payHide(1,{is_btn:0});
						return false;
					default:
						return false;
				}
			},
			error: (res) => {
				this.$toastInfo(res.msg);
				return !1;
			}
		});
	}
};
export default payConfig;