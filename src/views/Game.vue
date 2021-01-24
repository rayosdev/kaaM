<template>
  <div class="game-container">
    <game-board />
    <div class="score-board"></div>
    <div class="instruction-footer"></div>
  </div>
</template>
<script>
import GameBoard from '../components/GameBoard.vue'
export default {
  components: {
    'game-board': GameBoard
  },
  data() {
    return {
      show: true
    }
  }
}
</script>
<style lang="scss">
@import url("../../scss/game.scss");
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>