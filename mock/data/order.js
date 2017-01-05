let data = {
        "data": {
            "order_goods": [//生成订单中的商品
                {
                    "id": "5048",
                    "title": "定时上下架测试",
                    "img": "http://wx.qlogo.cn/mmopen/6mXOeYa4HU856QyIE4wprRFhvpHafqX2H9icVQ5UPvhqhVOlBGHp2DQl2s9f6TVZg8amPyAiccluo3TTMYIQdVlg/0",
                    "stock": 11,
                    "price": "170.00",
                    "props_str": "申达股份 成都市高富帅 tfrftd",
                    "quantity": 10,
                    "template_id":1,//运费模版
                },
                {
                    "id": "5046",
                    "title": "定时上下架测试",
                    "img": "http://wx.qlogo.cn/mmopen/6mXOeYa4HU856QyIE4wprRFhvpHafqX2H9icVQ5UPvhqhVOlBGHp2DQl2s9f6TVZg8amPyAiccluo3TTMYIQdVlg/0",
                    "stock": 11,
                    "price": "170.00",
                    "props_str": "申达股份 成都市高富帅 tfrftd",
                    "quantity": 10,
                    "template_id":1,//运费模版
                },
                {
                    "id": "6481",
                    "title": "翅中",
                    "img": "http://wx.qlogo.cn/mmopen/6mXOeYa4HU856QyIE4wprRFhvpHafqX2H9icVQ5UPvhqhVOlBGHp2DQl2s9f6TVZg8amPyAiccluo3TTMYIQdVlg/0",
                    "stock": 99,
                    "price": "17.00",
                    "props_str": "b !!@@## 1",
                    "quantity": 2,
                    "template_id":2,//运费模版
                }
            ],
            "addr": {//完整的地址信息 如果没有地址 空对象{}
                "id": "74988",          //地址id
                "province": "330000",   //省
                "city": "330100",       //市
                "district": "330105",   //区
                "province_name": "浙江省",//省名字
                "city_name": "杭州市",     //市名字
                "district_name": "拱墅区", //区名字
                "consignee": "6622213",   //用户名
                "mobile": "15968763535",  //手机号码
                "address": "祥园路38号",  //详情地址
                "zipcode": ""             //邮政编码
            },
            "logis":{//运费膜拜所对应的选中物流
               1:{
                    "id": "4",       //物理id
                    "name": "快递",  //物流名字
                    "price": "0.00" //物流价格
               },
               2:{
                    "id": "4",
                    "name": "快递",
                    "price": "0.00"
               }
            },
            "amounts": {
                "amount": "1744.00",  //总价格
                "goods_amount": "1744.00", //商品总价
                "logis_amount": "10.00"//物流
            }
        }
    };
module.exports = data;
