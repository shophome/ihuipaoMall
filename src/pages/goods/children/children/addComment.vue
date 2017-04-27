<template>
    <div class="add-comment-page child-page page-lv2 paddingTop">
        <head-top :back="true">
            <span slot='title' class="head-title">编辑留言</span>
        </head-top>
        <div class="content">
            <div class="text-area">
                <mu-text-field hintText="不允许超过100个字符" multiLine :rows="3" :rowsMax="6" :maxLength="100"/>
            </div>
        </div>
        <div class="comment-add">
            <!-- <span class="icon icon_comment"></span> -->
            <span>发布</span>
        </div>
    </div>
</template>

<script>
import headTop from 'components/headTop/headTop'

export default {
    name: 'addComment',
    components: {
        'head-top': headTop,
    },
    data() {
        return {
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
        })
    },
    created() {
    },
    methods: {
    },
}
</script>

<style lang="scss">
@import '../../../../style/mixin';
.add-comment-page {
    .mu-text-field {
        width: 80%;
        margin-top: 40px;
    }
}
</style>

<style lang="scss" scoped>
@import '../../../../style/mixin';

@mixin paddingLR {
    padding-left: .8rem;
    padding-right: .8rem;
}

@mixin paddingTB($top, $bottom) {
    padding-top: $top;
    padding-bottom: $bottom;
}

.add-comment-page {
    position: fixed;
    background-color: #fff;
}

.content {
    height: 100%;
    .text-area {
        text-align: center;
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