<template>
    <div class="child-page paddingTop">
        <head-top :back="true">
            <span slot='title' class="head-title">用户留言({{ commentList.consultCount }})</span>
        </head-top>
        <div class="content">
            <div v-if="commentList.consultList.length === 0" class="no-comment">暂无留言</div>
            <div class="comment-list">
                <div class="comment-item shadow-light" v-for="(item, index) in commentList.consultList" :key="index" >
                    <comment-card :data="item"></comment-card>
                </div>
            </div>
        </div>
        <div class="comment-add" @click="$router.push('comment/addComment?id='+ commentList.goods_id )">
            <span class="icon icon_comment"></span>
            <span>我有话说</span>
        </div>
        <transition name="router-float" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import headTop from 'components/headTop/headTop'
import commentCard from 'components/commentCard/commentCard'

export default {
    name: 'comment',
    components: {
        'head-top': headTop,
        'comment-card': commentCard,
    },
    data() {
        return {
        }
    },
    created() {
    },
    computed: {
        ...mapState(['commentList'])
    },
}
</script>

<style lang="scss">
@import '../../../style/mixin';
.radio-lable {
    font-size: .6rem !important;
}
.radio.active {
    .radio-lable {
        color: #4800b3;
    }
}
.mu-dialog-actions {
    .mu-flat-button-label {
        color: #4800b3 !important;
    }
}
</style>

<style lang="scss" scoped>
@import '../../../style/mixin';

@mixin paddingLR {
    padding-left: .8rem;
    padding-right: .8rem;
}

@mixin paddingTB($top, $bottom) {
    padding-top: $top;
    padding-bottom: $bottom;
}

.icon {
    display: inline-block;
    @include wh(.8rem, .8rem);
}

.icon_comment {
    @include bis('../../../images/comment.png');
    background-position: (0, 10%);
}

.radio-lable {
    font-size: .6rem;
}

.content {
    height: 100%;
    .no-comment {
        text-align: center;
        font-size: 1rem;
        line-height: 10rem;
        color: #bbbbbb;
    }
    .comment-list {
        padding-bottom: 2rem;
        .comment-item {
            margin-top: .8rem;
        }
        .item {
            @include paddingTB(.4rem, .4rem);
            background-color: #fff;
            margin-bottom: 10px;
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
                    background-color: #eee;
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
    }
}

.comment-add {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.95rem;
    line-height: 1.95rem;
    background-color: $yellow;
    text-align: center;
    span {
        color: #fff;
        vertical-align: middle;
        &:nth-child(2) {
            margin-left: .3rem;
        }
    }
}

</style>