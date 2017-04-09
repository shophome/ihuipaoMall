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
                        <mu-tab value="paying" title="待付款"/>
                        <mu-tab value="delivering" title="待收货"/>
                        <mu-tab value="finished" title="已完成"/>
                    </mu-tabs>
                </div>
            </div>
            <div class="tab-content">
                <transition name="fade">
                    <div v-if="activeTab === 'all'">
                        <ul class="order-list">
                            <router-link to="/profile/order/orderDetail" tag="li" class="order-item collapse-right">
                                <div class="time">
                                    <span>下单时间：</span>
                                    <span>2017-04-01 09:25:47</span>
                                </div>
                                <div class="info">
                                    <div class="thumbnail">
                                        <img src="http://stor.ihuipao.cn/jpg/2017/2/31/ec36a0153c649f7b.jpg?imageView2/1/w/200/h/200">
                                    </div>
                                    <div class="desc">
                                        <p class="name ellipsis">2017无锡马拉松PB衫-PB选手购买</p>
                                        <p class="summary ellipsis">订单摘要：尺码：M；</p>
                                    </div>
                                </div>
                                <div class="price">
                                    <span>订单总价：</span>
                                    <span>￥1.00</span>
                                </div>
                            </router-link>
                            <li class="order-item collapse-right">
                                <div class="time">
                                    <span>下单时间：</span>
                                    <span>2017-04-01 09:25:47</span>
                                </div>
                                <div class="info">
                                    <div class="thumbnail">
                                        <img src="http://stor.ihuipao.cn/jpg/2016/10/18/f85ff4a2adf0a06d.jpg?imageView2/1/w/200/h/200">
                                    </div>
                                    <div class="desc">
                                        <p class="name">2017无锡马拉松PB衫-PB选手购买</p>
                                        <p class="summary">订单摘要：尺码：M；</p>
                                    </div>
                                </div>
                                <div class="price">
                                    <span>订单总价：</span>
                                    <span>￥1.00</span>
                                </div>
                            </li>
                            <li class="order-item collapse-right">
                                <div class="time">
                                    <span>下单时间：</span>
                                    <span>2017-04-01 09:25:47</span>
                                </div>
                                <div class="info">
                                    <div class="thumbnail">
                                        <img src="http://stor.ihuipao.cn/jpg/2016/10/18/f85ff4a2adf0a06d.jpg?imageView2/1/w/200/h/200">
                                    </div>
                                    <div class="desc">
                                        <p class="name">2017无锡马拉松PB衫-PB选手购买</p>
                                        <p class="summary">订单摘要：尺码：M；</p>
                                    </div>
                                </div>
                                <div class="price">
                                    <span>订单总价：</span>
                                    <span>￥1.00</span>
                                </div>
                            </li>
                            <li class="order-item collapse-right">
                                <div class="time">
                                    <span>下单时间：</span>
                                    <span>2017-04-01 09:25:47</span>
                                </div>
                                <div class="info">
                                    <div class="thumbnail">
                                        <img src="http://stor.ihuipao.cn/jpg/2016/10/18/f85ff4a2adf0a06d.jpg?imageView2/1/w/200/h/200">
                                    </div>
                                    <div class="desc">
                                        <p class="name">2017无锡马拉松PB衫-PB选手购买</p>
                                        <p class="summary">订单摘要：尺码：M；</p>
                                    </div>
                                </div>
                                <div class="price">
                                    <span>订单总价：</span>
                                    <span>￥1.00</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </transition>
                <transition name="fade">
                    <div v-if="activeTab === 'paying'">
                        <ul class="order-list">
                            <router-link to="/profile/order/orderDetail" tag="li" class="order-item collapse-right">
                                <div class="time">
                                    <span>下单时间：</span>
                                    <span>2017-04-01 09:25:47</span>
                                </div>
                                <div class="info">
                                    <div class="thumbnail">
                                        <img src="http://stor.ihuipao.cn/jpg/2017/2/31/ec36a0153c649f7b.jpg?imageView2/1/w/200/h/200">
                                    </div>
                                    <div class="desc">
                                        <p class="name ellipsis">2017无锡马拉松PB衫-PB选手购买</p>
                                        <p class="summary ellipsis">订单摘要：尺码：M；</p>
                                    </div>
                                </div>
                                <div class="price">
                                    <span>订单总价：</span>
                                    <span>￥1.00</span>
                                </div>
                            </router-link>
                        </ul>
                    </div>
                </transition>
                <transition name="fade">
                    <div v-if="activeTab === 'delivering'">
                        <ul class="order-list">
                            <router-link to="/profile/order/orderDetail" tag="li" class="order-item collapse-right">
                                <div class="time">
                                    <span>下单时间：</span>
                                    <span>2017-04-01 09:25:47</span>
                                </div>
                                <div class="info">
                                    <div class="thumbnail">
                                        <img src="http://stor.ihuipao.cn/jpg/2017/2/31/ec36a0153c649f7b.jpg?imageView2/1/w/200/h/200">
                                    </div>
                                    <div class="desc">
                                        <p class="name ellipsis">2017无锡马拉松PB衫-PB选手购买</p>
                                        <p class="summary ellipsis">订单摘要：尺码：M；</p>
                                    </div>
                                </div>
                                <div class="price">
                                    <span>订单总价：</span>
                                    <span>￥1.00</span>
                                </div>
                            </router-link>
                            <li class="order-item collapse-right">
                                <div class="time">
                                    <span>下单时间：</span>
                                    <span>2017-04-01 09:25:47</span>
                                </div>
                                <div class="info">
                                    <div class="thumbnail">
                                        <img src="http://stor.ihuipao.cn/jpg/2016/10/18/f85ff4a2adf0a06d.jpg?imageView2/1/w/200/h/200">
                                    </div>
                                    <div class="desc">
                                        <p class="name">2017无锡马拉松PB衫-PB选手购买</p>
                                        <p class="summary">订单摘要：尺码：M；</p>
                                    </div>
                                </div>
                                <div class="price">
                                    <span>订单总价：</span>
                                    <span>￥1.00</span>
                                </div>
                            </li>
                            <li class="order-item collapse-right">
                                <div class="time">
                                    <span>下单时间：</span>
                                    <span>2017-04-01 09:25:47</span>
                                </div>
                                <div class="info">
                                    <div class="thumbnail">
                                        <img src="http://stor.ihuipao.cn/jpg/2016/10/18/f85ff4a2adf0a06d.jpg?imageView2/1/w/200/h/200">
                                    </div>
                                    <div class="desc">
                                        <p class="name">2017无锡马拉松PB衫-PB选手购买</p>
                                        <p class="summary">订单摘要：尺码：M；</p>
                                    </div>
                                </div>
                                <div class="price">
                                    <span>订单总价：</span>
                                    <span>￥1.00</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </transition>
                <transition name="fade">
                    <div v-if="activeTab === 'finished'">
                        <ul class="order-list">
                            <router-link to="/profile/order/orderDetail" tag="li" class="order-item collapse-right">
                                <div class="time">
                                    <span>下单时间：</span>
                                    <span>2017-04-01 09:25:47</span>
                                </div>
                                <div class="info">
                                    <div class="thumbnail">
                                        <img src="http://stor.ihuipao.cn/jpg/2017/2/31/ec36a0153c649f7b.jpg?imageView2/1/w/200/h/200">
                                    </div>
                                    <div class="desc">
                                        <p class="name ellipsis">2017无锡马拉松PB衫-PB选手购买</p>
                                        <p class="summary ellipsis">订单摘要：尺码：M；</p>
                                    </div>
                                </div>
                                <div class="price">
                                    <span>订单总价：</span>
                                    <span>￥1.00</span>
                                </div>
                            </router-link>
                            <li class="order-item collapse-right">
                                <div class="time">
                                    <span>下单时间：</span>
                                    <span>2017-04-01 09:25:47</span>
                                </div>
                                <div class="info">
                                    <div class="thumbnail">
                                        <img src="http://stor.ihuipao.cn/jpg/2016/10/18/f85ff4a2adf0a06d.jpg?imageView2/1/w/200/h/200">
                                    </div>
                                    <div class="desc">
                                        <p class="name">2017无锡马拉松PB衫-PB选手购买</p>
                                        <p class="summary">订单摘要：尺码：M；</p>
                                    </div>
                                </div>
                                <div class="price">
                                    <span>订单总价：</span>
                                    <span>￥1.00</span>
                                </div>
                            </li>
                            <li class="order-item collapse-right">
                                <div class="time">
                                    <span>下单时间：</span>
                                    <span>2017-04-01 09:25:47</span>
                                </div>
                                <div class="info">
                                    <div class="thumbnail">
                                        <img src="http://stor.ihuipao.cn/jpg/2016/10/18/f85ff4a2adf0a06d.jpg?imageView2/1/w/200/h/200">
                                    </div>
                                    <div class="desc">
                                        <p class="name">2017无锡马拉松PB衫-PB选手购买</p>
                                        <p class="summary">订单摘要：尺码：M；</p>
                                    </div>
                                </div>
                                <div class="price">
                                    <span>订单总价：</span>
                                    <span>￥1.00</span>
                                </div>
                            </li>
                            <li class="order-item collapse-right">
                                <div class="time">
                                    <span>下单时间：</span>
                                    <span>2017-04-01 09:25:47</span>
                                </div>
                                <div class="info">
                                    <div class="thumbnail">
                                        <img src="http://stor.ihuipao.cn/jpg/2016/10/18/f85ff4a2adf0a06d.jpg?imageView2/1/w/200/h/200">
                                    </div>
                                    <div class="desc">
                                        <p class="name">2017无锡马拉松PB衫-PB选手购买</p>
                                        <p class="summary">订单摘要：尺码：M；</p>
                                    </div>
                                </div>
                                <div class="price">
                                    <span>订单总价：</span>
                                    <span>￥1.00</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </transition>
            </div>
        </div>
         <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import headTop from 'components/headTop/headTop'

export default {
    name: 'order',
    components: {
        'head-top': headTop,
    },
    data() {
        return {
            activeTab: 'all',
        }
    },
    created() {
    },
    methods: {
        handleTabChange (val) {
            this.activeTab = val;
        },
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.activeTab = vm.$route.query.type || 'all';
            console.log(vm.type);
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
            .order-item {
                // border-top: 1px solid #e4e4e4;
                // border-bottom: 1px solid #e4e4e4;
                box-shadow: 0 3px 6px rgba(0,0,0,.056863), 0 3px 6px rgba(0,0,0,.027451);
                margin-top: .4rem;
                background-color: #fff;
                .time {
                    padding: .1rem .4rem;
                    font-size: .5rem;
                }
                .info {
                    @include flefthoz;
                    padding: .3rem .4rem;
                    background-color: #f6f6f6;
                    .thumbnail {
                        @include wh(3rem, 3rem);
                        img {
                            width: 100%;
                        }
                    }
                    .desc {
                        max-width: 76%;
                        margin-left: .6rem;
                        .name {
                            width: 100%;
                            font-size: .6rem;
                        }
                        .summary {
                            width: 100%;
                            line-height: 1.2rem;
                            font-size: .5rem;
                        }
                    }
                }
                .price {
                    padding: 0 .4rem;
                    span {
                        font-size: .5rem;
                        &:nth-child(2) {
                            color: $red;
                            font-size: .7rem;
                        }
                    }
                }
                
            }
        }
    }
}
</style>