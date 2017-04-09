<template>
    <div id="foot_nav">
        <ul>
            <router-link ref="li" v-for='(item, index) in navigation' :key="index" :to="{ path: item.path }" tag="li" active-class="active" class="nav_item">
                <div :class="'icon icon_' + item.name"></div>
                <p>{{ item.nameCN }}</p>
            </router-link>
        </ul>
    </div>
</template>

<script>
    // import {mapState, mapActions} from 'vuex'
    export default {
        name: 'footNav',
        data(){
            return{
                navigation: [
                {
                    name: 'home',
                    nameCN: '首页',
                    path: '/home'
                },
                {
                    name: 'category',
                    nameCN: '分类',
                    path: '/category'
                },
                {
                    name: 'cart',
                    nameCN: '购物车',
                    path: '/cart'
                },
                {
                    name: 'profile',
                    nameCN: '我的',
                    path: '/profile'
                },
                ]

            }
        },
        created() {
        },
        mounted() {
        },
        props: [''],
        computed: {
        },
        methods: {
        },

    }

</script>

<style lang="scss" scoped>
@import '../../style/icon';

#foot_nav {
    @include wh(100%, 2.25rem);
    padding-top: 0.1rem;
    position: fixed;
    bottom: 0;
    background: $themeSecond;
    z-index: 1050;
    ul {
        height: 100%;
        @include fmidhoz;
    }
    .nav_item {
        @include fmidver;
        flex-grow: 1;
        opacity: .3;
        transition: opacity .3s ease;
        p {
            line-height: .8rem;
            font-size: .4rem;
            color: #fff;
        }
        &.active {
            opacity: 1;
        }
    }
    
}
</style>
