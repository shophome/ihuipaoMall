<template>
    <div id="root">
        <head-top v-show="showHeadTop" :search="showHeadTopSearch" :back="showHeadTopBack" :showLogin="showHeadTopLogin"></head-top>
        <router-view></router-view>
        <foot-nav v-show="showFootNav"></foot-nav>
        <transition name="fade">
            <loading v-if="loading"></loading>
        </transition>
        <transition name="fade">
            <page-loading v-if="pageLoading"></page-loading>
        </transition>
    </div>
</template>

<script>

import headTop from 'components/headTop/headTop'
import footNav from 'components/footNav/footNav'
import loading from 'components/loading/loading'
import pageLoading from 'components/pageLoading/pageLoading'
import {mapState, mapMutations} from 'vuex'

export default {
    name: 'app',
    components: {
        'head-top': headTop,
        'foot-nav': footNav,
        'loading': loading,
        'page-loading': pageLoading,
    },
    computed: mapState([
        'loading',
        'pageLoading',
        'showHeadTop',
        'showHeadTopBack',
        'showHeadTopLogin',
        'showHeadTopSearch',
        'showFootNav',
    ]),
    data() {
        return {
        }
    },
    created() {
        this.INIT_CART();
        // this.CLEAR_CART();
    },
    methods: {
        ...mapMutations(['INIT_CART','CLEAR_CART']),
    }
}

</script>
<style lang="scss" rel="stylesheet/scss">
@import './style/common';
@import './style/mixin';

.app {
    height: 100%;
    overflow-y: scroll;
}

#toasted-container {
    bottom: 1rem !important;
    .toasted {
        margin: 0 auto !important;
        width: 6rem !important;
        height: 1.1rem !important;
        line-height: 1.6rem !important;
        font-size: .6rem !important;
        text-align: center !important;
        display: block !important;
        opacity: .9 !important;
    }
}

.head_logo {
    left: .2rem;
    @include wh(1.6rem, 1rem);
    @include ct;
    @include bis('images/logo.png');
}

.wrap { 
    height: 100%;
    overflow: auto;
    background: #eee;
}

</style>
