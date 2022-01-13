<template>
  <div class="nav">
    <div class="link">
      <router-link to="/">首页</router-link> |
      <router-link to="/about">关于</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.nav {
  padding: 20px 0;
  background: #26272b;
  .link {
    width: 70%;
    min-width: 600px;
    max-width: 900px;
    margin: 0 auto;
  }
  a {
    font-weight: bold;
    color: rgba(255,255,255,.7);
    &.router-link-exact-active {
      color: #f37327;
    }
  }
}
</style>