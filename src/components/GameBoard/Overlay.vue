<template>
    <div 
        class="overlay"
        :class="{
            idle: state == 'idle',
            hit: state == 'hit',
            gain: state == 'gain',
            gameover: state == 'gameover',
            levelup: state == 'levelup'
        }"
    >
        <div class="announcement">
            <h2 class="header">{{text}}</h2>
            <p class="byline">{{byline}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            state: "idle",
            text: "",
            byline: ""
        }
    },
    methods: {
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
                this.byline = "Trykk R for å restarte"
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
        }
    },
    watch: {
        state: function (val) {
            return
            if(val == 'hit'){
                this.text == "Au!"
                setTimeout(() => {this.setState('idle')}, 400)
            }
            this.$forceUpdate()
        }
    },
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
    pointer-events: none;
}
.announcement {
    opacity: 0.5;
    margin-bottom: 125px;
    .header {
        font-size: 40px;
    }
    .byline {
        font-size: 20px;
    }
}
.idle{
    opacity: 0;
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
</style>