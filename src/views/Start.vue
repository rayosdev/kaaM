<template>
  <div class="start">
    <img alt="Game logo" src="../assets/KaaM-logo.svg">
    <Message msg="Kaa Math game"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Message from '@/components/Message.vue'

export default {
  name: 'Start',
  components: {
    Message
  }
}
</script>
