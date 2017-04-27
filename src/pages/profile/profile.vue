<template>
    <div class="wrap">
        <div class="header">
            <div class="avatar">
                <img :src="login.avatar || 'http://r0.ihuipao.cn/vue/tpshop/img/avatar.png'">

            </div>
            <div class="name" @click="goLogin">{{ login.name || '登录/注册' }}</div>
        </div>
        <div class="order">
            <div class="nav">
                <router-link to="/profile/myOrder" tag="div" class="all collapse-right">
                    <div class="icon icon_order"></div>
                    <span class="title">我的订单</span>
                    <span class="content">全部订单</span>
                </router-link>
                <ul class="order-list">
                    <router-link to="/profile/myOrder?type=WAITPAY" tag="li" class="order-item">
                        <div class="icon icon_order_paying"></div>
                        <span>待付款</span>
                    </router-link>
                    <router-link to="/profile/myOrder?type=WAITRECEIVE" tag="li" class="order-item">
                        <div class="icon icon_order_delivering"></div>
                        <span>待收货</span>
                    </router-link>
                    <router-link to="/profile/myOrder?type=FINISH" tag="li" class="order-item">
                        <div class="icon icon_order_finished"></div>
                        <span>已完成</span>
                    </router-link>
                </ul>
            </div>
        </div>
        <div class="collapse-group">
            <router-link to="/profile/address" tag="div" class="collapse-right">
                <div class="icon icon_address"></div>
                <div class="content">我的地址</div>
            </router-link>
            <router-link to="/profile/balance" tag="div" class="collapse-right">
                <div class="icon icon_balance"></div>
                <div class="content">我的余额</div>
            </router-link>
            <router-link to="/profile/coupon" tag="div" class="collapse-right">
                <div class="icon icon_coupon"></div>
                <div class="content">我的返券</div>
            </router-link>
        </div>
        <router-link to="/profile/config" tag="div" class="collapse-right">
            <div class="icon icon_config"></div>
            <div class="content">账户设置</div>
        </router-link>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'profile',
    data() {
        return {
        }
    },
    computed: mapState([
        'login',
    ]),
    created() {
        this.SHOW_HEADTOP(false);
        this.SHOW_FOOTNAV(true);
    },
    mounted() {
    },
    methods: {
        ...mapMutations(['SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV']),
        goLogin() {
            if(!this.login) {
                window.location.href = 'http://passport.ihuipao.cn/site/login';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/component';

@mixin paddingLR {
    padding-left: .8rem;
    padding-right: .8rem;
}

@mixin paddingTB($top, $bottom) {
    padding-top: $top;
    padding-bottom: $bottom;
}

.collapse-right:after {
    right: .8rem;
}

.wrap {
    background-color: #f5f5f5;
}

.header {
    height: 3.8rem;
    padding: 1rem 1rem;
    background-image: url(http://r0.ihuipao.cn/race/mall/img/BG-RUN.png);
    background-repeat: no-repeat;
    background-size: auto 100%;
    .avatar {
        vertical-align: middle;
        display: inline-block;
        border-radius: 50%;
        overflow: hidden;
        @include wh(2rem, 2rem);
    }
    .name {
        vertical-align: middle;
        display: inline-block;
        color: #fff;
        margin-left: .4rem;
    }
}
.order {
    background-color: #fff;
    font-size: .7rem;
    @include paddingLR;
    .all {
        text-align: center;
        border-bottom: 1px solid #eee;
        padding: 0;
        @include flefthoz;
        &.collapse-right {
            height: 2rem;
            margin: 0;
            &:after {
                right: 0;
            }
        }
        .title {
            margin-left: .6rem;
            font-size: .6rem;
        }
        .content {
            position: absolute;
            right: 0;
            font-size: .5rem;
            margin-right: 1rem;
            color: #a19f9f;
        }
    }
    .nav {
        .order-list {
            height: 3rem;
            @include paddingTB(.6rem, .2rem);
            @include fmidhoz;
            .order-item {
                height: 100%;
                @include fmidver;
                flex-grow: 1;
                justify-content: space-around;
                span {
                    font-size: .5rem;
                }
            }
        }
    }
}

.collapse-right {
    margin-top: .6rem;
    position: relative;
    height: 2.6rem;
    background-color: #fff;
    @include flefthoz;
    @include paddingLR;
    @include paddingTB(.2rem, .2rem);
    .content {
        margin-left: .6rem;
    }
}

.collapse-group {
    margin-top: .6rem;
    .collapse-right {
        margin-top: 0;
        &:before {
            position: absolute;
            content: '';
            display: block;
            width: 85%;
            height: 1px;
            top: 0;
            right: 0;
            background-color: #e6e6e6;
        }
        &:nth-child(1):before {
            display: none;
        }
    }
}

</style>