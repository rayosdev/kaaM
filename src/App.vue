<template>
  <div id="app">
    <vue-page-transition class="view-page" name="fade-in-up">
      <router-view />
    </vue-page-transition>
  </div>
</template>
<script>

export default {

}
</script>

<style lang="scss">
@import url("../scss/normalize.scss");

.view-page{
  margin: 0 auto;
  height: 100%;
  width: 100%;
}

html {
  height: 100vh;
  width: 100%;
  background-size: cover;
  background: linear-gradient(360deg, $secondary 0%, $primary 100%);
  background-repeat:no-repeat;
}

body {
  
  * {
      box-sizing: border-box;
    }
}

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;
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
