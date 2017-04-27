<template>
    <div class="order-page child-page paddingTop">
        <head-top :back="true">
            <span slot='title' class="head-title">我的订单</span>
        </head-top>
        <div class="order-container">
            <div class="tab">
                <div class="tab-container">
                    <mu-tabs :value="activeTab" @change="handleTabChange">
                        <mu-tab value="all" title="全部"/>
                        <mu-tab value="WAITPAY" title="待付款"/>
                        <mu-tab value="WAITRECEIVE" title="待收货"/>
                        <mu-tab value="FINISH" title="已完成"/>
                    </mu-tabs>
                </div>
            </div>
            <div class="tab-content">
                <div v-if="activeTab === 'all'">
                    <div v-if="data.all.length === 0" class="no-order">
                        <span>暂无订单</span>
                    </div>
                    <div class="order-list">
                        <order-card v-for="(item, index) in data.all" :key="index" :data="item"></order-card>
                    </div>
                </div>
                <div v-if="activeTab === 'WAITPAY'">
                    <div v-if="data.WAITPAY.length === 0" class="no-order">
                        <span>暂无订单</span>
                    </div>
                    <div class="order-list">
                        <order-card v-for="(item, index) in data.WAITPAY" :key="index" :data="item"></order-card>
                    </div>
                </div>
                <div v-if="activeTab === 'WAITRECEIVE'">
                    <div v-if="data.WAITRECEIVE.length === 0" class="no-order">
                        <span>暂无订单</span>
                    </div>
                    <div class="order-list">
                        <order-card v-for="(item, index) in data.WAITRECEIVE" :key="index" :data="item"></order-card>
                    </div>
                </div>
                <div v-if="activeTab === 'FINISH'">
                    <div v-if="data.FINISH.length === 0" class="no-order">
                        <span>暂无订单</span>
                    </div>
                    <div class="order-list">
                        <order-card v-for="(item, index) in data.FINISH" :key="index" :data="item"></order-card>
                    </div>
                </div>
            </div>
        </div>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import headTop from 'components/headTop/headTop'
import orderCard from 'components/orderCard/orderCard'

export default {
    name: 'myOrder',
    components: {
        'head-top': headTop,
        'order-card': orderCard,
    },
    data() {
        return {
            data: {},
            activeTab: 'all',
        }
    },
    computed: {
        ...mapState([
            'login',
        ])
    },
    created() {
        this.data = this.login.order;
        this.data.all = this.data.WAITPAY.concat(this.data.WAITRECEIVE).concat(this.data.FINISH);
    },
    methods: {
        handleTabChange (val) {
            this.activeTab = val;
        },
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.activeTab = vm.$route.query.type || 'all';
        })
    },
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';
// @import '../../../style/component';

.collapse-right {
    position: relative;
    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: .8rem;
        transform: translate(0, -50%);
        width: .5rem;
        height: .5rem;
        @include bis('../../../images/collapse_right.png');
    }
}

.mu-tabs {
    background-color: #fff;
}

.mu-tab-text {
    color: #4c4c4c;
}

.no-order {
    margin: 40% auto;
    position: relative;
    @include wh(4.6rem, 4.6rem);
    span {
        display: inline-block;
        position: absolute;
        left: .56rem;
        bottom: -1rem;
        font-size: .8rem;
        color: #bfbfbf;
    }
    &:before {
        position: absolute;
        display: block;
        content: '';
        @include wh(4rem, 4rem);
        @include bis('../../../images/order-grey.png');
    }
    &:after {
        position: absolute;
        top: .4rem;
        right: -1rem;
        display: block;
        content: '';
        @include wh(1.6rem, 1.6rem);
        @include bis('../../../images/warn-grey.png');   
    }
}

.order-page {
    .order-container {
        overflow-y: scroll;
        height: 100%;
        .tab {
            width: 100%;
            position: fixed;
            top: 1.95rem;
            background-color: #fff;
            z-index: 1000;
            .tab-container {
                width: 100%;
                position: relative;
                ul {
                    @include fmidhoz;
                    li {
                        font-size: .6rem;
                        line-height: 1.6rem;
                        display: block;
                        padding: 0 .1rem;
                        flex-grow: 1;
                        text-align: center;
                        &.active {
                            border-bottom: 2px solid $red;
                        }
                    }
                }
            }
        }
        .tab-content {
            margin-top: 2.6rem;
        }
        .order-list {
            padding-bottom: 2rem;
        }
    }
}
</style>