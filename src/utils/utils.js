const isAvailable = (function isAvailableIffe() {
	const test = 'test';
	try {
		wx.setStorageSync(test, test);
		wx.removeStorageSync(test);
		return true;
	} catch (e) {
		return false;
	}
}());
/**
 * 设置缓存
 * @param key 保存的键值
 * @param val 保存的内容
 */
export function setItem(key, val) {
	if (isAvailable) {
		wx.setStorageSync(key, val);
	}
}
/**
 * 获取缓存
 * @param  {[String]} key 获取的键值
 * @return {Object}
 */
export function getItem(key) {
	if (isAvailable) {
		return wx.getStorageSync(key);
	}
}
/**
 * 删除缓存
 * @param  {[String]} key 删除的键值
 */
export function delItem(key) {
	if (isAvailable) {
		wx.removeStorageSync('key');
	}
}

/**
 * 初始化数据
 * @param  {String} res 传入的数据
 * @param  {String} id  数组是已str区分 ，默认'id'
 * @param  {String} _count  
 * @param  {Object} initObj 判断是否有init
 * @param  {Array} initArr 判断是否有init
 * @return {String} 
 * 参考reducers中的使用     
 */
export function initItem(res, str, count, initObj, initArr) {
	let itemArr = [];
	let itemObj = {};
	let data;
	let id = str || 'id';
	if (typeof res == "object" && res.data && res.data instanceof Array) { //传入的不是数组。res.data是数组
		data = res.data;
	} else if (res instanceof Array) { //传入的是数组
		data = res;
	} else {
		return console.error('初始化参数错误');
	}
	for (let i = 0; i < data.length; i++) {
		itemArr = [...itemArr, data[i][id]];
		// itemObj = {
		// 	...itemObj,
		// 	[data[i][id]]: initObj || data[i]
		// };
		itemObj = Object.assign({},itemObj,{[data[i][id]]: initObj || data[i]});
	}
	/*判断是否有_count*/
	if (count) {
		let { _count } = res;
		return { itemArr,itemObj,_count };
	} else {
		return { itemArr,itemObj };
	}
}
/**
 * 作为分页初始数据
 */
export const initObj = {
	curPage: 0, //当前页数
	totalPage: 1, //总页数
	pageSize: 10, //条数
	isEnd: 0, //是否正在加载 0 上拉加载，1为加载中，2为已全部加载,3数据异常
	itemArr: [],
	itemObj: {}
};
/**
 * show
 */
export function showAnimate(){
	let animation = wx.createAnimation({
      	duration: 600,
        timingFunction: 'easa-in',
    });
	animation.top(0).step();
	animation.backgroundColor("rgba(0,0,0,.5)").step();

	return animation.export();
}
export function hideAnimate(){
	let animation = wx.createAnimation({
      	duration: 600,
        timingFunction: 'ease',
    });
	animation.backgroundColor("rgba(0,0,0,0)").top("100vh").step();
	return animation.export();
}