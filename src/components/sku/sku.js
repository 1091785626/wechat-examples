/**
 * 不使用redux 
 */
import Promise from '../../libs/promise';
import net from '../../utils/net';
import API_ROOT from '../../constants/apiRoot';
const skuConfig = {
	$skuPopup(options){
		return new Promise((resolve, reject) => {
			this.$skuResolve  = resolve;
			this.$skuReject = reject;
			let param = {
				goods_id:options.goods_id,
				action:options.action
			};
			net.ajax({
				url: API_ROOT['_SKU_MAIN_GET'],
				type: 'GET',
				param,
				success: (res) => {
					
				},
				error: (res) => {
					reject();
					return !1;
				}
			});
		});
	},
	$skuClose(){
		this._skuReject(123);
	}
};
export default skuConfig;