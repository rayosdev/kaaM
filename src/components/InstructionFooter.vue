<template>
    <div class="instruction-footer">
        <div class="wrapper">
            <div 
                class="container" 
                :class="{expand : show}"
                @click="setFooterOpen(!show)"
            >
                <div class="content">

                    <div class="instructions" :class="{show : show}">
                        <div class="first">
                            <h4>1.</h4>
                            <p>bruk pill tastene på tastaturet til å styre ormen</p>
                            <img src="../assets/instruction-gp1.png" alt="">
                        </div>
                        <div class="second">
                            <h4>2.</h4>
                            <p>Match summen på frukten og ormen for å få poeng</p>
                            <img src="../assets/instruction-gp2.png" alt="">
                        </div>
                        <div class="third">
                            <h4>3.</h4>
                            <p>Hver gang nivået økes, blir ormen lengre, det blir flere eppler eller så økes farten</p>
                            <img src="../assets/instruction-gp3.png" alt="">
                        </div>
                    </div>

                    <div class="show-button">
                        <p>{{show ? 'Lukk igjen spill instruktionene' : 'Åpne opp spill instruktionene'}}</p>
                        <button alt="se hvordan å spille"> > </button>
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
export default {
    data() {
        return {
            
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
    width: 100vw;
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
            max-width: 1200px;
            height: 100%;
            margin: 0 auto;
            padding: 1em;
            grid-auto-flow: column;

            .show-button {
                justify-self: end;
                align-self: start;
                grid-column: 2/3;
                grid-row: 1/2;
            }

        }
        
        .instructions {
            grid-column: 1/3;
            grid-row: 1/2;
            width: 100%;
            height: 90%;
            padding: 3em;
            display: grid;
            grid-template-rows: 1fr 1fr 1fr;
            opacity: 0;
            transition: opacity 0.2s;

            &.show {
                transition: opacity 0.2s 0.2s;
                opacity: 1;
                
                & div {
                    opacity: 0.6;
                    transition: opacity 0.2s;
                    &:hover {
                        transition: opacity 0.2s;
                        opacity: 0.85;
                        cursor: context-menu;
                    }
                }
            }

            .first{            
                justify-self: start;
                align-self: start;
            }
            .second{
                justify-self: center;
                align-self: center;
            }
            .third{
                justify-self: end;
                align-self: end;
            }

            .first,
            .second,
            .third {
                display: flex;
                opacity: 0;

                h4 {
                    display: inline;
                    font-size: 16px;
                    font-weight: 900;
                    transform: translateY(2px);
                }
                
                p {
                    max-width: 200px;
                    margin: 0;
                    margin-right: 1.5em;
                    margin-left: 10px;
                    letter-spacing: 5%;
                    line-height: 150%;
                    text-align: left;
                }

                img  {
                    width: 100%;
                    max-width: 150px;
                    height: unset;
                }
            }

            .third img {
                width: 60px;
                height: 50px;
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