<template>
    <div class="child-page paddingTop">
        <head-top :back="true">
            <span slot='title' class="head-title">账户设置</span>
        </head-top>
        <div class="content">
            <div class="logout">
                <a href="/Home/user/logout.html">退出登录<span class="icon icon-logout"></span></a>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from 'components/headTop/headTop'
import {mapState} from 'vuex'

export default {
    name: 'config',
    components: {
        'head-top': headTop,
    },
    data() {
        return {
            data: {}
        }
    },
    computed: {
        ...mapState([
            'login',
        ])
    },
    created() {
        this.data = this.login.account;
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';

.content {
    padding: 0 .8rem;
    height: 100%;
    @include fmidver;
    justify-content: center;
    .logout {
        width: 100%;
        border-radius: 4px;
        background-color: #03a9f4;
        a {
            display: inline-block;
            width: 100%;
            line-height: 1.8rem;
            color: #fff;
            font-size: .8rem;
            text-align: center;
            vertical-align: middle;
            line-height: 2.2rem;
        }
    }
}

.icon {
    display: inline-block;
    vertical-align: middle;
    margin-left: .6rem;
    @include wh(1rem, 1rem);
}

.icon-logout {
    @include bis('../../../images/logout.png')
}

</style>