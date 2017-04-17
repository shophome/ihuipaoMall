<template>
    <div class="wrap paddingTop paddingBottom">
        <div class="cart">
            <div class="tip-nodata" v-show="itemNum === 0">您的购物车空空如也，赶紧去逛逛吧～</div>
            <ul class="cart-list">
                <li v-for="(item, index) in cartList" :key="index" class="cart-item">
                    <div class="choose-box" @click="checkItem(item.id)">
                        <div class="icon icon_choosed" :class="{ icon_choose : !itemChecked[item.id].checked }"></div>
                    </div>
                    <div class="pro-img">
                        <img :src="item.img">
                    </div>
                    <div class="pro-info">
                        <p class="name" @click="$router.push('/product?id='+ item.goods_id +'')">{{ item.goods_name }}</p>
                        <p class="spec">{{ item.spec }}</p>
                        <div class="price">
                            <span>售价：</span>
                            <span>{{ item.price }}元</span>
                            <span>合计：</span>
                            <span>{{ (item.price * item.num).toFixed(2) }}元</span>
                        </div>
                        <div class="input-num">
                            <div class="sub" @click="subCart(item.id)">-</div>
                            <div class="input">{{ item.num }}</div>
                            <div class="add" @click="addCart(item.id)">+</div>
                        </div>
                        <div class="delete" @click="callReduce(item)"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bottom-submit">
            <div class="price">
                <div class="up">
                    <span>共{{ selectedNum }}件</span>
                    <span>金额：</span>
                </div>
                <div class="down">{{ sumPrice }}<span>元</span></div>
            </div>
            <div class="btn btn-grey" @click="$router.push('/')">继续购物</div>
            <div class="btn btn-alert">去结算</div>
        </div>
        <mu-dialog :open="dialog" title="" @close="closeDialog">
            确认要从购物车移除该商品吗？
            <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="reduceCart" label="确定"/>
        </mu-dialog>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import { Clone } from '../../config/mUtils'
import BScroll from 'better-scroll'

export default {
    name: 'cart',
    data() {
        return {
            itemNum: 0,
            dialog: false,
            deleteId: '',
            itemChecked: {},
        }
    },
    computed: {
        selectedNum() {
            var result = 0;
            for(var i in this.itemChecked) {
                if(this.itemChecked[i].checked) {
                    result ++ ;
                }
            }
            return result;
        },
        sumPrice() {
            var result = 0;
            for(var i in this.itemChecked) {
                if(this.itemChecked[i].checked) {
                    result += this.itemChecked[i].price * this.cartList[i].num;
                }
            }
            return result.toFixed(2);
        },
        ...mapState([
           'cartList',
        ])
    },
    created() {
        this.SHOW_HEADTOP(true);
        this.SHOW_HEADTOP_BACK(true);
        this.SHOW_HEADTOP_SEARCH(false);
        this.SHOW_FOOTNAV(false);
        this.itemChecked = Clone(this.cartList);
        for(var i in this.cartList) {
            this.$set(this.itemChecked[i], 'checked', true);
            this.itemNum ++ ;
        }
    },
    mounted() {
    },
    methods: {
        ...mapMutations(['LOADING','SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV','REDUCE_CART','INIT_CART']),
        checkItem(id) {
            this.$set(this.itemChecked[id], 'checked', !this.itemChecked[id].checked);
        },
        callReduce(value) {
            this.deleteId = value.id;
            this.openDialog();
        },
        reduceCart() {
            const _self = this;
            _self.LOADING(true);
            setTimeout(function() {
                _self.REDUCE_CART(_self.deleteId);
                _self.INIT_CART();
                _self.$delete(_self.itemChecked, _self.deleteId);
                _self.LOADING(false);
                _self.deleteId = '';
                _self.itemNum --;
                _self.closeDialog();
            }, 1000);
        },
        addCart(id) {
            if(this.cartList[id].num < this.cartList[id].store_count) {
                this.cartList[id].num ++ ;
            }
        },
        subCart(id) {
            if(this.cartList[id].num > 1) {
                this.cartList[id].num -- ;
            }
        },
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
        
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/icon';

.wrap {
    background-color: #f5f5f5;
}

.cart {
    background-color: #fff;
    .tip-nodata {
        position: absolute;
        width: 100%;
        top: 40%;
        text-align: center;
        font-size: .8rem;
        color: #9a9a9a;
    }
    .cart-list {
        .cart-item {
            padding: .3rem .6rem .3rem 0;
            border-bottom: 1px solid #eee;
            @include fmidhoz;
            .choose-box {
                width: 16%;
                height: 6rem;
                @include fmidver;
                justify-content: space-around;
                .icon {
                    @include wh(.8rem, .8rem);
                }
            }
            .pro-img {
                position: relative;
                height: 6rem;
                width: 24%;
                img {
                    position: absolute;
                    width: 90%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
            .pro-info {
                padding-left: .5rem;
                width: 60%;
                // height: 6rem;
                @include flefthoz;
                .name {
                    font-size: .6rem;
                    line-height: 1rem;
                    height: 2rem;
                    overflow: hidden;
                }
                .spec {
                    font-size: .5rem;
                    line-height: 1rem;
                    color: $red;
                }
                .price {
                    width: 100%;
                    font-size: .5rem;
                    line-height: 1.2rem;
                    span {
                        color: #999;
                        &:nth-child(3) {
                            margin-left: .3rem;
                        }
                    }
                }
                .input-num {
                    @include fmidhoz;
                    border: 1px solid #eee;
                    color: #333;
                    .sub, .add {
                        font-size: 1.2rem;
                        font-weight: 300;
                        color: #999;
                        background-color: #eee;
                    }
                    .sub {
                        background-color: #f5f5f5;
                    }
                    .sub, .input, .add,  {
                        @include wh(1.4rem, 1.4rem);
                        text-align: center;
                        line-height: 1.4rem;
                    }
                    .input {
                        background-color: #fff;
                    }
                }
                .delete {
                    margin-left: 3rem;
                    @include wh(.8rem, .8rem);
                    @include bis('../../images/delete.png');
                }
            }
        }
    }
}

.bottom-submit {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    background-color: #fff;
    border-top: 1px solid #eee;
    .price {
        width: 5rem;
        @include fmidver;
        text-align: center;
        .up {
            width: 100%;
            line-height: 1.2rem;
            span {
                color: #999;
                font-weight: 500;
            }
        }
        .down {
            width: 100%;
            font-size: .9rem;
            font-weight: 600;
            color: $red;
            line-height: .8rem;
            span {
                font-size: .5rem;
                color: #999;
            }
        }
    }
    .btn {
        text-align: center;
        line-height: 2.25rem;
        font-size: .7rem;
        font-weight: 500;
        color: #fff;
        flex-grow: 1;
    }
    .btn-grey {
        color: #333;
        background-color: #eee;
    }
    .btn-alert {
        background-color: $red;
    }
}
</style>