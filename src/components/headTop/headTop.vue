<template>
    <header id='head_top'>
        <slot name='logo'></slot>
        <slot name='title'></slot>
        <slot name='save'></slot>
        <div v-if="back" class="icon icon_back head_goback" @click="$router.go(-1)"></div>
        <section v-if="search" class="head_search">
            <mu-text-field :fullWidth="true" hintText="搜索商品"/>
        </section>
        <section v-if="showLogin" class="head_login">
            <a href="http://passport.ihuipao.cn/site/login" class="login_span">登录</a>
        </section>
        <!-- <router-link to="/profile" class="head_login" tag="section">
            <span class="login_span">登录</span>
        </router-link> -->
    </header>
</template>

<script>
    // import {mapState, mapActions} from 'vuex'
    export default {
        name: 'headTop',
        data(){
            return{
                userInfo: false,
                signinUp: true
            }
        },
        mounted(){
            //获取用户信息
            // this.getUserInfo();

        },
        props: ['search', 'back', 'showLogin'],
        computed: {
            // ...mapState([
            //     'userInfo'
            // ]),
        },
        methods: {
            // ...mapActions([
            //     'getUserInfo'
            // ]),
        },

    }

</script>

<style lang="scss" rel="stylesheet/scss" scope>
@import '../../style/mixin';
@import '../../style/icon';
.head_search {
    .mu-text-field {
        padding-left: 3rem;
        margin-bottom: 0;
    }
    .mu-icon {
        font-size: 1.4rem;
        top: 12px;
        left: .6rem;
        color: #fff;
    }
    .mu-text-field-content {
        padding-top: 10px;
    }
    .mu-text-field.focus-state {
        .mu-text-field-icon {
            color: $red;
        }
    }
    .mu-text-field-hint {
        padding-left: .4rem;
        font-size: .6rem;
        line-height: 1.2rem;
        color: #fff;
    }
    .mu-text-field-input {
        color: #fff;
        font-size: .6rem;
        padding: .1rem .4rem .1rem;
    }
    .mu-text-field-line {
        left: 2.6rem !important;
        background-color: #fff !important;
    }
    .mu-text-field-focus-line {
        left: 2.6rem !important;
        background-color: $red !important;
    }
    .mu-text-field-focus-line.focus {
        background-color: $red !important;
    }
}

#head_top {
    background-color: $theme;
    // background-color: rgba(42, 40, 43, .6);
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
}
.head_goback {
    position: absolute;
    top: .4rem;
    left: .2rem;
    line-height: 2.2rem;
    margin-left: .4rem;
    z-index: 1000;
}
.head_search {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0%, -50%);
    // @include center;
    line-height: .34rem;
    input {
        @include wh(11rem, 1.2rem);
        padding: .1rem .6rem .1rem;
        border-radius: .15rem;
    }
    .btn_search {
        right: -1.4rem;
        @include wh(.8rem, .8rem);
        @include ct;
    }
}
.head_login {
    right: 0.55rem;
    @include sc(0.65rem, #fff);
    @include ct;
    .login_span{
        color: #fff;
    }
    .user_avatar {
        fill: #fff;
        @include wh(.8rem, .8rem);
    }
}
.title_head {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text {
        @include sc(0.8rem, #fff);
        text-align: center;
        font-weight: bold;
    }
}
</style>
