import Vue from 'vue'
import API from '../config/api'

import * as user from './tempdata/user'
import * as cart from './tempdata/cart'
import * as home from './tempdata/home'
import * as list from './tempdata/list'
import * as category from './tempdata/category'
import * as brand from './tempdata/brand'
import * as goods from './tempdata/goods'

/**
 * 请求线上数据
 */
function apiFactory(api, params) {
    var customActions = {
        foo: {method: api.method, url: api.url},
    }
    var resource = Vue.resource(api.url, {}, customActions);
    return resource.foo(params).then(response => {
        response.body.headers = response.headers;
        return response.body;
    });
}

// function apiFactory(api, params) {
//     var customActions = {
//         foo: {method: api.method, url: api.url},
//     }
//     console.log(params);
//     var resource = Vue.resource(api.url, params, customActions);   //form格式提交参数
//     return resource.foo().then(response => {
//         response.body.headers = response.headers;
//         return response.body;
//     });
// }

/**
 * 创建临时数据
 */
const setpromise = data => {
    return new Promise((resolve, reject) => {
        resolve(data)
    })
}

//编译环境使用真实数据  'development' || 'production'
if (process.env.NODE_ENV == 'development') {    //开发环境

    // var getUserData = () => setpromise(user);
    var getUserData = () => apiFactory(API.get_userData, {});

    var getSearchData = (q, p) => apiFactory(API.get_searchData, {q: q, p: p});

    var getCartData = () => apiFactory(API.get_cartData, {});

    var addCartData = (data) => apiFactory(API.add_cartData, data);
    
    var changeCartData = (cart_select) => apiFactory(API.change_cartData, {list: cart_select});
    // 
    var delCartData = (ids) => apiFactory(API.del_cartData, {ids: ids});

    var getOrderData = (data) => apiFactory(API.get_orderData, data);

    var addOrder = (data) => apiFactory(API.add_order, data);

    var getHomeData = () => setpromise(home);
    // var getHomeData = () => apiFactory(API.get_homeData, {});

    var getCategoryData = () => apiFactory(API.get_categoryData, {});

    var getCategoryListData = (cat_id, p) => apiFactory(API.get_categoryListData, {category_id: cat_id, p: p});

    var getBrandData = () => apiFactory(API.get_brandData, {});

    var getBrandListData = (brand_id, p) => apiFactory(API.get_brandListData, {brand_id: brand_id, p: p});

    var getGoodsData = (id) => apiFactory(API.get_goodsData, {id: id});

    var getCommentData = (goods_id, p) => apiFactory(API.get_commentData, {goods_id: goods_id, p: p});

    var getOrderDetail = (id) => apiFactory(API.get_orderDetail, {id: id});

    var getAddressData = (data) => apiFactory(API.get_addressData, data);

    var delAddressData  = (id) => apiFactory(API.del_addressData, {id: id});

    var addAddressData  = (data) => apiFactory(API.add_addressData, data);

    var defaultAddressData  = (id) => apiFactory(API.default_addressData, {id: id});

    var postAddressEdit = (data) => apiFactory(API.post_addressEdit, data);

}else{                                           //真实环境
    
    // var getUserData = () => setpromise(user);
    var getUserData = () => apiFactory(API.get_userData, {});

    var getSearchData = (q, p) => apiFactory(API.get_searchData, {q: q, p: p});

    var getCartData = () => apiFactory(API.get_cartData, {});

    var addCartData = (data) => apiFactory(API.add_cartData, data);

    var changeCartData = (goods_num, cart_select) => apiFactory(API.change_cartData, {goods_num: goods_num, cart_select: cart_select});

    var delCartData = (ids) => apiFactory(API.del_cartData, {ids: ids});

    var getOrderData = (data) => apiFactory(API.get_orderData, data);

    var addOrder = (data) => apiFactory(API.add_order, data);

    var getHomeData = () => setpromise(home);
    // var getHomeData = () => apiFactory(API.get_homeData, {});
    
    var getCategoryData = () => apiFactory(API.get_categoryData, {});

    var getCategoryListData = (cat_id, p) => apiFactory(API.get_categoryListData, {category_id: cat_id, p: p});

    var getBrandData = () => apiFactory(API.get_brandData, {});

    var getBrandListData = (brand_id, p) => apiFactory(API.get_brandListData, {brand_id: brand_id, p: p});

    var getGoodsData = (id) => apiFactory(API.get_goodsData, {id: id});

    var getCommentData = (goods_id, p) => apiFactory(API.get_commentData, {goods_id: goods_id, p: p});

    var getAddressData = (data) => apiFactory(API.get_addressData, data);

    var delAddressData  = (id) => apiFactory(API.del_addressData, {id: id});

    var addAddressData  = (data) => apiFactory(API.add_addressData, data);

    var defaultAddressData  = (id) => apiFactory(API.default_addressData, {id: id});

    var postAddressEdit = (data) => apiFactory(API.post_addressEdit, data);

}

// /**
//  * 以下Api接口不需要进行反向代理
//  */

// var sendLogin = (code, mobile, validate_token) => setpromise(login.userInfo);

export { getUserData, getSearchData, getCartData, addCartData, changeCartData, delCartData, getOrderData, addOrder, getHomeData, getCategoryData, getBrandData, getCategoryListData, getBrandListData, getGoodsData, getCommentData, getOrderDetail, getAddressData, delAddressData, addAddressData, defaultAddressData, postAddressEdit }
