<!-- 推荐模块 -->
<template>
  <div class='recommend'>
    <!-- <article class="tags">
      <p>你的标签</p>
      <el-tag v-for="(item,index) in taglist" :key="index">{{'#' + item}}</el-tag>
    </article>

    <el-divider></el-divider> -->

    <article  class="friend">
      <p>可能感兴趣的人</p>
      <el-card v-for="(item,index) in tag_friend" :key="index" class="res_friend">
        <el-avatar :src="item.user_ava" :size="40"></el-avatar>
        <span class="friend_name">{{item.user_name}}</span>
        <el-tag v-for="(tag, index) in item.user_tags" :key="index"  size="mini">
          {{tag}}
        </el-tag>
        <el-button type="primary" style="float:right" @click="dialogVisible = true;sel_f_id = item.user_id;" class="add_btn">add</el-button>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <span>确认添加好友吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addFriend(sel_f_id)">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </article>

    <!-- <article  class="group">
      <p>可能感兴趣的组</p>
      <div v-for="(item,index) in addGroups" :key="index" class="groupItem">
        头像
        <el-avatar :src="item['avatarUrl']" :size="50" class="item"></el-avatar>
        组名称
        <span class="groupName">{{item['name']}}</span>

        <el-button type="primary" >关注</el-button>
      </div>
    </article> -->
  </div>
</template>

<script>
import {send_data} from '../../../network/vuex_axios'
  export default {
  name: '',
//import引入的组件需要注入到对象中才能使用
  components: {},
  data() {return {
    tag_friend: [],
    dialogVisible: false,
    sel_f_id: '',
    }
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {
    addFriend(id) {
      console.log(id)
      socketSend('add_friend',this.$store.state.user_id,id,'')
      this.$message({
        message: '好友请求发送成功',
        type: 'success'
      })
      this.dialogVisible = false
    },
    search_tag_friend(tag) {
      
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {
    send_data({
      url: "recommend_friend/",
      data: {
        'user_id': this.$store.state.user_id,
        'tags': this.$store.state.user_tag
      }
    })
    .then((res) => {
      console.log(res.data.data)
      this.tag_friend = res.data.data
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
  .recommend{
    /* margin: 30px; */
    text-align: initial !important;
  }

  .recommend .el-tag {
    margin: 0 5px 5px 0;
  }

  .recommend .friendItem,.groupItem {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    margin-bottom: 10px;
    text-align: initial !important;
  }

  .recommend .item {
    margin-top: 12px;
  }

  .recommend .userName,.groupName {
    vertical-align: top;
    margin-left: 10px;
  }

  .recommend .add_btn{
    margin-top: 13px;
    padding: 10px;
    float: right;
  }

</style>