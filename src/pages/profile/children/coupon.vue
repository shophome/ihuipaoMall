<template>
    <div class="child-page paddingTop">
        <head-top :back="true"></head-top>
        <div class="coupon-container">
            <div class="tab">
                <div class="tab-container">
                    <mu-tabs :value="activeTab" @change="handleTabChange">
                        <mu-tab value="unused" title="未使用"/>
                        <mu-tab value="used" title="已使用"/>
                        <mu-tab value="overdue" title="已过期"/>
                    </mu-tabs>
                </div>
            </div>
            <div class="tab-content">
                <div v-if="activeTab === 'unused'">
                    <ul class="coupon-list">
                        <li class="coupon-item">
                            <div class="time">
                                <span>时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="sum">
                                <span>¥</span>
                                <span>10</span>
                            </div>
                            <div class="condition">
                                <span>使用条件：</span>
                                <div>
                                    <span>¥</span>
                                    <span>10</span>
                                </div>
                            </div>
                            <div class="overdue">
                                <span>过期时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="dash"></div>
                            <div class="state unused">未使用</div>
                        </li>
                        <li class="coupon-item">
                            <div class="time">
                                <span>时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="sum">
                                <span>¥</span>
                                <span>10</span>
                            </div>
                            <div class="condition">
                                <span>使用条件：</span>
                                <div>
                                    <span>¥</span>
                                    <span>10</span>
                                </div>
                            </div>
                            <div class="overdue">
                                <span>过期时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="dash"></div>
                            <div class="state unused">未使用</div>
                        </li>
                        <li class="coupon-item">
                            <div class="time">
                                <span>时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="sum">
                                <span>¥</span>
                                <span>10</span>
                            </div>
                            <div class="condition">
                                <span>使用条件：</span>
                                <div>
                                    <span>¥</span>
                                    <span>10</span>
                                </div>
                            </div>
                            <div class="overdue">
                                <span>过期时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="dash"></div>
                            <div class="state unused">未使用</div>
                        </li>
                        <li class="coupon-item">
                            <div class="time">
                                <span>时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="sum">
                                <span>¥</span>
                                <span>10</span>
                            </div>
                            <div class="condition">
                                <span>使用条件：</span>
                                <div>
                                    <span>¥</span>
                                    <span>10</span>
                                </div>
                            </div>
                            <div class="overdue">
                                <span>过期时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="dash"></div>
                            <div class="state unused">未使用</div>
                        </li>
                    </ul>
                </div>
                <div v-if="activeTab === 'used'">
                    <ul class="coupon-list">
                        <li class="coupon-item">
                            <div class="time">
                                <span>时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="sum">
                                <span>¥</span>
                                <span>10</span>
                            </div>
                            <div class="condition">
                                <span>使用条件：</span>
                                <div>
                                    <span>¥</span>
                                    <span>10</span>
                                </div>
                            </div>
                            <div class="overdue">
                                <span>过期时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="dash"></div>
                            <div class="state">已使用</div>
                        </li>
                        <li class="coupon-item">
                            <div class="time">
                                <span>时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="sum">
                                <span>¥</span>
                                <span>10</span>
                            </div>
                            <div class="condition">
                                <span>使用条件：</span>
                                <div>
                                    <span>¥</span>
                                    <span>10</span>
                                </div>
                            </div>
                            <div class="overdue">
                                <span>过期时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="dash"></div>
                            <div class="state">已使用</div>
                        </li>
                    </ul>
                </div>
                <div v-if="activeTab === 'overdue'">
                    <ul class="coupon-list">
                        <li class="coupon-item">
                            <div class="time">
                                <span>时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="sum">
                                <span>¥</span>
                                <span>10</span>
                            </div>
                            <div class="condition">
                                <span>使用条件：</span>
                                <div>
                                    <span>¥</span>
                                    <span>10</span>
                                </div>
                            </div>
                            <div class="overdue">
                                <span>过期时间：</span>
                                <span>2017-03-10 15:26:58</span>
                            </div>
                            <div class="dash"></div>
                            <div class="state">已过期</div>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import headTop from 'components/headTop/headTop'

export default {
    name: 'coupon',
    components: {
        'head-top': headTop,
    },
    data() {
        return {
            activeTab: 'unused'
        }
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
    margin-top: 3rem;
}

.coupon-item {
    position: relative;
    width: 90%;
    height: 5.6rem;
    background-color: #fff;
    border-radius: 1rem;
    margin: 1rem auto;
    box-shadow: 0 3px 20px rgba(0,0,0,.198039), 0 5px 40px rgba(0,0,0,.119608);
    .time {
        position: absolute;
        top: 5%;
        left: 5%;
        span {
            color: #757575;
            font-size: .5rem;
        }
    }
    .overdue {
        position: absolute;
        top: 80%;
        left: 5%;
        span {
            color: #757575;
            font-size: .5rem;
        }
    }
    .condition {
        position: absolute;
        top: 40%;
        left: 50%;
        span {
            color: #757575;
            font-size: .5rem;
        }
    }
    .sum {
        position: absolute;
        top: 20%;
        left: 10%;
        font-size: 2.3rem;
        span {
            font-weight: 900;
            color: #cab36a;
            &:nth-child(1) {
                font-size: 2rem;
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
        &.unused {
            color: #cab36a;
        }
    }
}

</style>