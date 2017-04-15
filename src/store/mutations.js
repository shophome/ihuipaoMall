import {
    LOADING,
    PAGE_LOADING,
    LOGIN,
    SHOW_HEADTOP_LOGIN,
    SHOW_HEADTOP,
    SHOW_HEADTOP_BACK,
    SHOW_HEADTOP_SEARCH,
    SHOW_FOOTNAV,
    ADD_CART,
    REDUCE_CART,
    INIT_CART,
    CLEAR_CART,
} from './mutation-types'

import {
    setStore,
    getStore,
} from '../config/mUtils'

export default {
    //加载动画显示状态
    [LOADING] (state, loading) {
        state.loading = loading;
    },
    //页面加载动画显示状态
    [PAGE_LOADING] (state, pageLoading) {
        state.pageLoading = pageLoading;
    },
    //是否登陆状态
    [LOGIN] (state, login) {
        state.login = login;
    },
    //设置顶部导航是否显示登录按钮
    [SHOW_HEADTOP_LOGIN] (state, showHeadTopLogin) {
        state.showHeadTopLogin = showHeadTopLogin;
    },
    //设置顶部导航是否显示
    [SHOW_HEADTOP] (state, showHeadTop) {
        state.showHeadTop = showHeadTop;
    },
    //设置顶部导航返回按钮是否显示
    [SHOW_HEADTOP_BACK] (state, showHeadTopBack) {
        state.showHeadTopBack = showHeadTopBack;
    },
    //设置顶部导航搜索按钮是否显示
    [SHOW_HEADTOP_SEARCH] (state, showHeadTopSearch) {
        state.showHeadTopSearch = showHeadTopSearch;
    },
    //设置底部导航是否显示
    [SHOW_FOOTNAV] (state, showFootNav) {
        state.showFootNav = showFootNav;
    },
    //添加购物车商品
    [ADD_CART] (state, {
        id,
        goods_id,
        spec_id,
        goods_name,
        store_count,
        price,
        img,
        spec,
        num,
    }) {
        let cart = state.cartList;
        if (cart[id]) {
            cart[id]['num'] += num;
        } else {
            cart[id] = {
                    id: id,
                    goods_id : goods_id,
                    spec_id: spec_id,
                    goods_name : goods_name,
                    store_count : store_count,
                    price : price,
                    img : img,
                    spec : spec,
                    num : num
            };
        }
        state.cartList = cart;
        //存入localStorage
        setStore('cartList', state.cartList);
    },
    //删除购物车商品
    [REDUCE_CART] (state, id) {
        let cart = state.cartList;
        delete cart[id];
        state.cartList = cart;
        //存入localStorage
        setStore('cartList', state.cartList);
    },
    //网页初始化时从本地缓存获取购物车数据
    [INIT_CART](state) {
        let initCart = getStore('cartList');
        if (initCart) {
            state.cartList = JSON.parse(initCart);
        }
    },
    //清空当前商品的购物车信息
    [CLEAR_CART](state) {
        state.cartList = {};
        setStore('cartList', state.cartList);
    },
    
}