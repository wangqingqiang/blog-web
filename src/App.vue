<template>
  <div id="app">
    <Nav v-if="!isWriting" />
    <router-view/>
    <div class="footer" v-if="!isWriting">
      这里是页脚
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
  },
  computed: {
    isWriting() {
      let routeName = [ 'AddBlog', 'EditBlog']
      if (routeName.includes(this.$route.name)) {
        return true;
      }
      return false;
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: rgba(255,255,255,.7);
  background: #26272b;
}
</style>
