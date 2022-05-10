<template>
    <div class="instruction-footer">
        <div class="wrapper">
            <div 
                class="container" 
                :class="{expand : show}"
                @click="setFooterOpen(!show)"
            >
                <div class="content">
                    <div class="show-button">
                        <p>{{show ? 'Lukk igjen spill instruktionene' : 'Åpne opp spill instruktionene'}}</p>
                        <button alt="se hvordan å spille"> > </button>
                    </div>
                    <div class="instruction-cards" :class="{show : show}">
                        <card v-for="(card, index) in cards" :key="index"
                            :cardNumber="index + 1" 
                            :cardText="card.text" 
                            :image="card.image"
                        />
                    </div>
                </div>
                
            </div>
            <div 
                class="site-overlay"
                :class="{show : show}"
                @click="setFooterOpen(!show)"
            ></div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Card from './Card.vue'
export default {
    components: { Card },
    data() {
        return {
            cards: [
                {
                    text: "Bruk pill tastene på tastaturet til å styre ormen",
                    image: "instruction-gp1.png",
                },
                {
                    text: "Match summen på frukten og ormen for å få poeng",
                    image: "instruction-gp2.png",
                },
                {
                    text: "Hver gang nivået økes, blir ormen lengre, det blir flere eppler eller så økes farten",
                    image: "instruction-gp3.png",
                },
            ]
        }
    },
    methods: {
        ...mapMutations(['setFooterOpen'])
    },
    computed: {
        show(){
            return this.$store.getters.getFooterOpen
        }
    }
}
</script>

<style lang="scss" scoped>
.instruction-footer {
    grid-row: 2/3;
    grid-column: 1/5;
    width: 100%;
    max-height: 200px;
    height: 100%;
    align-self: end;
    position: relative;

    .wrapper {
        .container {
            position: absolute;
            background: #2E2E2E;
            height: 100%;
            width: 100%;
            min-height: 100%;
            bottom: 0;
            z-index: 110;
            transition: all 0.2s;

            &.expand {
                transition: all 0.2s;
                min-height: 50vh;
                bottom: 0;
            }
        }

        .content {
            display: grid;
            max-width: calc(1200px - 2em);
            width: 90%;
            height: 100%;
            margin: 0 auto;
            padding: 1em;
            grid-auto-flow: column;

            @media (max-width: $tablet) {
                padding: 0;
            }
            @media (max-width: $mobile-medium){
                margin: 0.1rem;
                width: 80%;
            }

            .show-button {
                justify-self: end;
                align-self: start;
                grid-column: 2/3;
                grid-row: 1/2;
            }

        }
        
        .instruction-cards {
            width: 100%;
            height: 90%;
            display: grid;
            grid-column: 1/3;
            grid-row: 1/2;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 2rem;
            align-content: center;

            opacity: 0;
            transition: opacity 0.2s;

            @media (max-width: $mobile) {
                grid-auto-flow: row;
                grid-template-columns: 1fr;
                align-self: center;
            }

            &.show {
                transition: opacity 0.2s 0.2s;
                opacity: 1;
                
                & article {
                    opacity: 0.6;
                    transition: opacity 0.2s;
                    &:hover {
                        transition: opacity 0.2s;
                        opacity: 0.85;
                        cursor: context-menu;
                    }
                }
            }
        }
    }

    .show-button {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-style: italic;
        font-size: 14px;

        p button {
            display: inline-block;
        }
        
        button {
            height: 1.7em;
            width: 1.7em;
            font-size: 16px;
            margin-left: 10px;
            border-radius: 50px;
            background: #00000000;
            color: #fff;
            font-weight: 900;
            border: double 2px #fff;
            transition: all 0.2s;
            transform: rotate(0deg);
        }
        transition: all 0.2s;

        &:hover{
            transition: all 0.2s;
            opacity: 0.8;
        }
    }

    .expand .show-button button {
        transition: all 0.2s;
        transform: rotate(90deg);
    }

    .site-overlay {
        height: 0vh;
        width: 100vw;
        background: #744bcdb0;
        position: absolute;
        bottom: 0;
        z-index: 100;
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;

        &.show {
            transition: opacity 0.2s;
            height: 100vh;
            opacity: 1;
            pointer-events: initial;

        }
    }
}
</style>