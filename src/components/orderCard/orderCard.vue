<template>
    <div class="order-item collapse-right">
        <div class="time">
            <span>下单时间：</span>
            <span>{{ data.time }}</span>
        </div>
        <router-link :to="'/profile/myOrder/orderDetail?id='+data.order_id" tag="div" class="info" v-for="(goods, index) in data.goods_list" key="index">
            <div class="thumbnail">
                <img :src="goods.img + '?imageView2/1/w/120/h/120/q/100'">
            </div>
            <div class="desc">
                <p class="name ellipsis">{{ goods.name }}</p>
                <p v-if="goods.summary" class="summary ellipsis">订单摘要：{{ goods.summary }}</p>
            </div>
        </router-link>
        <div class="price">
            <span>订单总价：</span>
            <span>￥{{ data.price }}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'orderCard',
    components: {
    },
    data() {
        return {
        }
    },
    props: ['data'],
}
</script>

<style lang="scss" scoped>
@import '../../style/component';

.collapse-right {
    &:after {
        right: .8rem;
    }
}

.order-item {
    padding-left: .6rem;
    padding-right: .6rem;
    // border-top: 1px solid #e4e4e4;
    // border-bottom: 1px solid #e4e4e4;
    box-shadow: 0 1px 3px rgba(0,0,0,.056863), 0 1px 3px rgba(0,0,0,.027451);
    margin-top: .4rem;
    background-color: #fff;
    .time {
        padding: .4rem 0;
        font-size: .5rem;
        color: #6f6f6f;
        border-bottom: 1px solid #eee;
        margin-bottom: .4rem;
    }
    .info {
        @include flefthoz;
        padding: .3rem 0;
        // background-color: #f6f6f6;
        .thumbnail {
            @include wh(2.6rem, 2.6rem);
            img {
                width: 100%;
            }
        }
        .desc {
            max-width: 70%;
            margin-left: .6rem;
            .name {
                width: 100%;
                font-size: .6rem;
            }
            .summary {
                width: 100%;
                line-height: 1.6rem;
                font-size: .5rem;
                color: #989898;
            }
        }
    }
    .price {
        padding: .4rem 0;
        border-top: 1px solid #eee;
        margin-top: .4rem;
        span {
            font-size: .5rem;
            &:nth-child(2) {
                color: $red;
                font-size: .7rem;
            }
        }
    }
    
}

</style>