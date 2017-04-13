<template>
    <div class="wrap">
        <list-navbar :options="categoryData"></list-navbar>
         <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
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
    created() {
        this.SHOW_HEADTOP(true);
        this.SHOW_HEADTOP_BACK(true);
        this.SHOW_HEADTOP_SEARCH(false);
        this.SHOW_FOOTNAV(true);
        getCategoryData().then(res => {
            this.categoryData = res.data;
            console.log(res);
        });
    },
    methods: {
        ...mapMutations(['SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV']),
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';

.wrap {
    height: 100%;
    background-color: $themeSecond;
    background: linear-gradient($theme, $themeSecond);
    overflow-y: scroll;
}
</style>