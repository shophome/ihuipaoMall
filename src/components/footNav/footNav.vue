<template>
    <div id="foot_nav">
        <ul>
            <router-link :to="{ path: '/home' }" tag="li" active-class="active" class="nav_item">
                <div class="icon icon_home"></div>
                <p>首页</p>
            </router-link>
            <router-link :to="{ path: '/category' }" tag="li" active-class="active" class="nav_item">
                <div class="icon icon_category"></div>
                <p>分类</p>
            </router-link>
            <router-link :to="{ path: '/cart' }" tag="li" active-class="active" class="nav_item">
                <mu-badge :content="cartItemNum" circle secondary class="badge" :class="{ hide : cartItemNum === '0'}">
                    <div class="icon icon_cart"></div>
                </mu-badge>
                <p>购物车</p>
            </router-link>
            <router-link :to="{ path: 'profile' }" tag="li" active-class="active" class="nav_item">
                <div class="icon icon_profile"></div>
                <p>我的</p>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'footNav',
        data(){
            return{
            }
        },
        created() {
        },
        mounted() {
        },
        props: [''],
        computed: {
            cartItemNum() {
                var result = 0;
                for(var i in this.cartList) {
                    result ++;
                }
                return String(result);
            },
            ...mapState([
               'cartList',
            ])
        },
        methods: {
        },
    }

</script>

<style lang="scss">
#foot_nav {
    .badge {
        .mu-badge {
            transform: translate(.2rem,.5rem);
            width: .66rem;
            height: .66rem;
            line-height: .66rem;
            font-size: .4rem;

        }
        &.hide {
            .mu-badge {
                display: none;
            }
        }
    }
}
</style>

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
