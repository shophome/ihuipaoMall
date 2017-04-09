<template>
    <div class="child-page paddingTop">
        <head-top :back="true">
            <span slot='title' class="head-title">收货地址</span>
        </head-top>
        <div class="address-container">
            <ul class="address-list">
                <li class="address-item">
                    <div class="profile">
                        <span class="name">邵一波</span>
                        <span class="mobile">13771084707</span>
                    </div>
                    <div class="address">
                        <span>江苏无锡滨湖区东南大学立业楼D区402</span>
                    </div>
                    <div class="handle">
                        <div class="default">
                            <div class="radio" :class="{ active : (defaultValue === '1') }">
                                <mu-radio class="default-radio" label="设为默认" labelClass="radio-lable" name="group" nativeValue="1" v-model="defaultValue"/>
                            </div>
                        </div>
                        <div class="edit" @click="$router.push('/profile/address/edit' + '/?key=1')">
                            <span class="icon icon_edit"></span>
                            <span>编辑</span>
                        </div>
                        <div class="delete" @click="deleteAddress">
                            <span class="icon icon_delete"></span>
                            <span>删除</span>
                        </div>
                    </div>
                </li>
                <li class="address-item">
                    <div class="profile">
                        <span class="name">邵一波</span>
                        <span class="mobile">13771084707</span>
                    </div>
                    <div class="address">
                        <span>江苏无锡滨湖区东南大学立业楼D区402</span>
                    </div>
                    <div class="handle">
                        <div class="default">
                           <div class="radio" :class="{ active : (defaultValue === '2') }">
                                <mu-radio class="default-radio" label="设为默认" labelClass="radio-lable" name="group" nativeValue="2" v-model="defaultValue"/>
                            </div>
                        </div>
                        <div class="edit" @click="$router.push('/profile/address/edit' + '/?key=2')">
                            <span class="icon icon_edit"></span>
                            <span>编辑</span>
                        </div>
                        <div class="delete" @click="deleteAddress">
                            <span class="icon icon_delete"></span>
                            <span>删除</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <mu-dialog :open="dialog" title="" @close="closeDialog">
            确认要删除该地址吗？
            <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="closeDialog" label="确定"/>
        </mu-dialog>
        <div class="address-add">
            <span class="icon icon_add"></span>
            <span>添加新地址</span>
        </div>
        <transition name="router-float" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import headTop from 'components/headTop/headTop'

export default {
    name: 'address',
    components: {
        'head-top': headTop,
    },
    data() {
        return {
            dialog: false,
            defaultValue: '1'
        }
    },
    created() {
    },
    methods: {
        deleteAddress() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        }
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

.icon_edit {
    @include bis('../../../images/edit.png');
    background-position: (0, 10%);
}

.icon_delete {
    @include bis('../../../images/delete.png');
}

.icon_add {
    @include bis('../../../images/add.png');
}

.radio-lable {
    font-size: .6rem;
}

.address-container {
    .address-list {
        .address-item {
            margin-bottom: .6rem;
            background-color: #fff;
            .profile {
                @include paddingLR;
                @include paddingTB(.4rem, .4rem);
                @include fbethoz;
                .name {

                }
                .mobile {

                }
            }
            .address {
                @include paddingTB(.4rem, .4rem);
                @include paddingLR;
                border-bottom: 1px solid #eee;
            }
            .handle {
                @include paddingLR;
                @include paddingTB(.4rem, .4rem);
                @include fbethoz;
                height: 2rem;
                .default {
                    margin-top: .4rem;
                    width: 60%;
                }
                .edit {
                    span {
                        display: inline-block;
                        height: .8rem;
                        vertical-align: middle;
                    }
                }
                .delete {
                    span {
                        display: inline-block;
                        height: .8rem;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
}
.address-add {
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