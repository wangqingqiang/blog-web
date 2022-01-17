<template>
  <div id="app">
    <Nav />
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<style lang="less" scoped>
.main-container {
  height: calc(100vh - 63px);
  width: 70%;
  min-width: 600px;
  max-width: 900px;
  box-sizing: border-box;
  padding: 20px 20px 60px;
  margin: 0 auto;
}
</style>
