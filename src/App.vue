<template>
    <div class="app">
        <transition name="router-fade" mode="out-in">
            <head-top v-if="showHeadTop" :search="showHeadTopSearch" :back="showHeadTopBack"></head-top>
        </transition>
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <foot-nav v-if="showFootNav"></foot-nav>
    </div>
</template>

<script>
import headTop from 'components/headTop/headTop'
import footNav from 'components/footNav/footNav'
import { mapState } from 'vuex'

export default {
    name: 'app',
    components: {
        'head-top': headTop,
        'foot-nav': footNav,
    },
    computed: mapState([
        'showHeadTop',
        'showHeadTopBack',
        'showHeadTopSearch',
        'showFootNav'
    ]),
    data() {
        return {
        }
    }
}

</script>
<style lang="scss" rel="stylesheet/scss">
@import './style/common';
@import './style/mixin';

.app {
    height: 100%;
}

.head_logo {
    left: .2rem;
    @include wh(1.6rem, 1rem);
    @include ct;
    @include bis('images/logo.png');
}

.wrap { 
    background: #eee;
}



</style>
