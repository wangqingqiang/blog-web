<template>
  <div class="markdown-container">
    <div class="title">
      <input class="title-input" type="text" v-model="title" placeholder="请输入标题...">
      <button class="title-btn" @click="submit">提交</button>
    </div>
    <div class="vditor" id="vditor">
    </div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { addBlog, getBlogById, } from '@/api/index';

export default {
  components: {
  },
  data() {
    return {
      id: '',
      title: '',
      contentEditor: null,
      blog: null,
    }
  },
  created() {
    this.id = this.$route.params.id || '';
    if (this.id) {
      this.getBlog(this.id);
    }
  },
  mounted(){
    this.contentEditor = new Vditor('vditor', { //4.刚刚声明的变量contentEditor被赋值为一个Vditor实例,
      height: 500,
      placeholder: '此处为话题内容……',
      theme: 'classic',
      counter: {
        enable: true,
        type: 'markdown'
      },
      preview: {
        delay: 0,
        hljs: {
          style: 'monokai',
          lineNumber: true
        }
      },
      tab: '\t',
      typewriterMode: true,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      mode: 'sv', // ir
      toolbar: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        'insert-before',
        'insert-after',
        '|',
        // 'record',
        'table',
        '|',
        'undo',
        'redo',
        '|',
        'edit-mode',
        // 'content-theme',
        'code-theme',
        'export',
        'both',
        {
          name: 'more',
          toolbar: [
            'fullscreen',
            'both',
            'preview',
            // 'info',
            'help',
          ],
        }
      ],
      after: () => {
        this.timer = setInterval(() => {
          if (this.blog) {
            clearInterval(this.timer);
            this.contentEditor.setValue(this.blog.content);
          }
        }, 200);
      },
    });
  },
  methods: {
    getBlog(id) {
      getBlogById(id).then((res) => {
        if (res.data && res.data.data) {
          this.blog = { ...res.data.data };
          this.title = this.blog.title;
        } else {
          console.log('错误:', res.data);
        }
      })
    },
    submit() {
      const content = this.contentEditor.getValue() || '';
      if (this.title === '' || content === '') {
        alert('标题或内容为空！');
        return;
      }
      addBlog({ id: this.id, title: this.title, content }).then(res => {
        const data = res.data;
        if (data.success) {
          this.$router.push({path: '/'})
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.markdown-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 20px;
    &-input {
      flex: 1;
      margin: 0;
      padding: 0;
      font-size: 24px;
      font-weight: 500;
      color: #1d2129;
      border: none;
      outline: none;
    }
    &-btn {
      box-sizing: border-box;
      height: 32px;
      padding: 2px 16px;
      font-size: 14px;
      line-height: 22px;
      border: 1px solid #1d7dfa;
      border-radius: 2px;
      cursor: pointer;
      color: #fff;
      background-color: #1d7dfa;
    }
  }
  .vditor {
    flex: 1;
  }
}
</style>