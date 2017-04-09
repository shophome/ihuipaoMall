<template>
    <div class="child-page paddingTop">
        <head-top :back="true"></head-top>
        <div>benefit</div>
    </div>
</template>

<script>
import headTop from 'components/headTop/headTop'

export default {
    name: 'benefit',
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