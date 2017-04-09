<template>
    <div class="child-page paddingTop">
        <head-top :back="true"></head-top>
        <div>balance</div>
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
    
</style>