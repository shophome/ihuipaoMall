import Vue from 'vue'
import API from '../config/api'

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
    var resource = Vue.resource(api.url, params, customActions);
    return resource.foo().then(response => {
        return response.body;
    });
}

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

    /**
     * 获取首页默认数据
     */

    var getHomeData = () => setpromise(home);
    // var getCategoryData = () => setpromise(category);

    // var getHomeData = () => apiFactory(API.get_homeData, {});
    var getCategoryData = () => apiFactory(API.get_categoryData, {});
    var getBrandData = () => setpromise(brand);
    var getListData = () => setpromise(list);
    // var getProductData = (id) => setpromise(product);
    var getGoodsData = (id) => apiFactory(API.get_goodsData, {id: id});
    var getCommentData = (goods_id, p) => apiFactory(API.get_commentData, {goods_id: goods_id, p: p});


    // var getProductData = (id) => apiFactory(API.get_productData, {
    //     id: id
    // });

}else{                                           //真实环境

    var getHomeData = () => setpromise(home);
    // var getCategoryData = () => setpromise(category);
    
    // var getHomeData = () => apiFactory(API.get_homeData, {});
    var getCategoryData = () => apiFactory(API.get_categoryData, {});
    var getBrandData = () => setpromise(brand);
    var getListData = () => setpromise(list);
    // var getProductData = (id) => setpromise(product);
    var getGoodsData = (id) => apiFactory(API.get_goodsData, {});
    var getCommentData = (goods_id, p) => apiFactory(API.get_commentData, {goods_id: goods_id, p: p});

    // var getProductData = (id) => apiFactory(API.get_productData, {
    //     id: id
    // });
}


// /**
//  * 以下Api接口不需要进行反向代理
//  */

// var sendLogin = (code, mobile, validate_token) => setpromise(login.userInfo);

export { getHomeData, getCategoryData, getBrandData, getListData, getGoodsData, getCommentData }
