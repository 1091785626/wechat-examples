/**
 * 不使用redux
 */
import Promise from '../../libs/promise';
import net from '../../utils/net';
import { getItem, setItem ,delItem,showAnimate,hideAnimate,dataValidity } from '../../utils/utils';
import API_ROOT from '../../constants/apiRoot';
const addrConfig = {
	$addrPopup(options){
		console.log("options",options);
		//让用户禁止点击，还要依赖微信的渲染速度
		this.setData({$addr:{isShow:1}});
		return new Promise((resolve, reject) => {
			this.$addrResolve  = null;
			this.$addrReject = null;
			this.$addrResolve  = resolve;
			this.$addrReject = reject;
			let localData = getItem('areaData')||"";
			let param = {};
			net.ajax({
				url: API_ROOT['_ADDR_DISTRIC_GET'],
				type: 'GET',
				param,
				localData,
				success: (res) => {
					this.$addrAllDistrict = res.data;
					const {$addrDistrict,$addrPicker} = this.$addrInit(options.data);
					this.setData({
						$addrOptions:options,
						$addrData:options.data,
						$addrAnimation: showAnimate(),
						$addrDistrict,
						$addrPicker
					});
					setItem('areaData', res);
				},
				error: (res) => {
					reject();
					return !1;
				}
			});
		});
	},
	$addrInit(source){
		const {
			province = "330000",
			city = "330100",
			district = "330105"
		} = source;
		const value = [province,city,district];
		let data = this.$addrInitDistrict(value);
		return {$addrDistrict:data.$addrDistrict,$addrPicker:data.$addrPicker};
	},
	$addrInitDistrict(value,changeIndex){
		let itemData = Array.from({ length: 3 },() => []);
		let index=[],label=[];
		/**
		 * 一级
		 */
		itemData[0] = this.$addrAllDistrict;
		for (let select_0 in itemData[0]){
			if(itemData[0][select_0].value==value[0]){
				itemData[1] = itemData[0][select_0].children;
				label[0] = itemData[0][select_0].label;
				value[0] = itemData[0][select_0].value;
				index[0] = select_0;
				break;
			}
		}
		/**
		 * 二级
		 */
		if(changeIndex==0){
			label[1] = itemData[0][index[0]].children[0].label;
			value[1] = itemData[0][index[0]].children[0].value;
			index[1] = 0;
		}
		for (let select_1 in itemData[1]){
			if(itemData[1][select_1].value==value[1]){
				itemData[2] = itemData[1][select_1].children;
				label[1] = itemData[1][select_1].label;
				value[1] = itemData[1][select_1].value;
				index[1] = select_1;
				break;
			}
		}
		/**
		 * 三级
		 */
		if(changeIndex==0){
			label[2] = itemData[1][index[1]].children[0].label;
			value[2] = itemData[1][index[1]].children[0].value;
			index[2] = 0;
		}
		if(changeIndex==1){
			label[2] = itemData[1][index[1]].children[0].label;
			value[2] = itemData[1][index[1]].children[0].value;
			index[2] = 0;
		}
		for(let select_2 in itemData[2]){
			if(itemData[2][select_2].value==value[2]){
				label[2] = itemData[2][select_2].label;
				value[2] = itemData[2][select_2].value;
				index[2] = select_2;
				break;
			}
		}

		return {$addrDistrict:itemData,$addrPicker:{value,label,index}};
	},
	$addrClose(event){
		if(event.target.id =="close"){
			this.$addrHide();
		}
	},
	$addrHide(type,res){
		this.setData({
			$addr:{
				isShow:0
			},
			$addrAnimation: hideAnimate()
		});
		if(type) {
			this.$addrResolve(res);
			return;
		}
		this.$addrReject(res);
	},
	$addrProvinceChange(event){
		this.$addrHandleChange(event);
	},
	$addrCityChange(event){
		this.$addrHandleChange(event);
	},
	$addrDistrictChange(event){
		this.$addrHandleChange(event);
	},
	$addrHandleChange(event){
		const index = event.detail.value;
		const i = event.currentTarget.id;
		let {$addrPicker,$addrDistrict} = this.data;
		$addrPicker.value[i] =  $addrDistrict[i][index].value;
		const data = this.$addrInitDistrict($addrPicker.value,i);
		this.setData({
			$addrDistrict:data.$addrDistrict,
			$addrPicker:data.$addrPicker
		});
	},
	$addrSubmit(event){
		let value = event.detail.value;
		let {$addrPicker,$addrDistrict} = this.data;
		let formData = Object.assign(
					{},
					event.detail.value,
					{
						province:$addrDistrict[0][value.province].value,
						city:$addrDistrict[1][value.city].city,
						district:$addrDistrict[2][value.district].district
					}
				);
		/**
		 * 表单验证
		 */
		const rules = {
			consignee:{
				name: "收件人",
				value: formData.consignee,
				required: !0
			},
			mobile: {
				type: "validMobile",
				value: formData.mobile,
				required: !0
			},
			province:{
				name: "区域选择",
				value: formData.province,
				required: !0
			},
			city:{
				name: "区域选择",
				value: formData.city,
				required: !0
			},
			district:{
				name: "区域选择",
				value: formData.district,
				required: !0
			},
			address:{
				name: "地址",
				value: formData.address,
				required: !0
			}
		};
		const resultValidity = dataValidity(rules);
		if(!resultValidity.status){
			this.$toastInfo(resultValidity.error);
			return;
		}
		this.$addrHide(1,formData);
	}
};
export default addrConfig;