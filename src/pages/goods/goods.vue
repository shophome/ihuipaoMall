<template>
    <div class="wrap paddingBottom" ref="wrap">
        <div class="icon icon_back head_goback" @click="$router.go(-1)"></div>
        <section class="carousel">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, index) in imgList" :key="index">
                        <img :src="item.image_url + '?imageView2/1/w/400/h/400/q/100'">
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
            <section class="spec-choose collapse-right" ref="specChoose" @click="showSpecMenu">
                <p class="has">已选</p>
                <p class="chooseInfo">{{ specSelectedStr + ' ' }}{{ num == 0 ? '' : 'x' + num }}</p>
            </section>
        </section>
        <section class="tab-view">
            <div class="tab-container" ref='tabContainer'>
                <ul class="tabs" ref='tab'>
                    <li :class="{ active : (tabActive === 0) }" @click="scrollToConsult">商品留言</li>
                    <li :class="{ active : (tabActive === 1) }" @click="scrollToDetail">商品详情</li>
                </ul>
            </div>
            <div class="consult" ref="consult">
                <div v-if="commentList.consultCount === 0" class="no-comment" @click="$router.push({name: 'comment', params: commentList})">快来抢沙发～</div>
                <div class="comment-list" v-if="commentList.consultCount > 0">
                    <comment-card :data="commentList.consultList[0]"></comment-card>
                </div>
                <div class="more collapse-right" @click="$router.push({name: 'comment', params: commentList})">
                    <span class="left">用户留言({{commentList.consultCount}})</span>
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
                        <img :src="specSelectedImg + '?imageView2/1/w/120/h/120/q/100'">
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
                            <div v-for="(item, idx) in spec.items" :key="idx" class="spec-item" :class="{ selected : (specIdxSelected[index] === idx), disabled : (specDisabledVirtual.indexOf(item.item_id) > -1) }" @click="selectSpec(index, idx)">
                                <div v-if="item.src" class="spec-img">
                                    <img :src="item.src + '?imageView2/1/w/20/h/20/q/100'">
                                </div>
                                <p>{{ item.item }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="spec-num">
                    <p class="spec-title">购买数量</p>
                    <div class="input-num">
                        <div class="sub" :class="{ disabled : num === 0 }" @click="subNum">-</div>
                        <div class="input">{{ num }}</div>
                        <div class="add" :class="{ disabled : num === Number(store) }" @click="addNum">+</div>
                    </div>
                </div>
            </div>
        </section>
        <div class="foot-buy shadow">
            <div v-if="!specMenuIsShow" class="handleNav">
                <div class="home" @click="$router.push({ path: 'home' })">
                    <div class="icon icon_home_black"></div>
                    <p>首页</p>
                </div>
                <div class="cart" @click="$router.push({ path: 'cart' })">
                    <transition 
                        name="cartTransition"
                        enter-active-class="animated tada"
                        leave-active-class="animated tada"
                        v-on:before-enter="cartBeforeEnter"
                        v-on:after-leave="cartAfterLeave"
                    >
                        <div v-show="cartShow" ref="cart" class="icon icon_cart_black"></div>
                    </transition>
                    <div class="badge"><span>{{ cart.num }}</span></div>
                    <p>购物车</p>
                </div>
            </div>
            <div v-if="!goods.prompt" class="addCart" @click="addToCart">加入购物车</div>
            <div class="buyNow" @click="buyNow">立即购买</div>
        </div>
        <div class="ball-container">
            <transition
                name="ballTransition"
                v-on:before-enter="ballBeforeEnter"
                v-on:enter="ballEnter"
                v-on:after-enter="ballAfterEnter"
            >
                <div class="ball" ref="ball" v-show="ballShow">
                    <div class="inner"></div>
                </div>
            </transition>
        </div>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { getGoodsData, getCommentData, addCartData, addBuyNow } from 'src/service/getData'
import commentCard from 'components/commentCard/commentCard'
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
            allSpecObj: {},
            //已选择属性在filter_spec中的索引对象
            specIdxSelected: {},
            //点击当时选择属性在filter_spec中的索引
            specSelected: {
                level: null,
                value: null
            },
            //已选择属性在filter_spec中的索引数组 
            // [
            //   {
            //      level: (Number),**属性在filter_spec第一层的索引**, 
            //      value: (Number),**属性在filter_spec第一层的索引**
            //    }
            // ]
            specSelectedArr: [],
            //已选择属性的字符串显示
            specSelectedStr: '请选择属性',
            specSelectedImg: '',
            specSelectedId: '',
            specSelectedIdArr: [],
            specNoStore: [],
            //初始置灰的属性集合
            initSpecDisabledArr: [],
            //动态置灰的属性集合
            specDisabledArr: [],
            //所有库存为0的属性组合
            specDisabledId: [],
            num: 0,
            price: 0,
            store: 0,
            addFlag: true,
            cartShow: true,
            ballShow: false,
        }
    },
    components: {
        'comment-card': commentCard,
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.id = vm.$route.query.id;
            getGoodsData(vm.id).then(res => {
                let data = res.data;
                vm.initSpecData(data);
                setTimeout(function() {
                    vm.initSwiper();
                    vm.$refs.detail.innerHTML = vm.goods.goods_content;
                }, 300);
            });
            getCommentData(vm.id, 1).then(res => {
                vm.commentList.consultCount = res.data.consultCount;
                vm.commentList.consultList = res.data.consultList;
                vm.commentList.goods_id = vm.id;
                vm.SAVE_COMMENT(vm.commentList);
            });
        })
    },
    created() {
        this.SHOW_HEADTOP(false);
        this.SHOW_FOOTNAV(false);
        setTimeout(() => {
            this.PREVENT_LOADING(true);
        },300);
    },
    mounted() {
        setTimeout(() => {
            this.PREVENT_LOADING(true);
            this.$refs.tabContainer.style.height = this.$refs.tab.clientHeight + 'px';
            this.tabStick();

        },300);
        setTimeout(() => {
            if(this.store === 0) {
                this.$BMessage.show('该商品已下架');
            }
        }, 1000);
    },
    computed: {
        specDisabledVirtual: function() {
            let result = this.initSpecDisabledArr.concat(this.specDisabledArr);
            return result;
        },
        specClassNotSelected: function() {
            let result = '';
            for(let i in this.filter_spec) {
                if(this.specIdxSelected[i] === undefined) {
                    result += this.filter_spec[i].name + ' ';
                }
            }
            return result;
        },
        commentURL: function() {
            return '/goods/comment?id=' + this.id;
        },
        ...mapState(['cart','commentList'])
    },
    destroyed () {
        this.scrollWatch = false;
        this.PREVENT_LOADING(false);
    },
    watch: {
        specIdxSelected: function(value) {
            this.updateSpecSelectedStr(value);
            this.updateSpecSelectedImg(value);
            this.updateSpecSelectedId(value);
            this.updateSpecDisabled(value);
            this.updateSpecSelectedPrice();
            let len = 0;
            for(let i in value) {
                len ++;
            }
            if(len === this.filter_spec.length) {
                this.num = 1;
            } else {
                this.num = 0;
            }
        },
        specSelectedArr: {
            handler: function(value) {
                this.specIdxSelected = {};
                for(let i in value) {
                    this.specIdxSelected[value[i].level] = value[i].value;
                }
            },
            deep: true
        },
    },
    methods: {
        ...mapMutations(['SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV','ADD_CART','PREVENT_LOADING','SAVE_COMMENT']),
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
                        let top = document.getElementsByTagName('body')[0].scrollTop;
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
            _self.cartShow = true;   //防止购物车图标消失
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
                let obj = {
                    image_url: data.goods.original_img
                }
                this.imgList.push(obj);
            }
            this.filter_spec = data.filter_spec;
            this.specSelectedImg = this.imgList[0].image_url;
            this.spec_goods_price = data.spec_goods_price;
            this.initSpecNoStore();
            this.initSpecDisabled();
        },
        getAllSpec() {     //取得所有属性组合
            const _self = this;
            _self.allSpecObj = _self.filter_spec.reduce((acc, val) => {
                let obj = {items: []};
                for(let i in acc.items) {
                    for(let j in val.items) {
                        let o = {
                            item_id: acc.items[i].item_id + '_' + val.items[j].item_id
                        };
                        obj.items.push(o);
                    }
                }
                return obj;
            })
        },
        initSpecNoStore() {    //获得所有库存为0的属性组合
            const _self = this;
            let flag = false;
            _self.getAllSpec();
            for(let i in _self.allSpecObj.items) {
                if(_self.spec_goods_price[_self.allSpecObj.items[i].item_id] === undefined) {
                    _self.allSpecObj.items[i].store_count = '0';
                    _self.specDisabledId.push(_self.allSpecObj.items[i].item_id);
                } else {
                    _self.allSpecObj.items[i].store_count = _self.spec_goods_price[_self.allSpecObj.items[i].item_id].store_count;
                    if(Number(_self.spec_goods_price[_self.allSpecObj.items[i].item_id].store_count) === 0) {
                        _self.specDisabledId.push(_self.allSpecObj.items[i].item_id);
                    }
                }
                this.store += Number(_self.allSpecObj.items[i].store_count);
            }
        },
        initSpecDisabled() {   //初始进入没库存的置灰
            let result = [];
            let specLength = 0;
            for(let i in this.filter_spec) {
                let arrT = this.filter_spec.concat();
                arrT.splice(i, 1);
                if(this.filter_spec.length === 1) {
                    specLength = 1;
                } else {
                    specLength = arrT.reduce(function(l, r) {
                        return l.items.length * r.items.length;
                    });
                }
                for(let j in this.filter_spec[i].items) {
                    let id = this.filter_spec[i].items[j].item_id;
                    let flag = false;
                    let n = 0;
                    for(let a in this.allSpecObj.items) {
                        if(this.allSpecObj.items[a].item_id.indexOf(String(id)) > -1) {
                            if(this.allSpecObj.items[a].store_count > 0) {
                                flag = true;
                                break;
                            } else {
                                n++;
                            }
                        }
                    }
                    if(!flag || n === specLength) {
                        result.push(id);
                    }
                }
            }
            this.initSpecDisabledArr = result;
        },
        selectSpec(index, idx) {
            if(this.specDisabledVirtual.indexOf(this.filter_spec[index].items[idx].item_id) > -1) {
                return false;   //如果所选属性已被置灰，则禁止点击
            }
            let flag = false;
            if(this.specSelectedArr.length > 0) {
                for(let i in this.specSelectedArr) {
                    if(this.specSelectedArr[i].level === index) {
                        if(this.specSelectedArr[i].value !== idx) {
                            this.specSelectedArr[i].value = idx;   //如果为同一级，则变更该级属性
                        } else {
                            this.specSelectedArr.splice(i, 1);   //如果为同一属性，则移除该属性
                        }
                        flag = true;
                    }
                }
                
            } else {
                flag = false;
            }
            if(!flag) {    //如果为同一属性，则添加该属性
                let obj = {
                    level: index,
                    value: idx 
                }
                this.specSelected = obj;
                this.specSelectedArr.push(obj);
            }
        },
        updateSpecSelectedStr(value) {   //更新已选择属性显示文本
            this.specSelectedStr = '';
            for(let i in value) {
                this.specSelectedStr += this.filter_spec[i].items[value[i]].item + ' ';
            }
            if(this.specSelectedStr === '') {
                this.specSelectedStr = '请选择属性';
            }
        },
        updateSpecSelectedImg(value) {   //更新预览图
            for(let i in value) {
                if(this.filter_spec[i].items[value[i]].src) {
                    this.specSelectedImg = this.filter_spec[i].items[value[i]].src;
                }
            }
        },
        updateSpecSelectedId(value) {   //更新已选择属性id
            this.specSelectedId = '';
            this.specSelectedIdArr = [];
            for(let i in value) {
                this.specSelectedIdArr.push(this.filter_spec[i].items[value[i]].item_id);
            }
            this.specSelectedId = this.specSelectedIdArr.join('_');
            this.updateSpecSelectedStore();
        },
        updateSpecSelectedStore() {   //更新已选择库存
            this.store = 0;
            for(let i in this.allSpecObj.items) {
                let itemInAll = this.allSpecObj.items[i];
                let flag = true;
                for(let j in this.specSelectedIdArr) {
                    if(itemInAll.item_id.indexOf(this.specSelectedIdArr[j]) === -1) {
                        flag = false;
                    }
                }
                if(flag) {
                    this.store += Number(itemInAll.store_count);
                }
            }
        },
        updateSpecSelectedPrice() {
            if(this.specSelectedArr.length === this.filter_spec.length) {
                this.price = Number(this.spec_goods_price[this.specSelectedId].price).toFixed(2);
            }
        },
        updateSpecDisabled(value) {   //动态置灰属性
            let idL = '';
            let idR = '';
            this.specDisabledArr = [];
            for(let i in this.filter_spec) {
                for(let j in this.filter_spec[i].items) {
                    let idx = Number(value[i]);
                    idR = this.filter_spec[i].items[j].item_id;
                    if(idx !== undefined && idx !== Number(j) && this.initSpecDisabledArr.indexOf(this.filter_spec[i].items[j].item_id) === -1) {   //取得未被选中的属性索引
                        let idArr = [];
                        let store = 0;
                        idArr.push(this.filter_spec[i].items[j].item_id);
                        for(let k in value) {
                            if(Number(k) !== Number(i)) {
                                idArr.push(this.filter_spec[k].items[value[k]].item_id);
                            }
                        }
                        for(let l in this.allSpecObj.items) {
                            let flag = true;
                            for(let m in idArr) {
                                if(this.allSpecObj.items[l].item_id.indexOf(idArr[m]) === -1) {
                                    flag = false;
                                }
                            }
                            if(flag) {
                                store += Number(this.allSpecObj.items[l].store_count);
                            }
                        }
                        if(store === 0) {
                            this.specDisabledArr.push(this.filter_spec[i].items[j].item_id);
                        }
                    }
                }
            }
        },
        addNum() {
            if(this.num < Number(this.store)) {
                this.num ++;
            }
        },
        subNum() {
            if(this.num > 0) {
                this.num --;
            }
        },
        checkSelect(type) {
            const _self = this;
            _self.addFlag = false;
            if(_self.specSelectedArr.length < _self.filter_spec.length) {
                _self.$BMessage.show('请选择 ' + _self.specClassNotSelected);
                _self.addFlag = true;
                return false;
            } else if(_self.num === 0) {
                _self.$BMessage.show('请选择 数量');
                _self.addFlag = true;
                return false;
            }
            
            if(type !== 'buyNow') {
                for(let i in _self.cart.list) {
                    if(_self.cart.list[i].goods_id == _self.goods.goods_id && _self.cart.list[i].spec_key == _self.specSelectedId) {
                        if(_self.num + _self.cart.list[i].goods_num > _self.store) {
                            _self.$BMessage.show('购物车中该商品数量已超过库存');
                            setTimeout(() => {
                                _self.addFlag = true;
                            }, 1000);
                            return false;
                        }
                    }
                }
            }
            return true;
        },
        buyNow() {
            if(this.checkSelect('buyNow')) {
                let obj = {
                    goods_id: this.goods.goods_id,
                    goods_num: this.num,
                    goods_spec: this.specSelectedId,
                }
                this.$router.push({name: 'order', params: obj});
            }
        },
        addToCart() {
            const _self = this;
            if(_self.addFlag) {
                _self.addFlag = false;
                if(_self.checkSelect('adddCart')) {
                    const obj = {
                        goods_id: _self.goods.goods_id,
                        goods_num: _self.num,
                        goods_spec: _self.specSelectedId,
                    }
                    addCartData(obj).then(res => {
                        const id = _self.goods.goods_id + '-' + _self.specSelectedId;
                        _self.ADD_CART({
                            goods_id: _self.goods.goods_id,
                            goods_name: _self.goods.goods_name,
                            id: id,
                            store_count: _self.store,
                            goods_price: _self.price,
                            img: _self.specSelectedImg,
                            spec_key: _self.specSelectedId,
                            spec_key_name: _self.specSelectedStr,
                            goods_num: _self.num,
                            selected: '1',
                        });
                        _self.closeSpecMenu();
                        _self.ballShow = true;
                        setTimeout(() => {
                            _self.cartShow = !_self.cartShow;
                            _self.addFlag = true;
                        }, 600);
                    });
                }
            }
            
        },
//-----------  数据逻辑 end  -----------
//-----------  过渡效果 start  -----------
        cartBeforeEnter(el) {
            el.style.display = '';
            el.style.animationDelay = '.6s';
        },
        cartAfterLeave(el) {
            el.style.display = '';
            el.style.animationDelay = '.6s';
        },
        ballBeforeEnter(el) {
            let rect = this.$refs.specChoose.getBoundingClientRect();
            el.style.top = rect.top + 'px';
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            el.getElementsByClassName('inner')[0].style.webkitTransform = 'translate3d(0,0,0)';
            el.getElementsByClassName('inner')[0].style.transform = 'translate3d(0,0,0)';
        },
        ballEnter(el) {
            let rect = this.$refs.specChoose.getBoundingClientRect();
            let height = window.screen.availHeight - rect.top;
            el.style.webkitTransform = 'translate3d(0,' + height + 'px,0)';
            el.style.transform = 'translate3d(0,' + height + 'px,0)';
            el.getElementsByClassName('inner')[0].style.webkitTransform = 'translate3d(2.6rem,0,0)';
            el.getElementsByClassName('inner')[0].style.transform = 'translate3d(2.6rem,0,0)';
        },
        ballAfterEnter(el) {
            this.ballShow = false;
        },
//-----------  过渡效果 end  -----------
    },
}
</script>

<style lang="scss">
.consult {
    .divide {
        display: none;
    }
}
</style>

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
        // @include paddingLR;
        // @include paddingTB(0rem, 0rem);
        .no-comment {
            text-align: center;
            line-height: 3rem;
            margin-top: 1rem;
        }
        .more {
            height: 2rem;
            padding-right: 1rem;
            border-bottom: 1px solid #eee;
            @include fbethoz;
            @include paddingLR;
            .left {
                font-size: .54rem;
                font-weight: 400;
            }
            .right {
                font-size: .4rem;
                font-weight: 300;
                margin-right: 1rem;
            }
            &:after {
                right: .8rem;
            }
        }
        .comment-list {
            padding-top: 1rem;
            .comment-card {
                .divide {
                    display: none;
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
            max-height: 10rem;
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
                    &.disabled {
                        opacity: .3;
                    }
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
    .handleNav {
        width: 42%;
        @include fmidhoz;
        .home, .cart {
            position: relative;
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
        .icon_cart_black {
            display: block;
            transition: all 1s;
        }
    }
    .addCart, .buyNow {
        text-align: center;
        height: 100%;
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
    .badge {
        position: absolute;
        top: .2rem;
        right: .6rem;
        width: .6rem;
        height: .6rem;
        line-height: .54rem;
        background-color: $red;
        border-radius: 50%;
        text-align: center;
        span {
            display: inline-block;
            color: #fff;
            font-size: .5rem;
            transform: scale(.8);
        }
    }
}

.ball-container {
    .ball {
        position: fixed;
        left: 2rem;
        top: 4rem;
        z-index: 1000;
        transition: all .6s cubic-bezier(.6,-0.38,.83,.67);
        .inner {
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            background-color: $red;
            transition: all .6s;
        }
    }
}

</style>