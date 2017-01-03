/**
 * 不使用redux
 */
import Promise from '../../libs/promise';
import net from '../../utils/net';
import { getItem, setItem ,delItem,showAnimate,hideAnimate } from '../../utils/utils';
import API_ROOT from '../../constants/apiRoot';
const payConfig = {
	$payPopup(options){
		return new Promise((resolve, reject) => {
			this.$payResolve  = resolve;
			this.$payReject = reject;
			this.setData({
				$pay:{
					isShow:1
				},
				$payOptions:options,
				$payAnimation: showAnimate(),
			});
		});
	},
	$payClose(event){
		if(event.target.id =="close"){
			this.$payHide();
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
		this.$payReject(res);
	}
};
export default payConfig;