<template>
    <div class="child-page paddingTop">
        <head-top :back="true">
            <span slot='title' class="head-title">我的余额</span>
        </head-top>
        <div class="present">
            <p>当前余额(元)</p>
            <p>2092</p>
        </div>
        <div class="detail">
            <div class="detail-head">
                <span>时间</span>
                <span>类型</span>
                <span>金额</span>
                <span>余额</span>
                <span>备注</span>
            </div>
            <ul class="detail-list">
                <li class="detail-item">
                    <span>2017-04-10 09:55:51</span>
                    <span>支出</span>
                    <span>0.20</span>
                    <span>986,931.09</span>
                    <span>发送短信扣费 [239]</span>
                </li>
                <li class="detail-item">
                    <span>2017-04-10 09:55:51</span>
                    <span>支出</span>
                    <span>0.20</span>
                    <span>986,931.09</span>
                    <span>发送短信扣费【134876】</span>
                </li>
                <li class="detail-item">
                    <span>2017-04-10 09:55:51</span>
                    <span>支出</span>
                    <span>0.20</span>
                    <span>986,931.09</span>
                    <span>发送短信扣费 [239]</span>
                </li>
                <li class="detail-item">
                    <span>2017-04-10 09:55:51</span>
                    <span>支出</span>
                    <span>0.20</span>
                    <span>986,931.09</span>
                    <span>发送短信扣费 [239]</span>
                </li>
                <li class="detail-item">
                    <span>2017-04-10 09:55:51</span>
                    <span>支出</span>
                    <span>0.20</span>
                    <span>986,931.09</span>
                    <span>发送短信扣费【134876】</span>
                </li>
                <li class="detail-item">
                    <span>2017-04-10 09:55:51</span>
                    <span>支出</span>
                    <span>0.20</span>
                    <span>986,931.09</span>
                    <span>发送短信扣费 [239]</span>
                </li>
                <li class="detail-item">
                    <span>2017-04-10 09:55:51</span>
                    <span>支出</span>
                    <span>0.20</span>
                    <span>986,931.09</span>
                    <span>发送短信扣费 [239]</span>
                </li>
                <li class="detail-item">
                    <span>2017-04-10 09:55:51</span>
                    <span>支出</span>
                    <span>0.20</span>
                    <span>986,931.09</span>
                    <span>发送短信扣费【134876】</span>
                </li>
                <li class="detail-item">
                    <span>2017-04-10 09:55:51</span>
                    <span>支出</span>
                    <span>0.20</span>
                    <span>986,931.09</span>
                    <span>发送短信扣费 [239]</span>
                </li>
                <li class="detail-item">
                    <span>2017-04-10 09:55:51</span>
                    <span>支出</span>
                    <span>0.20</span>
                    <span>986,931.09</span>
                    <span>发送短信扣费 [239]</span>
                </li>
                <li class="detail-item">
                    <span>2017-04-10 09:55:51</span>
                    <span>支出</span>
                    <span>0.20</span>
                    <span>986,931.09</span>
                    <span>发送短信扣费【134876】</span>
                </li>
                <li class="detail-item">
                    <span>2017-04-10 09:55:51</span>
                    <span>支出</span>
                    <span>0.20</span>
                    <span>986,931.09</span>
                    <span>发送短信扣费 [239]</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import headTop from 'components/headTop/headTop'

export default {
    name: 'balance',
    components: {
        'head-top': headTop,
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';

.present {
    width: 100%;
    height: 4rem;
    position: fixed;
    // background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
    // background-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%);
    // background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%);
    background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);

    @include fmidver;
    justify-content: center;
    p {
        color: #fff;
        text-align: center;
        font-size: .6rem;
        &:nth-child(2) {
            font-size: 1.2rem;
        }
    }
}

.detail {
    margin-top: 4rem;
    .detail-head {
        position: fixed;
        width: 100%;
        @include fmidhoz;
        line-height: 1.6rem;
        // background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
        background-image: linear-gradient(15deg, rgba(19, 84, 122, .5) 0%, rgba(128, 208, 199, .5) 100%);
        span {
            width: 20%;
            color: #fff;
            text-align: center;
            &:nth-child(2),&:nth-child(3) {
                width: 10%;
            }
        }
    }
    .detail-list {
        padding-top: 1.6rem;
        .detail-item {
            @include fmidhoz;
            &:nth-child(2n) {
                background-color: #fff;
            }
        }
        span {
            text-align: center;
            width: 20%;
            padding: .4rem 0;
            line-height: .6rem;
            font-size: .4rem;
            &:nth-child(2),&:nth-child(3) {
                width: 10%;
            }
        }
    }
}
</style>