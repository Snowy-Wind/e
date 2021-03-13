<!-- homeMain -->
<template>
  <div class='personal'>
    <el-row>
      <el-col :sm="24" :md="16">
        <Comentary :message_list="message_list">
          <template v-slot:headerButton="comment_info" >
            <el-popover placement="bottom-end" width="150" trigger="click">
              <p class="delSU" @click="delete_message(comment_info.data[0],comment_info.data[1])">删除这篇文章</p>
              <el-button slot="reference" class="hButton">...</el-button>
            </el-popover>
          </template>
        </Comentary>
      </el-col>
      <el-col :span="7" :offset="1" class="hidden-sm-and-down">
        <article class="tags">
          <p>你的标签</p>
          <el-tag :key="tag" v-for="tag in $store.state.user_tag" closable :disable-transitions="false" @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </article>

        <el-divider></el-divider>

        <p>今天的安排：</p>
        <el-timeline>
          <el-timeline-item v-for="(activity, index) in $store.state.user_today_event" :key="index"  class="pHidden">
            {{activity}}
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
  import Comentary from './MainPages/Commentary'
  import Recommmend from './MainPages/Recommends'
  import {send_data} from '../../network/vuex_axios'

  export default {
  name: 'SocialUpdates',
//import引入的组件需要注入到对象中才能使用
  components: {
    Comentary,
    Recommmend
  },
  data() {return {
      inputVisible: false,
      inputValue: '',
      message_list: '',
    };
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {
    handleClose(tag) {
      if (this.$store.state.user_tag.length > 1)
        this.$store.commit('deleteTag',tag)

      send_data({
        url: 'changeTag/',
        data: {
          userid : this.$store.state.user_id,
          userTag : this.$store.state.user_tag
        }
      })
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.$store.commit('addTag',inputValue)
      }
      this.inputVisible = false;
      this.inputValue = '';
      console.log(this.$store.state.user_tag)
      send_data({
        url: 'changeTag/',
        data: {
          userid : this.$store.state.user_id,
          userTag : this.$store.state.user_tag
        }
      })
    },
    delete_message(mes_id,index) {
      send_data({
        url: 'delete_message/',
        data: {mes_id}
      })
      .then((res) => {
        this.message_list.splice(index,1)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {
    send_data({
      url: 'getArticleList/',
      data: {'user_id': this.$store.state.user_id}
    })
    .then((res) => {
      this.message_list = res.data.data
    })
  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

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
  .personal{
    /* margin: 30px; */
    text-align: initial !important;
  }

  .hButton{
    position: absolute;
    right: 10px;
    top: 10px;
    border: initial;
  }

  .personal .el-popover {
    padding: initial;
  }
  
  .delSU {
     cursor: pointer;
     padding: 10px 10px;
     margin: 0;
  }

  .delSU:hover {
    background: #ecf5ff;
    color: #409EFF;
  }

  .personal .el-row{
    margin: 0 20px;
  }

  .personal .el-tag {
    margin: 0 5px 5px 0;
  }

  .personal .el-timeline {
    padding: 0;
  }
</style>