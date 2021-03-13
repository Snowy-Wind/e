<!-- 好友列表 -->
<template>
  <div class='friends'>

    <el-row>

      <el-col :span="18" class="chat">
        <div class="chatHeader" style="height: 50px !important;">
          <!-- 头像 -->
          <!-- <el-avatar src="https://www.jq22.com/demo/sjlmoban202009202218/assets/images/avatars/avatar-1.jpg" :size="50" class="item"></el-avatar> -->
          <!-- 用户名 -->
          <span class="userName">{{chatMessage['userName']}}</span>
          <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-calendar v-model="f_value" class="ltpl">
              <template v-slot:dateCell="data">
                <i class="iconfont hhtb" :class="rlbj(data.data.day)"></i>
                <span class="sj">
                  {{data.data.day.split('-').slice(2)[0]}}
                </span>
              </template>
            </el-calendar>
            <el-row>
              <el-col :span="12">
                <i class="iconfont hhtb icon-huo1"></i>
                <span>:10条以上</span>
              </el-col>
              <el-col :span="12">
                <i class="iconfont hhtb icon-icon-test1"></i>
                <span>:100条以上</span>
              </el-col>
              <el-col :span="12">
                <i class="iconfont hhtb icon-huo"></i>
                <span>:1000条以上</span>
              </el-col>
              <el-col :span="12">
                <i class="iconfont hhtb icon-icon-test"></i>
                <span>:10000条以上</span>
              </el-col>
            </el-row>
            <el-button slot="reference">火花</el-button>
          </el-popover>
          
        </div>

        <div class="chatMain" :style="'height:' + chatHeight +';'">
          <Emotional></Emotional>
          <el-scrollbar class="page-component__scroll">
            <div v-for="(item,index) in $store.state.friendList[chatMessage['userId']]['chat_history']" 
            :key="index" 
            class="message">
              <el-avatar :src="item[0]==0?$store.state.user_avatar:chatMessage['user_avatar']" :size="40" class="ava" :class="item[0]==0?'rfloat':'lfloat'"></el-avatar>
              <div class="arrow" :class="item[0]==0?'jjr':'jjl'"></div>
              <div v-html="item[1]" :class="item[0]==0?'rfloat':'lfloat'" class="msg"></div>
              <svg class="icon" aria-hidden="true" :class="item[0]==0?'ltktbr':'ltktbl'">
                <use :xlink:href="ltktb[index % ltktb.length]"></use>
              </svg>
            </div>
          </el-scrollbar>
        </div>

        <div class="chatFooter" @keyup.enter="sendMessage">
          <!-- 输入框 -->
          <div id="fEditor"></div>
          <el-button :plain="true" type="primary" class="sendMessage" @click="sendMessage">发送</el-button>
        </div>

      </el-col>
      
      <el-col :span="6" class="friendList">
        <!-- <el-row> -->
          <!-- <el-col :span="12"> -->
            <span class="title">好友列表</span>
          <!-- </el-col>
          <el-col :span="12"> -->
            <el-button type="text" @click="pyqVisible = true" class="float:right;">知识图谱</el-button>
            <el-dialog
              :visible.sync="pyqVisible"
              width="60%">
              <zstp2></zstp2>
            </el-dialog>
          <!-- </el-col> -->
        <!-- </el-row> -->
        <div v-for="(item,index) in $store.state.sort_friends " 
          :key="index"
          class="friendItem" 
          @click="selectFriend(item)">
          <!-- 头像 -->
          <el-avatar :src="item['imgUrl']" :size="30" class="item"></el-avatar>
          <!-- 用户名 -->
          <span class="userName" :class="item['status']==1?'online':'offline'">{{item['userName']}}</span>
          <el-button type="danger" icon="el-icon-delete" circle class="friend_delete" @click="del_friend = true;de_f = item['userId']" size="mini"></el-button>

          <el-dialog
            title="提示"
            :visible.sync="del_friend"
            width="30%">
            <span>确定要删除好友吗？</span>
            {{item['userId']}}
            <span slot="footer" class="dialog-footer">
              <el-button @click="del_friend = false">取 消</el-button>
              <el-button type="primary" @click="delete_friend()">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import {friendEditor} from "../../edits/edits"
import { send_data } from '../../network/vuex_axios';
import {socketSend} from "../../webSocket/websocket"
import Emotional from "./MainPages/emotional"
import zstp2 from './zstp/zstp2.vue'
  // import E from "wangeditor";

  export default {
  name: 'Friends',
//import引入的组件需要注入到对象中才能使用
  components: {
    Emotional,
    zstp2
  },
  data() {return {
    chatMessage: {
      userId: '',
      userName: '',
      user_avatar: '',
      message: '',
    },
    editor: null,
    del_friend: false,
    pyqVisible: false,
    de_f: '',
    f_value: new Date(),
    PL:"",
    ltktb: [
      '#icon-dongwutubiao-shangse-houzi',
      '#icon-banma',
      '#icon-dongwutubiao-shangse-kaola',
      '#icon-dongwutubiao-shangse-laoshu',
      '#icon-dongwutubiao-shangse-huli'
    ],
    };
  },
//监听属性 类似于data概念
  computed: {
    chatHeight(){
      return (this.$store.state.clientHeight - 407) + 'px'
    },
  },
//监控data中的数据变化
  watch: {
  },
//方法集合
  methods: {
    selectFriend(friend) {
      this.chatMessage['userId'] = friend['userId'],
      this.chatMessage['userName'] = friend['userName']
      this.chatMessage['user_avatar'] = friend['imgUrl']
      send_data({
        url: "get_PL/",
        data: {
          "user_id":this.$store.state.user_id
        }
      })
      .then((res) => {
        this.PL = res.data.data
      })
      // chatMessage['message'] = friend['userId']
    },
    sendMessage(){
      if(this.editor.txt.html() == "")
        this.$message.error('发送的内容不能为空，请重新输入');
      else{
        socketSend('chat',this.$store.state.user_id,this.chatMessage.userId,this.editor.txt.html())
        const d = [this.chatMessage.userId,this.editor.txt.html(),0]
        this.editor.txt.clear()
        this.$store.commit('setChatHistory',d)
      }
    },
    delete_friend(user_by_id) {
      send_data({
        url: 'del_firiend/',
        data: {
          'user_id' :this.$store.state.user_id,
          'user_by_id' : this.del_friend}
      })
      .then((res) => {
        this.del_friend = false
        this.$message({
          type: 'success',
          message: '删除好友成功'
        })
        this.$store.dispatch('getFriendList')
        console.log(this.$store.state.friendList[this.chatMessage['userId']])
      })
    },
    rlbj(data){
      let bg = ''
      if (data in this.PL) {
        let con = this.PL[data]
        if (con < 10){
          bg = ''
        }
        else if (con < 100){
          bg = 'icon-huo1'
        }
        else if (con < 1000){
          bg = 'icon-icon-test1'
        }
        else if (con < 10000){
          bg = 'icon-huo'
        }
        else{
          bg = 'icon-icon-test'
        }
      }
      console.log(bg)
      return bg
    },
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.chatMessage.userId = Object.values(this.$store.state.friendList)[0].userId
    this.chatMessage.userName = Object.values(this.$store.state.friendList)[0].userName
    this.chatMessage.user_avatar = Object.values(this.$store.state.friendList)[0].imgUrl
  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.editor = friendEditor()
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

  #fEditor .w-e-toolbar,.w-e-text-container{ 
    z-index: initial !important;
  }

  .sendMessage {
    position: absolute;
    bottom: 10px;
    right: 10px;
    /* z-index: 10000; */
  }

  .friends{
    height: 100%;
    text-align: initial !important;
    /* border-width: 1px 0 0 1px;
    border-color: #e0e0e0;
    border-style: solid; */
  }

  .friends .el-row {
    margin: 0 10px;
    /* border-left: 1px solid #e0e0e0; */
    overflow: hidden;
  }

  .friends .el-col{
    height: 98%;
  }

  /* .friends .friendList{
    padding-top: 10px;
    border-right: 1px #e0e0e0 solid;
  } */

  .friends .friendList .el-avatar{
    margin: 15px 5px 0 15px;
  }

  .friends .title{
    margin-left: 15px;
    padding-bottom: 20px;
    font-size: 18px;
  }

  .friends .friendItem{
    height: 60px;
    position: relative;
  }

  .friends .friendItem:hover{
    background: #eff0f1;
  }

  .friends .chat {
    /* padding-top: 10px; */
    background: #fff;
    /* border-right: 1px solid #e0e0e0;
    border-top: 1px solid #e0e0e0; */
    border:2px transparent solid;
    border-image:linear-gradient(to right,#000718,#23b7cb) 1 10;
  }

  .friends .userName{
    margin-left: 5px;
    position: absolute;
    top: 13px;
    color: #fff;
  }

  .ltpl {
    height: 300px;
  }

  .ltpl .el-calendar-table .el-calendar-day {
    height: 30px;
  }

  /* .ltpl .el-calendar__header,thead {
    display: none;
  } */

   .hhtb {
    color: #d81e06;
  }

  .ltpl .sj {
    position: absolute;
  }

  .friends .online {
    color: #67C23A
  }

  .friends .offline {
    color: #909399
  }

  .friends .chatHeader {
    /* border-bottom: 1px #e0e0e0 solid; */
    position: relative;
    background: rgb(54, 172, 253);
    /* border-bottom:2px transparent solid;
    border-image:linear-gradient(to right,#000718,#23b7cb) 1 10; */
  }

  .chatHeader .el-button {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  /* .friends .chatMain {
    padding: 10px;
  } */

  .friends .page-component__scroll {
    height: 100%;
  }

  .friends .el-scrollbar__wrap{
    overflow-x: hidden;
  }

  .chatMain .message {
    position: relative;
    clear: both;
  }

  .chatMain .arrow {
    position: relative;
    top: 20px;
    width:0;
    height:0;
    font-size:0;
    border:solid 8px;
  }

  .chatMain .lfloat{
    float: left;
  }

  .chatMain .rfloat {
    float: right;
  }

  .friends .ava {
    margin: 10px;
  }

  .friends .msg {
    margin: 10px;
    padding: 10px;
    max-width: 65%;
    background: #c3effb;
    border-radius: 10px;
  }

  .friends .icon {
    width: 2em;
    height: 2em;
    position: relative;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .chatMain .ltktbl {
    float: left;
    left: -30px;
  }

  .chatMain .ltktbr {
    float: right;
    left: 30px;
  }

  .chatMain .jjl {
    float: left;
    left: 12px;
    border-color: transparent #c3effb transparent transparent;
  }

  .chatMain .jjr {
    float: right;
    right: 12px;
    border-color: transparent transparent transparent #c3effb;
  }

  /* .friends .msg::before{
    transform: rotate(90deg);
    margin-top: -29px;
  }

  .friends .msg::after,.msg::before{
    content: "" !important;
    width: 30px !important;
    height: 30px !important;
    background-size: 100%;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='259.51' height='259.52'%3E%3Cpath data-name='Path 143' d='M259.51 259.52c-.167-2.608.05-5.319-.19-8.211-.084-1.012-.031-2.15-.118-3.12-.113-1.25-.1-2.682-.236-4.061-.172-1.722-.179-3.757-.365-5.394-.328-2.889-.478-5.857-.854-8.61-.509-3.714-.825-7.252-1.38-10.543-.934-5.535-2.009-11.312-3.189-16.692-.855-3.9-1.772-7.416-2.752-11.2-1.1-4.256-2.394-8.149-3.687-12.381-1.1-3.615-2.366-6.893-3.623-10.493-1.3-3.739-2.917-7.26-4.284-10.7-1.708-4.295-3.674-8.078-5.485-12.023-1.145-2.493-2.5-4.932-3.727-7.387-1.318-2.646-2.9-5.214-4.152-7.518-1.716-3.16-3.517-5.946-5.274-8.873-1.692-2.818-3.589-5.645-5.355-8.334-2.326-3.542-4.637-6.581-7.039-9.848-2.064-2.809-4.017-5.255-6.088-7.828a237.651 237.651 0 00-7.292-8.589c-3.027-3.411-6.049-6.744-9.055-9.763-2.4-2.412-4.776-4.822-7.108-6.975-3-2.767-5.836-5.471-8.692-7.854-3.332-2.779-6.657-5.663-9.815-8.028-2.958-2.216-5.784-4.613-8.7-6.6-3.161-2.159-6.251-4.414-9.219-6.254-3.814-2.365-7.533-4.882-11.168-6.89-4.213-2.327-8.513-4.909-12.478-6.834-4.61-2.239-9.234-4.619-13.51-6.416-4.1-1.725-8.11-3.505-11.874-4.888-4.5-1.652-8.506-3.191-12.584-4.47-6.045-1.9-12.071-3.678-17.431-5-9.228-2.284-17.608-3.757-24.951-4.9-7.123-1.112-13.437-1.64-18.271-2.035l-2.405-.2c-1.638-.136-3.508-.237-4.633-.3A115.051 115.051 0 000 .081h259.51z' fill='%23f1f5f8'/%3E%3C/svg%3E")!important;
    position: absolute !important;
    right: -3px;
    margin-top: 54px;
  } */

  .friends .msg p {
    margin: initial;
    word-wrap: break-word;
	  word-break: break-all;
  }

  .friends .chatFooter {
    position: relative;
    /* margin: -1px; */
  }

  .friends .w-e-toolbar {
    border: initial !important;
    border-top: 2px solid transparent !important;
    border-image: linear-gradient(90deg,#000718,#23b7cb) 1 10 !important;
  }

  .friends .w-e-text-container {
    border: initial !important;
  }

  .friends .w-e-panel-container {
    top: initial;
    bottom: 40px;
    left: 0;
    margin: 0 !important;
    height: 200px;
  }
  .friends .w-e-droplist {
    top: initial;
    bottom: 40px;
    left: 0;
    margin-left: 0 !important;
  }

  .friends .friend_delete {
    display: none;
    float: right;
    position: relative;
    top: 12px;
  }

  .friendItem:hover .friend_delete {
    display: block;
  }
</style>