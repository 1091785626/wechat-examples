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
		    "address": "祥园路38号微一案公司"
		},
		shop:{
			name:"潮流百货批发城",
			tel:"15968763535"
		},
		"orders_items": [
           {
               "order_id": "2",
               "product_name": "测试商品",
               "product_image": "http://osscdn.weiyian.com/image/undefined/160910/494823828232.jpg",
               "quantity": "1",
               "sku_value": "大又白",
               "price": "2.00"
           },
           {
               "order_id": "2",
               "product_name": "测试商品",
               "product_image": "http://osscdn.weiyian.com/image/undefined/160910/494823828232.jpg",
               "quantity": "2",
               "sku_value": "",
               "price": "5.00"
           }
       ],
       memo:"1580那款我要红黑各5，不要搞错了",
       amount:{
       		logis_amount:"2213",
       		pay_amount:"2213"
       },
       order_attr : {
       		order_sn:11111,
       		create_time:"2016-10-10 13:13:13",
       		complete_time:"2016-10-10 13:13:13"
       },
       button_list:['additional']
	}
};
module.exports = data;
