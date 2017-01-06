let data = {
	data:{
		"id":"20",
		"state":['状态1','状态2'],
		"addr": {
		    "id": "74988",
		    "consignee": "aaa",
		    "province": 330000,
		    "city": 330100,
		    "district": 330105,
		    "province_name": "浙江省",
		    "city_name": "杭州市",
		    "district_name": "拱墅区",
		    "mobile": "15968763535",
		    "address": "祥园路38号"
		},
		shop:{
			name:"潮流百货批发城",
			tel:"15968763535"
		},
		"orders_items": [
           {
               "order_id": "2",
               "product_name": "测试商品",
               "product_image": "http://wx.qlogo.cn/mmopen/6mXOeYa4HU856QyIE4wprRFhvpHafqX2H9icVQ5UPvhqhVOlBGHp2DQl2s9f6TVZg8amPyAiccluo3TTMYIQdVlg/0",
               "quantity": "1",
               "sku_value": "大又白",
               "price": "2.00"
           },
           {
               "order_id": "2",
               "product_name": "测试商品",
               "product_image": "http://wx.qlogo.cn/mmopen/6mXOeYa4HU856QyIE4wprRFhvpHafqX2H9icVQ5UPvhqhVOlBGHp2DQl2s9f6TVZg8amPyAiccluo3TTMYIQdVlg/0",
               "quantity": "2",
               "sku_value": "",
               "price": "5.00"
           }
       ],
       memo:"1580那款我要红黑各5，不要搞错了",
       amounts:{
          goods_amount:"2213",
       		logis_amount:"2213",
       		amount:"2213"
       },
       order_attr : {
       		order_sn:11111,
       		create_time:"2016-10-10 13:13:13",
       		complete_time:"2016-10-10 13:13:13"
       },
       button_list:['confirm','paynow']
	}
};
module.exports = data;
