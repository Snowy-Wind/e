<!-- 每一条评论的模板 -->
<template>
  <div class='commentary'>
    <!-- 每一条评论的卡片 -->
    <p v-show="message_list.length==0">去探索一下这个世界吧...</p>
    <el-card class="box-card" v-for="(item, index) in message_list" :key="index">

      <!-- 评论头 -->
      <div slot="header" class="clearfix">

        <!-- 头像 -->
        <el-avatar :src="item['avatar']" :size="30" class="item"></el-avatar>
        <!-- 用户名 -->
        <span class="userName">{{item['nikename']}}</span>

        <el-button @click="wzksh(item.messages_info)" class="ksh">可视化</el-button>

        <slot name="headerButton" :data="[item['messages_id'],index]"></slot>

      </div>

      <!-- 评论的主体 -->
      <div class="text item">

        <!-- 评论的图片或文字 -->
        <div v-html="item['messages_info']"></div>

        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->

        <!-- 点赞收藏评论数量 -->
        <!-- <el-row>
          <el-col :span="8">
            <span>
              <i class="iconfont icon-like"></i>
              {{item['messages_agreenum'] + ' Liked'}}
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              <em class="iconfont icon-star"></em>
              {{item['messages_collectnum'] + ' saved'}}
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              <i class="el-icon-chat-line-square"></i>
              {{item['messages_commentnum'] + ' Comments'}}
            </span>
          </el-col>
        </el-row> -->

        <!-- 分割线 -->
        <el-divider></el-divider>
        
        <span v-show="item['comments'].length==0">目前还没有人评论....</span>

        <!-- 评论下的评论 -->
        <div v-for="(descuss,descussId) in item['comments']" :key="descussId" style="margin-top:10px;">
          <!-- 头像 -->
          <el-avatar :src="descuss['ava']" :size="50" class="item"  style="display:inline-block;"></el-avatar>

          <div class="post-comment-text">
            <span style="font-size:18px;">{{descuss['nikename']}}</span>
            <br>
            <span class="sComment">{{descuss['info']}}</span>
          </div>
        </div>
      </div>

      <!-- 分割线 -->
      <el-divider></el-divider>

      <div class="chatFooter">
        <!-- 输入框 -->
        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入内容" v-model="item['new_comment']" maxlength="300"> </el-input>
        <el-button type="primary" class="send_comment" @click="send_comment(item['new_comment'],item['messages_id'],index)">发送</el-button>
      </div>
      
    </el-card>

    
    <el-dialog
      :visible.sync="zstpVisible"
      width="80%">
      <!-- <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="zstpVisible = false">取 消</el-button>
        <el-button type="primary" @click="zstpVisible = false">确 定</el-button>
      </span> -->
      <zstp1 :mes="mes"></zstp1>
    </el-dialog>

  </div>
</template>

<script>
import { send_data } from '../../../network/vuex_axios';
import zstp1 from '../zstp/zstp1'

  export default {
  name: 'Commentary',
//import引入的组件需要注入到对象中才能使用
  components: {
    zstp1
  },
  props:['message_list'],
  data() {return {
      art_com: '',
      commentatyList:[
        {
          name: 'Mariah Ali',
          avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          contents: '我用这个做头像怎么样？',
          liked: 15,
          saved: 19,
          comments: 11,
          descuss:[
            {
              name: 'Mariah Ali',
              avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
              comment: '我觉得不太好看...'
            },
            {
              name: 'Alex Dolgove',
              avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
              comment: '我也觉得不太好看'
            },
            {
              name: 'Mariah Ali',
              avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
              comment: '还行吧'
            },
            {
              name: 'Mariah Ali',
              avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
              comment: '想用就用呗'
            },
          ]
        },
        {
          name: 'Alex Dolgove',
          avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          imgUrl: '',
          contents: '今天天气不错',
          liked: 14,
          savad: 17,
          comments: 9,
          descuss:[],
        },
        {
          name: 'Mariah Ali',
          avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          imgUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1603955601&di=433ee06dff975bd8dbf300763b98794c&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg',
          liked: 15,
          savad: 19,
          comments: 11,
          descuss:[],
        },
        {
          name: 'Mariah Ali',
          avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          imgUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1603955601&di=433ee06dff975bd8dbf300763b98794c&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg',
          liked: 15,
          savad: 19,
          comments: 11,
          descuss:[],
        },
        {
          name: 'Mariah Ali',
          avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          imgUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1603955601&di=433ee06dff975bd8dbf300763b98794c&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg',
          liked: 15,
          savad: 19,
          comments: 11,
          descuss:[],
        },
      ],
      zstpVisible: false,
      mes: "",
    };
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {
    send_comment(text,mes_id,index){
      send_data({
        url: 'send_comment/',
        data: {
          'comment': text,
          'message_id': mes_id,
          'user_id': this.$store.state.user_id
        }
      })
      .then((res) => {
        this.$message({
          message: '发表成功',
          type: 'success'
        })
        console.log(this.message_list)
        this.message_list[index]['comments'].push({
          'ava': this.$store.state.user_avatar,
          'info': text,
          'nikename': this.$store.state.user_nikename
        })
        this.message_list[index]['new_comment'] = ''
      })
    },
    wzksh(text) {
      this.mes = text
      this.zstpVisible = true
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

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
  .text {
    font-size: 14px;
  }

  .text p{
    color: black !important;
    font-size: 14px !important;
    margin: 0 !important;
    padding: 10px 0;
    /* border-bottom: 1px #e0e0e0 solid; */
  }

  .text .el-row{
    margin-top: 15px;
  }

  .clearfix {
    height: 30px;
    line-height: 30px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .clearfix .userName{
    vertical-align: top;
    margin-left: 10px;
  }

  .el-card__header{
    padding: 15px !important;
  }

  .box-card {
    position: relative;
    width: 100%;
    margin-bottom: 20px;
    text-align: initial;
  }

  .post-comment-text{
    display: inline-block;
    background: #f4f4f4;
    margin-left: 10px;
    position:relative;
    top:-7px;
    border-radius: 10px;
    max-width:500px;
    vertical-align: top;
  }

  .post-comment-text span{
    margin: 10px;
  }

  .commentary .chatFooter {
    position: relative;
  }

  .commentary .send_comment {
    position: relative;
    left: calc(100% - 70px);
  }

  .post-comment-text .sComment{
    font-size: 14px;
    word-break:normal; 
    display:block; 
    white-space:pre-wrap;
    word-wrap : break-word;
    overflow: hidden;
  }

  .post-comment-text::before {
    content: "";
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid;
    border-right-color: #f4f4f4;
    left: -7px;
    right: auto;
    top: 20px;
    position: absolute;
  }

  /* table 样式 */
.commentary table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.commentary table td,
.commentary table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
.commentary table th {
  border-bottom: 2px solid #ccc;
  text-align: center;
}

/* blockquote 样式 */
blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}

/* code 样式 */
code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}
pre code {
  display: block;
}

/* ul ol 样式 */
.commentary ul, ol {
  margin: 10px 0 10px 20px;
}

.commentary .ksh {
  position: absolute;
  right: 70px;
  top: 14px;
  border: initial;
}

.commentary .el-dialog,.el-dialog__body {
  height: 80%;
}
</style>