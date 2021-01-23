<template>
  <div class="Game">
    <h1>This is the Game</h1>
    <div id="facetest">
      <button v-on:click="show = !show">
        Toggle Fade
      </button>
      <transition name="fade">
        <p v-if="show">transition</p>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>