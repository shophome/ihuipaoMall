import App from '../App'
import home from '../pages/home/home'
import list from '../pages/list/list'
import category from '../pages/category/category'
import brand from '../pages/brand/brand'
import branddetail from '../pages/brand/children/branddetail'
import goods from '../pages/goods/goods'
import cart from '../pages/cart/cart'
import profile from '../pages/profile/profile'
import info from '../pages/profile/children/info'
import address from '../pages/profile/children/address'
import addressEdit from '../pages/profile/children/children/addressEdit'
import add from '../pages/profile/children/children/children/add'
import balance from '../pages/profile/children/balance'
import coupon from '../pages/profile/children/coupon'
import order from '../pages/profile/children/order'
import orderDetail from '../pages/profile/children/children/orderDetail'

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
    },
    //购物车
    {
        path: '/cart',
        component: cart,
    },
    //个人信息页
    {
        path: '/profile',
        component: profile,
        children: [
            {
                path: 'info', //个人信息详情页
                component: info,
                // children: [{
                //     path: 'address',
                //     component: address,     //编辑地址
                //     children: [{
                //         path: 'add',
                //         component: add,
                //     }]
                // }]
            },
            { 
                path: 'address',
                component: address,     //编辑地址
                children: [{
                    path: 'edit',
                    component: addressEdit,
                }]
            },
            {
                path: 'balance',  //余额
                component: balance,
            },
            {
                path: 'coupon',  //我的优惠页
                component: coupon,
            },
            {
                path: 'order',  //订单列表页
                component: order,
                children: [{
                    path: 'orderDetail', //订单详情页
                    component: orderDetail,
                }]
            }
        ]
    },
]
