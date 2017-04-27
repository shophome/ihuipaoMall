<template>
    <div class="child-page page-lv2 paddingTop">
        <head-top :back="true">
            <span slot="title" class="head-name">优惠券</span>
            <span slot="save" class="head-action" @click="useCoupon">使用</span>
        </head-top>
        <div class="coupon-container">
            <div class="coupon-list">
                <div v-if="coupon.available.length === 0" class="no-coupon">
                    <span>暂无可用</span>
                </div>
                <coupon-card v-for="(item, index) in coupon.available" key="index" :data="item" :state="'available'"></coupon-card>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import headTop from 'components/headTop/headTop'
import couponCard from 'components/couponCard/couponCard'

export default {
    name: 'useCoupon',
    components: {
        'head-top': headTop,
        'coupon-card': couponCard,
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState([
            'coupon',
        ]),
    },
    created() {
    },
    methods: {
        useCoupon() {
            this.$router.go(-1);
            console.log('使用');
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';

.no-coupon {
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
        @include bis('../../../images/ticket.png');
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

</style>