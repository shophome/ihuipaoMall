import App from '../App'
import home from '../pages/home/home'
import category from '../pages/category/category'
import brand from '../pages/brand/brand'
import branddetail from '../pages/brand/children/branddetail'
import product from '../pages/product/product'
import cart from '../pages/cart/cart'
import profile from '../pages/profile/profile'
import info from '../pages/profile/children/info'
import address from '../pages/profile/children/address'
import add from '../pages/profile/children/children/children/add'
import balance from '../pages/profile/children/balance'
import benefit from '../pages/profile/children/benefit'
import order from '../pages/profile/children/order'
import orderDetail from '../pages/profile/children/children/orderDetail'

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页
        {
            path: '/home',
            component: home
        },
        //商品列表页
        {
            path: '/category',
            component: category,
        },
        //品牌列表页
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
            path: '/product',
            component: product,
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
                        path: 'add',
                        component: add,
                    }]
                },
                {
                    path: 'balance',  //余额
                    component: balance,
                },
                {
                    path: 'benefit',  //我的优惠页
                    component: benefit,
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
}]
