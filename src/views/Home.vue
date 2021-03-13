<!--主页-->
<template>
  <div id="home" :class="background_color">
    <div class="stars" v-if="startShow">
      <div class="star" v-for="(item,index) in starsCount" :key="index" ref="star"></div>
    </div>

    <el-row>

      <el-col :lg="5" :xl="5" class="hidden-md-and-down">
        <p class="logo">Simple</p>
        <div id='homeNav'>
          <el-menu
            default-active="1"
            class="el-menu-demo"
            mode="vertical"
            text-color="#fff"
            :style="'height:' + screenHeight +'px;'"
            >
            <el-scrollbar class="page-component__scroll" :style="'height:' + screenHeight +'px;'">
              <div v-for="(item, listIndex) in navList" :key="listIndex">
                  <router-link :to="{name: item[2]}">
                    <el-menu-item :index=String(listIndex+1)>
                        <i :class=item[1] :style="color"></i>
                        <span slot="title" :style="color">{{item[0]}}</span>
                    </el-menu-item >
                  </router-link>
              </div>
            </el-scrollbar>

          </el-menu>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19" class="infinite-list" v-infinite-scroll="load">
        <el-container>
          <el-header>
            <Header>
              <!-- <template v-slot:nav>
                <div v-for="(item, listIndex) in navList" :key="listIndex">
                  <router-link :to="{name: item[2]}">
                    <el-menu-item :index=String(listIndex+1)>
                        <i :class=item[1]></i>
                        <span slot="title">{{item[0]}}</span>
                    </el-menu-item >
                  </router-link>
                </div>
              </template> -->
              <template v-slot:pf>
                <el-popover placement="bottom-start" width="300" trigger="click">
                  <div style="height:130px;overflow:auto;">
                    <el-row class="pfbg" :gutter="5">
                      <el-col :span="8">
                        <el-image src="static/images/def.png" @click="default_bg" class="pfbg"></el-image>
                        <span>默认</span>
                      </el-col>
                      <el-col :span="8">
                        <el-image src="static/images/xk1.png" @click="change_bg1" class="pfbg"></el-image>
                        <span>星空1</span>
                      </el-col>
                      <el-col :span="8">
                        <el-image src="static/images/xk2.png" @click="change_bg2" class="pfbg"></el-image>
                        <span>星空2</span>
                      </el-col>
                    </el-row>
                  </div>

                  <el-badge class="item" slot="reference">
                    <el-button icon="el-icon-s-custom" circle></el-button>
                  </el-badge>
                </el-popover>
              </template>
            </Header>
          </el-header>
          <el-main class="main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-col>

    </el-row>
  </div>
</template>

<script>

// @ is an alias to /src
import Header from '../components/Home/Header'
import {send_data} from '../network/vuex_axios'

export default {
  name: 'Home',
  data() {
    return {
      navList:[
        ["个人中心","el-icon-s-home","Personal"],
        ["好友","el-icon-s-custom","Friends"],
        ["好友动态","el-icon-news","SocialUpdates"],
        ["添加好友","iconfont icon-jiahaoyou","Addfriend"],
        // ["我的心情","el-icon-edit","Mood"],
        ["我的相册","el-icon-picture","Album"],
        ["发表文章","el-icon-edit-outline","Article"],
        ["备忘录","el-icon-s-claim","Event"],
        ["游戏","el-icon-coordinate","Game"]
      ],
      starsCount:600,//数量
      distance:800,//间距
      background_color: 'dbg1',
      startShow: false,
    }
  },
  components: {
    Header,
  },
  methods: {
    default_bg() {
      this.$store.commit('setColor','#000')
      this.startShow = false
      this.background_color = 'dbg1'
    },
    change_bg1() {
      this.$store.commit('setColor','#fff')
      this.startShow = true
      this.background_color = 'hbg1'
      setTimeout(() => {
        let starArr=this.$refs.star
        starArr.forEach(item=>{
        var speed = 0.2+(Math.random()*1)
        var distance = this.distance+(Math.random()*300)
        item.style.transformOrigin=`0 0 ${distance}px`
        item.style.transform=`translate3d(0,0,-${distance}px) rotateY(${(Math.random()*360)}deg) rotateX(${(Math.random()*-50)}deg) scale(${speed},${speed})`
      })
      }, 1000);
    },
    change_bg2() {
      this.$store.commit('setColor','#fff')
      this.startShow = true
      this.background_color = 'hbg2'
      setTimeout(() => {
        let starArr=this.$refs.star
        starArr.forEach(item=>{
        var speed = 0.2+(Math.random()*1)
        var distance = this.distance+(Math.random()*300)
        item.style.transformOrigin=`0 0 ${distance}px`
        item.style.transform=`translate3d(0,0,-${distance}px) rotateY(${(Math.random()*360)}deg) rotateX(${(Math.random()*-50)}deg) scale(${speed},${speed})`
      })
      }, 1000);
    },
  },
  computed: {
    screenHeight: (th) =>{
      console.log(th)
      return th.$store.state.clientHeight - 100
    },
    color(){
      return 'color:' + this.$store.state.f_color + ';'
    }
  },
  mounted() {
  },
  
  created() {
    this.$store.dispatch('getFriendList')
    window.onbeforeunload = () => {
      this.$store.state.wSocket.close()
    }
    send_data({
      url: 'signdata/' ,
      data:{
        'username' : this.$store.state.sign_name,
        'password' : this.$store.state.sign_password
      }
    }).then(res =>{
      // this.$router.replace('/home/personal')
      this.$store.commit('setUserinfo',res.data)
      this.$store.dispatch('setWebSocket')
    }).catch(err => {
      console.log(err)
      if (err.response.status == 443){
        this.$message.error('用户名或密码错误');
        this.$router.replace('/')
      }
      else if (err.response.status == 444){
        this.$message.error('您已被封号')
        this.$router.replace('/')
      }
    })
  },
}
</script>

<style>
#home {
  height: 100%;
  color: #000 !important;
  background-attachment: fixed;
  overflow: hidden !important;
}
/* .dbg1 {
  background: url('../../public/images/homeNav/defBG.jpg');
  background-size: 110%;
} */

.hbg1 {
  color: #fff !important;
  background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #75517d, #1b2947);
  background: radial-gradient(220% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7f7b6);
}

.hbg2 {
  color: #fff !important;
  background: radial-gradient(200% 100% at bottom center, #0070aa, #0b2570, #000035, #000);
  background: radial-gradient(220% 105% at top center, #000 10%, #000035 40%, #0b2570 65%, #0070aa);
}

@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
  }
}
#home .stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  bottom: 0;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 90s infinite linear;
}

#home .star {
  width: 2px;
  height: 2px;
  background: #F7F7B6;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0 -300px;
  transform: translate3d(0, 0, -300px);
  backface-visibility: hidden;
}

.el-popover .pfbg {
  height: 97px;
  text-align: center;
}

  #home .el-row {
    height: 100%;
    font-family: "Open Sans", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  #home .el-col .el-container{
    height: 100%;
  }
  
  #home .el-row .logo{
    margin: 20px auto 20px auto;
    color: #409EFF;
    font-size: 40px;
    user-select: none;
  }

  #home .infinite-list{
    overflow:auto;
    height: 100%;
  }

  #home .el-header{
    height: 94px !important;
    padding: 0 40px;
  }

  #home .main{
    padding: 0;
    overflow-x: hidden;
  }

  #homeNav{
    text-align: justify;
    padding-left: 50px;
    box-sizing: border-box;
  }

  #homeNav .el-menu-demo{
    background: transparent;
    height: 100%;
    border-right: initial;
    /* border-top: 1px #e0e0e0 solid; */
  }

  #homeNav .el-menu-item{
    font-size: 16px;
    line-height: 60px;
    height: 55px;
    transition: initial;
    /* color: #000 !important; */
  }

  #homeNav .el-menu-item i{
    margin-right: 10px;
    font-size: 20px;
  }

  #homeNav .el-menu-item:hover{
    border-radius: 30px !important;
    /* background: #ffffff4a; */
    outline: 0 !important;
    color: #409EFF !important;
  }

  #homeNav .el-menu-item:hover i{
    color: #409EFF !important;
  }

  #homeNav .is-active{
    /* background: #f1f5f8 !important; */
    border-radius: 30px!important;
    color: #409EFF !important;
  }

  #homeNav .is-active i{
    color: #409EFF !important;
  }

  /* #homeNav .el-scrollbar__wrap{
    padding-top: 50px;
    height: calc(100% - 50px);
    overflow-x: hidden !important;
  } */

  /* #homeNav .is-active::before{
    transform: rotate(90deg);
    margin-top: -29px;
  }

  #homeNav li.is-active::after,li.is-active::before{
    content: "" !important;
    width: 30px !important;
    height: 30px !important;
    background-size: 100%;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='259.51' height='259.52'%3E%3Cpath data-name='Path 143' d='M259.51 259.52c-.167-2.608.05-5.319-.19-8.211-.084-1.012-.031-2.15-.118-3.12-.113-1.25-.1-2.682-.236-4.061-.172-1.722-.179-3.757-.365-5.394-.328-2.889-.478-5.857-.854-8.61-.509-3.714-.825-7.252-1.38-10.543-.934-5.535-2.009-11.312-3.189-16.692-.855-3.9-1.772-7.416-2.752-11.2-1.1-4.256-2.394-8.149-3.687-12.381-1.1-3.615-2.366-6.893-3.623-10.493-1.3-3.739-2.917-7.26-4.284-10.7-1.708-4.295-3.674-8.078-5.485-12.023-1.145-2.493-2.5-4.932-3.727-7.387-1.318-2.646-2.9-5.214-4.152-7.518-1.716-3.16-3.517-5.946-5.274-8.873-1.692-2.818-3.589-5.645-5.355-8.334-2.326-3.542-4.637-6.581-7.039-9.848-2.064-2.809-4.017-5.255-6.088-7.828a237.651 237.651 0 00-7.292-8.589c-3.027-3.411-6.049-6.744-9.055-9.763-2.4-2.412-4.776-4.822-7.108-6.975-3-2.767-5.836-5.471-8.692-7.854-3.332-2.779-6.657-5.663-9.815-8.028-2.958-2.216-5.784-4.613-8.7-6.6-3.161-2.159-6.251-4.414-9.219-6.254-3.814-2.365-7.533-4.882-11.168-6.89-4.213-2.327-8.513-4.909-12.478-6.834-4.61-2.239-9.234-4.619-13.51-6.416-4.1-1.725-8.11-3.505-11.874-4.888-4.5-1.652-8.506-3.191-12.584-4.47-6.045-1.9-12.071-3.678-17.431-5-9.228-2.284-17.608-3.757-24.951-4.9-7.123-1.112-13.437-1.64-18.271-2.035l-2.405-.2c-1.638-.136-3.508-.237-4.633-.3A115.051 115.051 0 000 .081h259.51z' fill='%23f1f5f8'/%3E%3C/svg%3E")!important;
    position: absolute !important;
    right: -3px;
    margin-top: 54px;
  } */
</style>
