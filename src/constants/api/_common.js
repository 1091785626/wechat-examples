const api = {
	/**
     * SKU数据获取
     */
    '_SKU_MAIN_GET'         :'/api/sku',
    '_SKU_MAIN_PUT'         :'/api/cart',
    '_SKU_MAIN_BUY'         :'/api/cart',
    '_SKU_MAIN_CART'        :'/api/cart',
    /**
     * 下单中的地址选择
     */
    '_ADDR_LIST_GET'        :'/api/addr',
    /**
     * 三级列表加载
     */
    '_ADDR_DISTRIC_GET'    :'/api/district',
    /**
     * 选择物流，下单页面中
     */
    '_LOGIS_LIST_GET'       :'/api/logis',
    /**
     * 用户端下单页面 提交订单
     */
    '_PAYMENT_ORDER_POST'   :'/api/payment',
    /**
     * 确认支付
     */
    '_PAYMENT_MAIN_POST'    :'/payment/index',
};
export default api;