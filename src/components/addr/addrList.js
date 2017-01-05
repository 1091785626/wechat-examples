/**
 * 不使用redux
 */
import Promise from '../../libs/promise';
import net from '../../utils/net';
import { getItem, setItem ,delItem,showAnimate,hideAnimate,initItem } from '../../utils/utils';
import API_ROOT from '../../constants/apiRoot';
const addrListConfig = {
	$addrListPopup(options){
		return new Promise((resolve, reject) => {
			this.$addrListResolve  = resolve;
			this.$addrListReject = reject;
			let param = {};
			net.ajax({
				url: API_ROOT['_ADDR_LIST_GET'],
				type: 'GET',
				param,
				success: (res) => {
					this.setData({
						$addrList:{
							isShow:1
						},
						$addrListOptions:options,
						$addrListData:initItem(res.data),
						$addrListAnimation: showAnimate(),
					});
				},
				error: (res) => {
					this.$toastInfo(res.msg);
					this.$addrListResolve  = null;
					this.$addrListReject = null;
				}
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
		this.$addrListResolve(res);
	},
	$addrListHandleCreateAddr(){
		this.$addrListHide();
		this.handleCreateAddr&&this.handleCreateAddr();
	},
	$addrListHandleEditAddr(event){
		const id = event.currentTarget.id;
		const data = this.data.$addrListData.itemObj[id];
		this.$addrListHide();
		this.handleEditAddr&&this.handleEditAddr(data);
	},
	$addrListHandleSelectAddr(event){
		const id = event.currentTarget.id;
		const data = this.data.$addrListData.itemObj[id];
		if(this.data.$addrListOptions.addr_id==id){
			this.$addrListHide();
		}else{
			this.$addrListHide(1,data);
		}
	}
};
export default addrListConfig;