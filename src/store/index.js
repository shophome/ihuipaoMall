import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
    token: null,  // POST请求的token
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
    home: null,  //首页数据
    category: [],  //列表页数据
    brand: [],   //品牌页数据
    buyNowGoods: {},  //立即购买商品信息
    cart: {list: {}, num: 0},  //加入购物车的商品列表
    addressList: [], //收货地址列表
    coupon: {}, //优惠券
    couponUsed: {},  //选择使用的优惠券
    commentList: {   //留言列表
        goods_id: 0,
        consultCount: 0, 
        consultList: [{}]
    },  
}

export default new Vuex.Store({
    state,
    getters,
    // actions,
    mutations,
})