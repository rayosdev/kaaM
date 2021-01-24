<template>
  <div id="app">
    <vue-page-transition class="view-page" name="fade-in-up">
      <router-view />
    </vue-page-transition>
  </div>
</template>
<script>

export default {
  created() {
    setTimeout(() => this.$router.push("Game"), 1000)
  },
}
</script>

<style lang="scss">
@import url("../scss/normalize.scss");

.view-page{
  margin: 0 auto;
  height: 100%;
  width: 100%;
}

body {
  background: linear-gradient(360deg, $secondary 0%, $primary 100%);
  
  * {
      box-sizing: border-box;
    }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;

    // Base colors
  color: $text-white;

  a, a:visited {
    color: $text-white;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $secondary;
    }
  }
}
</style>
