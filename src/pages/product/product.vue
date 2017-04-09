<template>
    <div class="wrap paddingBottom">
        <div class="icon icon_back head_goback" @click="$router.go(-1)"></div>
        <section class="carousel">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, index) in carousel" :key="index">
                        <img v-lazy="item.imgSrc">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </section>
        <section class="title-view">
            <section class="title">
                <p class="name">亚瑟士 Asics KINSEI 金星6 男子 慢跑鞋 跑步鞋 T644N-0701</p>
            </section>
            <section class="price">
                <p class="price-count">1690</p>
                <p class="price-origin">1690</p>
            </section>
            <section class="spec-choose collapse-right" @click="showSpecMenu">
                <p class="has">已选</p>
                <p class="chooseInfo">红色/银色/黑色T644N-2493 41.5|270</p>
            </section>
        </section>
        <section class="tab-view">
            <div class="tab-container" ref='tabContainer'>
                <ul class="tabs" ref='tab'>
                    <li :class="{ active : (tabActive === 0) }" @click="scrollToConsult">商品咨询</li>
                    <li :class="{ active : (tabActive === 1) }" @click="scrollToDetail">商品详情</li>
                </ul>
            </div>
            <div class="consult" ref="consult">
                <div class="comment-list">
                    <div class="item">
                        <div class="user">
                            <div class="avatar">
                                <img src="http://stor.ihuipao.cn/@/avatar/96606/1174.jpg?v=6893">
                            </div>
                            <div class="name">
                                <p>陈城</p>
                                <p class="date">2017-03-14</p>
                            </div>
                        </div>
                        <div class="content">联系电话无人接，我的付款沒有成功，怎麼辦</div>
                        <div class="reply">
                            <ul>
                                <li>
                                    <div class="avatar">
                                        <img src="http://r0.ihuipao.cn/img/huipao.png">
                                    </div>
                                    <div class="textbox">
                                        <span class="tit">官方回复：</span>
                                        <span>我想你，想打定话给你，想花胆信给你，想呛首歌给你，想做换给你，想请你喝咖灰，想跟你一起吹吹轰，想跟你一起看熏熏···想你，想到无花付息，想到牛眼内，想到昏古七。但，又想了想还是放哈了定话，我，要控计我计己。 感谢您对汇跑的支持。</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="more collapse-right">
                    <span class="left">用户留言(1)</span>
                    <span class="right">查看全部留言</span>
                </div>
            </div>
            <div class="detail" ref="detail">
                <div v-for="(item, index) in detaiImg" :key=index>
                    <img v-lazy="item.imgSrc">
                </div>
            </div>
        </section>
        <section ref="specMenu" v-show="specMenuIsShow" class="spec-menu" @click="closeSpecMenu">
            <div class="panel" :class="{enter : panelEnter}">
                <div ref="close" class="close" @click="closeSpecMenu"></div>
                <div class="pro-info">
                    <div class="pro-thumbnail">
                        <img src="http://stor.ihuipao.cn/jpg/2016/10/19/82407cc72b578bb6.jpg">
                    </div>
                    <div class="pro-desc">
                        <p class="price">1690</p>
                        <p class="desc">红色/银色/黑色T644N-2493 41.5|270</p>
                    </div>
                </div>
                <div class="spec-container">
                    <div class="spec-group">
                        <div class="spec-title">尺码</div>
                        <div class="spec-row">
                            <div class="spec-item selected">
                                <p>41.5|270</p>
                            </div>
                            <div class="spec-item">
                                <p>42|275</p>
                            </div>
                            <div class="spec-item">
                                <p>42.5|280</p>
                            </div>
                            <div class="spec-item">
                                <p>43.5|275</p>
                            </div>
                        </div>
                    </div>
                    <div class="spec-group">
                        <div class="spec-title">颜色</div>
                        <div class="spec-row">
                            <div class="spec-item selected">
                                <div class="spec-img">
                                    <img src="http://stor.ihuipao.cn/jpg/2016/10/19/82407cc72b578bb6.jpg">
                                </div>
                                <p>红色/银色/黑色T644N-2493</p>
                            </div>
                            <div class="spec-item">
                                <div class="spec-img">
                                    <img src="http://stor.ihuipao.cn/jpg/2016/10/19/82407cc72b578bb6.jpg">
                                </div>
                                <p>红色/银色/亮橘色T642N-2393</p>
                            </div>
                            <div class="spec-item">
                                <div class="spec-img">
                                    <img src="http://stor.ihuipao.cn/jpg/2016/10/19/82407cc72b578bb6.jpg">
                                </div>
                                <p>金黄/白/亮蓝 T644N-0701</p>
                            </div>
                        </div>
                    </div>
                    <div class="spec-num">
                        <p class="spec-title">购买数量</p>
                        <div class="input-num">
                            <div class="sub">-</div>
                            <div class="input">1</div>
                            <div class="add">+</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="foot-buy">
            <div class="home" @click="$router.push({ path: 'home' })">
                <div class="icon icon_home"></div>
                <p>首页</p>
            </div>
            <div class="cart" @click="$router.push({ path: 'cart' })">
                <div class="icon icon_cart"></div>
                <p>购物车</p>
            </div>
            <div class="addCart">加入购物车</div>
            <div class="buyNow">立即购买</div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            tabTop: 0,
            tabActive: -1,
            specMenuIsShow: false,
            panelEnter: false,
            carousel: [
                {
                    imgSrc: 'http://stor.ihuipao.cn/jpg/2016/10/19/82407cc72b578bb6.jpg'
                },
                {
                    imgSrc: 'http://stor.ihuipao.cn/jpg/2016/10/19/8a4ae419fec9af1e.jpg'
                },
                {
                    imgSrc: 'http://stor.ihuipao.cn/jpg/2016/10/19/cc8827d9ad836b40.jpg'
                },
            ],
            detaiImg: [
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/582ff15c04d5e.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/09/58228d4cb2b8f.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/5830054ac4288.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/5830054b13fd5.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/5830054ae699e.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/18/582e641db3da7.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/58300568202cf.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/5830056821d43.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/5830056842ab5.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/58300560c7c59.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/58300560c8af4.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/58300560d54e6.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/583005614ed39.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/5830056181a40.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/583005618f712.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/582fd25eba026.jpeg?imageView2/2/w/800/q/100"
                },
                {
                    imgSrc: "http://stor.ihuipao.cn/@/media/2016/11/19/582ff181c4b23.jpeg?imageView2/2/w/800/q/100"
                },
            ]
        }
    },
    created() {
        this.SHOW_HEADTOP(false);
        this.SHOW_FOOTNAV(false);
    },
    mounted() {
        this.$refs.tabContainer.style.height = this.$refs.tab.clientHeight + 'px';
        this.tabStick();
    },
    methods: {
        ...mapMutations(['SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV']),
        initSwiper() {
            new Swiper('.swiper-container', {
                loop: true,
                autoplay: 5000,
                pagination: '.swiper-pagination',
            });
        },
        tabStick() {     //tab标签页面滚动粘滞
            const _self = this;
            _self.tabTop = _self.$refs.tab.offsetTop;
            _self.$nextTick(function() {
                window.addEventListener('scroll', function() {
                    var top = document.getElementsByTagName('body')[0].scrollTop;
                    if(top >= _self.$refs.tabContainer.offsetTop) {
                        _self.$refs.tab.style.position = 'fixed';
                        _self.$refs.tab.style.top = 0;
                        _self.$refs.tab.style.left = 0;
                        _self.tabActive = 0;   //设置标签active状态
                        if(top >= (_self.$refs.detail.offsetTop - _self.$refs.tab.clientHeight)) {
                            _self.tabActive = 1;
                        }
                    } else {
                        _self.tabActive = -1;
                        _self.$refs.tab.style.position = 'relative';
                        _self.tabTop = _self.$refs.tab.offsetTop;
                    }
                }, false);
            });
        },
        scrollToConsult() {
            window.scrollTo(0, this.$refs.tabContainer.offsetTop);
        },
        scrollToDetail() {
            window.scrollTo(0, this.$refs.detail.offsetTop - this.$refs.tab.clientHeight);
        },
        showSpecMenu() {
            const _self = this;
            _self.specMenuIsShow = true;
            setTimeout(function() {
                _self.panelEnter = true;
            }, 100);
        },
        closeSpecMenu(e) {
            if(e.target === this.$refs.specMenu || e.target === this.$refs.close) {
                this.specMenuIsShow = false;
                this.panelEnter = false;
            } else {
                return false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/icon';
@import '../../style/component';

@mixin paddingLR {
    padding-left: .8rem;
    padding-right: .8rem;
}

@mixin paddingTB($top, $bottom) {
    padding-top: $top;
    padding-bottom: $bottom;
}

.head_goback {
    border-radius: 100%;
    background-color: rgba(0, 0, 0, .3);
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAE20lEQVR42u2dW08TQRTHh6gVgXCRNATCE6WhEi6BgOX2AQxReOERL4k+SJSLGlFIDFVR49030vA98AvAGyAQrgL1QqClpcVvoGdwFkvtbkvZnTmz3X/yfyrszPzS7c6cM3OWELHKAjvAF8Ht4GvgO+CH4GGwB/wE/AjcD+5hf9PO/sfBrpE2OgOuAF8C3waPMEgn8Qi71iV27TNmg5YBLgd3RX2rjPQwa6uctS2tbOAm8AAHaGoeYH2wyXabtoIHBYKL9SDrE/rbuwp8DxG4WN9jfUSnfHA3YnCx7mZ9RqEa8JBE8BQPsb4L02lwp4TgYt3JxsJV2eCbJoCn+CYbExcVgPtMBE9xHxubobKDH5gQnuIHbIyG6Dz4vonhKb7Pxqr7b15fGsCLvp11+008Bb6VRvAU39Lr6dyRhvAUd+gxSfakuVOebOdLusIwYsWS0rKv24J3ZO187KgKysHk5OQ893q9n6empubGx8c/5+bmPufUdvVx4nkoQ1JFRUUvNzY2fvyO0vT09BLHUFhS8cRWjPBKS0tf+Xy+n7/jqKGh4QOnfrQmE4YflAkeVXNz8yeOkW3N9IAbG7ySkhJNeGtraz7OfXKrwaMZrH5M8IqLi19ubm6qwtva2vKXlZW9FpCoipvtK8f2wAB4P9TgbW9v+x0Ox2tB/SuPB7AL89M2Fp7T6XwjsI9d8aYuwxjg2e32FwngBQTD8zBWRx4mLgzwCgsLKbzvavB2dnYCFRUVb5DcKa5ogJcxwFtfX1eF5/f7dxHB8zBmh+oVDQ+mI9804AWRwfMwZofRZgteas4WOn2h8FZXV31q8AKBQNDlcr1FHKVxUoBtouCtrKxsasALVVZWYobnYez4h+wLCgpGl5eXNySHdxjyv44J3u7ubqiqquqdJIFWyo7c5dVgXl7e6NLSkha8vZqaGlngeRi7gw3dhjdGI8cAb10LXm1t7XvJQv2UnfGJIxqGX1xcVIUXDAZlhKcs6cTCC4VC4bq6OhnhKT44h2FYAzab7SnNW6gBjEQivzhGlA0BaHgIPzMz89nMzIwWxH232/1R1lt4gEdjWVlZFOKyySAePER6eDWYCGI4HN5vbGz8KNs0hutEmj5UZmdntSBGOKYpT+obQpZyFOLc3NyKGsS9vb1IfX29DBA7hAUTKMT5+flVySG2CQ1nJQExjByiU3hAlUJcWFhYk3SifbgNuE80RFitfJVsqdcbnRO5IrpDiZZ8CCM1l9GlNSWDeCStacOSWE8i7IUh4PpfYh3V1g4J8iVd6DcXJZOxE5jujLu5KIOIrW9w7JyxoB1aA0SjmAW6DZaJtnzQzzj3qYloCOUW30QQW1paeAVkE27xpUK5yVxr5xamTeZUaI85sL2D37Efc6CqxrqAp0HZsbGxicnJyS9er3eCTr45tZ30QRtF1lGvf75KUlA+sQ4behiDlGsp1FoADxicSOl84LqT6CB67N068n9CWUUndJBV9kQH2Qnu8nZ6TJYNK7yjKI/8LRRrNnh32Ni46BwxX/Gxc4Sz6BOq3QTw2omA8nfRugB+LCG4x6zvKJRPrBKguqia4C9CW02QC2sZ5DYiWZXzswRPIe6zRGJZpeB1vr2VlxHQrcV6vYygh5j4ZQSJghSJXoehfKsess9iX4eRLXIAfwCTdwg03nnLRgAAAABJRU5ErkJggg==') no-repeat;
    background-size: 100%;
    background-position: center;
    line-height: 1rem;
}

.title-view {
    background-color: #fff;
    @include paddingLR;
    .title, .price, .spec-choose {
        @include paddingTB(.4rem, .4rem);
    }
    .title {
        .name {
            font-size: .7rem;
            font-weight: 600;
        }
    }
    .price {
        border-bottom: 1px solid #f4f4f4;
        .price-count, .price-origin {
            position: relative;
            display: inline-block;
            vertical-align: middle;
        }
        .price-count {
            margin-left: .5rem;
            font-size: 1rem;
            color: $red;
            &:before {
                content: '¥';
                position: absolute;
                font-size: .6rem;
                top: 4px;
                left: -.4rem;
            }
        }
        .price-origin {
            color: #9e9e9e;
            &:before {
                content: '';
                display: block;
                position: absolute;
                top: 50%;
                left: -5%;
                width: 115%;
                height: 2px;
                background: #9e9e9e;
            }
        }
    }
    .spec-choose {
        .has {
            font-size: .4rem;
            color: #9a9a9a;
        }
        .chooseInfo {
            font-size: .5rem;
            line-height: 1.2rem;
        }
    }
}

.tab-view {
    background-color: #fff;
    margin-top: 10px;
    padding-bottom: 40px;
    .tabs {
        position: relative;
        @include wh(100%, 2rem);
        background-color: #fff;
        border-bottom: 1px solid #eee;
        @include fmidhoz;
        z-index: 1000;
        li {
            font-size: .56rem;
            width: 50%;
            height: .8rem;
            line-height: .8rem;
            text-align: center;
            border-left: 1px solid #e4e4e4;
            &:nth-child(1) {
                border-left: none;
            }
            &.active {
                color: $red;
            }
        }
    }
    .consult {
        @include paddingLR;
        @include paddingTB(1rem, 0rem);
        .more {
            height: 2rem;
            padding-right: 1rem;
            border-bottom: 1px solid #eee;
            @include fbethoz;
            .left {
                font-size: .64rem;
                font-weight: 400;
            }
            .right {
                font-size: .4rem;
                font-weight: 300;
            }
        }
        .comment-list {
            .item {
                margin: 20px 0;
                .user {
                    @include flefthoz;
                    .avatar {
                        @include wh(1.8rem, 1.8rem);
                        border-radius: 50%;
                        overflow: hidden;
                        img {
                            width: 100%;
                        }
                    }
                    .name {
                        box-flex: 1;
                        width: 60%;
                        margin-left: 6%;
                    }
                    .more {
                        font-size: .5rem;
                    }
                }
                .content {
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
                .reply {
                    padding: .4rem;
                    background-color: #eee;
                    ul {
                        li {
                            position: relative;
                            .avatar {
                                position: absolute;
                                left: 0;
                                top: 0;
                                @include wh(1.2rem, 1.2rem);
                                overflow: hidden; 
                            }
                            .textbox {
                                font-size: .5rem;
                                .tit {
                                    color: $red;
                                }
                                text-indent: 1.6rem;
                            }
                        }
                    }
                }
            }
        }
    }
    .detail {
        @include paddingLR;
        @include paddingTB(1rem, 0rem);
    }
}

.spec-menu {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
    .panel {
        @include paddingLR;
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: #fff;
        padding-bottom: 2.25rem;
        transform: translate3d(0, 100%, 0)!important;
        transition: transform .3s ease;
        // transition-delay: .3s;
        &.enter {
            transform: translate3d(0, 0, 0)!important;
        }
        .close {
            position: absolute;
            top: .4rem;
            right: .4rem;
            @include wh(1.4rem, 1.4rem);
            background: url('../../images/close.png') no-repeat;
            background-size: 60%;
            background-position: center;
        }
        .pro-info {
            min-height: 3.8rem;
            @include flefthoz;
            .pro-thumbnail {
                @include wh(4rem, 4rem);
                margin-top: -1.4rem;
                padding: .1rem;
                background-color: #fff;
                border-radius: 2px;
                img {
                    width: 100%;
                }
            }
            .pro-desc {
                width: 9rem;
                margin-left: .3rem;
                .price {
                    position: relative;
                    font-size: 1rem;
                    margin-left: .5rem;
                    color: $red;
                    &:before {
                        content: '¥';
                        position: absolute;
                        font-size: .6rem;
                        top: 4px;
                        left: -.4rem;
                    }
                }
                .desc {
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: .5rem;
                }
            }
        }
        .spec-container {
            max-height: 12rem;
            overflow-y: auto;
            border-top: 1px solid #eee;
            padding-top: .6rem;
            .spec-title {
                font-size: .6rem;
            }
            .spec-group {
                margin-bottom: .6rem;
                .spec-row {
                    @include flefthoz;
                    border-bottom: 1px solid #eee;
                    padding-bottom: .6rem;
                    .spec-item {
                        font-size: .5rem;
                        border-radius: 2px;
                        padding: .2rem .4rem;
                        margin-right: .3rem;
                        margin-top: .3rem;
                        @include flefthoz;
                        &.selected {
                            border: 1px solid $red;
                        }
                        .spec-img {
                            margin-right: .3rem;
                            @include wh(.9rem, .9rem);
                        }
                    }
                }
            }
            .spec-num {
                @include fbethoz;
                margin-bottom: .6rem;
                .input-num {
                    @include fmidhoz;
                    border: 1px solid #eee;
                    color: #333;
                    .sub, .add {
                        font-size: 1.2rem;
                        font-weight: 300;
                        color: #c9c9c9;
                    }
                    .sub, .input, .add,  {
                        @include wh(1.6rem, 1.6rem);
                        text-align: center;
                        line-height: 1.6rem;
                    }
                    .input {
                        border-left: 1px solid #eee;
                        border-right: 1px solid #eee;
                    }
                }
            }
        }
    }
}

.foot-buy {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    background-color: #fff;
    border-top: 1px solid #eee;
    z-index: 1090;
    .home, .cart {
        box-sizing: border-box;
        padding: .2rem 1rem;
        @include fmidver;
        align-content: space-around;
        p {
            font-size: .5rem;
        }
    }
    .home {
        border-right: 1px solid #eee;
    }
    .addCart, .buyNow {
        text-align: center;
        line-height: 2.25rem;
        font-size: .7rem;
        font-weight: 500;
        color: #fff;
        flex-grow: 1;
    }
    .addCart {
        background-color: #f90;
    }
    .buyNow {
        background-color: $red;
    }
}

</style>