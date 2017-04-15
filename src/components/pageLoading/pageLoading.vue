<template>
    <div id="pageLoading">
        <img src="../../images/httpLoading.svg">
    </div>
</template>

<script>
export default {
    name: 'pageLoading',
    data(){
        return{
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../style/common';
@import '../../style/mixin';

#pageLoading {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1060;
    @include gradientBg;
    &.fade-enter {
        opacity: 1
    }
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5rem;
        transform: translate(-50% ,-50%);
    }
}


</style>
