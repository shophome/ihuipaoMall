import App from '../App'
import search from '../pages/search/search'
import home from '../pages/home/home'
import list from '../pages/list/list'
import category from '../pages/category/category'
import brand from '../pages/brand/brand'
import branddetail from '../pages/brand/children/branddetail'
import goods from '../pages/goods/goods'
import comment from '../pages/goods/children/comment'
import addComment from '../pages/goods/children/children/addComment'
import cart from '../pages/cart/cart'
import order from '../pages/order/order'
import addressSelect from '../pages/order/children/addressSelect'
import useCoupon from '../pages/order/children/useCoupon'
import profile from '../pages/profile/profile'
import address from '../pages/profile/children/address'
import addressEdit from '../pages/profile/children/children/addressEdit'
import balance from '../pages/profile/children/balance'
import coupon from '../pages/profile/children/coupon'
import myOrder from '../pages/profile/children/myOrder'
import orderDetail from '../pages/profile/children/children/orderDetail'
import config from '../pages/profile/children/config'

export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '',
        redirect: '/home'
    },
    //首页
    {
        path: '/home',
        component: home
    },
    //搜索
    {
        path: '/search',
        component: search
    },
    //商品分类页
    {
        path: '/category',
        component: category,
    },
    //商品列表页
    {
        path: '/list',
        component: list,
    },
    //品牌分类页
    {
        path: '/brand',
        component: brand,
        children: [{
            path: 'branddetail', //品牌单页
            component: branddetail,
        }]
    },
    //商品详情页
    {
        path: '/goods',
        component: goods,
        children: [{
            name: 'comment',
            path: 'comment',  //商品留言
            component: comment,
            children:[{
                name: 'addComment',
                path: 'addComment',
                component: addComment
            }]
        }]
    },
    //购物车
    {
        path: '/cart',
        component: cart,
    },
    //结算页
    {
        path: '/order',
        name: 'order',
        component: order,
        children: [
            {
                path: 'addressSelect',  //选择收货地址
                component: addressSelect,
            },
            {
                name: 'useCoupon',
                path: 'useCoupon',  //使用优惠券
                component: useCoupon,
            }
        ]
    },
    //个人信息页
    {
        path: '/profile',
        component: profile,
        children: [
            { 
                path: 'address',
                component: address,     //编辑地址
                meta: {
                    requireAuth: true,
                },
                children: [{
                    path: 'edit',
                    component: addressEdit,
                    meta: {
                        requireAuth: true,
                    },
                }]
            },
            {
                path: 'balance',  //余额
                component: balance,
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: 'coupon',  //我的优惠页
                component: coupon,
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: 'myOrder',  //订单列表页
                component: myOrder,
                meta: {
                    requireAuth: true,
                },
                children: [{
                    path: 'orderDetail', //订单详情页
                    component: orderDetail,
                    meta: {
                        requireAuth: true,
                    },
                }]
            },
            {
                path: 'config',  //账户设置页
                component: config,
                meta: {
                    requireAuth: true,
                },
            }
        ]
    },
]
