<template>
    <div class="child-page page-lv2 paddingTop">
        <head-top :back="true">
            <span slot="title" class="head-name">选择地址</span>
            <span slot="save" class="head-action" @click="save">保存</span>
        </head-top>
        <div class="address-container">
            <div v-if="addressList.length === 0" class="no-address">
                <span>请添加地址</span>
            </div>
            <ul class="address-list">
                <li class="address-item" v-for="(item, index) in addressList" @click="select(index)" :class="{ shadow : index === idxSelected }">
                    <transition name="fade">
                        <div v-if="index === idxSelected" class="triangle-topright">
                            <div class="icon icon_select"></div>
                        </div>
                    </transition>  
                    <div class="profile">
                        <span class="name">{{ item.consignee }}</span>
                        <span class="mobile">{{ item.mobile }}</span>
                    </div>
                    <div class="address">
                        <span></span>
                        <span>{{ item.p_name + ' ' + item.c_name + ' ' + item.address}}{{  }}</span>
                    </div>
                    <div class="edit" @click="$router.push('/profile/address/edit' + '/?key='+ index +'')">
                        <span class="icon icon_edit"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import headTop from 'components/headTop/headTop'
import {mapState, mapMutations} from 'vuex'

export default {
    name: 'addressSelect',
    components: {
        'head-top': headTop,
    },
    data() {
        return {
            idxSelected: -1,
            idxDefault: -1,
        }
    },
    computed: {
        ...mapState([
            'login',
            'addressList'
        ])
    },
    created() {
        this.setDefaultSelected();
    },
    methods: {
        ...mapMutations(['SELECT_ADDRESS']),
        setDefaultSelected() {
            let flag = false;
            for(let i in this.addressList) {
                if(this.addressList[i].selected === 1) {
                    this.idxSelected = Number(i);
                    flag = true;
                }
                if(this.addressList[i].is_default === '1') {
                    this.idxDefault = Number(i);
                }
            }
            if(!flag) {
                this.idxSelected =this.idxDefault;
            }
        },
        select(index) {
            this.idxSelected = index;
        },
        save() {
            this.SELECT_ADDRESS(this.idxSelected);
            this.$router.go(-1);
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';

@mixin paddingLR {
    padding-left: .8rem;
    padding-right: 1.4rem;
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

.icon_select {
    @include wh(.6rem, .6rem);
    position: absolute;
    top: -1.3rem;
    right: .14rem;
    @include bis('../../../images/select.png');
}

.triangle-topright {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: 1.5rem solid $red;
    border-left: 1.5rem solid transparent; 
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
    padding: 0 .8rem;
    .address-list {
        .address-item {
            position: relative;
            margin-top: .6rem;
            margin-bottom: .6rem;
            background-color: #fff;
            @include fbethoz;
            align-content: center;
            transition: all ease .3s;
            .profile {
                width: 100%;
                @include paddingLR;
                @include paddingTB(.4rem, .4rem);
                @include fbethoz;
                .name {
                }
                .mobile {

                }
            }
            .address {
                flex: 4;
                @include paddingTB(.4rem, .4rem);
                @include paddingLR;
            }
            .edit {
                flex: 1;
                text-align: center;
            }
        }
    }
}

</style>