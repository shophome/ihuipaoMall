<template>
    <div class="child-page paddingTop">
        <head-top :back="true"></head-top>
        <div>address</div>
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
        }
    },
    created() {
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
    
</style>