<template>
    <div id="loading">
        <img src="../../images/httpLoading.svg">
    </div>
</template>

<script>
export default {
    name: 'loading',
    data(){
        return{
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../style/common';
@import '../../style/mixin';

#loading {
    background-color: #000;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: .3;
    z-index: 9999999999;
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5rem;
        transform: translate(-50% ,-50%);
    }
}


</style>
