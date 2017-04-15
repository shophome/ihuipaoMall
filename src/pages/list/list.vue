<template>
    <div class="wrap paddingTop infinite-container">
        <div class="goods-list" ref="container">
            <div class="goods-item shadow" v-for="(item, index) in goodsList" :key="index">
                <goods-card :property="item"></goods-card>
            </div>
        </div>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" :loadingText="loadingText"/>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getListData } from 'src/service/getData'
import goodsCard from '../../components/goodsCard/goodsCard'

export default {
    name: 'list',
    data() {
        return {
            goodsList: [],
            page: 1,
            loading: false,
            scroller: null,
            scrollEnd: false,
            loadingText: '正在加载...'
        }
    },
    components: {
        'goods-card': goodsCard
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.type = vm.$route.query.type;
            vm.id = vm.$route.query.id;
        })
    },
    created() {
        this.SHOW_HEADTOP(true);
        this.SHOW_HEADTOP_BACK(true);
        this.SHOW_HEADTOP_SEARCH(false);
        this.SHOW_FOOTNAV(false);
        getListData().then(res => {
            this.goodsList = res.data1;
        });
    },
    mounted() {
        this.$el.style.height = window.screen.availHeight + 'px';
        this.scroller = this.$el;
    },
    methods: {
        ...mapMutations(['SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV']),
        loadMore () {
            this.loading = true;
            if(!this.scrollEnd) {
                if(this.page >= 4) {
                    this.scrollEnd = true;
                    setTimeout(() => {
                        var par = document.querySelector('.mu-infinite-scroll');
                        var chl = par.querySelector('.mu-circle-wrapper');
                        par.removeChild(chl);
                        this.$toasted.show("到底咯～", { 
                            theme: "bubble", 
                            position: "bottom-center", 
                            duration : 800
                        });
                        this.loadingText = '到底儿了～';
                        this.loading = false;
                    }, 2000);
                    return false;
                } else {
                    setTimeout(() => {
                        getListData().then(res => {
                            this.page += 1;
                            this.goodsList = this.goodsList.concat(res['data' + this.page]);
                        });
                        this.loading = false;
                    }, 2000);
                }
            } else {
                this.loading = false;
                
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
    padding-bottom: 1rem;
    @include gradientBg;
    @include paddingLR;
}

.infinite-container{
    // overflow: auto;
    // -webkit-overflow-scrolling: touch;
    // overflow-y: scroll;
}

.goods-list {
    margin-top: 1rem;
    width: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: visible;
    @include fbethoz;
    .goods-item {
        width: 46%;
        margin-bottom: 1.4rem;
        float: left;
        img {
            width: 100%;
        }
    }
}
</style>