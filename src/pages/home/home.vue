<template>
    <div class="wrap paddingTop paddingBottom">
        <section class="carousel">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, index) in carousel" :key="index">
                        <img :src="item.imgSrc">
                    </div>
                </div>
                <!-- <div class="swiper-pagination"></div> -->
            </div>
        </section>
        <section class="newProduct clearfix">
            <p class="title">新品上市</p>
            <div class="product-list">
                <div class="product-item shadow" v-for="(item, index) in newProduct" :key="index">
                    <product-card :property="item"></product-card>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'
import productCard from '../../components/productCard/productCard'

export default {
    name: 'home',
    data() {
        return {
            carousel: [],
            newProduct: []
        }
    },
    components: {
        'product-card': productCard
    },
    created() {
        this.SHOW_HEADTOP(true);
        this.SHOW_HEADTOP_BACK(false);
        this.SHOW_HEADTOP_SEARCH(true);
        this.SHOW_FOOTNAV(true);
        this.$store.dispatch('getCarousel').then((response) => {
            this.carousel = response.array;
        });
        this.$store.dispatch('getNewProduct').then((response) => {
            console.log(response);
            this.newProduct = response.array;
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

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../style/mixin';

@mixin paddingLR {
    padding-left: .6rem;
    padding-right: .6rem;
}

.wrap {
    height: 100%;
    // background-color: #fff;
    background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
    // background-color: $themeSecond;
    // background: linear-gradient($theme, $themeSecond);
    // background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    // background-image: linear-gradient(to top, #0250c5 0%, #d43f8d 100%);
    // background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
    // background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
    // background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);537895
    // background-image: linear-gradient(to top, #fff 0%, #537895 100%);
    // background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    // background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
    // background-image: linear-gradient(to top, #f43b47 0%, #453a94 100%);
    overflow-y: scroll;
}

.swiper-slide {
    img {
        width: 100%;
    }
}

.newProduct {
    @include paddingLR;
    .product-list {
        @include fbethoz;
    }
    .title {
        background-color: inherit;
        line-height: 1.4rem;
        padding: 0.2rem 1rem;
        box-sizing: border-box;
        font-size: 0.8rem;
        color: $yellow;
        text-align: center;
    }
    .product-item {
        width: 48%;
        margin-bottom: .6rem;
        float: left;
        img {
            width: 100%;
        }
    }
}

</style>