<template>
    <div class="comment-card">
        <div class="user">
            <div class="avatar">
                <img :src="data.head_pic || 'http://r0.ihuipao.cn/vue/tpshop/img/user.png'">
            </div>
            <div class="name">
                <p>{{ data.username }}</p>
                <p class="date">{{ data.time }}</p>
            </div>
        </div>
        <div class="divide"></div>
        <div class="content">{{ data.content }}</div>
        <div class="reply" v-if="data.reply">
            <ul>
                <li>
                    <div class="avatar">
                        <img src="http://r0.ihuipao.cn/img/huipao.png">
                    </div>
                    <div class="textbox">
                        <span class="tit">官方回复：</span>
                        <span>{{ commentData.reply.content }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'commentCard',
    components: {
    },
    data() {
        return {
            commentData: {
                reply: {}
            }
        }
    },
    props: ['data'],
    watch: {
        data: function(val) {
            this.commentData = val;
        },
    },
    created() {
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';

@mixin paddingLR {
    padding-left: .8rem;
    padding-right: .8rem;
}

@mixin paddingTB($top, $bottom) {
    padding-top: $top;
    padding-bottom: $bottom;
}

.comment-card {
    @include paddingTB(.4rem, .4rem);
    background-color: #fff;
    .user {
        @include paddingLR;
        @include flefthoz;
        .avatar {
            @include wh(1.2rem, 1.2rem);
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
            }
        }
        .name {
            box-flex: 1;
            width: 86%;
            margin-left: 4%;
            @include fbethoz;
            .date {
                font-size: .5rem;
                color: #ababab;
            }
        }
        .more {
            font-size: .5rem;
        }
    }
    .divide {
        width: 100%;
        height: 1px;
        background-color: #eee;
        margin-top: 10px;
    }
    .content {
        @include paddingLR;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .reply {
        padding: 0 .8rem;
        ul {
            padding-top: .4rem;
            padding-bottom: .4rem;
            @include paddingLR;
            background-color: #f5f5f5;
            li {
                position: relative;
                .avatar {
                    position: absolute;
                    left: 0;
                    top: 0;
                    @include wh(1.2rem, 1.2rem);
                    overflow: hidden; 
                }
                .textbox {
                    font-size: .5rem;
                    .tit {
                        color: $red;
                    }
                    text-indent: 1.6rem;
                }
            }
        }
    }
}

</style>