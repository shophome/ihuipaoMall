<template>
    <div id="BMessage">
        <transition name='fade'>
            <div v-if="show" class="bmessage-container">
                <span>{{ message }}</span>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'BMessage',
    data() {
        return {
            show: false,
            message: ''
        }
    },
    created() {
    },
    mounted() {
    },
    destroyed () {
    },
    methods: {
    },
}
</script>

<style lang="scss" rel="stylesheet/scss">
#BMessage {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999;
    .bmessage-container {
        display: flex;
        align-items: center;
        width: 6rem;
        min-height: 3rem;
        padding: .4rem;
        border-radius: 4px;
        background-color: rgba(0,0,0,.7);
        text-align: center;
        line-height: 1.4rem;
        font-size: .6rem;
        font-weight: 500;
        span {
            width: 100%;
            color: #fff;
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity ease .3s;
}

.fade-enter, .fade-leave-active {
    opacity: 0;
}

</style>