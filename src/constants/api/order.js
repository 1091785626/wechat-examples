const api = {
	/**
	 * 下单详情
	 */
	'ORDER_MAIN_GET'				:'/api/order',
	'ORDER_MAIN_ADDR_SELECT_POST' 	:'/api/order',
	'ORDER_MAIN_ADDR_PUT' 			:'/api/save-address',
	'ORDER_MAIN_GOODS_PUT'			:'/order',
	'ORDER_MAIN_LOGIS_PUT'			:'/api/order',
	/**
	 * 订单列表
	 */
	'ORDER_LIST_GET'			:'/member-order/order-list',
	/**
	 * 订单详情
	 */
	'ORDER_DETAIL_GET'			:'/member-order/detail',
	/**
	 * 订单列表详情统一按钮
	 */
	'ORDER_BTN_POST'			:'/member-order/setting',
	/**
	 * 评论模块
	 */
	'ORDER_COMMENT_GET'			:'/api/orderList',
	/**
	 * 退款模块
	 */
	'ORDER_REFUND_GET'			:'/api/orderRefund'
};
export default api;