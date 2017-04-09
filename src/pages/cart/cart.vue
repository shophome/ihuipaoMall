<template>
    <div class="wrap paddingTop paddingBottom">
        <div class="cart">
            <ul class="cart-list">
                <li class="cart-item">
                    <div class="choose-box">
                        <div class="icon icon_choosed"></div>
                    </div>
                    <div class="pro-img">
                        <img src="http://stor.ihuipao.cn/jpg/2016/10/19/82407cc72b578bb6.jpg">
                    </div>
                    <div class="pro-info">
                        <p class="name">亚瑟士 Asics KINSEI 金星6 男子 慢跑鞋 跑步鞋 T644N-0701</p>
                        <p class="spec">红色/银色/黑色T644N-2493 41.5|270</p>
                        <div class="price">
                            <span>售价：</span>
                            <span>1690元</span>
                            <span>合计：</span>
                            <span>1690元</span>
                        </div>
                        <div class="input-num">
                            <div class="sub">-</div>
                            <div class="input">1</div>
                            <div class="add">+</div>
                        </div>
                        <div class="delete"></div>
                    </div>
                </li>
                <li class="cart-item">
                    <div class="choose-box">
                        <div class="icon icon_choosed"></div>
                    </div>
                    <div class="pro-img">
                        <img src="http://stor.ihuipao.cn/jpg/2016/10/19/82407cc72b578bb6.jpg">
                    </div>
                    <div class="pro-info">
                        <p class="name">亚瑟士 Asics KINSEI 金星6 男子 慢跑鞋 跑步鞋 T644N-0701</p>
                        <p class="spec">红色/银色/黑色T644N-2493 41.5|270</p>
                        <div class="price">
                            <span>售价：</span>
                            <span>1690元</span>
                            <span>合计：</span>
                            <span>1690元</span>
                        </div>
                        <div class="input-num">
                            <div class="sub">-</div>
                            <div class="input">1</div>
                            <div class="add">+</div>
                        </div>
                        <div class="delete"></div>
                    </div>
                </li>
                <li class="cart-item">
                    <div class="choose-box">
                        <div class="icon icon_choosed"></div>
                    </div>
                    <div class="pro-img">
                        <img src="http://stor.ihuipao.cn/jpg/2016/10/19/82407cc72b578bb6.jpg">
                    </div>
                    <div class="pro-info">
                        <p class="name">亚瑟士 Asics KINSEI 金星6 男子 慢跑鞋 跑步鞋 T644N-0701</p>
                        <p class="spec">红色/银色/黑色T644N-2493 41.5|270</p>
                        <div class="price">
                            <span>售价：</span>
                            <span>1690元</span>
                            <span>合计：</span>
                            <span>1690元</span>
                        </div>
                        <div class="input-num">
                            <div class="sub">-</div>
                            <div class="input">1</div>
                            <div class="add">+</div>
                        </div>
                        <div class="delete"></div>
                    </div>
                </li>
                <li class="cart-item">
                    <div class="choose-box">
                        <div class="icon icon_choose"></div>
                    </div>
                    <div class="pro-img">
                        <img src="http://stor.ihuipao.cn/jpg/2016/10/19/82407cc72b578bb6.jpg">
                    </div>
                    <div class="pro-info">
                        <p class="name">亚瑟士 Asics KINSEI 金星6 男子 慢跑鞋 跑步鞋 T644N-0701</p>
                        <p class="spec">红色/银色/黑色T644N-2493 41.5|270</p>
                        <div class="price">
                            <span>售价：</span>
                            <span>1690元</span>
                            <span>合计：</span>
                            <span>1690元</span>
                        </div>
                        <div class="input-num">
                            <div class="sub">-</div>
                            <div class="input">1</div>
                            <div class="add">+</div>
                        </div>
                        <div class="delete"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bottom-submit">
            <div class="price">
                <div class="up">
                    <span>共1件</span>
                    <span>金额：</span>
                </div>
                <div class="down">1690.00<span>元</span></div>
            </div>
            <div class="btn btn-grey">继续购物</div>
            <div class="btn btn-alert">去结算</div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import BScroll from 'better-scroll'

export default {
    name: 'cart',
    data() {
        return {
        }
    },
    created() {
        this.SHOW_HEADTOP(true);
        this.SHOW_HEADTOP_BACK(true);
        this.SHOW_HEADTOP_SEARCH(false);
        this.SHOW_FOOTNAV(false);
    },
    mounted() {
    },
    methods: {
        ...mapMutations(['SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV']),
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/icon';

.cart {
    background-color: #fff;
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
                }
                .spec {
                    font-size: .5rem;
                    line-height: 1rem;
                    color: $red;
                }
                .price {
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