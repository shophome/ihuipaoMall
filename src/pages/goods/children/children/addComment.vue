<template>
    <div class="add-comment-page child-page page-lv2 paddingTop">
        <head-top :back="true">
            <span slot='title' class="head-title">编辑留言</span>
        </head-top>
        <div class="content">
            <div class="text-area">
                <mu-text-field v-model="content" multiLine :rows="3" :rowsMax="6" :maxLength="200"/>
            </div>
        </div>
        <div class="comment-add" @click="add">
            <!-- <span class="icon icon_comment"></span> -->
            <span>发布</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { addComment } from 'src/service/getData'
import headTop from 'components/headTop/headTop'

export default {
    name: 'addComment',
    components: {
        'head-top': headTop,
    },
    data() {
        return {
            id: 0,
            content: ''
        }
    },
    computed: {
        ...mapState(['login'])
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.id = vm.$route.query.id;
        })
    },
    created() {
    },
    methods: {
        ...mapMutations(['SAVE_COMMENT']),
        add() {
            let dataSend = {
                goods_id: this.id,
                username: this.login.name,
                content: this.content
            };
            addComment(dataSend).then(res => {
                this.$BMessage.show(res.message);
                let commentList = {};
                commentList.consultCount = res.data.consultCount;
                commentList.consultList = res.data.consultList;
                commentList.goods_id = this.id;
                this.SAVE_COMMENT(commentList);
                setTimeout(() => {
                    this.$router.go(-1);
                }, 1000);
            });
        }
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