<template>
    <div class="order-detail-page child-page page-lv2 paddingTop">
        <head-top :back="true">
            <span slot='title' class="head-name">{{ title }}</span>
            <span slot="save" class="head-action" @click="saveEdit">保存</span>
        </head-top>
        <div class="form-container">
            <div class="form-group name">
                <label>收货人</label>
                <input type="text" v-model="data.consignee">
            </div>
            <div class="form-group mobile">
                <label>联系电话</label>
                <input type="text" v-model="data.mobile">
            </div>
            <div class="form-group collapse-right area" @click="openPicker">
                <label>所在地区</label>
                <span>{{ pickedProvince.name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ pickedCity.name }}</span>
            </div>
            <div class="form-group address">
                <input type="text" placeholder="详细地址" v-model="data.address">
            </div>
        </div>
        <div v-if="key !== ''" class="delete" @click="dialog = true">删除地址</div>
        <mu-dialog :open="dialog" title="" @close="closeDialog">
            确认要删除该地址吗？
            <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="deleteAddress" label="确定"/>
        </mu-dialog>
        <mu-popup position="bottom" popupClass="picker" :open="pickerIsShow" @close="closePicker">
            <div class="picker-head">
                <span class="cancle" @click="pickerIsShow = false">取消</span>
                <span class="confirm" @click="pickerConfirm">确认</span>
            </div>
            <mu-content-block>
                <mu-picker :slots="addressSlots" :visible-item-count="5" @change="pickerChange" :values="address"/>
            </mu-content-block>
        </mu-popup>
    </div>
</template>
    
<script>
import { mapState, mapMutations } from 'vuex'
import { postAddressEdit, addAddressData, delAddressData } from 'src/service/getData'
import headTop from 'components/headTop/headTop'
import { Clone } from '../../../../config/mUtils'
import { cityData } from '../../../../config/cityData'

export default {
    name: 'addressEdit',
    components: {
        'head-top': headTop,
    },
    data() {
        return {
            title: '添加地址',
            key: '',
            data: {},
            dialog: false,
            pickerIsShow: false,
            addressSlots: [
            {
                width: '100%',
                textAlign: 'right',
                values: []
            }, {
                width: '100%',
                textAlign: 'left',
                values: []
            }
            ],
            province: {},
            city: {},
            address: ['北京', '东城'],
            pickedProvince: {},
            pickedCity: {},
            topPopup: false,
            leftPopup: false,
            rightPopup: false
        }
    },
    computed: {
        ...mapState([
            'login',
            'addressList'
        ]),
        leftPickerVal() {
            let arr = cityData.map(function(val) {return val.name});
            return arr;
        },
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.key = vm.$route.query.key || '';
            if(vm.key !== '') {
                vm.title = '修改地址';
                vm.data = Clone(vm.addressList[vm.key]);
                vm.pickedProvince.name = vm.data.p_name;
                vm.pickedProvince.id = vm.data.province;
                vm.pickedCity.name = vm.data.c_name;
                vm.pickedCity.id = vm.data.city;

            } else {
                vm.title = '添加地址';
                vm.data = {};
            }
        })
    },
    created() {
        this.addressSlots[0].values = cityData.map(function(val) {return val.name});
        this.addressSlots[1].values = cityData[0].city.map(function(val) {return val.name});
    },
    methods: {
        ...mapMutations(['DELETE_ADDRESS','EDIT_ADDRESS','ADD_ADDRESS']),
        handleTabChange (val) {
            this.activeTab = val
        },
        pickerChange (value, index) {
            switch (index) {
                case 0:
                    this.addressProvince = value;
                    for(let i in cityData) {
                        if(cityData[i].name === value) {
                            this.province = cityData[i];
                            break;
                        }
                    }
                    const arr = this.province.city.map(function(val) {return val.name});
                    this.addressSlots[1].values = arr;
                    this.city = this.province.city[0];
                    break;
                case 1:
                    this.addressCity = value;
                    for(let i in this.province.city) {
                        if(this.province.city[i].name === value) {
                            this.city = this.province.city[i];
                            break;
                        }
                    }
                    break;
            }
            this.address = [this.province.name, this.city.name];
        },
        pickerConfirm() {
            this.pickedProvince = {
                id: this.province.id,
                name: this.province.name,
            };
            this.pickedCity = {
                id: this.city.id,
                name: this.city.name,
            };
            this.pickerIsShow = false;
        },
        deleteAddress() {
            delAddressData(this.addressList[this.key].address_id).then(res => {
                this.$BMessage.show(res.message);
                this.DELETE_ADDRESS(this.key);
                this.dialog = false;
                this.$router.go(-1);
            });
        },
        closeDialog() {
            this.dialog = false;
        },
        openPicker () {
            this.pickerIsShow = true;
        },
        closePicker (position) {
            this.pickerIsShow = false;
        },
        saveEdit() {
            let dataSend = {
                consignee: this.data.consignee, 
                province: this.pickedProvince.id, 
                city: this.pickedCity.id, 
                district: '0',
                mobile: this.data.mobile, 
                address: this.data.address
            };
            if(this.key !== '') {
                dataSend.id = this.data.address_id;
                postAddressEdit(dataSend).then(res => {
                    if(res.message) {
                        this.$BMessage.show(res.message);
                    }
                    let dataSave = Clone(res.data.address);
                    if(res.data) {
                        this.EDIT_ADDRESS({
                            idx: this.key,
                            data: res.data.address
                        });
                        this.$router.go(-1);
                    }
                });
            } else {
                addAddressData(dataSend).then(res => {
                    if(res.message) {
                        this.$BMessage.show(res.message);
                    }
                    if(res.data) {
                        let dataSave = Clone(res.data.address);
                        this.ADD_ADDRESS(dataSave);
                        this.$router.go(-1);
                    }
                });
            }
        }
    },
}
</script>

<style lang="scss">
@import '../../../../style/mixin';
.picker {
    width: 100%;
    background-color: #f9f9f9 !important;
    .picker-head {
        @include fbethoz;
        background-color: $theme;
        span {
            color: #fff;
            display: inline-block;
            width: 2rem;
            line-height: 1.4rem;
            text-align: center;
        }
    }
    .mu-content-block {
        .mu-picker {
            background-color: #f9f9f9;
        }
    }
}
</style>
<style lang="scss" scoped>
@import '../../../../style/mixin';

.collapse-right {
    position: relative;
    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: .6rem;
        transform: translate(0, -50%);
        width: .5rem;
        height: .5rem;
        @include bis('../../../../images/collapse_right.png');
    }
}

.form-container {
    background-color: #fff;
    .form-group {
        padding: 0 .6rem;
        border-bottom: 1px solid #eee;
        min-height: 2rem;
        label {
            display: inline-block;
            width: 20%;
            line-height: 2rem;
            text-align: left;
        }
        input {
            width: 76%;
            line-height: 2rem;
        }
        &.address {
            input {
                width: 100%;
            }
        }
    }
}

.delete {
    background-color: #fff;
    height: 2rem;
    line-height: 2rem;
    padding: 0 .6rem;
    margin-top: .6rem;
    text-align: left;
    color: $red;
}

.area-picker {
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
    .picker-head {
        @include fbethoz;
        span {
            display: inline-block;
            width: 2rem;
            line-height: 1.4rem;
            text-align: center;
        }
    }
}

</style>