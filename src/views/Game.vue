<template>
  <div class="game-container">
    <game-board />
    <score-board />
    <instruction-footer />
  </div>
</template>
<script>
import GameBoard from '../components/GameBoard.vue'
import ScoreBoard from '../components/GameBoard/ScoreBoard.vue'
import InstructionFooter from '../components/InstructionFooter/index.vue'

export default {
  components: {
    'game-board': GameBoard,
    'instruction-footer': InstructionFooter,
    'score-board': ScoreBoard,
  },
  data() {
    return {
      show: true
    }
  }
}
</script>
<style lang="scss">

:root {
  @media (max-width: $tablet) {
    font-size: 12px;
  }
}

.game-container {
    display: grid;
    padding-top: 2rem;
    gap: 2rem;
    max-width: 100%;
    height: 100%;

  @media (max-width: $tablet-big) {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

.game-board {
  grid-column: 2/3;
    background: #fff;
    width: 43.75rem;
    height: 43.75rem;

    @media (max-width: $tablet-big) {
      grid-column: 1/2;
      justify-self: center;
    }
    @media (max-width: $mobile) {
      width: 100%;
      height: 100%;
    }
}

.score-board {
    grid-column: 3/4;
    width: 300px;
    height: 700px;
    background: #3F3F3F;

    @media (max-width: $tablet-big) {
        grid-column: 2/3;
        position: fixed;
        right: 0;
        width: 0;
        overflow: hidden;
    }
}

.game-board,
.score-board {
    grid-row: 1/2;
    border-radius: 8px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>