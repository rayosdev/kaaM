<template>
    <article :class="'card-' + cardNumber">
        <h4>{{cardNumber}}</h4>
        <p>{{cardText}}</p>
        <img :src="require('@/assets/' + image)" alt="">
    </article>
</template>

<script>
    export default {
        name: 'Card',
        props: {
            cardNumber: Number,
            cardText: String,
            image: String
        }
    }
</script>

<style lang="scss" scoped>
article {
    display: grid;
    gap: 2rem;
    opacity: 0;
    position: relative;

    @media (max-width: $mobile) {
        grid-template-columns: 0.25fr 1fr 1fr;
    }
    @media (max-width: $mobile-medium) {
        gap: 0;
        grid-template-columns: 0.2fr 1fr 0.5fr;
    }

    h4 {
        display: inline;
        font-size: 16px;
        font-weight: 900;
        transform: translateY(2px);
        position: absolute;
        left: -1.5rem;
        top: -2.5rem;
        min-width: 1.75rem;
        background: $primary;
        padding: 0.25rem 0.5rem;
        border-radius: 50%;

        @media (max-width: $mobile) {
            position: relative;
            left: auto;
            top: auto;
            width: fit-content;
            height: fit-content;
            justify-self: center;
        }
    }
    
    p {
        max-width: 200px;
        margin: 0;
        letter-spacing: 5%;
        line-height: 150%;
        text-align: left;
    }

    img  {
        height: auto;
        max-height: 4rem;
        justify-self: center;

        @media (max-width: $mobile-medium){
            max-height: 2.5rem;
        }
    }
}
</style>