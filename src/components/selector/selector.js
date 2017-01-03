/**
 * 不使用redux
 */
import Promise from '../../libs/promise';
import net from '../../utils/net';
import { getItem, setItem ,delItem,showAnimate,hideAnimate } from '../../utils/utils';
import API_ROOT from '../../constants/apiRoot';
const selectorConfig = {
	$selectorPopup(options){
		return new Promise((resolve, reject) => {
			this.$selectorResolve  = resolve;
			this.$selectorReject = reject;
			this.setData({
				$selector:{
					isShow:1
				},
				$selectorOptions:options,
				$selectorAnimation: showAnimate(),
			});
		});
	},
	$selectorClose(event){
		if(event.target.id =="close"){
			this.$selectorHide();
		}
	},
	$selectorHide(type,res){
		this.setData({
			$selector:{
				isShow:0
			},
			$selectorAnimation: hideAnimate()
		});
		if(type) {
			this.$selectorResolve(res);
			return;
		}
		this.$selectorReject(res);
	}
};
export default selectorConfig;