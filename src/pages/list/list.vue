<template>
    <div class="wrap paddingTop infinite-container">
        <div class="goods-list" ref="container">
            <div class="list-wrapper" ref="listWrapper">
                <ul>
                    <li class="goods-item shadow" v-for="(item, index) in goodsList" :key="index">
                        <goods-card :property="item"></goods-card>
                    </li>
                </ul>
                <div class="list-foot" ref="listFoot"></div>
            </div>
            <div class="no-data" v-if="goodsList.length === 0">
                <span>暂无商品</span>
            </div>
            <div class="infinite-loading-container">
                <span class="infinite-loading"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getCategoryListData, getBrandListData, getSearchData } from 'src/service/getData'
import goodsCard from '../../components/goodsCard/goodsCard'
import BScroll from 'better-scroll'

export default {
    name: 'list',
    data() {
        return {
            type: '',
            id: '',
            title: '',
            goodsList: [],
            page: 1,
            listScroll: {},
            loadFlag: true,
            loading: false,
            scrollEnd: false,
        }
    },
    components: {
        'goods-card': goodsCard
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.type = vm.$route.query.type;
            vm.id = vm.$route.query.id;
            vm.title = vm.$route.query.content;
            vm.HEAD_TOP_TITLE(vm.title);
            if(vm.type === 'category') {
                getCategoryListData(vm.id, 1).then(res => {
                    vm.goodsList = res.data;
                });
            } else if(vm.type === 'brand') {
                getBrandListData(vm.id, 1).then(res => {
                    vm.goodsList = res.data;
                });
            } else if(vm.type === 'search') {
                getSearchData(vm.$route.query.content, 1).then(res => {
                    vm.goodsList = res.data.goods_lsit;
                });
            }
        })
    },
    created() {
        this.SHOW_HEADTOP(true);
        this.SHOW_HEADTOP_BACK(true);
        this.SHOW_HEADTOP_SEARCH(false);
        this.SHOW_FOOTNAV(false);
    },
    destroyed() {
        this.HEAD_TOP_TITLE(null);
    },
    mounted() {
        const _self = this;
        setTimeout(() => {
            _self.PREVENT_LOADING(true);
        }, 300);
        setTimeout(() => {
            if(this.goodsList.length > 0) {
                if(_self.$refs.listWrapper.getElementsByTagName('ul')[0].clientHeight < _self.$refs.listWrapper.clientHeight) {
                    _self.$refs.listWrapper.getElementsByTagName('ul')[0].style.height = _self.$refs.listWrapper.clientHeight + 'px';
                }
                _self.listScroll = new BScroll(_self.$refs.container, {
                    probeType: 2,
                    click: true
                });
                _self.listScroll.on('touchend', function (pos) {
                    const container = _self.$refs.container.getElementsByClassName('list-wrapper')[0];
                    const containerHeight = container.clientHeight;
                    if (pos.y < -(containerHeight - 400)) {
                        _self.$refs.listFoot.style.height = 1.4 + 'rem';
                        _self.listScroll.refresh();
                        _self.listScroll.scrollTo(0, - (containerHeight - 120), 300);
                        setTimeout(() => {
                            _self.getData();
                        }, 1000)
                    }
                })
            }
        }, 500);
    },
    destroyed() {
        this.PREVENT_LOADING(false);
    },
    methods: {
        ...mapMutations(['LOADING','HEAD_TOP_TITLE','SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV','PAGE_LOADING','PREVENT_LOADING']),
        getData() {
            const _self = this;
            if(!_self.scrollEnd) {
                if(_self.loadFlag) {
                    _self.page += 1;
                    _self.loadFlag = false;
                    if(_self.type === 'category') {
                        getCategoryListData(_self.id, _self.page).then(res => {
                            _self.loadMore(res.data);
                        });
                    } else if(_self.type === 'brand') {
                        getBrandListData(_self.id, _self.page).then(res => {
                            _self.loadMore(res.data);
                        });
                    } else if(_self.type === 'search') {
                        getSearchData(this.$route.query.content, _self.page).then(res => {
                            _self.loadMore(res.data.goods_lsit);
                        });
                    }
                }
            } else {
                _self.$refs.listFoot.style.height = 1 + 'px';
                _self.listScroll.refresh();
                _self.$toasted.show("到底咯～", { 
                    theme: "bubble", 
                    position: "bottom-center", 
                    duration : 800
                });
            }
        },
        loadMore (data) {
            const _self = this;
            if(data.length > 0) {
                _self.goodsList = _self.goodsList.concat(data);
                _self.$nextTick(function() {
                    setTimeout(() => {
                        _self.$refs.listFoot.style.height = 1 + 'px';
                        _self.listScroll.refresh();
                        _self.loadFlag = true;
                    }, 500)
                });
            } else {
                _self.$refs.listFoot.style.height = 1 + 'px';
                _self.listScroll.refresh();
                _self.$toasted.show("到底咯～", { 
                    theme: "bubble", 
                    position: "bottom-center", 
                    duration : 800
                });
                _self.scrollEnd = true;
                return false;
            }
        }
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';

.mu-infinite-scroll {
    position: fixed;
    bottom: -.4rem;
    padding-right: 1.6rem;
}

.mu-circle-spinner {
    border-color: $yellow !important;
}

.mu-infinite-scroll-text {
    color: $yellow;
}
</style>

<style lang="scss" scoped>
@import '../../style/mixin';

@mixin paddingLR {
    padding-left: 1rem;
    padding-right: 1rem;
}
.wrap {
    position: static;
    width: 100%;
    background-color: $theme;
    // @include gradientBg;
    @include paddingLR;
}

.infinite-loading-container {
    position: absolute;
    left: 50%;
    bottom: .3rem;
    z-index: 1;
    .infinite-loading {
        display: block;
        width: 1rem;
        height: 1rem;
        transform: translate(-50%, 0);
        background: url('../../images/infinite-loading.svg') no-repeat;
        background-size: contain;
        background-position: center;
    }
}

.goods-list {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: visible;
    .no-data {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: $theme;
        text-align: center;
        z-index: 10;
        span {
            display: inline-block;
            margin-top: 200px;
            color: $yellow;
        }
    }
    .list-wrapper {
        position: relative;
        z-index: 2;
        min-height: 110%;
        ul {
            height: 100%;
            background-color: $theme;
            @include fbethoz;
            align-items: flex-start;
            .list-foot {
                position: relative;
                margin-bottom: 1rem;
                background-color: inherit;
                width: 100%;
                height: 1px;
            }
        }
    }
    .goods-item {
        width: 46%;
        margin-top: 1rem;
        margin-bottom: .4rem;
        float: left;
        img {
            width: 100%;
        }
    }
}
</style>