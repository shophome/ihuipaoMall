<template>
    <div class="wrap paddingBottom" ref="wrap">
        <div class="icon icon_back head_goback" @click="$router.go(-1)"></div>
        <section class="carousel">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, index) in imgList" :key="index">
                        <img :src="item.image_url">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </section>
        <section class="title-view">
            <section class="title">
                <p class="name">{{ goods.goods_name }}</p>
            </section>
            <section class="price">
                <p class="price-count">{{ price }}</p>
                <!-- <p class="price-origin">{{ goods.shop_price }}</p> -->
            </section>
            <section class="spec-choose collapse-right" @click="showSpecMenu">
                <p class="has">已选</p>
                <p class="chooseInfo">{{ specSelectedStr }}{{ num == 0 ? '' : 'x' + num }}</p>
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
            <div id="detail" class="detail" ref="detail"></div>
        </section>
        <section ref="specMenu" v-show="specMenuIsShow" class="spec-menu" @click="closeSpecMenu">
            <div class="panel" :class="{enter : panelEnter}">
                <div ref="close" class="close" @click="closeSpecMenu"></div>
                <div class="pro-info">
                    <div class="pro-thumbnail">
                        <img :src="specSelectedImg">
                    </div>
                    <div class="pro-desc">
                        <p class="price">{{ price }}</p>
                        <p class="desc">{{ specSelectedStr }}</p>
                        <p class="store">库存： {{ store }}件</p>
                    </div>
                </div>
                <div class="spec-container">
                    <div class="spec-group" v-for="(spec, index) in filter_spec" :key="index">
                        <div class="spec-title">{{ spec.name }}</div>
                        <div class="spec-row">
                            <div v-for="(item, idx) in spec.items" :key="idx" class="spec-item" :class="{ selected : (idx === specIdxSelected[index]), disabled : (specDisabled.indexOf(item.item_id) > -1) }" @click="selectSpec(index, idx)">
                                <div v-if="item.src" class="spec-img">
                                    <img :src="item.src">
                                </div>
                                <p>{{ item.item }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="spec-num">
                        <p class="spec-title">购买数量</p>
                        <div class="input-num">
                            <div class="sub" @click="subNum">-</div>
                            <div class="input">{{ num }}</div>
                            <div class="add" @click="addNum">+</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="foot-buy shadow">
            <div class="home" @click="$router.push({ path: 'home' })">
                <div class="icon icon_home_black"></div>
                <p>首页</p>
            </div>
            <div class="cart" @click="$router.push({ path: 'cart' })">
                <div class="icon icon_cart_black"></div>
                <p>购物车</p>
            </div>
            <div class="addCart" @click="addToCart">加入购物车</div>
            <div class="buyNow">立即购买</div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getGoodsData, getCommentData } from 'src/service/getData'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'
import BScroll from 'better-scroll'

export default {
    name: 'goods',
    data() {
        return {
            id: '',
            tabTop: 0,
            scrollWatch: true,
            tabActive: -1,
            specMenuIsShow: false,
            panelEnter: false,
            goods: {},
            imgList: [],
            filter_spec: [],
            spec_goods_price: {},
            specIdxSelected: [],
            specSelected: [],
            specSelectedStr: '',
            specSelectedImg: '',
            specSelectedId: '',
            specSelectedIdArr: [],
            specNoStore: [],
            specDisabled: [],
            num: 1,
            price: 0,
            sumPrice: 0,
            store: 0,
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.id = vm.$route.query.id;
            getGoodsData(vm.id).then(res => {
                var data = res.data;
                vm.initSpecData(data);
                setTimeout(function() {
                    vm.initSwiper();
                    vm.$refs.detail.innerHTML = vm.goods.goods_content;
                }, 300);
            });
            getCommentData(vm.id, 1).then(res => {
                console.log(res);
            });
        })
    },
    created() {
        const _self = this;
        _self.SHOW_HEADTOP(false);
        _self.SHOW_FOOTNAV(false);
    },
    mounted() {
        const _self = this;
        setTimeout(function() {
            _self.$refs.tabContainer.style.height = _self.$refs.tab.clientHeight + 'px';
            _self.tabStick();
        },300);
    },
    destroyed () {
        this.scrollWatch = false;
    },
    watch: {
        specIdxSelected: function(value) {
            this.updateSpecSelectedStr(value);
            this.updateSpecSelectedImg(value);
            this.updateSpecSelectedId(value);
            if(!this.spec_goods_price[this.specSelectedId]) {
                this.store = 0;
                this.num = 0;
            } else {
                this.price = this.spec_goods_price[this.specSelectedId].price;
                this.store = this.spec_goods_price[this.specSelectedId].store_count;
                if(this.spec_goods_price[this.specSelectedId].store_count == 0) {
                    this.num = 0;
                } else {
                    this.num = 1;
                }
            }
        },
        num: function(value) {
            if(value > 0) {
                this.sumPrice = (this.spec_goods_price[this.specSelectedId].price * value).toFixed(2);
            } else {
                this.sumPrice = 0;
            }
        }
    },
    methods: {
        ...mapMutations(['LOADING','SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV','ADD_CART']),
//-----------  UI交互start  -----------
        initSwiper() {
            new Swiper('.swiper-container', {
                // loop: true,
                autoplay: 5000,
                pagination: '.swiper-pagination',
            });
        },
        tabStick() {     //tab标签页面滚动粘滞
            const _self = this;
            _self.tabTop = _self.$refs.tab.offsetTop;
            _self.$nextTick(function() {
                window.addEventListener('scroll', function() {
                    if(_self.scrollWatch) {
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
                    }
                }, true);
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
            const _self = this;
            if(!e || e.target === _self.$refs.specMenu || e.target === _self.$refs.close) {
                _self.panelEnter = false;
                setTimeout(function() {
                    _self.specMenuIsShow = false;
                }, 300);
            } else {
                return false;
            }
        },
//-----------  UI交互end  -----------
//
//-----------  数据逻辑 start  -----------
        initSpecData(data) {
            this.goods = data.goods;
            this.price = data.goods.shop_price;
            if(data.goods_images_list.length > 0) {
                this.imgList = data.goods_images_list;
            } else {
                var obj = {
                    image_url: data.goods.original_img
                }
                this.imgList.push(obj);
            }
            this.filter_spec = data.filter_spec;
            this.specSelectedImg = this.imgList[0].image_url;
            this.spec_goods_price = data.spec_goods_price;
            this.setSpecDisabled();
            for(var i in data.filter_spec) {
                for(var j in data.filter_spec[i].items) {
                    var obj = data.filter_spec[i].items[j];
                    if(this.specDisabled.indexOf(String(obj.item_id)) === -1) {
                        var temp = {
                            name: data.filter_spec[i].name,
                            item_id: obj.item_id,
                            item: obj.item,
                            src: obj.src
                        }
                        this.specIdxSelected.push(Number(j));
                        this.specSelected.push(temp);
                        this.specSelectedIdArr.push(obj.item_id);
                        break;
                    }
                }
            }
            this.specSelectedId = this.specSelectedIdArr.join('_');
            if(this.specSelected.length > 0) {
                this.sumPrice = data.spec_goods_price[this.specSelectedId].price;
            } else {
                this.num = 0;
                this.sumPrice = 0;
                this.specSelectedStr = '没有库存了';
            }
        },
        setSpecDisabled() {   //初始进入没库存的置灰
            var result = [];
            for(var i in this.filter_spec) {
                for(var j in this.filter_spec[i].items) {
                    var id = this.filter_spec[i].items[j].item_id;
                    var flag = false;
                    for(var a in this.spec_goods_price) {
                        if(a.indexOf(String(id)) > -1) {
                            if(this.spec_goods_price[a].store_count > 0) {
                                flag = true;
                                break;
                            }
                        }
                    }
                    if(!flag) {
                        result.push(id);
                    }
                }
            }
            this.specDisabled = result;
        },
        selectSpec(index, idx) {
            if(this.specDisabled.indexOf(this.filter_spec[index].items[idx].item_id) > -1) {
                return false;
            } else {
                this.specSelected[index] = this.filter_spec[index].items[idx];
                this.$set(this.specIdxSelected, index, idx);  //调用Vue set方法，检测数组变动才能更新视图
            }
            this.updateSpecDisabled(index, idx);
        },
        updateSpecSelectedStr(value) {   //更新已选择属性显示文本
            this.specSelectedStr = '';
            for(var i in value) {
                this.specSelectedStr += this.specSelected[i].item + ' ';
            }
        },
        updateSpecSelectedImg(value) {   //更新预览图
            for(var i in value) {
                if(this.specSelected[i].src) {
                    this.specSelectedImg = this.specSelected[i].src;
                }
            }
        },
        updateSpecSelectedId(value) {   //更新已选择属性id
            this.specSelectedId = '';
            this.specSelectedIdArr = [];
            for(var i in value) {
                this.specSelectedIdArr.push(this.specSelected[i].item_id);
            }
            this.specSelectedId = this.specSelectedIdArr.join('_');
        },
        updateSpecDisabled(index, idx) {   //更新已选择属性搭配的其他属性是否置灰
            const _self = this;
            const selectId = String(_self.filter_spec[index].items[idx].item_id);
            for(var i in _self.spec_goods_price) {
                if(i.indexOf(selectId) > -1) {
                    var arr = String(i).split('_');
                    arr.splice(arr.indexOf(selectId), 1);
                    arr.forEach(function(item) {
                        if(Number(_self.spec_goods_price[i].store_count) === 0) {
                            if(_self.specDisabled.indexOf(item) === -1) {
                                _self.specDisabled.push(item);
                            }
                        } else {
                            if(_self.specDisabled.indexOf(item) > -1) {
                                _self.specDisabled.splice(_self.specDisabled.indexOf(item), 1);
                            }
                        }
                    });
                }
            }
        },
        addNum() {
            if(this.num < Number(this.store)) {
                this.num ++;
            }
        },
        subNum() {
            if(this.num > 1) {
                this.num --;
            }
        },
        addToCart() {
            const _self = this;
            _self.LOADING(true);
            setTimeout(function() {
                _self.ADD_CART({
                    id: _self.goods.goods_id + '-' + _self.specSelectedId,
                    goods_id: _self.goods.goods_id,
                    spec_id: _self.specSelectedId,
                    goods_name: _self.goods.goods_name,
                    store_count: _self.goods.store_count,
                    price: _self.price,
                    img: _self.specSelectedImg,
                    spec: _self.specSelectedStr,
                    num: _self.num
                });
                _self.LOADING(false);
                _self.closeSpecMenu();
            }, 1000);
        }
//-----------  数据逻辑 end  -----------
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

.wrap {
    height: auto;
}

.head_goback {
    @include wh(2rem, 2rem);
    border-radius: 100%;
    background-color: rgba(0, 0, 0, .3);
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAE20lEQVR42u2dW08TQRTHh6gVgXCRNATCE6WhEi6BgOX2AQxReOERL4k+SJSLGlFIDFVR49030vA98AvAGyAQrgL1QqClpcVvoGdwFkvtbkvZnTmz3X/yfyrszPzS7c6cM3OWELHKAjvAF8Ht4GvgO+CH4GGwB/wE/AjcD+5hf9PO/sfBrpE2OgOuAF8C3waPMEgn8Qi71iV27TNmg5YBLgd3RX2rjPQwa6uctS2tbOAm8AAHaGoeYH2wyXabtoIHBYKL9SDrE/rbuwp8DxG4WN9jfUSnfHA3YnCx7mZ9RqEa8JBE8BQPsb4L02lwp4TgYt3JxsJV2eCbJoCn+CYbExcVgPtMBE9xHxubobKDH5gQnuIHbIyG6Dz4vonhKb7Pxqr7b15fGsCLvp11+008Bb6VRvAU39Lr6dyRhvAUd+gxSfakuVOebOdLusIwYsWS0rKv24J3ZO187KgKysHk5OQ893q9n6empubGx8c/5+bmPufUdvVx4nkoQ1JFRUUvNzY2fvyO0vT09BLHUFhS8cRWjPBKS0tf+Xy+n7/jqKGh4QOnfrQmE4YflAkeVXNz8yeOkW3N9IAbG7ySkhJNeGtraz7OfXKrwaMZrH5M8IqLi19ubm6qwtva2vKXlZW9FpCoipvtK8f2wAB4P9TgbW9v+x0Ox2tB/SuPB7AL89M2Fp7T6XwjsI9d8aYuwxjg2e32FwngBQTD8zBWRx4mLgzwCgsLKbzvavB2dnYCFRUVb5DcKa5ogJcxwFtfX1eF5/f7dxHB8zBmh+oVDQ+mI9804AWRwfMwZofRZgteas4WOn2h8FZXV31q8AKBQNDlcr1FHKVxUoBtouCtrKxsasALVVZWYobnYez4h+wLCgpGl5eXNySHdxjyv44J3u7ubqiqquqdJIFWyo7c5dVgXl7e6NLSkha8vZqaGlngeRi7gw3dhjdGI8cAb10LXm1t7XvJQv2UnfGJIxqGX1xcVIUXDAZlhKcs6cTCC4VC4bq6OhnhKT44h2FYAzab7SnNW6gBjEQivzhGlA0BaHgIPzMz89nMzIwWxH232/1R1lt4gEdjWVlZFOKyySAePER6eDWYCGI4HN5vbGz8KNs0hutEmj5UZmdntSBGOKYpT+obQpZyFOLc3NyKGsS9vb1IfX29DBA7hAUTKMT5+flVySG2CQ1nJQExjByiU3hAlUJcWFhYk3SifbgNuE80RFitfJVsqdcbnRO5IrpDiZZ8CCM1l9GlNSWDeCStacOSWE8i7IUh4PpfYh3V1g4J8iVd6DcXJZOxE5jujLu5KIOIrW9w7JyxoB1aA0SjmAW6DZaJtnzQzzj3qYloCOUW30QQW1paeAVkE27xpUK5yVxr5xamTeZUaI85sL2D37Efc6CqxrqAp0HZsbGxicnJyS9er3eCTr45tZ30QRtF1lGvf75KUlA+sQ4behiDlGsp1FoADxicSOl84LqT6CB67N068n9CWUUndJBV9kQH2Qnu8nZ6TJYNK7yjKI/8LRRrNnh32Ni46BwxX/Gxc4Sz6BOq3QTw2omA8nfRugB+LCG4x6zvKJRPrBKguqia4C9CW02QC2sZ5DYiWZXzswRPIe6zRGJZpeB1vr2VlxHQrcV6vYygh5j4ZQSJghSJXoehfKsess9iX4eRLXIAfwCTdwg03nnLRgAAAABJRU5ErkJggg==') no-repeat;
    background-size: 70%;
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
                @include wh(4.4rem, 4.4rem);
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
                .store {
                    font-size: .5rem;
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
                        position: relative;
                        font-size: .5rem;
                        border-radius: 2px;
                        padding: .2rem .4rem;
                        margin-right: .3rem;
                        margin-top: .3rem;
                        @include flefthoz;
                        &.selected {
                            border: 1px solid $red;
                        }
                        &.disabled {
                            opacity: .3;
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
    // border-top: 1px solid #eee;
    z-index: 1060;
    .home, .cart {
        box-sizing: border-box;
        padding: .2rem 1rem;
        @include fmidver;
        align-content: space-around;
        p {
            color: #8a8a8a;
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
        background-color: #ffc107;
    }
    .buyNow {
        padding-left: .4rem;
        padding-right: .4rem;
        background-color: $red;
    }
}

</style>