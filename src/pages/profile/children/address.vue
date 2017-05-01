<template>
    <div class="child-page paddingTop">
        <head-top :back="true">
            <span slot="title" class="head-name">收货地址</span>
            <span slot="save" class="head-action" @click="save">保存</span>
        </head-top>
        <div class="address-container">
            <div v-if="login.address.length === 0" class="no-address">
                <span>请添加地址</span>
            </div>
            <ul class="address-list">
                <li class="address-item" v-for="(item, index) in addressList">
                    <div class="profile">
                        <span class="name">{{ item.consignee }}</span>
                        <span class="mobile">{{ item.mobile }}</span>
                    </div>
                    <div class="address">
                        <span></span>
                        <span>{{ item.p_name + ' ' + item.c_name + ' ' + item.address}}{{  }}</span>
                    </div>
                    <div class="handle">
                        <div class="default">
                            <div class="radio" :class="{ active : (defaultValue === index) }">
                                <mu-radio class="default-radio" label="设为默认" labelClass="radio-lable" name="group" :nativeValue="String(index)" v-model="defaultValue"/>
                            </div>
                        </div>
                        <div class="edit" @click="$router.push('/profile/address/edit' + '/?key='+ index +'')">
                            <span class="icon icon_edit"></span>
                            <span>编辑</span>
                        </div>
                        <div class="delete" @click="openDialog(index)">
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
            <mu-flat-button slot="actions" primary @click="deleteAddress" label="确定"/>
        </mu-dialog>
        <div class="address-add" @click="$router.push('/profile/address/edit')">
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
import {mapState, mapMutations} from 'vuex'
import { delAddressData, defaultAddressData } from 'service/getData'
import { cityData } from '../../../config/cityData'
import { Clone } from '../../../config/mUtils'

export default {
    name: 'address',
    components: {
        'head-top': headTop,
    },
    data() {
        return {
            dialog: false,
            deleteIdx: null,
            defaultValue: '0',
            region: []
        }
    },
    computed: {
        ...mapState([
            'login',
            'addressList'
        ])
    },
    created() {
        let address = Clone(this.addressList);
        for(let i in this.addressList) {
            if(this.addressList[i].is_default === '1') {
                this.defaultValue = String(i);
                break;
            }
        };
    },
    methods: {
        ...mapMutations(['DELETE_ADDRESS','DEFAULT_ADDRESS']),
        save() {
            this.DEFAULT_ADDRESS(this.defaultValue);
            defaultAddressData(this.addressList[this.defaultValue].address_id).then(res => {
                this.$BMessage.show(res.message);
                if(res.message === '操作成功') {
                    this.$router.go(-1);
                }
            });
        },
        deleteAddress() {
            delAddressData(this.addressList[this.deleteIdx].address_id).then(res => {
                if(this.addressList[this.deleteIdx].is_default === '1') {
                    if(this.addressList[0]) {
                        this.DEFAULT_ADDRESS(0);
                    }
                }
                this.DELETE_ADDRESS(this.deleteIdx);
                this.dialog = false;
                this.$BMessage.show(res.message);
            });
        },
        openDialog(idx) {
            this.deleteIdx = idx;
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

.no-address {
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
        @include bis('../../../images/map.png');
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

.child-page {
    padding-bottom: 1.95rem;
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