import {
    LOGIN,
    LOADING,
    PREVENT_LOADING,
    PAGE_LOADING,
    HEAD_TOP_TITLE,
    SHOW_HEADTOP_LOGIN,
    SHOW_HEADTOP,
    SHOW_HEADTOP_BACK,
    SHOW_HEADTOP_SEARCH,
    SHOW_FOOTNAV,
    SAVE_CATEGORY,
    SAVE_BRAND,
    ADD_CART,
    SAVE_CART,
    REDUCE_CART,
    INIT_CART,
    CLEAR_CART,
    DELETE_ADDRESS,
    ADD_ADDRESS,
    SAVE_ADDRESS,
    EDIT_ADDRESS,
    SELECT_ADDRESS,
    SAVE_COUPON,
} from './mutation-types'

import {
    setStore,
    getStore,
} from '../config/mUtils'

export default {
    //是否登陆状态
    [LOGIN] (state, login) {
        state.login = login;
    },
    //加载动画显示状态
    [LOADING] (state, loading) {
        state.loading = loading;
    },
    //阻止加载动画显示
    [PREVENT_LOADING] (state, preventLoading) {
        state.preventLoading = preventLoading;
    },
    //页面加载动画显示状态
    [PAGE_LOADING] (state, pageLoading) {
        state.pageLoading = pageLoading;
    },
    //顶部导航标题
    [HEAD_TOP_TITLE] (state, headTopTitle) {
        state.headTopTitle = headTopTitle;
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
    //保存列表页数据
    [SAVE_CATEGORY] (state, category) {
        state.category = category;
    },
    //保存品牌页数据
    [SAVE_BRAND] (state, brand) {
        state.brand = brand;
    },
    //添加购物车商品
    [ADD_CART] (state, {
        id,
        goods_id,
        spec_key,
        goods_name,
        store_count,
        price,
        img,
        spec,
        goods_num,
    }) {
        let list = state.cart.list;
        if (list[id]) {
            list[id]['goods_num'] += goods_num;
        } else {
            list[id] = {
                    id: id,
                    goods_id : goods_id,
                    spec_key: spec_key,
                    goods_name : goods_name,
                    store_count : store_count,
                    price : price,
                    img : img,
                    spec : spec,
                    goods_num : goods_num
            };
        }
        state.cart.list = list;
        state.cart.num += goods_num;
        //存入localStorage
        setStore('cart', state.cart);
    },
    //存储购物车商品
    [SAVE_CART] (state, cart) {
        state.cart.list = cart.cartList;
        state.cart.num = cart.total_price.num;
        setStore('cart', state.cart);
    },
    //删除购物车商品
    [REDUCE_CART] (state, id) {
        let cart = state.cart;
        console.log(id);
        console.log(cart.list[id]);
        cart.num -= cart.list[id].goods_num;
        delete cart.list[id];
        state.cart = cart;
        //存入localStorage
        setStore('cart', state.cart);
    },
    //网页初始化时从本地缓存获取购物车数据
    [INIT_CART](state) {
        let initCart = getStore('cart');
        if (initCart) {
            state.cart = JSON.parse(initCart);
        }
    },
    //清空当前商品的购物车信息
    [CLEAR_CART](state) {
        state.cart = {};
        setStore('cart', state.cart);
    },
    //删除地址
    [DELETE_ADDRESS](state, idx) {
        state.addressList.splice(idx, 1);
    },
    //新增地址
    [ADD_ADDRESS](state, address) {
        state.addressList.push(address);
    },
    //修改地址
    [EDIT_ADDRESS](state, {idx, data}) {
        console.log(idx);
        console.log(data);
        console.log(state.addressList[idx]);
        state.addressList[idx] = data;
        console.log(state.addressList[idx]);
    },
    //保存编辑地址
    [SAVE_ADDRESS](state, addressList) {
        state.addressList = addressList;
    },
    //选择地址
    [SELECT_ADDRESS](state, idx) {
        for(let i in state.addressList) {
            state.addressList[i].selected = 0;
        }
        state.addressList[idx].selected = 1;
    },
    //保存优惠券
    [SAVE_COUPON](state, coupon) {
        state.coupon = coupon;
    }
    // [EDIT_ADDRESS](state, {idx, data}) {
    //     console.log(idx);
    //     console.log(data);
    //     state.login.address[idx] = data;
    // }
    
}