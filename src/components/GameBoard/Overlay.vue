<template>
    <div 
        class="overlay"
        :class="{
            idle: state == 'idle',
            hit: state == 'hit',
            gain: state == 'gain',
            gameover: state == 'gameover',
            levelup: state == 'levelup',
            gamestart: state == 'gamestart',
            countdown: state == 'countdown',
        }"
    >
        <div class="announcement">
            <h2 class="header">{{text}}</h2>
            <p class="score" :class="{show: state == 'gameover'}">{{score}}</p>
            <p class="byline">{{byline}}</p>
            <form class="form" @submit.prevent.stop="startGame" :class="{show: state == 'gamestart'}">
                <h2>Velkomen</h2>
                <label :class="{error : !nameIsValid}" for="navn">{{nameIsValid ? 'Velg deg et spiller navn': 'Du må ha et navn for å kunne spille'}}</label>
                <input 
                    :class="{error : !nameIsValid && name == ''}" 
                    type="text" 
                    ref="navn" 
                    id="navn" 
                    value="" 
                    placeholder="navn"
                    v-model="name"
                    autocomplete="off"
                >
                <button style="opacity: 0"></button> <!-- hack to hinder bug where button.minus-one is acted on when input enter key is pressed -->
                <label for="difficulty">Velg vansklighets grad</label>
                <div class="difficulty">
                    <button class="minus-one" @click.prevent="changeOption(-1)"> < </button>
                    <select 
                        v-model="option" 
                        :class="selectClass" 
                        id="difficulty" 
                        @change="playAnim"
                        ref="select"
                    >
                        <option value="start"> Starts Nivå </option>
                        <option value="middle"> Middels </option>
                        <option value="advanced"> Viderekommende </option>
                        <option value="imposable"> Umulig </option>
                    </select>
                    <button class="pluss-one" @click.prevent="changeOption(1)"> > </button>
                </div>
                
                <input type="submit" value="Start Spillet">
                
                <div class="instructions" @click.prevent="setFooterOpen(true)">
                    <p>Se hvordan å spille</p>
                    <button alt="se hvordan å spille">?</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            state: "gamestart",
            text: "",
            score: "",
            byline: "",
            selectClass: ["anim"],
            option: "start",
            nameIsValid: true,
            name: "",
            countdown: 3

        }
    },
    methods: {
        ... mapMutations(['setFooterOpen','setPlayerName']),

        startGame(form){
            if(this.name == "") { 
                this.nameIsValid = false
                this.$refs.navn.focus()
                return
            }
            this.setPlayerName(form["target"].navn.value)
            
            let startTimer = () => {
                this.setState('countdown')
                setTimeout(() => {
                    if(this.countdown <= 1){
                        this.$emit('gamestartEvent', form["target"].difficulty.value)
                        this.setState('idle')
                    }else {
                        this.setState('idle')
                        setTimeout(() => {
                            this.countdown -= 1
                            startTimer()
                        },1)
                    }
                }, 700)
            }
            startTimer()
                
        },

        playAnim(){
            this.selectClass = []
            setTimeout(() => this.selectClass.push("anim"), 0.5)
        },

        changeOption(next){
            let optionsHTML = this.$refs.select.children
            let optionsArray = []
            for (const option of optionsHTML) {
                optionsArray.push(option.value)
            }
            const current = optionsArray.findIndex(option => option == this.option)
            if(current + next >= optionsArray.length){
                this.option = optionsArray[0]
            } else if(current + next < 0){
                this.option = optionsArray[optionsArray.length - 1]
            } else {
                this.option = optionsArray[current + next]
            }
            this.playAnim()
        },

        setState(state, args=[]){
            if(state == 'idle' && this.state == 'gameover') return
            this.state = state
            
            if(state == 'hit'){
                setTimeout(() => this.setState('idle'), 400)
                const hitSound = new Audio(require('../../assets/hit.ogg'))
                hitSound.volume = 0.4
                hitSound.play()
            }
            if(state == 'gain'){
                this.text = args
                setTimeout(() => this.setState('idle'), 400)
                const hitSound = new Audio(require('../../assets/gain.ogg'))
                hitSound.play()
            }
            if(state == 'gameover'){
                
                this.text = "Game over"
                this.score = "Din score: " + localStorage.score
                this.byline = "Trykk R for å starte om"
                const hitSound = new Audio(require('../../assets/hit.ogg'))
                hitSound.volume = 0.4
                hitSound.play()
            }

            if(state == 'newgame'){
                this.setState('idle')
            }

            if(state == 'idle'){
                this.text = ""
                this.byline = ""
            }

            if(state == 'levelup'){
                setTimeout(() => this.setState('idle'), 2300)
                const level = args[0]
                const reward = args[1]

                this.text = "LEVELUP " + level
                this.byline = `+${reward}`
            }

            if(state == 'gamestart'){
                
            }
            if(state == 'countdown'){
                this.text = this.countdown
            }
        }
    },
    mounted() {
        setTimeout(() => this.$refs.navn.focus(),10)
    },
    computed: {
        footerOpen(){
            return this.$store.getters.getFooterOpen
        }
    }
}
</script>

<style lang="scss" scoped>
.overlay {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: -10px;
    display: grid;
    justify-content: center;
    align-content: center;
    z-index: 99;
}
.announcement {
    opacity: 0.6;
    margin-bottom: 125px;
    .header {
        font-size: 40px;
    }
    .byline {
        font-size: 20px;
    }
}
.idle{
    display: none;
    transition: all 0.2s;
}
.hit {
    transition: all 0.2s;
    opacity: 1;
    animation: got-hit 0.2s 0.2s;
}

.gain {
    transition: all 0.2s;
    opacity: 1;
    animation: got-gain 0.2s 0.2s;
    .announcement {
        animation: small-to-big 0.4s;
    }
}

.gameover {
    opacity: 0.8;
    transition: all 0.5s;
    background: #744bcdd2;
    color: #fff;

    .announcement {
        opacity: 1;
    }
}

.score {
    display: none;
    margin-top: -20px;
    font-size: 25px;
    &.show{
        display: block;
    }
}

.form {
    display: none;
}

.gamestart {
    opacity: 1;
    transition: all 0.5s;
    background: #744bcdd2;
    color: #fff;

    .announcement {
        opacity: 1;
    }

    .form {
        display: none;
        
        &.show {
            display: grid;
        }

        h2 {
            font-size: 42px;
            margin-bottom: 10px;
        }

        button,
        input[type=submit] {
            cursor: pointer;
        }

        label {
            margin-bottom: 7px;
            margin-top: 15px;
            font-size: 12px;
            letter-spacing: 0.7px;

            &.error {
                color: $error-text-light;
                animation: pop 0.3s;
            }
        }

        input {
            border-radius: 8px;
        }

        button:focus, 
        select:focus, 
        input:focus{
            outline: none;
        }
        
        input[type=text] {
            padding: 0.7em 0.5em;
            text-align: center;
            margin-bottom: 10px;
            font-size: 18px;
            color: $primary;
            color: $primary;
            border: double $primary 3px;
            font-weight: 600;
            transition: all 0.2s;
            
            &.error {
                transition: all 0.2s;
                animation: pop 0.3s;
                border: $error double;
            }

            &::placeholder {
                opacity: 0.5;
            }
        }

        .difficulty {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            button {
                width: 100%;
            }

            select {
                border: none;
                text-transform: uppercase;
                background: #0000;
                color: $secondary;
                font-weight: 900;
                padding: 0.7em 0.5em;
                text-align: center;
                text-align-last: center;
                appearance: none;

                &.anim {
                    animation: pop 0.3s;
                }
            }
            option {
                appearance: none;
                transition: all 0.2s;
                background: $dark-gray;
                padding: 1em;
                text-align: left;
                line-height: 10px;
            }

            button {
                background: #0000;
                border: none;
                font-weight: bolder;
                font-size: 24px;
                color: $secondary;
            }
        }

        input[type=submit] {
            width: fit-content;
            padding: 0.7em 1em;
            margin: 0 auto;
            font-weight: bolder;
            text-transform: uppercase;
            background: $secondary;
            color: #fff;
            font-size: 16px;
            border: solid #fff 1px;
            margin-bottom: 15px;
            transition: all 0.2s;

            &:hover {
                transition: all 0.2s;
                background: $primary;
            }
        }

        .instructions {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-style: italic;

            p button {
                display: inline-block;
            }
            button {
                height: 1.7em;
                font-size: 12px;
                margin-left: 10px;
                border-radius: 50px;
                background: #00000000;
                color: #fff;
                font-weight: 900;
                border: double 2px #fff;
            }
            transition: all 0.2s;

            &:hover{
                transition: all 0.2s;
                opacity: 0.8;
            }
        }
    }
}

.countdown {
    .announcement h2{
        font-size: 260px !important;
    }
    animation: grow-small 0.7s;
}

.levelup {
    transition: all 0.2s;
    opacity: 1;
    .announcement {
        h2 {font-size: 25px;}
        animation: small-to-big 0.4s;
    }
}

@keyframes got-hit {
    0% {background: rgba(0, 0, 0, 0);}
    50% {background: rgba(255, 0, 0, 0.048);}
    100%{background: rgba(0, 0, 0, 0);}
}
@keyframes got-gain {
    0% {background: rgba(0, 255, 21, 0);}
    50% {background: rgba(0, 255, 115, 0.116);}
    100%{background: rgba(0, 255, 55, 0);}
}
@keyframes small-to-big {
    0% {transform: scale(0);}
    100%{transform: scale(1);}
}
@keyframes pop {
    0% {transform: scale(1); pointer-events: none;}
    50% {transform: scale(1.2); pointer-events: none;}
    100%{transform: scale(1);}
}
@keyframes grow-small {
    0% {transform: scale(1); opacity: 1;}
    100% {transform: scale(0); opacity: 0;}
}
</style>