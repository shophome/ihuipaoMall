// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import './config/rem'
import store from './store'
import VueRouter from 'vue-router'
import routes from './router/router'
Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: 'hash',
    strict: process.env.NODE_ENV !== 'production'
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.login) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            window.location.href = 'http://passport.ihuipao.cn/site/login'
            // next({
                // path: '/login',
                // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            // })
        }
    }
    else {
        next();
    }
})

// import store from './store/'
//Polyfill to remove click delays on browsers with touch UIs
import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueLazyload from 'vue-lazyload'
import Toasted from 'vue-toasted'
import BMessage from './plugins/BMessage/index'

// Vue.use(ElementUI)
Vue.use(MuseUI)
Vue.use(Toasted)
Vue.use(BMessage, {b: 2})

Vue.use(VueLazyload, {
    error: require('./images/loading.svg'),
    loading: require('./images/loading.svg'),
    attempt: 1
  }
)

// 全局配置
// Vue.config.debug = true

// post的时候会把JSON对象转成formdata
// Vue.http.options.emulateJSON = true
// Vue.http.options.emulateHTTP = true

Vue.http.interceptors.push((request, next)=> {
    if(!store.state.preventLoading) {    //某些情况http请求不需要loading动画
        store.commit('PAGE_LOADING', true);
    }
    store.commit('LOADING', true);

    next((response=> {
        console.log(response);
        if(!response.ok) {
            Vue.BMessage.show('网络出错！');
        };
        store.commit('LOADING', false);
        setTimeout(function() {
            store.commit('PAGE_LOADING', false);
        }, 400);
    }));
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<app/>',
    components: { App },
})

