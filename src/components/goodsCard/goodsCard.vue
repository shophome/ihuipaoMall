<template>
    <div class="card shadow" :class="myClass">
        <router-link 
            :to="{ path: '/goods?id=' + property.id}" 
            tag="div">
            <img v-lazy="property.img + '?imageView2/1/w/180/h/180/q/100'" />
            <div class="info">
                <p class="desc">
                    {{ property.desc }}
                </p>
                <div class="price">
                    <span class="price-count">¥{{ property.price }}</span>
                    <!-- <span v-if="property.price !== property.priceOriginal" class="price-origin">¥{{ property.priceOriginal }}</span> -->
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'goodsCard',
    data() {
        return {
        }
    },
    props: [
        'property',
        'myClass'
    ]
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '../../style/mixin';

img {
    width: 100%;
}
.card {
    background-color: $themeSecond;
    margin: 0;
    .info {
        padding: .4rem .5rem;
        .desc {
            height: 1.6rem;
            line-height: .8rem;
            color: #fff;
            font-size: .5rem;
            text-align:left;
            overflow: hidden;
        }
        .price {
            @include fbethoz;
            height: 1rem;
            p {
                display: inline-block;
                font-size: 16px;
            }
            span {
                display: inline-block;
                vertical-align: middle;
            }
            .price-count {
                color: $yellow;
                font-size: .6rem;
            }
            .price-origin {
                position: relative;
                margin: 0;
                font-size: .5rem;
                color: #9e9e9e;
                padding-top: .1rem;
                &:before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: -5%;
                    width: 115%;
                    height: 2px;
                    background: #9e9e9e;
                }
            }
        }
    }
}
</style>