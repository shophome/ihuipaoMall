<template>
    <div id="top_navbar">
        <div id="top_nav" ref="topNav">
            <ul ref="navWrapper">
                <li v-for="(item, index) in options" :key="index" :ref="'nav'+index" @click="pickNav(index)" :class="{active : navActive === index}"><span>{{ item.name }}</span></li>
            </ul>
        </div>
        <div id="list_container" class="shadow" ref="listContainer">
            <ul>
                <li v-for="(item, index) in options" :key="index" :ref="'list'+index" class="list">
                    <div class="list-head">
                        <div class="title">{{ item.name }}</div>
                    </div>
                    <div class="item_list">
                        <div class="item" v-for="(brand, index) in item.items" :key="index" @click="$router.push('/list?type=brand&id='+ brand.id +'')">
                            <img :src="brand.img">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import goodsCard from '../../components/goodsCard/goodsCard'
import BScroll from 'better-scroll'

// import {mapState, mapActions} from 'vuex'
export default {
    name: 'listNavbar',
    data(){
        return{
            isWechat: false,
            navActive: 0,
            navScroll: null,
            listNavArr: [],
            navContainerWidth: 0,
            navWrapperWidth: 0,
            navLeftIdx: 0,
            navBottomIdx: 0,
            itemListTop: []
        }
    },
    components: {
        'goods-card': goodsCard
    },
    created() {
        this.checkWechat();
    },
    mounted() {
        const _self = this;
        setTimeout(() => {
            _self.$nextTick(function() {
                const topH = document.getElementById('head_top').getBoundingClientRect().height;
                const footH = document.getElementById('foot_nav').getBoundingClientRect().height;
                const screenH = window.screen.availHeight;
                var pecent = 1 - (topH + footH) / screenH;
                if(!this.isWechat) {
                    this.$refs.listContainer.style.height = String(pecent * 100 + 1) + '%';
                } else {
                    this.$refs.listContainer.style.height = String(pecent * 100 - 3.3) + '%';
                }
                var navWrapperChilds = this.$refs.navWrapper.childNodes;
                navWrapperChilds.forEach(function(el) {
                    _self.navWrapperWidth += el.getBoundingClientRect().width;
                });
                this.$refs.navWrapper.style.width = this.navWrapperWidth + 'px';
            });
        }, 300);
        setTimeout(() => {
            this.initScroll();
            this.getNavScrollArea();
        }, 500);
    },
    props: ['options'],
    computed: {
    },
    methods: {
        checkWechat() {
            //判断微信浏览器
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                this.isWechat =  true;
            } else {
                this.isWechat = false;
            }
        },
        initScroll() {
            const _self = this;
            _self.navScroll = new BScroll(_self.$refs.topNav, {  
                scrollX: true,
                probeType: 2,
                bounce: true,
                click: true,
            });
            _self.itemScroll = new BScroll(_self.$refs.listContainer, {  
                scrollY: true,
                probeType: 2,
                bounce: true,
                click: true,
            });
            _self.listNavArr = _self.$refs.navWrapper.childNodes;
            _self.navContainerWidth = _self.$refs.topNav.clientWidth;
            //下方列表每个元素的高度
            _self.options.forEach(function(el, idx) {
                _self.itemListTop[idx] = _self.$refs['list' + idx][0].getBoundingClientRect().top - document.getElementById('head_top').getBoundingClientRect().height - _self.$refs.topNav.getBoundingClientRect().height;
            });
        },
        getNavScrollArea() {
            for(let i = 0; i < this.listNavArr.length; i++) {
                if(this.listNavArr[i].offsetLeft > this.navContainerWidth / 2 ) {
                    this.navLeftIdx = i - 1;
                    break;
                }
            }
            for(let i = this.listNavArr.length - 1; i > 0; i-- ) {
                if(this.listNavArr[i].offsetLeft < (this.navWrapperWidth - this.navContainerWidth/2)) {
                    this.navRightIdx = i;
                    break;
                }
            }
        },
        pickNav(index) {
            const navPicked = this.$refs['nav' + index][0];
            const listPicked = this.$refs['list' + index][0];
            const distanceToMid = navPicked.offsetLeft - this.navContainerWidth / 2;
            // console.log(distanceToMid);
            this.navActive = index;
            //顶部菜单定位
            if(index > this.navLeftIdx && index < this.navRightIdx) {
                this.navScroll.scrollTo(- distanceToMid, 0, 300);
            } else if(index <= this.navLeftIdx) {
                this.navScroll.scrollTo(0, 0, 300);
            } else {
                this.navScroll.scrollTo( - (this.navWrapperWidth - this.navContainerWidth), 0, 300);
            }
            //下方列表定位
            this.itemScroll.scrollTo(0, - this.itemListTop[index], 300);
        },
    },
}

</script>

<style lang="scss" scoped>
@import '../../style/common';
@import '../../style/icon';

#top_navbar {
    height: 100%;
    #top_nav {
        position: fixed;
        top: 1.95rem;
        width: 100%;
        height: 1.8rem;
        background-color: $themeSecond;
        overflow-x: auto;
        z-index: 1050;
        ul {
            li {
                display: inline-block;
                padding: 0 .4rem;
                height: 1.8rem;
                line-height: 1.8rem;
                position: relative;
                box-sizing: border-box;
                &.active {
                    span {
                    }
                    &:after {
                        content: '';
                        display: block;
                        position: absolute;
                        bottom: -1px;
                        left: 0;
                        width: 100%;
                        height: 3px;
                        background-color: $yellow;
                    }
                }
                span {
                    color: #fff;
                    font-size: .5rem;
                }
            }
        }
    }
    #list_container {
        margin-top: 1.8rem;
        z-index: 1040;
        @include gradientBg;
        .list-head {
            @include fbethoz;
            .title {
                width: 100%;
                text-align: center;
                font-size: .7rem;
                font-weight: 500;
                line-height: 2rem;
                color: $yellow;
            }
            .more {
                width: 2.4rem;
                height: 2rem;
                margin-right: .5rem;
                position: relative;
                span {
                    position: absolute;
                    top: 50%;
                    lef: 0;
                    transform: translate(0, -50%);
                    color: #fff;
                    line-height: .7rem;
                    vertical-align: middle;
                }
                .icon {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translate(0, -50%);
                    vertical-align: middle;
                    @include wh(.7rem, .7rem);
                }
            }
        }
        .item_list {
            background-color: inherit;
            .item {
                width: 50%;
                height: auto;
                padding: .5rem .6rem;
                display: inline-block;
            }
        }
    }
}
</style>
