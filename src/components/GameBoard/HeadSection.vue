<template>
    <div class="head-section">
        <div class="score-container">
            <h4>Score</h4>
            <h3>2300030</h3>
        </div>
        <div class="bonuscheck-container">
            <h4>Hatrik Bonus <span>2</span></h4>
            <h3>1000</h3>
        </div>
        <div class="levelup-container">
            <h4>Level <span>2</span></h4>
            <div class="levelup-countdown"></div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .head-section{
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
    .bonuscheck-container {

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

            &::after {
                content: "";
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