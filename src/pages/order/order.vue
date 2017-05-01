<template>
    <div class="wrap paddingTop">
        <div class="address collapse-right" @click="$router.push('order/addressSelect')">
            <div class="icon icon_location"></div>
            <div class="content">
                <div class="info">
                    <span>收货人：{{ addressSelected.consignee }}</span>
                    <span>{{ addressSelected.mobile }}</span>
                </div>
                <div class="detail">
                    <span>收货地址：{{ addressSelected.p_name + addressSelected.c_name + addressSelected.address }}</span>
                </div>
            </div>
            <div class="location-border"></div>
        </div>
        <div class="goods-container">
            <ul class="goods-list">
                <li class="goods-item" v-for="(item, index) in cartList" key="index" v-if="item.selected=== 1">
                    <div class="thumbnail">
                        <img :src="item.original_img">
                    </div>
                    <div class="goods-info">
                        <p class="name">{{item.goods_name }}</p>
                        <div class="brief">
                            <span class="spec">{{ item.spec_key_name }} x {{ item.goods_num }}</span>
                            <span class="price">¥{{ (Number(item.goods_price) * Number(item.goods_num)).toFixed(2) }}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="coupon collapse-right" @click="$router.push({name:'useCoupon', params: {order_money: payables}})">
            <div>
                <span>优惠券</span>
                <span class="coupon-available">{{ coupon.available.length }}张可用</span>
            </div>
            <span class="coupon-choose">{{ couponUsed.id ? '¥' + couponUsed.money : '未使用' }}</span>
        </div>
        <div class="balance" @click="">
            <div>
                <span>余额</span>
                <span class="balance-available">¥{{ balance }}</span>
            </div>
            <mu-switch label="" v-model="useBalance"/>
        </div>
        <div class="pay">
            <div class="amount">
                <div>
                    <span>总商品金额：</span>
                    <span>¥{{ total_price.total_fee.toFixed(2) }}</span>
                </div>
                <div>
                    <span>+ 运费：</span>
                    <span>¥{{ postFee }}</span>
                </div>
                <div>
                    <span>- 折扣优惠：</span>
                    <span>¥{{ cutfee }}</span>
                </div>
                <div>
                    <span>- 优惠券：</span>
                    <span>¥{{ couponFee }}</span>
                </div>
                <div>
                    <span>- 使用余额：</span>
                    <span>¥{{ balanceUse }}</span>
                </div>
            </div>
            <div class="price">总价：¥{{ Number(payables).toFixed(2) }}</div>
            <div class="pay-btn" @click="goOrder">在线支付</div>
        </div>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getOrderData, addOrder, addBuyNow } from 'src/service/getData'

export default {
    name: 'order',
    data() {
        return {
            buyNowGoods: {},
            addressSelected: {},
            addressDefault: {},
            cartList: {},
            couponList: [],
            balance: 0,
            useBalance: false,
            total_price: {
                total_fee: 0
            },
            discount: '0.00',
            couponFee: '0.00',
            cutfee: '0.00',
            postFee: '0.00',
            buynow: 0,
            user_money: '0.00',
            balanceUse: 0,
            payables: '0.00'
        }
    },
    computed: {
        allPrice() {
            return this.total_price.total_fee;
        },
        ...mapState([
            'login',
            'coupon',
            'couponUsed',
            'addressList',
        ]),
    },
    watch: {
        addressSelected(val) {
            this.checkOrder();
        },
        useBalance(val) {
            this.checkOrder();
        },
        couponUsed(val) {
            if( Number(this.total_price.total_fee) < Number(val.condition)) {
                this.$BMessage.show('此优惠券不满足使用条件');
                this.USE_COUPON({});
            } else {
                this.checkOrder();
            }
        }
    },
    created() {
        this.PAGE_LOADING(true);
        this.SHOW_HEADTOP(true);
        this.SHOW_HEADTOP_BACK(true);
        this.SHOW_HEADTOP_SEARCH(false);
        this.SHOW_FOOTNAV(false);
        if(this.login.account) {
            this.balance = this.login.account.balance;
        } else {
            this.$router.push('/cart');
        }
        let paramsLen = 0;
        for(let i in this.$route.params) {
            paramsLen ++;
        }
        if(paramsLen > 0) {
            let obj = this.$route.params;
            addBuyNow(obj).then(res => {
                getOrderData({act: 'buy_now'}).then(res => {
                    this.getData(res.data);
                });
            });
        } else {
            getOrderData().then(res => {
                this.getData(res.data);
            });
        }
        
        setTimeout(() => {
            this.PREVENT_LOADING(true);
        },300);
        setInterval(() => {
            this.setAddressSelected();
        }, 500);
    },
    mounted() {
        setTimeout(() => {
            this.PAGE_LOADING(false);
        }, 1000);
    },
    destroyed() {
        this.PREVENT_LOADING(false);
        this.USE_COUPON({});
        this.SELECT_ADDRESS(-1);
    },
    methods: {
        ...mapMutations(['SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV','PAGE_LOADING','PREVENT_LOADING','USE_COUPON','SELECT_ADDRESS']),
        setAddressSelected() {
            let flag = false;
            for(let i in this.addressList) {
                if(this.addressList[i].selected === 1) {
                    this.addressSelected = this.addressList[i];
                    flag = true;
                }
                if(this.addressList[i].is_default === '1') {
                    this.addressDefault = this.addressList[i];
                }
            }
            if(!flag) {
                this.addressSelected = this.addressDefault;
            }
        },
        getData(data) {
            this.buynow = data.buynow;
            this.cartList = data.cartList;
            this.couponList = data.couponList;
            this.total_price = data.total_price;
            this.cutfee = Number(String(this.total_price.cut_fee).replace('-', '')).toFixed(2);
            this.payables = this.total_price.total_fee;
            if(Number(this.balance) >= Number(this.total_price.total_fee)) {
                this.user_money = Number(this.total_price.total_fee).toFixed(2);
            } else {
                this.user_money = this.balance;
            }
        },
        checkOrder() {
            let dataSend = {
                address_id: this.addressSelected.address_id,
                user_money: this.useBalance ? this.user_money : 0,
                buynow: this.buynow,
                shipping_code: 'shunfeng',
            };
            if(this.couponUsed.id) {
                dataSend.coupon_id = this.couponUsed.id;
            }
            if(this.couponCode) {
                dataSend.couponCode = this.couponCode;
            }
            addOrder(dataSend).then(res => {
                let data = res.data.result;
                this.payables = data.payables;
                this.goodsFee = data.goodsFee;
                this.postFee = data.postFee;
                this.couponFee = data.couponFee;
                this.balanceUse = data.balance;
            });
        },
        goOrder() {
            let dataSend = {
                address_id: this.addressSelected.address_id,
                act: 'submit_order',
                buynow: this.buynow,
                shipping_code: 'shunfeng',
            };
            addOrder(dataSend).then(res => {
                if(res.status === 1) {
                    window.location.href = res.url;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/component';

@mixin paddingLR {
    padding-left: .6rem;
    padding-right: .6rem;
}

.wrap {
    background-color: #f5f5f5;
}

.collapse-right:after {
    right: .6rem;
    @include wh(.6rem, .6rem);
}

.address {
    padding-top: .6rem;
    padding-bottom: .6rem;
    padding-left: 1.6rem;
    padding-right: 1.6rem;
    background-color: #fff;
    span {
        color: #3a3a3a;
    }
    .icon_location {
        position: absolute;
        top: 50%;
        left: .4rem;
    }
    .content {
        .info {
            @include fbethoz;
        }
        .detail {
            margin-top: .4rem;
            font-size: .5rem;

        }
    }
    .location-border {
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background: url('../../images/location-border.png') repeat-x;
        background: auto 100%;
        background-size: 60px 2px;
    }
    
}

.goods-container {
    background-color: #fff;
    .goods-list {
        @include paddingLR;
        .goods-item {
            padding-top: .4rem;
            padding-bottom: .4rem;
            border-top: 1px solid #eee;
            @include fbethoz;
            .thumbnail {
                width: 20%;
                img {
                    width: 100%;
                }
            }
            .goods-info {
                width: 80%;
                padding: .5rem 0 .5rem .5rem;
                @include fbethoz;
                .name {
                    font-size: .6rem;
                    line-height: 1rem;
                    max-height: 2rem;
                    overflow: hidden;
                }
                .brief {
                    width: 100%;
                    @include fbethoz;
                    .spec {
                        font-size: .5rem;
                        line-height: 1rem;
                        color: #999;
                    }
                    .store {
                        font-size: .5rem;
                        color: #999;
                    }
                    .price {
                        color: $red;
                        font-size: .7rem;
                    }
                }
            }
        }
    }
}

.coupon, .balance {
    margin-top: .4rem;
    height: 2.4rem;
    line-height: 2.4rem;
    font-size: .6rem;
    font-weight: 600;
    background-color: #fff;
    @include paddingLR;
    @include fbethoz;
    span {
        vertical-align: middle;
    }
}

.balance-available {
    margin-left: .4rem;
    font-weight: 400;
    color: $red;
}

.coupon-available {
    padding: .2rem .3rem;
    background-color: $red;
    margin-left: .4rem;
    font-size: .5rem;
    height: 1rem;
    line-height: 1rem;
    color: #fff;
}
.coupon-choose {
    margin-right: 1rem;
}

.pay {
    @include paddingLR;
    padding-bottom: 1rem;
    margin-top: .4rem;
    background-color: #fff;
    text-align: center;
    .amount {
        padding: .4rem 0;
        div {
            line-height: 1.2rem;
            @include fbethoz;
            span {
                font-size: .56rem;
                color: #656565;
            }
        }
    }
    .price {
        line-height: 1.6rem;
        font-size: .8rem;
        color: $red;
    }
    .pay-btn {
        display: inline-block;
        width: 90%;
        margin-top: .6rem;
        height: 2rem;
        line-height: 2rem;
        background-color: $red;
        color: #fff;
    }
}
</style>