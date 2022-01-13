<template>
  <div class="home">
    <BlogList class="blogs" :blogs="blogs" />
    <div class="tags">
      <ul>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>Nodejs</li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogList from '@/components/BlogList.vue'
import data from '@/data.js';

export default {
  name: 'Home',
  components: {
    BlogList
  },
  data() {
    return {
      blogs: []
    }
  },
  created() {
    this.blogs = data.blogs;
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  .blogs {
    margin-right: 20px;
    flex: 1;
  }
}
</style>
