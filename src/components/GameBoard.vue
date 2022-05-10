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
        border: solid $secondary 2px;
        border-radius: 18px;
        position: relative;
    }

</style>