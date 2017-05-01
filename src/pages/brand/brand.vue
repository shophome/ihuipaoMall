<template>
    <div class="wrap paddingTop">
        <top-navbar :options="brandData"></top-navbar>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import topNavbar from '../../components/topNavbar/topNavbar'
import { getBrandData } from 'src/service/getData'

export default {
    name: 'brand',
    data() {
        return {
            brandData: []
        }
    },
    components: {
        'top-navbar': topNavbar
    },
    computed: mapState([
        'brand',
    ]),
    created() {
        this.SHOW_HEADTOP(true);
        this.SHOW_HEADTOP_BACK(true);
        this.SHOW_HEADTOP_SEARCH(false);
        this.SHOW_FOOTNAV(true);
        this.HEAD_TOP_TITLE('品牌')
        this.LOADING(true);
        setTimeout(() => {
            this.LOADING(false);
        }, 800)
        if(this.brand.length > 0) {
            this.brandData = this.brand;
        } else {
            getBrandData().then(res => {
                this.brandData = res.data;
                this.SAVE_BRAND(res.data);
            });
        }
    },
    beforeRouteLeave (to, from, next) {
        this.HEAD_TOP_TITLE(null);
        next();
    },
    methods: {
        ...mapMutations(['LOADING','HEAD_TOP_TITLE','SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV','SAVE_BRAND']),
    }
}
</script>

<style lang="scss" scoped>
    
</style>