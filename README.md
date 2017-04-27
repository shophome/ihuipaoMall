# ihuipaoMall

> A Vue.js & webpack webApp
> 
> [**在线预览**](http://t.cn/RXGYel7)

## Build Setup

``` bash
# install dependencies   安装依赖
npm install

# serve with hot reload at localhost:8080   启动本地热更新测试环境，端口8080
npm run dev

# build for production with minification   打包编译生产环境版本
npm run build

# build for production and view the bundle analyzer report   编译的同时浏览打包分析报告
npm run build --report
```
## 项目结构:
    ├── build    <!--webpack配置-->
    │   ├── build.js
    │   ├── check-versions.js
    │   ├── dev-client.js
    │   ├── dev-server.js
    │   ├── utils.js
    │   ├── vue-loader.conf.js
    │   ├── webpack.base.conf.js
    │   ├── webpack.dev.conf.js
    │   └── webpack.prod.conf.js
    ├── config  <!--开发环境配置-->
    ├── dist  <!--编译打包目录-->
    ├── node_modules  <!--npm加载的模块-->
    ├── screenshots   <!--参考截图-->
    ├── src  <!--开发资源目录-->
    │   ├── components  <!--vue单文件组件-->
    │   │   ├── commentCard  
    │   │   │   └── commentCard.vue         
    │   │   ├── couponCard 
    │   │   │   └── couponCard.vue
    │   │   ├── footNav            
    │   │   │   └── footNav.vue
    │   │   ├── goodsCard              
    │   │   │   └── goodsCard.vue
    │   │   ├── headTop            
    │   │   │   └── headTop.vue
    │   │   ├── listNavbar             
    │   │   │   └── listNavbar.vue
    │   │   ├── loading            
    │   │   │   └── loading.vue
    │   │   ├── orderCard              
    │   │   │   └── orderCard.vue
    │   │   ├── pageLoading            
    │   │   │   └── pageLoading.vue
    │   │   └── topNavbar              
    │   │       └── topNavbar.vue
    │   ├── config
    │   │   ├── api.js  <!--api接口-->
    │   │   ├── cityData.js  <!--城市数据-->
    │   │   ├── mUtils.js  <!--公共js函数-->
    │   │   └── rem.js  <!--rem和px转换-->
    │   ├── images
    │   │   ├── add.png
    │   │   └── ...
    │   ├── pages  <!--页面组件-->
    │   │   ├── brand
    │   │   │   ├── children 
    │   │   │   │   └── branddetail.vue
    │   │   │   └── brand.vue
    │   │   ├── cart
    │   │   │   └── cart.vue
    │   │   ├── category
    │   │   │   └── category.vue
    │   │   ├── goods
    │   │   │   ├── children 
    │   │   │   │   ├──children 
    │   │   │   │   │  └── addComment.vue
    │   │   │   │   └── comment.vue
    │   │   │   └── goods.vue
    │   │   ├── home
    │   │   │   └── home.vue
    │   │   ├── list
    │   │   │   └── list.vue
    │   │   ├── order
    │   │   │   ├── children 
    │   │   │   │   ├── addressSelect.vue
    │   │   │   │   └── useCoupon.vue
    │   │   │   └── order.vue
    │   │   ├── profile
    │   │   │   ├── children 
    │   │   │   │   ├──children 
    │   │   │   │   │  ├── addressEdit.vue
    │   │   │   │   │  └── orderDetail.vue
    │   │   │   │   ├── address.vue
    │   │   │   │   ├── balance.vue
    │   │   │   │   ├── config.vue
    │   │   │   │   ├── coupon.vue
    │   │   │   │   └── myOrder.vue
    │   │   │   └── profile.vue
    │   │   └── search
    │   │       └── search.vue
    │   ├── plugins  <!--插件-->
    │   │   ├── BMessage  <!--自定义message插件-->
    │   │   │   ├── src
    │   │   │   │   ├── BMessage.scss
    │   │   │   │   ├── BMessage.vue
    │   │   │   │   └── BMessage.js
    │   │   │   └── index.js
    │   │   └── swiper.min.js  <!--swiper轮播插件-->
    │   ├── router  <!--路由配置-->
    │   │   └── router.js   
    │   ├── service
    │   │   ├── tempdata  <!--mock数据-->
    │   │   │   ├── brand.js
    │   │   │   ├── cart.js
    │   │   │   ├── category.js
    │   │   │   ├── goods.js
    │   │   │   ├── home.js
    │   │   │   ├── list.js
    │   │   │   └── user.js
    │   │   └── getData.js  <!--获取数据方法(线上：ajax，线下：promise)-->
    │   ├── store   <!--vuex状态管理-->
    │   │   ├── action.js
    │   │   ├── getters.js
    │   │   ├── index.js
    │   │   ├── mutation-types.js
    │   │   └── mutations.js
    │   ├── style  <!--独立样式文件-->
    │   │   ├── common.scss   <!--公共样式-->
    │   │   ├── component.scss  <!--部分组件样式-->
    │   │   ├── icon.scss  <!--公共图标样式-->
    │   │   ├── mixin.scss  <!--公共mixin(颜色，布局等)-->
    │   │   └── swiper.min.css  <!--swiper插件样式文件-->
    │   ├── App.vue  <!--app布局-->
    │   └── main.js  <!--webpack入口文件-->
    ├── .babelrc  <!--语法校验规则-->
    ├── index.html  <!--html主文件--> 
    ├── package.json  <!--npm配置文件-->
    └── README.md  <!--说明文档-->
 

## TODOLIST: 
    1.<!--登陆／注册的状态获取，以及app各组件的状态切换-->
    2.<!--首页页面楼层-->
    3.<!--品牌页分类效果-->
    4.<!--选择商品属性的交互-->
    5.<!--加入购物车动画效果-->
    6.<!--购物车交互-->
    7.<!--修改，新增地址交互-->
    8.<!--查看优惠券-->
    9.<!--订单页过渡效果优化（或以加载动画代替）-->
    10.<!--所有页面ajax请求加载动画-->
    11.<!--ajax api替换成线上版本-->
    12.<!--生成订单页-->

## 还需要的接口
    1.<!--搜索-->
    2.结算
    3.<!--修改地址-->
    4.留言
    5.首页轮播图

##自定义Vue插件

####目录：src/plugins

#####BMessage（提示信息插件）
######使用方法：  
```
//main.js 引入
import BMessage from './plugins/BMessage/index'
Vue.use(BMessage)

//vue全局调用
Vue.BMessage.show('hello BMessage!!');

//vue组件调用
this.$BMessage.show('hello BMessage!!');
```
## 后续:
    1.商品页购物车按钮隐藏：'/goods/goodsinfo' , api加入返回参数：prompt: true
    