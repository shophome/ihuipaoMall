import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
// import actions from './action'
import apiService from './apiService'
// console.log(apiService.actions);
import getters from './getters'

Vue.use(Vuex)

const state = {
    showHeadTop: true, //是否显示顶部导航
    showHeadTopBack: false, //是否显示顶部导航返回按钮
    showHeadTopSearch: true, //是否显示顶部导航返回按钮
    showFootNav: true,  //是否显示底部导航
}

export default new Vuex.Store({
    state,
    getters,
    // actions,
    mutations,
    // apiService,
    modules: {
        apiService,
    }
})