<template>
    <div id="foot_nav" class="shadow">
        <ul>
            <router-link :to="{ path: '/home' }" tag="li" active-class="active" class="nav_item">
                <div class="icon icon_home"></div>
                <p>首页</p>
            </router-link>
            <router-link :to="{ path: '/category' }" tag="li" active-class="active" class="nav_item">
                <div class="icon icon_category"></div>
                <p>分类</p>
            </router-link>
            <router-link :to="{ path: '/brand' }" tag="li" active-class="active" class="nav_item">
                <div class="icon icon_brand"></div>
                <p>品牌</p>
            </router-link>
            <router-link :to="{ path: '/cart' }" tag="li" active-class="active" class="nav_item">
                <div v-if="Number(cart.num) > 0" class="badge"><span>{{ cart.num }}</span></div>
                <div class="icon icon_cart"></div>
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
        return {
        }
    },
    computed: {
        ...mapState(['cart'])
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
    background: $theme;
    z-index: 1070;
    ul {
        height: 100%;
        @include fmidhoz;
    }
    .nav_item {
        @include fmidver;
        position: relative;
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
        .badge {
            position: absolute;
            top: -.1rem;
            right: .6rem;
            width: .6rem;
            height: .6rem;
            line-height: .54rem;
            background-color: $red;
            border-radius: 50%;
            text-align: center;
            span {
                display: inline-block;
                color: #fff;
                font-size: .5rem;
                transform: scale(.8);
            }
        }
    }
}

</style>
