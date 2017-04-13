<template>
    <div class="card shadow" :class="myClass">
        <router-link 
            :to="{ path: '/product?id=' + property.id}" 
            tag="div">
            <img v-lazy="property.img" />
            <div class="info">
                <p class="desc">
                    {{ property.desc }}
                </p>
                <div class="price">
                    <span class="price-count">¥{{ property.price }}</span>
                    <span v-if="property.price !== property.priceOriginal" class="price-origin">¥{{ property.priceOriginal }}</span>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'productCard',
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
        padding: .8rem .6rem;
        // height: 3rem;
        .desc {
            height: 1.6rem;
            line-height: .8rem;
            color: #fff;
            font-size: .5rem;
            text-align:justify;
            overflow: hidden;
        }
        .price {
            // text-align: center;
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
                margin-right: 1rem;
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