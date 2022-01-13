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
import data from '@/data.js';
import { marked } from 'marked';
import axios from 'axios';
import 'highlight.js/styles/github-dark-dimmed.css';

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
    let id = this.$route.params.id;
    if (!id) {
      return this.$router.repalce({path: '/'})
    }
    this.blog = { ...data.blogs[0], content: data.content };

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
      axios.get('http://localhost:3333/blog')
      .then((res) => {
        // handle success
        console.log(res.data);
        this.blog.content = res.data.content;
        this.blog.content = marked.parse(this.blog.content)
      })
    }
  }
}
</script>

<style lang="less">
.blog-container {
  .title {
    font-size: 32px;
    font-weight: 400;
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
}
</style>