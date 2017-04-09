import {
    SHOW_HEADTOP,
    SHOW_HEADTOP_BACK,
    SHOW_HEADTOP_SEARCH,
    SHOW_FOOTNAV,
} from './mutation-types'

export default {
    //设置顶部导航是否显示
    SHOW_HEADTOP (state, showHeadTop) {
        state.showHeadTop = showHeadTop;
    },
    //设置顶部导航返回按钮是否显示
    SHOW_HEADTOP_BACK (state, showHeadTopBack) {
        state.showHeadTopBack = showHeadTopBack;
    },
    //设置顶部导航搜索按钮是否显示
    SHOW_HEADTOP_SEARCH (state, showHeadTopSearch) {
        state.showHeadTopSearch = showHeadTopSearch;
    },
    //设置底部导航是否显示
    SHOW_FOOTNAV (state, showFootNav) {
        state.showFootNav = showFootNav;
    }
}