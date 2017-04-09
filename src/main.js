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
// import store from './store/'
//Polyfill to remove click delays on browsers with touch UIs
import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueLazyload from 'vue-lazyload'

Vue.use(ElementUI)
Vue.use(MuseUI)

Vue.use(VueLazyload, {
    error: require('./images/loading.svg'),
    loading: require('./images/loading.svg'),
    attempt: 1
  }
)

// 全局配置
Vue.config.debug = true

// post的时候会把JSON对象转成formdata
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<app/>',
    components: { App },
})

