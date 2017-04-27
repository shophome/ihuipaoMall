<template>
    <div class="coupon-card">
        <!-- <div class="time">
            <span>时间：</span>
            <span>{{ data.time }}</span>
        </div> -->
        <div class="sum" :class="{ disabled : state !== 'available' }">
            <span>¥</span>
            <span>{{ data.money }}</span>
        </div>
        <div class="condition">
            <span>使用条件：</span>
            <span>满¥{{ data.condition }}</span>
        </div>
        <div class="overdue">
            <span>过期时间：</span>
            <span>{{ data.timeline }}</span>
        </div>
        <div class="triangle-topright" :class="{ disabled : state !== 'available' }">
            <div class="icon icon-warn"></div>
        </div>
        <div v-if="state !== 'available'" class="state used">
            <div class="stamp stamp-used" :class="{ 'stamp-used' : state === 'used', 'stamp-overdue' : state === 'overdue' }"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'couponCard',
    components: {
    },
    data() {
        return {
        }
    },
    props: ['data','state'],
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';

.icon {
    position: absolute;
    top: -1.6rem;
    right: .2rem;
    @include wh(.6rem, .6rem);
}

.icon-warn {
    @include bis('../../images/warn.png');
}

.stamp {
    @include wh(2rem, 2rem);
    position: absolute;
    top: 60%;
    right: 0;
}
.stamp-used {
    @include bis('../../images/stamp-used.png');
}

.stamp-overdue {
    @include bis('../../images/stamp-overdue.png');
}

.triangle-topright {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: 1.8rem solid #cab36a;
    border-left: 1.8rem solid transparent; 
    &.disabled {
        border-top: 1.8rem solid #eee;
        border-left: 1.8rem solid transparent; 
    }
}

.coupon-card {
    position: relative;
    width: 90%;
    height: 5rem;
    background-color: #fff;
    border-radius: 2px;
    margin: .6rem auto;
    padding: .6rem .8rem;
    .overdue {
        span {
            color: #757575;
            font-size: .5rem;
        }
    }
    .condition {
        span {
            color: #757575;
            font-size: .5rem;
        }
    }
    .sum {
        font-size: 1.4rem;
        span {
            font-weight: 800;
            color: #cab36a;
            &:nth-child(1) {
                font-size: 1.3rem;
            }
        }
        &.disabled {
            span {
                color: #999;
            }
        }
    }
    .dash {
        position: absolute;
        width: .3rem;
        height: 100%;
        top: 0;
        right: 23%;
        border-right: .2rem dashed #eee;
    }
    .state {
        position: absolute;
        width: 1rem;
        height: 50%;
        text-align: center;
        vertical-align: middle;
        font-size: 1rem;
        color: #a5a5a5;
        font-weight: 600;
        top: 0;
        right: 10%;
        transform: translate(20%, 30%);
        &.available {
            color: #cab36a;
        }
    }
}

</style>