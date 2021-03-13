<!-- SocialUpdates -->
<template>
  <div class='SocialUpdates'>
    <el-row :gutter="20">
      <el-col :sm="24" :md="16">
        <Comentary :message_list="friend_updates">
          <template v-slot:headerButton="comment_info" >
            <!-- <el-popover placement="bottom-end" width="150" trigger="click"> -->
              <el-button class="delSU" @click="report(comment_info.data[0])">举报</el-button>
              <!-- <el-button slot="reference" class="hButton">...</el-button>
            </el-popover> -->
          </template>
        </Comentary>
      </el-col>
      <el-col :span="8" class="hidden-sm-and-down">
        <!-- <Recommmend></Recommmend> -->
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
    Recommmend,
  },
  data() {return {
    friend_updates: []
    };
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {
    report(mes_id){
      send_data({
        url: 'report_mes/',
        data: {
          mes_id
        }
      })
      .then((res) => {
        this.$message({
          message: '已举报',
          type: 'success'
        })
      })
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {
    send_data({
      url: 'get_updates/',
      data: {
        'user_id': this.$store.state.user_id
      }
    })
    .then((res) => {
      this.friend_updates = res.data.data
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
.SocialUpdates .el-row {
  padding: 0 15px;
  margin: 0 20px;
}
  .hButton{
    position: absolute;
    right: 10px;
    top: 10px;
    border: initial;
  }

  .SocialUpdates .delSU {
  position: absolute;
  right: 10px;
  top: 14px;
  border: initial;
  }
</style>