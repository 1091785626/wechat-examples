/**
 * 不使用redux
 */
import Promise from '../../libs/promise';
import net from '../../utils/net';
import { getItem, setItem ,delItem,showAnimate,hideAnimate,initItem } from '../../utils/utils';
import API_ROOT from '../../constants/apiRoot';
const logisConfig = {
	$logisPopup(options){
		return new Promise((resolve, reject) => {
			this.$logisResolve  = resolve;
			this.$logisReject = reject;
			let param = {template_id:options.template_id};
			net.ajax({
				url: API_ROOT['_LOGIS_LIST_GET'],
				type: 'GET',
				param,
				success: (res) => {
					this.setData({
						$logis:{
							isShow:1
						},
						$logisOptions:options,
						$logisData:initItem(res.data),
						$logisAnimation: showAnimate(),
					});
				},
				error: (res) => {
					this.$toastInfo(res.msg);
					this.$logisResolve  = null;
					this.$logisReject = null;
				}
			});
		});
	},
	$logisClose(event){
		if(event.target.id =="close"){
			this.$logisHide();
		}
	},
	$logisHide(type,res){
		this.setData({
			$logis:{
				isShow:0
			},
			$logisAnimation: hideAnimate()
		});
		if(type) {
			this.$logisResolve(res);
			return;
		}
		this.$logisResolve(res);
	},
	$logisHandleSelect(event){
		const id = event.currentTarget.id;
		const data = this.data.$logisData.itemObj[id];
		if(this.data.$logisOptions.logis_id==id){
			this.$logisHide();
		}else{
			this.$logisHide(1,data);
		}
	}
};
export default logisConfig;