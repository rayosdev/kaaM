<template>
    <div class="head-section">
        <div class="score-container">
            <h4>Score</h4>
            <h3>{{score | paddzeros}}</h3>
        </div>
        <div class="bonuscheck-container">
            <!-- <h4>Hatrik Bonus <span>2</span></h4>
            <h3>1000</h3> -->
        </div>
        <div class="levelup-container">
            <h4>Level <span>{{level}}</span></h4>
            <div class="levelup-countdown">
                <div class="progress"
                    v-bind:style="{width: levelUpTimer + '%', opacity: levelUpTimer / 100}"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            score: localStorage.getItem('score'),
            level: localStorage.getItem('level'),
            levelUpTimer: localStorage.getItem('levelUpTimer')
        }
    },
    filters: {
        paddzeros: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.padStart(7, '0')
        }
    },
    mounted() {
        setInterval(() => this.update(), 10)
    },
    methods: {
        update(){
            this.score = localStorage.getItem('score')
            this.level = localStorage.getItem('level')
            this.levelUpTimer = localStorage.getItem('levelUpTimer')
        }
    },
}
</script>

<style lang="scss" scoped>
.head-section{
    border-radius: 18px 18px 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    justify-content: space-between;
    padding: 16px 21px;
    padding-bottom: 0;
    background: $secondary;
    color: $text-white;
}

.score-container {
    text-align: left;
    
    h3 {
        color: $primary
    }
}

.levelup-container {
    text-align: right;
    justify-self: end;

    .levelup-countdown {
        position: relative;
        background: $text-white;
        border: solid;
        width: 100%;
        margin-bottom: 16px;
        min-height: 16px;
        display: inline-block;
        top: 5px;
        border-radius: 3.5px;
        overflow: hidden;

        .progress {
            position: absolute;
            width: calc(100% + 2px);
            background: $primary;
            display: inline-block;
            left: -1px;
            top: -1px;
            bottom: -1px;
            border-radius: 60px;
        }
    }
}
</style>