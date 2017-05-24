<template>
    <div class="wrap paddingTop paddingBottom">
        <div v-if="!login" class="go-login collapse-right" @click="goLogin">
            <span>登录后享受更多优惠</span>
            <span class="login">去登录</span>
        </div>
        <div class="cart">
            <div class="tip-nodata" v-show="itemNum === 0">您的购物车空空如也，赶紧去逛逛吧～</div>
            <ul class="cart-list">
                <li v-for="(item, index) in itemChecked" :key="index" class="cart-item">
                    <div class="choose-box" @click="checkItem(index)">
                        <div class="icon icon_choose" :class="{ icon_choosed : (item.selected === 1) }"></div>
                    </div>
                    <div class="pro-img">
                        <img :src="item.original_img + '?imageView2/1/w/120/h/120/q/100'">
                    </div>
                    <div class="pro-info">
                        <p class="name" @click="$router.push('/goods?id='+ item.goods_id +'')">{{ item.goods_name }}</p>
                        <div class="brief">
                            <p class="spec">{{ item.spec_key_name }}</p>
                            <p class="store">库存：{{ item.store_count }}</p>
                        </div>
                        <div class="price">
                            <span>售价：</span>
                            <span>{{ item.goods_price }}元</span>
                            <span>合计：</span>
                            <span>{{ (item.goods_price * Number(item.goods_num)).toFixed(2) }}元</span>
                        </div>
                        <div class="input-num">
                            <div class="sub" :class="{ disabled : item.goods_num === 1 }" @click="subCart($event, index)">-</div>
                            <div class="input">{{ item.goods_num }}</div>
                            <div class="add" :class="{ disabled : item.goods_num === Number(item.store_count) }" @click="addCart($event, index)">+</div>
                        </div>
                        <div class="delete" @click="callReduce(index)"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bottom-submit">
            <div class="price">
                <div class="up">
                    <span>共{{ itemNum }}件</span>
                    <span>金额：</span>
                </div>
                <div class="down">{{ sumPrice }}<span>元</span></div>
            </div>
            <div class="btn btn-grey" @click="$router.push('/')">继续购物</div>
            <div class="btn btn-alert" @click="goPay">去结算</div>
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
import { getCartData, changeCartData, delCartData } from 'src/service/getData'
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
                if(this.itemChecked[i].selected) {
                    result ++ ;
                }
            }
            return result;
        },
        sumPrice() {
            var result = 0;
            for(var i in this.itemChecked) {
                if(this.itemChecked[i].selected) {
                    result += this.itemChecked[i].goods_price * Number(this.itemChecked[i].goods_num);
                }
            }
            return result.toFixed(2);
        },
        ...mapState([
            'login',
            'cart',
        ])
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if(vm.login) {
                getCartData().then(res => {
                    vm.itemChecked = Clone(res.data.cartList);
                    vm.itemNum = res.data.total_price.num;
                    for(let i in vm.itemChecked) {
                        if(vm.itemChecked[i].goods_num > vm.itemChecked[i].store_count) {
                            vm.itemChecked[i].goods_num = vm.itemChecked[i].store_count;
                        }
                    }
                });
            } else {
                    vm.itemChecked = Clone(vm.cart.list);
                    vm.itemNum = 0;
                    for(var i in vm.itemChecked) {
                        vm.itemNum ++ ;
                    }
            }
        })
    },
    beforeRouteLeave (to, from, next) {
        this.HEAD_TOP_TITLE(null);
        this.PREVENT_LOADING(false);
        if(this.login) {
            changeCartData(this.itemChecked).then(res => {
                this.SAVE_CART(res.data);
                next();
            });
        } else {
            let obj = {
                cartList: this.itemChecked,
                total_price: {
                    num: this.itemNum
                }
            }
            this.SAVE_CART(obj);
            next();
        }
    },
    created() {
        this.SHOW_HEADTOP(true);
        this.SHOW_HEADTOP_BACK(true);
        this.SHOW_HEADTOP_SEARCH(false);
        this.SHOW_FOOTNAV(false);
        this.HEAD_TOP_TITLE('购物车');
        setTimeout(() => {
            this.PREVENT_LOADING(true);
        },300);
    },
    mounted() {
    },
    methods: {
        ...mapMutations(['LOADING','HEAD_TOP_TITLE', 'SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV','REDUCE_CART','INIT_CART','SAVE_CART','PREVENT_LOADING']),
        checkItem(index) {
            this.$set(this.itemChecked[index], 'selected', this.itemChecked[index].selected === 1 ? 0 : 1);
        },
        callReduce(index) {
            this.deleteId = index;
            this.openDialog();
        },
        reduceCart() {
            this.LOADING(true);
            let ids = this.deleteId;
            delCartData(ids).then(res => {
                this.REDUCE_CART(this.deleteId);
                this.INIT_CART();
                this.$delete(this.itemChecked, this.deleteId);
                this.LOADING(false);
                this.deleteId = '';
                this.closeDialog();
                this.itemNum --;
            });
        },
        addCart(event, index) {
            if(this.itemChecked[index].goods_num < this.itemChecked[index].store_count) {
                this.itemChecked[index].goods_num ++ ;
                this.itemNum ++ ;
            }
        },
        subCart(event, index) {
            if(this.itemChecked[index].goods_num > 1) {
                this.itemChecked[index].goods_num -- ;
                this.itemNum -- ;
            }
        },
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
        checkSelected() {
            let selectFlag = false;
            let len = 0;
            for(let i in this.itemChecked) {
                len ++ ;
                if(this.itemChecked[i].selected === 1) {
                    selectFlag = true;
                    break;
                }
            }
            if(len === 0) {
                return '请先加入商品'
            } else {
                if(!selectFlag) {
                    return '请选择商品'
                } else {
                    return false;
                }
            }
        },
        goPay() {
            if(this.checkSelected()) {
                this.$BMessage.show(this.checkSelected());
                return false;
            } else {
                if(this.login) {
                    this.$router.push('/order');
                } else {
                    this.goLogin();
                }
            }
        },
        goLogin() {
            window.location.href = 'http://passport.ihuipao.cn/site/login';
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/icon';
@import '../../style/component';

.wrap {
    background-color: #f5f5f5;
}

.collapse-right:after {
    right: .8rem;
}

.go-login {
    background-color: #fff;
    line-height: 2.4rem;
    padding-left: .8rem;
    padding-right: 2rem;
    font-size: .66rem;
    font-weight: 400;
    @include fbethoz;
    .login {
        font-size: .5rem;
        color: #808080;
    }
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
                .brief {
                    width: 100%;
                    @include fbethoz;
                    .spec {
                        font-size: .5rem;
                        line-height: 1rem;
                        color: $red;
                    }
                    .store {
                        font-size: .5rem;
                        color: #808080;
                    }
                }
                .price {
                    width: 100%;
                    font-size: .5rem;
                    line-height: 1.2rem;
                    span {
                        color: #808080;
                        &:nth-child(3) {
                            margin-left: .3rem;
                        }
                    }
                }
                .input-num {
                    @include fmidhoz;
                    border-radius: 2px;
                    border: 1px solid #eee;
                    color: #333;
                    .sub, .add {
                        font-size: 1.2rem;
                        font-weight: 300;
                        color: #808080;
                        background-color: #eee;
                        &.disabled {
                            opacity: .3;
                        }
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
                color: #808080;
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
                color: #808080;
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