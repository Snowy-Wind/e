<!-- 发表文章 -->
<template>
  <div class='article'>
    <el-button @click="saveArticle" class="publish">发表</el-button>
    <div id="ArticleEditor"></div>
  </div>
</template>

<script>
  import {socketSend} from '../../webSocket/websocket'
  import {articleEditor} from '../../edits/edits'

  export default {
  name: '',
//import引入的组件需要注入到对象中才能使用
  components: {},
  data() {return {
    editor: '',
    };
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {
    saveArticle(){
      socketSend('article',this.$store.state.user_id,'-1',this.editor.txt.html())
      this.$message({
        message: '文章发表成功',
        type: 'success'
      })
      this.editor.txt.clear()
      // .then((res) => {
      //   this.$message({
      //     message: '文章发表成功',
      //     type: 'success'
      //   });
      // })
    },
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.editor = articleEditor()
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style>
  .article {
    padding: 30px;
    text-align: initial;
    border: 1px #e0e0e0 solid;
  }

  .article .el-button {
    margin-bottom: 10px;
  }

  .article .publish {
    position: absolute;
    right: 32px;
    z-index: 2;
    height: 41px;
  }
</style>