<template>
    <div class="order-detail-page child-page page-lv2 paddingTop">
        <head-top :back="true">
            <span slot='title' class="head-title">订单详情</span>
        </head-top>
        <div class="info order-info">
            <ul class="info-list">
                <li>
                    <div>
                        <span>订单编号</span>
                        <span>{{ data.order_info.order_sn }}</span>
                    </div>
                </li>
                <li>
                    <div>
                        <span>订单状态</span>
                        <span>{{ data.order_info.order_status_desc }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="order-address">
            <div class="location-border border-top"></div>
            <div class="content">
                <div class="address-info">
                    <div>
                        <span class="icon icon-tiny icon-profile"></span>
                        <span>{{ data.order_info.consignee }}</span>
                    </div>
                    <div>
                        <span class="icon icon-tiny icon-mobile"></span>
                        <span>{{ data.order_info.mobile }}</span>
                    </div>
                </div>
                <div class="detail">
                    <span>{{ data.order_info.address }}</span>
                </div>
            </div>
            <div class="location-border border-bottom"></div>
        </div>
        <div class="info pro-info">
            <div class="title">商品信息</div>
            <ul class="pro-list">
                <li class="pro-item" v-for="(item, index) in data.order_info.goods_list" key="index">
                    <div class="pro-img">
                        <img src="http://stor.ihuipao.cn/jpg/2017/0/13/6b017c6bd56ad1c6.jpg?imageView2/1/w/230/h/230/q/100">
                    </div>
                    <div class="pro-desc" @click="$router.push('/goods?id='+ item.goods_id)">
                        <p>{{ item.goods_name }}</p>
                        <p>{{ item.spec_key_name }} x {{ item.goods_num }}</p>
                    </div>
                    <div class="pro-price">¥{{ item.goods_price }}</div>
                </li>
            </ul>
        </div>
        <div class="info pay-info">
            <ul class="info-list">
                <li>
                    <div>
                        <span>支付方式</span>
                        <span>在线支付</span>
                    </div>
                </li>
                <li>
                    <div>
                        <span>配送信息</span>
                        <span>{{ data.order_info.shipping_name }}</span>
                    </div>
                    <div>
                        <span>配送日期：{{ data.order_info.shipping_time }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="info price-info">
            <ul class="info-list">
                <li>
                    <div>
                        <span>商品总额</span>
                        <span class="price">¥{{ data.order_info.goods_price }}</span>
                    </div>
                    <div>
                        <span>+运费</span>
                        <span class="price">¥{{ data.order_info.shipping_price }}</span>
                    </div>
                </li>
                <li class="actual-payment">
                    <div>
                        <span>实付款：</span>
                        <span class="price">¥{{ data.order_info.total_amount }}</span>
                    </div>
                    <div class="order-time">
                        <span>下单时间:{{ data.order_info.add_time }}</span>
                    </div>
                </li>
            </ul>
            <div class="goPay" v-if="data.order_info.order_status === '0'">去支付</div>
        </div>
    </div>
</template>
    
<script>
import { mapMutations } from 'vuex'
import { getOrderDetail } from 'src/service/getData'
import headTop from 'components/headTop/headTop'

export default {
    name: 'orderDetail',
    components: {
        'head-top': headTop,
    },
    data() {
        return {
            id: '',
            data: {
                order_info: {}
            },
            activeTab: 'all',
        }
    },
    created() {
    },
    methods: {
        handleTabChange (val) {
            this.activeTab = val
        },
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.id = vm.$route.query.id;
            getOrderDetail(vm.id).then(res => {
                vm.data = res.data;
            });
        })
    },
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';

.icon {
    display: inline-block;
    vertical-align: middle;
}

.icon-tiny {
    @include wh(.5rem, .5rem);
}

.icon-profile {
    @include wh(.6rem, .6rem);
    @include bis('../../../../images/profile-tiny.svg');
}

.icon-mobile {
    @include bis('../../../../images/mobile-tiny.svg');
    margin-bottom: .06rem;
}

.order-address {
    position: relative;
    padding-top: .6rem;
    padding-bottom: .6rem;
    padding-left: .8rem;
    padding-right: .8rem;
    background-color: #fffced !important;
    margin-bottom: .6rem;
    span {
        color: #3a3a3a;
    }
    .icon_location {
        position: absolute;
        top: 50%;
        left: .4rem;
    }
    .content {
        .address-info {
            @include fbethoz;
            span {
                vertical-align: middle;
            }
        }
        .detail {
            margin-top: .2rem;
            font-size: .58rem;
            span {
                color: #737373;
            }
        }
    }
    .location-border {
        position: absolute;
        left: 0;
        bottom: 0px;
        width: 100%;
        height: 4px;
        background: url('../../../../images/location-border.png') repeat-x;
        background: auto 100%;
        background-size: 60px 4px;
        opacity: .6;
        &.border-top {
            top: 0px;
        }
    }
}

.info {
    padding: 0 .8rem;
    margin-bottom: .6rem;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.056863), 0 1px 3px rgba(0, 0, 0, 0.027451);
    .title {
        text-align: center;
        font-size: .7rem;
        height: 2rem;
        line-height: 2rem;
    }
    .info-list {
        li {
            position: relative;
            min-height: 1.8rem;
            line-height: 1.3rem;
            padding: .4rem 0;
            border-top: 1px solid #e6e2f3;
            &:nth-child(1) {
                border: none;
            }
            div {
                @include fbethoz;
                .price {
                    color: $red;
                }
                span {
                    &:nth-child(1) {
                        color: #7d7d7d;
                    }
                }
            }
            &.actual-payment {
                div {
                    justify-content: flex-end;
                    span {
                        display: inline-block;
                    }
                    .price {
                        font-size: .8rem;
                    }
                    &.order-time {
                        font-size: .5rem;
                        span {
                            color: #949494; 
                        }
                    }
                }
            }
        }
    }
}

.order-info {
    margin-bottom: .6rem;
    margin-top: .6rem;
}

.pro-info {
    .title {
        font-size: .6rem;
        text-align: left;
        color: #7d7d7d;
    }
    .pro-list {
        .pro-item {
            padding: .8rem 0;
            border-top: 1px solid #e6e2f3;
            @include flefthoz;
            .pro-img {
                flex: 1.4;
                border-radius: 4px;
                @include wh(2.4rem, 2.4rem);
                img {
                    width: 100%;
                }
            }
            .pro-desc {
                flex: 5;
                height: 2.6rem;
                font-size: .55rem;
                padding-left: .4rem;
                padding-right: .4rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                p {
                    max-height: 1.7rem;
                    overflow: hidden;
                }
                p:nth-child(2) {
                    color: #989898;
                }
            }
            .pro-price {
                flex: 1;

            }
        }
    }
}

.price-info {
    padding-bottom: 1rem;
}

.goPay {
    width: 100%;
    line-height: 2.2rem;
    text-align: center;
    font-size: .7rem;
    color: #fff;
    background-color: $red;
}



</style>