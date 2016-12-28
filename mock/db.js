let Mock  = require('mockjs');
module.exports = function() {

    let res = {};
    /*start*/
    //res.test        = require('./data/test');
    res.reset       = {v:1};
    res.global      = require('./data/global');
    res.goods       = require('./data/goods');
    res.list        = require('./data/list');
    res.home        = require('./data/home');
    res.cart        = require('./data/cart');
    res.sku         = require('./data/sku');
    res.order       = require('./data/order');
    res.addr        = require('./data/addr');
    res.district    = require('./data/district');
    res.logis       = require('./data/logis');
    res.payment     = require('./data/payment');
    res.user        = require('./data/user');
    res.orderList   = require('./data/orderList');
    res.orderDetail     = require('./data/orderDetail');
    res.category        = require('./data/category');
    res.categoryList    = require('./data/categoryList');
    res.goodsList                   = require('./data/goodsList');
    /*end*/
    /*让返回的值status都为1*/
    for (let i in res){
        res[i].status = 1;
    }
    return res;
};