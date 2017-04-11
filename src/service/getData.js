import Vue from 'vue'
import API from '../config/api'

import * as home from './tempdata/home'
import * as product from './tempdata/product'

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
    var getProductData = (id) => setpromise(product);

    // var getHomeData = () => apiFactory(API.get_homeData, {});
    // var getProductData = (id) => apiFactory(API.get_productData, {
    //     id: id
    // });

}else{                                           //真实环境

    var getHomeData = () => setpromise(home);
    var getProductData = (id) => setpromise(product);

    // var getHomeData = () => apiFactory(API.get_homeData, {});
    // var getProductData = (id) => apiFactory(API.get_productData, {
    //     id: id
    // });
}


// /**
//  * 以下Api接口不需要进行反向代理
//  */

// var sendLogin = (code, mobile, validate_token) => setpromise(login.userInfo);

export { getHomeData, getProductData }
