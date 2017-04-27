<template>
    <div id="root">
        <loading v-if="loading"></loading>
    </div>
</template>

<script>

import headTop from 'components/headTop/headTop'
import loading from 'components/loading/loading'
import {mapState, mapMutations} from 'vuex'

export default {
    name: 'search',
    components: {
        'head-top': headTop,
        'loading': loading,
    },
    computed: mapState([
        'loading',
        'showHeadTop',
    ]),
    data() {
        return {
        }
    },
    created() {
        this.SHOW_HEADTOP_LOGIN(false);
        this.SHOW_HEADTOP_SEARCH(true);
        this.SHOW_FOOTNAV(false);
        this.HEAD_TOP_TITLE(null);
    },
    methods: {
        ...mapMutations(['HEAD_TOP_TITLE','SHOW_HEADTOP_SEARCH','SHOW_HEADTOP_LOGIN','SHOW_FOOTNAV']),
    }
}

</script>
<style lang="scss" rel="stylesheet/scss">
@import '../../style/common';
@import '../../style/mixin';
#root {
    background-color: $theme;
}

</style>
