<template>
  <div class="blog-list-container">
    <Blog v-for="blog in blogs" :key="blog.id" :blog="blog" />
  </div>
</template>

<script>
import Blog from './Blog.vue'

export default {
  components: {
    Blog
  },
  props: {
    blogs: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style>

</style>