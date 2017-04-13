<template>
    <div class="wrap paddingTop">
        <top-navbar :options="brandData"></top-navbar>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
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
    created() {
        this.SHOW_HEADTOP(true);
        this.SHOW_HEADTOP_BACK(true);
        this.SHOW_HEADTOP_SEARCH(false);
        this.SHOW_FOOTNAV(true);
        getBrandData().then(res => {
            this.brandData = res.data;
            console.log(res);
        });
    },
    methods: {
        ...mapMutations(['SHOW_HEADTOP','SHOW_HEADTOP_BACK','SHOW_HEADTOP_SEARCH','SHOW_FOOTNAV']),
    }
}
</script>

<style lang="scss" scoped>
    
</style>