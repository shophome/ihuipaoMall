<template>
    <div id="root">
        <head-top v-show="showHeadTop" :search="showHeadTopSearch" :showBack="showHeadTopBack" :showLogin="isLogin">
            <span slot='logo' class="head_logo" @click="$router.push('/home')"></span>
        </head-top>
        <router-view></router-view>
        <foot-nav v-if="showFootNav"></foot-nav>
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
import { getUserData, getCartData, getAddressData } from 'service/getData'
import {mapState, mapMutations} from 'vuex'
import {getCookie, Clone} from 'config/mUtils'

export default {
    name: 'app',
    components: {
        'head-top': headTop,
        'foot-nav': footNav,
        'loading': loading,
        'page-loading': pageLoading,
    },
    computed: {
        ...mapState([
            'loading',
            'pageLoading',
            'showHeadTop',
            'showHeadTopBack',
            'showHeadTopLogin',
            'showHeadTopSearch',
            'showFootNav',
            'cart'
        ])
    },
    data() {
        return {
            isLogin: false
        }
    },
    created() {
        this.INIT_CART();
        let USERID = getCookie('user_id');
        if(USERID) {
            this.LOGIN(true);
            getUserData().then(res => {
                this.LOGIN(res.data);
                this.SAVE_COUPON(res.data.coupon);
                this.isLogin = true;
                getCartData().then(res => {
                    this.SAVE_CART(res.data);
                });
            });
            getAddressData().then(res => {
                this.SAVE_ADDRESS(res.data.address);
            })
        } else {
            this.LOGIN(false);
        }
    },
    methods: {
        ...mapMutations(['LOGIN','INIT_CART','CLEAR_CART','SAVE_CART','SAVE_ADDRESS','SAVE_COUPON']),
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
    left: .54rem;
    @include wh(1.4rem, .8rem);
    @include ct;
    @include bis('images/huipao.png');
    z-index: 2;
}

.wrap { 
    height: 100%;
    overflow: auto;
    background: #eee;
}

</style>
