<template>
    <div class="order-detail-page child-page paddingTop">
        <head-top :back="true"></head-top>
        <div class="info order-info">
            <div class="title">订单信息</div>
            <ul class="info-list">
                <li>
                    <span>
                        订单编号
                    </span>
                    <span>
                        20170401232629
                    </span>
                </li>
                <li>
                    <span>
                        订单状态
                    </span>
                    <span>
                        已取消
                    </span>
                </li>
                <li>
                    <span>
                        订单金额
                    </span>
                    <span>
                        ￥1.00
                    </span>
                </li>
                <li>
                    <span>
                        下单时间
                    </span>
                    <span>
                        2017-04-01 09:25:47
                    </span>
                </li>
                <li>
                    <span>
                        订单编号
                    </span>
                    <span>
                        20170401232629
                    </span>
                </li>
                <li>
                    <span>
                        运费
                    </span>
                    <span>
                        ￥0.00
                    </span>
                </li>
                <li>
                    <span>
                        收货人姓名
                    </span>
                    <span>
                        陈峰测试
                    </span>
                </li>
                <li>
                    <span>
                        收货电话
                    </span>
                    <span>
                        18352524977
                    </span>
                </li>
                <li>
                    <span>
                        收货地址
                    </span>
                    <span>
                        江苏省,无锡市,汇跑赛事测试，勿发货
                    </span>
                </li>
            </ul>
        </div>
        <div class="info pro-info">
            <div class="title">商品信息</div>
            <ul class="info-list">
                <li>
                    <span>
                        商品名称
                    </span>
                    <span>
                        <a href="/equip/detail/id/996" target="_blank">
                            2017无锡马拉松PB衫-PB选手购买
                        </a>
                    </span>
                </li>
                <li>
                    <span>
                        商品描述
                    </span>
                    <span>
                        尺码：M；
                    </span>
                </li>
                <li>
                    <span>
                        商品数量
                    </span>
                    <span>
                        1
                    </span>
                </li>
                <li>
                    <span>
                        商品单价
                    </span>
                    <span>
                        ￥99.00
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
    
<script>
import { mapMutations } from 'vuex'
import headTop from 'components/headTop/headTop'

export default {
    name: 'orderDetail',
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
            this.activeTab = val
        },
    },
    // beforeRouteEnter (to, from, next) {
    //     next(vm => {
    //         vm.activeTab = vm.$route.query.type || 'all';
    //         console.log(vm.type);
    //     })
    // },
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';

.order-detail-page {
    z-index: 1080;
}

.order-info {
    margin-bottom: .6rem;
}

.info {
    background-color: #fff;
    .title {
        text-align: center;
        font-size: .7rem;
        height: 2rem;
        line-height: 2rem;
    }
    .info-list {
        li {
            position: relative;
            padding-left: .6rem;
            height: 1.8rem;
            line-height: 1.8rem;
            &:before {
                position: absolute;
                content: '';
                display: block;
                width: 96%;
                height: 1px;
                top: 0;
                right: 0;
                background-color: #e6e6e6;
            }
        }
    }
}

</style>