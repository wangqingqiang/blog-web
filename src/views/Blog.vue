<template>
  <div class="blog-container">
    <div class="title">{{ blog.title }}</div>
    <div class="info">
      作者：{{ blog.author }} | 发表于：{{ time }}
    </div>
    <div class="content" v-html="blog.content">{{ blog.content }}</div>
  </div>
</template>

<script>
import { marked } from 'marked';
import { getBlogById } from '@/api/index.js'

export default {
  data() {
    return {
      blog: {
        id: '',
        title: '',
        author: '',
        time: '',
        content: ''
      }
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
  created() {
    this.blog.id = this.$route.params.id;

    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code, lang) {
        const hljs = require('highlight.js/lib/common');
        const language = hljs.getLanguage(lang) ? lang : 'js';
        return hljs.highlight(code, { language }).value;
      },
      langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
    this.getBlog();
  },
  methods: {
    getBlog() {
      getBlogById(this.blog.id).then((res) => {
        if (res.data && res.data.data) {
          this.blog = { ...res.data.data }
          this.blog.content = marked.parse(this.blog.content)
        } else {
          this.$router.replace({path: '/'})
        }
      })
    }
  }
}
</script>

<style lang="less">
@import '~highlight.js/styles/github-dark-dimmed.css';

.blog-container {
  .title {
    font-size: 32px;
    font-weight: bold;
  }
  .info {
    margin-top: 4px;
    font-size: 14px;
    color: #999;
  }
  .content {
    margin-top: 30px;
  }
  code:not(.hljs) {
    margin: 0 2px;
    padding: 4px 8px;
    color: #476582;
    border-radius: 4px;
    background-color: rgba(27,31,35,.06);
  }
  code.hljs {
    border-radius: 6px;
  }
  h1, h2, h3 {
    padding-bottom: 6px;
    margin: 36px 0;
  }
  h1, h2 {
    border-bottom: 1px solid #e6ecf0;
  }
}
</style>