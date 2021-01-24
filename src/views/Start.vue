<template>
  <div class="start">
    <img alt="Game logo" src="../assets/KaaM-logo-light.svg">
    <Message msg="Kaa a Math game"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Message from '@/components/Message.vue'

export default {
  name: 'Start',
  components: {
    Message
  },
  created() {
    setTimeout(() => this.$router.push("Game"), 1000)
  },
}
</script>
<style lang="scss">
  .start {
    width: 100vw;
    height: 100vh;
    display: grid;
    justify-content: center;
    align-content: center;
  }
</style>
