<template>
    <div id="list_navbar">
        <div id="list_nav" ref="listNav">
            <ul>
                <li v-for="(item, index) in options" :key="index" :ref="'nav'+index" @click="pickNav(index, true)" :class="{active : navActive === index}"><span>{{ item.name }}</span></li>
            </ul>
        </div>
        <div id="list_container" class="shadow" ref="listContainer">
            <ul>
                <li v-for="(item, index) in options" :key="index" :ref="'list'+index" class="list">
                    <div class="list-head">
                        <div class="title">{{ item.name }}</div>
                        <div class="more" @click="$router.push('/list?type=category&id='+ item.id +'')">
                            <span>更多</span>
                            <div class="icon icon_more"></div>
                        </div>
                    </div>
                    <div class="item_list">
                        <div class="item" v-for="(product, index) in item.items" :key="index">
                            <product-card :property="product" :myClass="'category_card'"></product-card>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import productCard from '../../components/productCard/productCard'
import BScroll from 'better-scroll'

// import {mapState, mapActions} from 'vuex'
export default {
    name: 'listNavbar',
    data(){
        return{
            isWechat: false,
            navActive: 0,
            navScrollFlag: true,
            navScroll: null,   //左侧导航滚动列表
            navScrollY: 0,
            itemScroll: null,    //右侧滚动列表
            itemScrollY: 0,
            listArr: [],   //右侧列表元素集合
            listNavArr: [],  //左侧导航元素集合
            itemListTop: [],   //右侧列表元素高度集合
            itemContainerHeight: 0,  //左侧导航滚动列表总高度
            itemWrapperHeight: 0,  //左侧导航滚动列表容器高度
            navContainerHeight: 0,  //左侧导航滚动列表总高度
            navWrapperHeight: 0,  //左侧导航滚动列表容器高度
            navTopIdx: 0,   //左侧导航中间部分开始index
            navBottomIdx: 0,   //左侧导航中间部分结束index
        }
    },
    components: {
        'product-card': productCard
    },
    props: ['options'],
    computed: {
    },
    created() {
        this.checkWechat();
        
    },
    mounted() {
        var len = 0;
        setTimeout(() => {
            const topH = document.getElementById('head_top').clientHeight;
            const footH = document.getElementById('foot_nav').clientHeight;
            const screenH = window.screen.availHeight;
            const ulH = Math.ceil(document.getElementById('list_nav').getElementsByTagName('ul')[0].clientHeight);
            var contentH = screenH - topH - footH;
            if(ulH < contentH) {
                var len = 0;
                var liH = 0;
                for(var i in this.options) {
                    len ++;
                }
                liH = screenH / len;
                var liList = document.getElementById('list_nav').getElementsByTagName('li');
                for(var i in liList) {
                    if(liList[i].style) {
                        liList[i].style.height = liH + 'px';
                    }
                }
            }
            var pecent = 1 - (topH + footH) / screenH;

            if(!this.isWechat) {
                document.getElementById('list_navbar').style.height = String(pecent * 100) + '%';
            } else {
                document.getElementById('list_navbar').style.height = String(pecent * 100 - 3.3) + '%';
            }
        }, 300);
        setTimeout(() => {
            this.initScroll();
        },1000);
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
            _self.navScroll = new BScroll(_self.$refs.listNav, {  
                probeType: 2,
                bounce: true,
                resizePolling: 60,
                click: true,
            });
            _self.itemScroll = new BScroll(_self.$refs.listContainer, {  
                probeType: 2,
                bounce: true,
                resizePolling: 60,
                click: true,
            }); 

            //保存两侧元素和高度
            _self.listNavArr = Array.from(_self.$refs.listNav.children[0].children);  //左侧导航每个元素集合
            _self.navWrapperHeight = _self.$refs.listNav.clientHeight;  //左侧导航容器的高度
            _self.navContainerHeight = _self.$refs.listNav.children[0].clientHeight;  //左侧导航整体的高度
            _self.navSingleHeight = _self.$refs.listNav.children[0].children[0].clientHeight;   //左侧导航每个元素的高度
            _self.listArr = Array.from(this.$refs.listContainer.children[0].children);  
            //右侧列表每个元素集合
            _self.itemWrapperHeight = _self.$refs.listContainer.clientHeight;  //右侧列表容器的高度
            _self.itemContainerHeight = _self.$refs.listContainer.children[0].clientHeight;  //右侧列表整体的高度
            _self.navPageItemNum = Math.ceil(_self.navWrapperHeight / _self.navSingleHeight)  //左侧导航一页包括的元素数量
            for(var i in _self.options) {     //右侧列表每个元素的高度
                _self.itemListTop[i] = _self.$refs['list' + i][0].offsetTop;
            }
            console.log(_self.itemListTop);
            _self.getNavScrollArea();
            _self.itemScrollListen();
        },
        pickNav(key, itemScrollFlag) {
            const _self = this;
            const navPicked = _self.$refs['nav' + key][0];
            const listPicked = this.$refs['list' + key][0];
            const index = _self.listNavArr.indexOf(navPicked);
            const midHeight = _self.$refs.listNav.children[0].children[5].offsetTop;
            const distanceToMid = navPicked.offsetTop - _self.navWrapperHeight / 2;
            var top = 0;
            if(!_self.isWechat) {
                top = _self.itemListTop[key];
            } else {
                top = _self.itemListTop[key];   //微信浏览器高度计算可能不同
            }
            _self.navActive = key;
            //左侧菜单定位
            if(index > _self.navTopIdx && index < _self.navBottomIdx) {
                _self.navScroll.scrollTo(0, - distanceToMid, 300);
            } else if(index <= _self.navTopIdx){
                _self.navScroll.scrollTo(0, 0, 300);
            } else {
                _self.navScroll.scrollTo(0, -(_self.navContainerHeight - _self.navWrapperHeight), 300);
            }
            if(itemScrollFlag) {
                _self.navScrollFlag = false;
                //右侧列表定位
                if(top > (_self.itemContainerHeight - _self.itemWrapperHeight)) {
                    _self.itemScroll.scrollTo(0, -(_self.itemContainerHeight - _self.itemWrapperHeight), 300);
                    _self.navScrollFlag = true;
                } else {
                    _self.itemScroll.scrollTo(0, -top, 300);
                    _self.navScrollFlag = true;
                }
            }
        },
        getNavScrollArea() {
            const _self = this;
            for(let i = 0; i < _self.listNavArr.length; i++) {
                if(_self.listNavArr[i].offsetTop > _self.navWrapperHeight / 2 ) {
                    _self.navTopIdx = i - 1;
                    break;
                }
            }
            for(let i = _self.listNavArr.length - 1; i > 0; i-- ) {
                if(_self.listNavArr[i].offsetTop < (_self.navContainerHeight - _self.navWrapperHeight/2)) {
                    _self.navBottomIdx = i;
                    break;
                }
            }
        },
        itemScrollListen() {
            const _self = this;
            const num = Math.floor(_self.navPageItemNum / 2);
             //监听拖动右侧list,改变左侧导航滚动位置
            _self.itemScroll.on('scroll', (pos) => {
                    if(- pos.y > (_self.itemListTop[_self.itemListTop.length - 1] - _self.itemWrapperHeight / 2)) {
                        _self.navActive = _self.itemListTop.length - 1;
                    } else {
                        for(var i = 0; i < _self.itemListTop.length; i++) {
                            //拖动右侧list到底部时，左侧nav acitve元素保持为最后一个
                            // if(-pos.y < (_self.itemListTop[i] - _self.itemWrapperHeight/2)) {
                            //     _self.navActive = i - 1;
                            //     break;
                            // }
                            // if(-pos.y >= (_self.itemContainerHeight - _self.itemWrapperHeight)) {
                            //     console.log(111);
                            //     _self.navActive = _self.itemListTop.length - 1;
                            //     break;
                            // }
                            //判断右侧当前位置和左侧导航位置关系
                            if (- pos.y < (_self.itemListTop[i] - _self.itemWrapperHeight / 2)) {
                                _self.navActive = i - 1;
                                if(_self.navActive <= num) {
                                    _self.navScroll.scrollTo(0, 0, 300);
                                } else if (_self.navActive >= _self.listNavArr.length - 1 - num) {
                                    //左侧nav滚动到最后一页时，左侧nav保持滚动到底部
                                    _self.navScroll.scrollTo(0, -(_self.navContainerHeight - _self.navWrapperHeight), 300);
                                } else {
                                    _self.navScroll.scrollTo(0, -(_self.listNavArr[_self.navActive + 1].offsetTop - _self.navWrapperHeight/2), 300);
                                }
                                break;
                            }
                        }
                    }
                // }
            });
        },
    },

}

</script>

<style lang="scss" scoped>
@import '../../style/common';
@import '../../style/icon';

#list_navbar {
    top: 1.95rem;
    // bottom: 2.25rem;
    // padding-bottom: 2.25rem;
    // position: relative;
    display: flex;
    flex: 1;
    // flex-direction: row;
    position: absolute;
    right: 0;
    left: 0;
    height: 100%;
    overflow-y: hidden;
    height: 82.6%;
    #list_nav {
        width: 20%;
        float: left;
        // padding-top: 4.3rem;
        // padding-bottom: 4.3rem;
        ul {
            width: 100%;
            li {
                position: relative;
                height: 1.8rem;
                // border-bottom: 1px solid #f3f3f3;
                // background-color: #ebedf1;
                background-color: $theme;
                display: block;
                text-align: center;
                vertical-align: middle;
                &.active {
                    // border-left: .12rem solid $yellow;
                    background-color: #fff;
                    span {
                        color: $yellow;
                    }
                    &:after {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 3px;
                        height: 100%;
                        background-color: $yellow;
                    }
                }
                span {
                    width: 100%;
                    padding: .3rem .3rem;
                    font-size: .4rem;
                    color: #fff;
                    letter-spacing: 1px;
                    display: inline-block;
                    line-height: .8rem;
                    @include center;
                }
            }
        }
    }
    #list_container {
        float: left;
        width: 80%;
        @include gradientBg;
        z-index: 1;
        .list-head {
            @include fbethoz;
            .title {
                font-size: .7rem;
                font-weight: 500;
                line-height: 1.8rem;
                color: $yellow;
                padding-left: 1rem;
            }
            .more {
                width: 2.4rem;
                height: 1.8rem;
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
