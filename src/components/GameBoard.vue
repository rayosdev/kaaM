<template>
    <div class="game-board">

        <head-section  />
        <game-grid />
        
    </div>
</template>

<script>
import HeadSection from './GameBoard/HeadSection.vue'
import GameGrid from './GameBoard/GameGrid.vue'

export default {
    components: {
        'head-section': HeadSection,
        'game-grid': GameGrid
    }
}
</script>

<style lang="scss" scoped>
    .game-board {
        color: $dark-gray;
        // overflow: hidden;
        border: solid $secondary 2px;
        border-radius: 18px;
        position: relative;

        &::before  {
            content: "";
            display: block;
            position: absolute;
            left: -177px;
            top: 258px;
            height: 512px;
            width: 177px;
            background: url(../assets/play-cartoon.png);
            background-size: cover;
        }
    }

</style>