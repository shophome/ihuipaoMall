<template>
    <div class="child-page page-lv2 paddingTop useCoupon-page">
        <head-top :back="true">
            <span slot="title" class="head-name">优惠券</span>
            <span slot="save" class="head-action" @click="useCoupon">使用</span>
        </head-top>
        <div class="coupon-container">
            <div class="coupon-list">
                <div v-if="coupon.available.length === 0" class="no-coupon">
                    <span>暂无可用</span>
                </div>
                <div class="coupon-item" v-for="(item, index) in coupon.available" key="index" :class="{ selected : index === idxSelected ,shadow : index === idxSelected }" @click="select(index)">
                    <transition name="fade">
                        <div v-if="index === idxSelected" class="triangle-topright">
                            <div class="icon icon_select"></div>
                        </div>
                    </transition>
                    <coupon-card :data="item" :state="'available'"></coupon-card>
                </div>
            </div>
        </div>
        <mu-dialog :open="dialog" title="" @close="closeDialog">
            <mu-text-field label="请输入兑换码" labelFloat v-model="code" :class="'useCouponCode-text'"/>
            <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="useCode" label="确定"/>
        </mu-dialog>
        <div class="useCodeBtn" @click="openDialog">使用兑换码</div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { useCouponCode } from 'src/service/getData'
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
            idxSelected: -1,
            dialog: false,
            code: ''
        }
    },
    computed: {
        ...mapState([
            'coupon',
            'couponUsed'
        ]),
    },
    created() {
        if(this.couponUsed.id) {
            for(let i in this.coupon.available) {
                if(this.coupon.available[i].id === this.couponUsed.id) {
                    this.idxSelected = Number(i);
                }
            }
        }
    },
    methods: {
        ...mapMutations(['USE_COUPON']),
        select(index) {
            if(index === this.idxSelected) {
                this.idxSelected = -1;
            } else {
                this.idxSelected = index;
            }
        },
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
        useCode() {
            let dataSend = {
                coupon_code:  this.code,
                order_momey: this.$route.params.order_money
            };
            useCouponCode(dataSend).then(res => {
                this.$BMessage.show(res.message);
                if(res.data.result !== '') {
                    this.USE_COUPON(res.data.result);
                    this.dialog = false;
                    this.$router.go(-1);
                }
            });
        },
        useCoupon() {
            this.USE_COUPON(this.coupon.available[this.idxSelected]);
            this.$router.go(-1);
        }
    },
}
</script>

<style lang="scss">
@import '../../../style/mixin';
.coupon-item {
    &.selected {
        .sum {
            span {
                color: $red !important;
                transition: all ease .8s;
            }
        }
    }
}

.useCouponCode-text {
    width: 100% !important;
}

</style>

<style lang="scss" scoped>
@import '../../../style/mixin';

.icon {
    display: inline-block;
    @include wh(.8rem, .8rem);
}

.icon_select {
    @include wh(.6rem, .6rem);
    position: absolute;
    top: -1.5rem;
    right: .14rem;
    @include bis('../../../images/select.png');
}

.triangle-topright {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: 1.8rem solid $red;
    border-left: 1.8rem solid transparent; 
    z-index: 2;
}

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

.coupon-container {
    padding: 0 .6rem 3rem .6rem;
}

.coupon-item {
    position: relative;
    transition: all ease .3s;
    margin-top: 1rem;
}

.useCodeBtn {
    position: fixed;
    bottom: 0;
    left: 0;
    @include wh(100%, 2rem);
    line-height: 2rem;
    text-align: center;
    color: #fff;
    background-color: $yellow;
}

</style>