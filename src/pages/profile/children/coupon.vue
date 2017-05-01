<template>
    <div class="child-page paddingTop">
        <head-top :back="true">
            <span slot='title' class="head-title">优惠券</span>
        </head-top>
        <div class="coupon-container">
            <div class="tab">
                <div class="tab-container">
                    <mu-tabs :value="activeTab" @change="handleTabChange">
                        <mu-tab value="available" title="未使用"/>
                        <mu-tab value="used" title="已使用"/>
                        <mu-tab value="overdue" title="已过期"/>
                    </mu-tabs>
                </div>
            </div>
            <div class="tab-content">
                <div v-if="activeTab === 'available'">
                    <div v-if="login.coupon.available.length === 0" class="no-coupon">
                        <span>暂无返券</span>
                    </div>
                    <div class="coupon-list">
                        <div class="coupon-item" v-for="(item, index) in login.coupon.available" key="index">
                            <coupon-card :data="item" :state="'available'"></coupon-card>
                        </div>
                    </div>
                </div>
                <div v-if="activeTab === 'used'">
                    <div v-if="login.coupon.used.length === 0" class="no-coupon">
                        <span>暂无返券</span>
                    </div>
                    <div class="coupon-list">
                        <div class="coupon-item" v-for="(item, index) in login.coupon.used" key="index">
                            <coupon-card :data="item" :state="'used'"></coupon-card>
                        </div>
                    </div>
                </div>
                <div v-if="activeTab === 'overdue'">
                    <div v-if="login.coupon.overdue.length === 0" class="no-coupon">
                        <span>暂无返券</span>
                    </div>
                    <div class="coupon-list">
                        <div class="coupon-item" v-for="(item, index) in login.coupon.overdue" key="index">
                            <coupon-card :data="item" :state="'overdue'"></coupon-card>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import headTop from 'components/headTop/headTop'
import couponCard from 'components/couponCard/couponCard'
import {mapState} from 'vuex'

export default {
    name: 'coupon',
    components: {
        'head-top': headTop,
        'coupon-card': couponCard,
    },
    data() {
        return {
            activeTab: 'available',
        }
    },
    computed: {
        ...mapState([
            'login',
        ])
    },
    created() {
    },
    methods: {
        handleTabChange(val) {
            this.activeTab = val;
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';

.no-coupon {
    margin: 40% auto;
    position: relative;
    @include wh(4.6rem, 4.6rem);
    span {
        display: inline-block;
        position: absolute;
        left: .56rem;
        bottom: -1rem;
        font-size: .8rem;
        color: #bfbfbf;
    }
    &:before {
        position: absolute;
        display: block;
        content: '';
        @include wh(4rem, 4rem);
        @include bis('../../../images/ticket.png');
    }
    &:after {
        position: absolute;
        top: .4rem;
        right: -1rem;
        display: block;
        content: '';
        @include wh(1.6rem, 1.6rem);
        @include bis('../../../images/warn-grey.png');   
    }
}

.mu-tabs {
    background-color: #fff;
}

.mu-tab-text {
    color: #4c4c4c;
}

.child-page {
    background-color: #f7f7f7;
}

.tab {
    width: 100%;
    position: fixed;
    top: 1.95rem;
    background-color: #fff;
    z-index: 1000;
    .tab-container {
        width: 100%;
        position: relative;
        ul {
            @include fmidhoz;
            li {
                font-size: .6rem;
                line-height: 1.6rem;
                display: block;
                padding: 0 .1rem;
                flex-grow: 1;
                text-align: center;
                &.active {
                    border-bottom: 2px solid $red;
                }
            }
        }
    }
}

.tab-content {
    margin-top: 2.8rem;
    padding: .6rem;
}

.coupon-item {
    margin-bottom: .8rem;
}

</style>