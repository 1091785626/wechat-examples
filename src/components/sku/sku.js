/**
 * 不使用redux 
 */
import Promise from '../../libs/promise';
import net from '../../utils/net';
import { getItem, setItem ,delItem,showAnimate,hideAnimate } from '../../utils/utils';
import API_ROOT from '../../constants/apiRoot';
const skuConfig = {
	$skuPopup(options){
		//console.log(options);
		//让用户禁止点击，还要依赖微信的渲染速度
		//this.setData({$sku:{isShow:1}});
		return new Promise((resolve, reject) => {
			this.$skuResolve  = resolve;
			this.$skuReject = reject;
			let param = {
				product_id:options.product_id,
			};
			let localData = getItem('sku_goods');
			if (localData && options.product_id != localData.data.id) { //id一样不重新拉取数据
				delItem('sku_goods');
				delItem('sku_selected');
				localData = null;
			}
			net.ajax({
				url: API_ROOT['_SKU_MAIN_GET'],
				type: 'GET',
				param,
				localData,
				success: (res) => {
					let data = this.$skuStock(res.data);
					const {stock,selected,selectInfo} = this.$skuInit(data,options.sku_id);
					const {$skuUnStock} =this.$getUnStock(selected,data);
					this.setData({
						$sku:{isShow:1},
						$skuOptions:options,
						$skuData:data,
						$skuState:{
							stock,
							selected,
							selectInfo,
							value:1
						},
						$skuAnimation: showAnimate(),
						$skuBtnType:options.btnType,
						$skuUnStock
					});
					setItem('sku_goods', res);
				},
				error: (res) => {
					this.$toastInfo(res.msg);
					this.$skuResolve  = null;
					this.$skuReject = null;
				}
			});
		});
	},
	$skuClose(event){
		if(event.target.id =="close"){
			this.$skuHide();
		}
	},
	$skuHide(type,res){
		this.setData({
			$sku:{
				isShow:0
			},
			$skuAnimation: hideAnimate()
		});
		if(type) {
			this.$skuResolve(res);
			return;
		}
		this.$skuReject(res);
	},
	/*初始化数据*/
	$skuInit(data,sku_id){
		let {product_props} = data;
		let skuProps;
		let selected = {};

		if(sku_id&&sku_id!=0){//获取默认选择
			skuProps = this.$getPropStr(sku_id,data);
			skuProps = skuProps.split(";");
			let x ;
			for(let i in skuProps){
				x = skuProps[i].split(":");
				selected[x[0]] = x[1];
			}
		}else{
			for(let i in product_props){
				selected[i] = null;
			}
			selected = Object.assign({},selected,getItem('sku_selected')||{});
		}

		/*计算库存*/
		let stock = this.$getStock(selected,data);
		let selectInfo = this.$getSkuInfo(selected,data);
		return {stock,selected,selectInfo};
	},
	/*计算库存*/
	$skuStock(data){//商品的属性
		let product_props = data.product_props;//商品属性this.data在open中获取
		for (let i in product_props) {//对象
			let porpEach = product_props[i];
			for (let j in porpEach.gps) {//数组
				let porpEachGps = porpEach.gps[j],
				porp = [porpEach.id + ":" + porpEachGps.prop_vid];
				porpEach.gps[j].stock = this.$getStock(porp,data);//给物品设置库存量
			}
		}
		return data;
	},
	/*selected，当前选中的label*/
	$changeArray(prop){
		if(!(prop instanceof Array)){ //如果不是数组
			let select =[];
			for (let i in prop){
				if(prop[i]!=null){
					select = [...select,i+':'+prop[i]];
				}
			}
			prop = select;
		}
		return prop;
	},
	/*当前选中的库存*/
	$getStock(prop,data) {
		prop = this.$changeArray(prop);
		let skus = data.skus,//skus所有的商品组合
		stock = 0;
		if(skus===''){
			stock = data.stock;
			return stock;
		}
		for (let i in skus){//对象
			if(this.$checkStock(prop, skus[i].props)){
				stock = stock + parseInt(skus[i].stock);
			}
		}
		//console.log(stock);//每个属性有的商品总数
		return stock;
	},
	/*根据属性，是否在skus[i].props中*/
	$checkStock(prop, skuprops) {
		let state = !0;
		for (let i in prop){//第一次计算库存的时候为prop只有一个；//数组
			if (skuprops.indexOf(prop[i]) == -1) {//检测数据是否在skuprops中 -1表示没有找到
				//找不到false
				state  = !1;
				break;
			}
		}
		return state;
	},
	/*把选中商品属性类型读取出来,用于设置初始state,比如提取出的值"props": "2353:281127;2354:281130;6085:281133"*/
	$getPropStr(sku_id,data) {
		let skus = data.skus;
		for (let i in skus){
			if (skus[i].id == sku_id){
				return skus[i].props;
			}
		}
		return null;
	},
	/*商品信息*/
	$getSkuInfo(prop,data) { //商品信息
		prop = this.$changeArray(prop);
		let skus = data.skus,
		selectInfo = null;
		if(skus==''){//没有规格
			selectInfo = {
				product_id: data.id, //选中商品的id product_id
				price: data.price, //价格
				props_str: data.props_str, //规格
				vip_price: data.vip_price, //会员价格
				stock: data.stock,
				img: data.img,
				sku_id: null
			};
			return selectInfo;
		}
		for (let i in skus) {
			let product = skus[i];//选中商品的id
			if (prop.length==Object.keys(data.product_props).length&&this.$checkStock(prop, product.props)) {
				selectInfo = {
					product_id: data.id, //选中商品的id product_id
					price: product.price, //价格
					props_str: product.props_str, //规格
					vip_price: product.vip_price, //会员价格
					stock: product.stock,
					img: product.img,
					sku_id: product.id
				};
				break;
			}
		}
		if(selectInfo==null){
			selectInfo = {
				product_id: data.id, //选中商品的id
				price: data.price == data.max_price ? data.price : data.price + "~" + data.max_price, //价格
				props_str: null, //规格
				vip_price: null,
				stock: data.stock,
				img: data.img,
				sku_id: null
			};
		}
		return selectInfo;
	},
	$getUnStock(curSelected,data) {
		//不可以使用浅复制
		let $skuUnStock={};
		let {product_props} = data;
		let skuProps;
		let selected = {};
		let testSelected,prop_vid;
		for(let dt in product_props){
			for(let dd in product_props[dt].gps){
				prop_vid = product_props[dt].gps[dd].prop_vid;
				testSelected = Object.assign({},curSelected,{[dt]:prop_vid});
				$skuUnStock[prop_vid] = this.$getStock(testSelected,data);
			}
		}
		return {$skuUnStock};
	},
	$skuHandleLabel(event){
		const {$skuData,$skuState} = this.data;
		const info = (event.currentTarget.id).split("_");
		const type = info[0];
		const id = info[1];
		let selected =  Object.assign(
				{},
				$skuState.selected,
				{[info[0]]: ($skuState.selected[info[0]]!=info[1]?info[1]:null)}
			);
		let stock = this.$getStock(selected,$skuData);
		let selectInfo = this.$getSkuInfo(selected,$skuData);
		const {$skuUnStock} =this.$getUnStock(selected,$skuData);
		this.setData({
			$sku:{
				isShow:1
			},
			$skuUnStock,
			$skuState:{
				value:1,//需要调整
				stock,
				selected,
				selectInfo
			}
		});
		setItem('sku_selected',selected);
	},
	$skuHandleQuantity(event){
		/*start*/
		let type = event.target.id;
		let quantity;
		const {$skuState} =this.data;
		if(type == 'minus'){
			quantity = $skuState.value - 1;
		}else if(type == 'plus'){
			quantity = $skuState.value + 1;
		}else{
			quantity = parseInt(event.detail.value);
		}
		let {stock} = $skuState;
		if(isNaN(quantity)||quantity <= 0){
			this.$toastInfo('至少要购买1件');
			quantity = 1;
		}else if(quantity > stock){
			this.$toastInfo('最多可购买'+stock+'件',1.5);
			quantity = stock;
		}
		const nextSkuState = Object.assign({},$skuState,{value:Number(quantity)||""});
		this.setData({
			$skuState:nextSkuState
		});
	},
	$skuValidateSelect(){
		const {$skuData,$skuState} = this.data;
		const {selectInfo} = $skuState;
		if(selectInfo.sku_id==null&&$skuData.skus!=''){
			this.$toastInfo('请选择');
			return !0;
		}
		if(!$skuState.value){
			this.$toastInfo('至少购买1件');
			return !0;
		}
		return !1;
	}, 
	$skuHandleSure(event){
		const {$skuState,$skuData,$skuOptions} = this.data;
		let { selectInfo } = $skuState;
		if(this.$skuValidateSelect()){return !1;}
		let param = Object.assign({},selectInfo,{id:$skuOptions.cart_id});
		if($skuOptions.sku_id == selectInfo.sku_id){
			this.$skuHide();
			return !1;
		}
		net.ajax({
			url: API_ROOT['_SKU_MAIN_PUT'],
			type: 'PUT',
			param,
			success: (res) => {
				this.$skuHide(1,param);
			},
			error: (res) => {
				this.$toastInfo(res.msg);
			}
		});
	},
	$skuHandleCartBuy(event){//立即购买（type=1），购物车（type=0）
		const {$skuState,$skuData,$skuOptions} = this.data;
		let { selectInfo } = $skuState;
		if(this.$skuValidateSelect()){return !1;}
		let type = parseInt(event.target.id);
		let param = {
			type:type?"buy":"addCart",
			sku_id:selectInfo.sku_id||0,
			product_id:$skuOptions.product_id,
			quantity:$skuState.value
		};
		net.ajax({
			url: type?API_ROOT['_SKU_MAIN_BUY']:API_ROOT['_SKU_MAIN_CART'],
			type: 'POST',
			param,
			success: (res) => {
				this.$skuHide(1);
				if(type==0){//其他地方清理数据用
					this.$skuHide(1);
				}else{
					this.$skuHide();
				}
				type?wx.navigateTo({url:"/pages/order/order"}):this.$toastInfo(`加入购物车成功`);
			},
			error: (res) => {
				this.$toastInfo(res.msg);
				return !1;
			}
		});
	}
};
export default skuConfig;