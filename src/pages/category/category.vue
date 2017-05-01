<template>
    <div class="wrap">
        <list-navbar :options="categoryData"></list-navbar>
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import listNavbar from '../../components/listNavbar/listNavbar'
import { getCategoryData } from 'src/service/getData'

export default {
    name: 'category',
    data() {
        return {
            categoryData: []
        }
    },
    components: {
        'list-navbar': listNavbar
    },
    computed: mapState([
        'category',
    ]),
    created() {
        this.SHOW_HEADTOP(true);
        this.SHOW_HEADTOP_BACK(true);
        this.SHOW_HEADTOP_SEARCH(false);
        this.SHOW_FOOTNAV(true);
        this.HEAD_TOP_TITLE('商品分类');
        this.LOADING(true);
        setTimeout(() => {
            this.LOADING(false);
        }, 800);
        if(this.category.length > 0) {
            this.categoryData = this.category;
        } else {
            getCategoryData().then(res => {
                this.categoryData = res.data;
                this.SAVE_CATEGORY(res.data);
            });
        }
    },
    beforeRouteLeave (to, from, next) {
        this.HEAD_TOP_TITLE(null);
        next();
    },
    methods: {
        ...mapMutations(['LOADING','HEAD_TOP_TITLE','SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV','SAVE_CATEGORY']),
    }
}
</script>

<style lang="scss">
.category_card {
    div {
        .info {
            padding: .3rem .3rem;
            .desc {
                font-size: .5rem;
                height: 1.6rem;
                line-height: .8rem;
            }
            .price {
                height: 1rem;
                .price-count {
                    font-size: .6rem;
                }
            }
        }
    }
}   
</style>

<style lang="scss" scoped>
@import '../../style/mixin';

.wrap {
    height: 100%;
    // background-color: $themeSecond;
    // background: linear-gradient($theme, $themeSecond);
    @include gradientBg;
    overflow-y: scroll;
}

</style>