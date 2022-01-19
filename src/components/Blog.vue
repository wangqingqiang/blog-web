<template>
  <div class="blog-item" @click="goBlog">
    <h2 class="title">{{ blog.title }}</h2>
    <div class="info">
      作者：{{ blog.author }} | 发表于：{{ time }}
    </div>
    <div class="desc">{{ blog.description }}</div>
  </div>
</template>

<script>
export default {
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  computed: {
    time() {
      if (!this.blog.time) return '';
      let time = Number(this.blog.time);
      time = new Date(time);
      return time.toLocaleDateString();
    }
  },
  methods: {
    goBlog() {
      this.$router.push({
        path: `/blog/${this.blog.id}`
      });
    }
  }
}
</script>

<style lang="less" scoped>
.blog-item {
  padding-bottom: 20px;
  margin: 20px 0;
  word-wrap: break-word;
  border-bottom: #EBF2F6 1px solid;
  cursor: pointer;
  .title {
    font-size: 26px;
    font-weight: 400;
  }
  .info {
    margin-top: 4px;
    font-size: 14px;
    color: #999;
  }
  .desc {
    margin-top: 6px;
    font-size: 14px;
    color: #909399;
  }
}
</style>