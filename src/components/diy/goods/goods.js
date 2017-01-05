/**
 * 不使用redux
 */

const goodsConfig = {
	$goodsHandleSku(event){
		const product_id = event.currentTarget.id;
		this.$skuPopup({
			product_id,
			btnType:0
		}).then((res)=>{
			this.actions.addUserCart();
		}).catch((res)=>{
		});
	}
};
export default goodsConfig;