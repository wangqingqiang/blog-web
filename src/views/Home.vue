<template>
  <div class="container home">
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
import { getBlogList } from '@/api/index.js'

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
    this.getBlogList();
  },
  methods: {
    getBlogList() {
      getBlogList().then((res) => {
        this.blogs = res.data.data;
      })
    }
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
