<template>
    <header id='head_top'>
        <slot v-if="!showHeadTopBack" name='logo'></slot>
        <slot name='title'></slot>
        <div v-if="headTopTitle" class="head-top-title">
            <span class="title_text">{{ headTopTitle }}</span>
        </div>
        <slot name='save'></slot>
        <div v-if="back || showHeadTopBack" class="icon icon_back head_goback" @click="$router.go(-1)"></div>
        <section v-show="search" class="head_search">
            <mu-text-field :fullWidth="true" hintText="搜索商品" v-model="searchText" @focus="$router.push('/search')"/>
            <div v-show="!showHeadTopLogin" class="icon icon_search btn_search" @click="goSearch"></div>
        </section>
        <section v-show="showHeadTopLogin" class="head_login">
            <a v-if="!login" href="http://passport.ihuipao.cn/site/login" class="login_span">登录</a>
            <div v-if="login" class="icon icon_profile_2" @click="$router.push('/profile')"></div>
        </section>
    </header>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getCookie} from 'config/mUtils'

export default {
    name: 'headTop',
    data(){
        return{
            userInfo: false,
            signinUp: true,
            searchText: '',
            showLogin: false,
        }
    },
    props: ['search','back'],
    computed: {
        ...mapState([
            'login',
            'showHeadTopLogin',
            'showHeadTopBack',
            'headTopTitle'
        ]),
    },
    created() {
    },
    methods: {
        ...mapMutations(['LOGIN']),
        goSearch() {
            if(this.searchText) {
                this.$router.push('/list?type=search&content='+this.searchText +'');
            }
        }
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
    position: fixed;
    z-index: 1090;
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
.head-name {
    position: absolute;
    color: #fff;
    line-height: 1.95rem;
    left: 14%;
    font-size: .6rem;
}

.head-action {
    position: absolute;
    color: #fff;
    line-height: 1.95rem;
    right: 6%;
    font-size: .6rem;
}
.head-title {
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
.head-top-title {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text {
        @include sc(0.6rem, #fff);
        text-align: center;
        font-weight: bold;
    }
}
</style>
