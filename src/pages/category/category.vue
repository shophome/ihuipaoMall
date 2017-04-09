<template>
    <div class="wrap paddingTop">
        <list-navbar :options="categoryData"></list-navbar>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import listNavbar from '../../components/listNavbar/listNavbar'
import categoryData from '../../service/categoryData'

export default {
    name: 'category',
    data() {
        return {
            categoryData: categoryData
        }
    },
    components: {
        'list-navbar': listNavbar
    },
    created() {
        this.SHOW_HEADTOP(true);
        this.SHOW_HEADTOP_BACK(true);
        this.SHOW_HEADTOP_SEARCH(false);
        this.SHOW_FOOTNAV(false);
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