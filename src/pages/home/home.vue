<template>
    <div class="wrap paddingTop paddingBottom">
        <section class="banner">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, index) in banner" :key="index">
                        <img :src="item.img">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </section>
        <section class="newGoods clearfix">
            <p class="title">新品上市</p>
            <div class="product-list">
                <div class="product-item shadow" v-for="(item, index) in newGoods" :key="index">
                    <goods-card :property="item"></goods-card>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'
import goodsCard from '../../components/goodsCard/goodsCard'
import { getHomeData } from 'src/service/getData'

export default {
    name: 'home',
    data() {
        return {
            banner: [],
            newGoods: []
        }
    },
    components: {
        'goods-card': goodsCard
    },
    created() {
        this.SHOW_HEADTOP(true);
        this.SHOW_HEADTOP_BACK(false);
        this.SHOW_HEADTOP_SEARCH(true);
        this.SHOW_FOOTNAV(true);
        getHomeData().then(res => {
            console.log(res);
            var data = res.data;
            this.banner = data.banner;
            this.newGoods = data.newProduct;
        });
    },
    mounted() {
        setTimeout(function() {
            new Swiper('.swiper-container', {
                loop: true,
                autoplay: 5000,
                pagination: '.swiper-pagination',
            });
        },1000);
        
    },
    methods: {
        ...mapMutations(['SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV']),
    }
}
</script>

<style lang="scss">
.banner {
    .swiper-pagination {
        text-align: right;
        padding-right: 1rem;
        .swiper-pagination-bullet {
            background: #eee !important;
            &.swiper-pagination-bullet-active {
                background: #fff !important;
            }
        }
    }
}
</style>

<style lang="scss" scoped>
@import '../../style/mixin';

@mixin paddingLR {
    padding-left: 1rem;
    padding-right: 1rem;
}

.wrap {
    height: 100%;
    @include gradientBg;
    overflow-y: scroll;
}

.swiper-slide {
    img {
        width: 100%;
    }
}

.swiper-pagination-bullet-active {
    background: #fff !important;
}

.newGoods {
    @include paddingLR;
    .product-list {
        @include fbethoz;
    }
    .title {
        background-color: inherit;
        line-height: 1.8rem;
        margin-bottom: .8rem;
        padding: 0.2rem 1rem;
        box-sizing: border-box;
        font-size: 0.8rem;
        color: $yellow;
        text-align: center;
    }
    .product-item {
        width: 46%;
        margin-bottom: 1.4rem;
        float: left;
        img {
            width: 100%;
        }
    }
}

</style>