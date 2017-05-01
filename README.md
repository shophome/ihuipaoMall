# ihuipaoMall

> A Vue.js & webpack webApp
> 
> [**在线预览**](http://t.cn/RXGYel7)

Windows或Mac系统，访问[**Nodejs官网**](https://nodejs.org/)，安装LTS版本的
node(v4.2.3及以上)，默认安装即可。

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
``` bash
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
```
## 自定义Vue插件

目录：src/plugins
### BMessage（提示信息插件）
```
使用方法：

//main.js 入口文件引入
import BMessage from './plugins/BMessage/index'
Vue.use(BMessage)
	
//vue全局调用
Vue.BMessage.show('hello BMessage!!');
	
//vue组件调用
this.$BMessage.show('hello BMessage!!');
```
## 后续:
    1.商品页购物车按钮隐藏：'/goods/goodsinfo' , api加入返回参数：prompt: true
    2.订单详情页，未支付的跳转：'/user/order_detail' , api返回值data加入参数：pay_url: 'http://xx/xxx'作为去支付跳转链接

## 截图预览

![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.43.56.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.44.08.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.44.23.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%883.14.07.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%883.15.11.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.44.34.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.44.45.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.44.58.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.45.24.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.49.21.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.49.50.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.50.08.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.52.25.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.52.38.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.52.46.png?imageView2/1/w/300/h/493/q/100)
![Screenshot](http://o9kkuebr4.bkt.clouddn.com/ihuipaomall%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-01%20%E4%B8%8B%E5%8D%882.53.10.png?imageView2/1/w/300/h/493/q/100)

