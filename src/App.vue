<template>
    <div>
        <head-top v-if="showHeadTop" :search="showHeadTopSearch" :back="showHeadTopBack" :showLogin="showHeadTopLogin"></head-top>
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <foot-nav v-if="showFootNav"></foot-nav>
        <loading v-if="loading"></loading>
    </div>
</template>

<script>

import headTop from 'components/headTop/headTop'
import footNav from 'components/footNav/footNav'
import loading from 'components/loading/loading'
import {mapState, mapMutations} from 'vuex'

export default {
    name: 'app',
    components: {
        'head-top': headTop,
        'foot-nav': footNav,
        'loading': loading,
    },
    computed: mapState([
        'loading',
        'showHeadTop',
        'showHeadTopBack',
        'showHeadTopLogin',
        'showHeadTopSearch',
        'showFootNav',
    ]),
    data() {
        return {
            isShowLoading: true,
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
