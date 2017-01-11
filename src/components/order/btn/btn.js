import * as types from '../../../constants/actions/order';
/**
 * 不使用redux
 */
const orderBtnConfig = {
	$orderBtnHanleClick(event){
		const info = event.currentTarget.id.split('_');
		const btnType = info[0];
		const id = info[1];
		const alertText = info[2];
		switch(btnType){
			case 'logistics':
				return !1;
			case 'paynow':
				this.$payPopup({
					id
				}).then((res={})=>{
					if(res.is_btn==0){//确认付款
						this.actions.orderListDetail();
						this.handleTab&&this.handleTab({currentTarget:{id:"tosend"}});
						this.loadDetailInfo&&this.loadDetailInfo(id);
					}
					// const {query} = this.data.$route;
					// if(query.pathName==="/pages/order/detail/detail") return;
				}).catch((res)=>{
					console.log('支付失败');
				});
				return !1;
			default:
				wx.showModal({
					title: alertText,
					content: `确定要${alertText}么？`,
					success: (res)=> {
						if(res.confirm){
							let url = types.ORDER_BTN_POST;
							let param = {
								type:btnType,
								id:id
							};
							let params = {
								param:param,
								ajaxType:'PUT',
								onSuccess: (res)=> {
									this.actions.orderListDetail();
									this.handleTab&&this.handleTab({currentTarget:{id:"all"}});
									this.loadDetailInfo&&this.loadDetailInfo(id);
								},
								onError: (res)=> {
									this.$toastInfo(res.msg);
								}
							};
							this.actions.request(url, params, {type:btnType});
						}
					}
				});
				break;
		}
	}
};
export default orderBtnConfig;