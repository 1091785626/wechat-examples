/**
 * 不使用redux
 */
import Promise from '../../libs/promise';
import net from '../../utils/net';
import { getItem, setItem ,delItem,showAnimate,hideAnimate } from '../../utils/utils';
import API_ROOT from '../../constants/apiRoot';
const addrListConfig = {
	$addrListPopup(options){
		return new Promise((resolve, reject) => {
			this.$addrListResolve  = resolve;
			this.$addrListReject = reject;
			this.setData({
				$addrList:{
					isShow:1
				},
				$addrListOptions:options,
				$addrListAnimation: showAnimate(),
			});
		});
	},
	$addrListClose(event){
		if(event.target.id =="close"){
			this.$addrListHide();
		}
	},
	$addrListHide(type,res){
		this.setData({
			$addrList:{
				isShow:0
			},
			$addrListAnimation: hideAnimate()
		});
		if(type) {
			this.$addrListResolve(res);
			return;
		}
		this.$addrListReject(res);
	}
};
export default addrListConfig;