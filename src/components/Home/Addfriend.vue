<!-- 添加好友 -->
<template>
  <div class='addFriend'>
    <el-row>
      <el-col style="margin-top: 15px;" :lg="18" :xl="18">
          <!-- <el-input placeholder="请输入内容" v-model="input3" class="input-with-select header hidden-md-and-down">
            <el-select v-model="select" slot="prepend" :value="1">
              <el-option label="用户名" value="1"></el-option>
              <el-option label="知识图谱" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input> -->
        <el-input placeholder="请输入好友用户名或感兴趣的内容" v-model="search_friend" class="add_friend">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
        <div class="search_section">
          <p v-show="friend_result!=''">根据用户名搜索到以下用户:</p>
          <el-card v-show="friend_result!=''" class="res_friend">
            <el-avatar :src="friend_result.user_ava" :size="40"></el-avatar>
            <span class="friend_name">{{friend_result.user_name}}</span>
            <el-tag v-for="(tag, index) in friend_result.tag" :key="index"  size="mini">
              {{tag}}
            </el-tag>
            <el-button type="primary" style="float:right" @click="dialogVisible = true" :disabled="friend_result.isFriend">add</el-button>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
              <span>确认添加好友吗？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addFriend(friend_result.user_id)">确 定</el-button>
              </span>
            </el-dialog>
          </el-card>

          <p v-show="JSON.stringify(maps) != '{}'">根据知识图谱搜索到的内容:</p>
          <!-- <p v-show="Object.keys(maps).length != 0">根据知识图谱搜索到的内容:{{Object.keys(maps).length != 0}}</p> -->
          <!-- <el-card> -->
          <el-card v-for="(item, index) in maps.instances" :key="index" v-show="item.Label" class="maps">
            <p>{{item.Label}}</p>
            <p>{{item.Abstracts}}</p>
            <p v-show="item.Types.length != 0">相关标签</p>
            <el-tag v-for="(type, index) in item.Types" :key="index" @click="search_tag_friend(type.Label)">
              {{type.Label}}
            </el-tag>
            <p v-show="item['Related Instances'].length != 0">相关实例</p>
            <el-tag v-for="(reI, index) in item['Related Instances']" :key="index" @click="search_tag_friend(reI.Label)">
              {{reI.Label}}
            </el-tag>
          </el-card>
          <el-card v-for="(item, index) in maps.classes" :key="index" v-show="item.Label" class="maps">
            <p>{{item.Label}}</p>
            <p v-show="item.Hypernym.length != 0">上级概念或实例</p>
            <el-tag v-for="(Hypernym, index) in item.Hypernym" :key="index" @click="search_tag_friend(Hypernym.Label)">
              {{Hypernym.Label}}
            </el-tag>
            <p v-show="item.Hyponymy.length != 0">下级概念或实例</p>
            <el-tag v-for="(Hyponymy, index) in item.Hyponymy" :key="index" @click="search_tag_friend(Hyponymy.Label)">
              {{Hyponymy.Label}}
            </el-tag>
            <p v-show="item.Instances.length != 0">相关实例</p>
            <el-tag v-for="(Instances, index) in item.Instances" :key="index" @click="search_tag_friend(Instances.Label)">
              {{Instances.Label}}
            </el-tag>
          </el-card>
          <!-- </el-card> -->

          <el-card v-for="(item,index) in tag_friend" :key="index" class="res_friend">
            <el-avatar :src="item.user_ava" :size="40"></el-avatar>
            <span class="friend_name">{{item.user_name}}</span>
            <el-tag v-for="(tag, index) in item.user_tags" :key="index"  size="mini">
              {{tag}}
            </el-tag>
            <el-button type="primary" style="float:right" @click="dialogVisible = true;sel_f_id = item.user_id;">add</el-button>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
              <span>确认添加好友吗？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addFriend(sel_f_id)">确 定</el-button>
              </span>
            </el-dialog>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6" class="hidden-md-and-down">
        <Recommends></Recommends>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { send_data } from '../../network/vuex_axios';
import Recommends from './MainPages/Recommends.vue'
import {socketSend} from '../../webSocket/websocket.js'

  export default {
  name: '',
//import引入的组件需要注入到对象中才能使用
  components: {
    Recommends
  },
  data() {return {
    search_friend: '',
    friend_result: '',
    tag_friend: [],
    maps: {},
    dialogVisible: false,
    sel_f_id: "",
    };
  },
//监听属性 类似于data概念
  computed: {
  },
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {
    search(){
      this.$store.commit('setAppLoading')
      send_data({
        url: 'search_friend/',
        data: {
          "user_id": this.$store.state.user_id,
          "search_key": this.search_friend
        }
      })
      .then((res) => {
        this.search_friend = ''
        this.maps = {}
        this.friend_result = ''
        this.tag_friend = []
        if (res.data['Classes'].length != 0)
          this.maps['classes'] = res.data['Classes']
        if (res.data['Instances'].length != 0)
          this.maps['instances'] = res.data['Instances']
        if (Object.keys(res.data['userinfo']) != 0)
          this.friend_result = res.data['userinfo']
          for (let item of this.$store.state.sort_friends){
            if (this.friend_result.user_id == item.userId) {
              this.friend_result['isFriend'] = true
              console.log(this.friend_result['isFriend'])
            }
          }
        this.$store.commit('setAppLoading')
        // console.log(this.maps)
        // console.log(res.data)
      })
    },
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
      send_data({
        url: "tag_search_friend/",
        data: {
          'user_id': this.$store.state.user_id,
          tag
        }
      })
      .then((res) => {
        console.log(res.data.data)
        this.search_friend = ''
        this.maps = {}
        this.friend_result = ''
        this.tag_friend = res.data.data
      })
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {},
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.addFriend {
  margin: 0 50px;
}
.addFriend .add_friend {
  width: 50%;
}

.addFriend .search_section {
  width: 70%;
  margin: auto;
  text-align: initial;
}

.addFriend .maps {
  margin-bottom: 10px;
}

.addFriend .el-tag {
  margin: 5px;
}
.addFriend .res_friend {
  position: relative;
  margin: 10px;
}

.addFriend .friend_name {
  position: absolute;
  margin-left: 5px;
}

.addFriend .res_friend>.el-button {
  float: right;
}

</style>