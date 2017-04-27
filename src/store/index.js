import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
// import actions from './action'
import apiService from './apiService'
// console.log(apiService.actions);
import getters from './getters'

Vue.use(Vuex)

const state = {
    login: {},  //用户登录信息
    loading: false, //加载动画显示状态
    preventLoading: false,  //阻止加载动画显示
    pageLoading: false, //页面加载动画显示状态
    login: false, //是否为登陆状态
    headTopTitle: null,  //顶部导航标题
    showHeadTopLogin: false, //是否显示顶部导航登录按钮
    showHeadTop: true, //是否显示顶部导航
    showHeadTopBack: false, //是否显示顶部导航返回按钮
    showHeadTopSearch: true, //是否显示顶部导航返回按钮
    showFootNav: true,  //是否显示底部导航
    category: [],  //列表页数据
    brand: [],   //品牌页数据
    cart: {list: {}, num: 0},  //加入购物车的商品列表
    addressList: [], //收货地址列表
    coupon: {}, //优惠券
}

export default new Vuex.Store({
    state,
    getters,
    // actions,
    mutations,
    // apiService,
    modules: {
        apiService,
    }
})