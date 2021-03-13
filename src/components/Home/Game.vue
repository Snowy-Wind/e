<!--  -->
<template>
  <div class='game'>
    <div v-show="showGame">
      <el-row :gutter="20">
          <el-col v-for="(item,index) in gameList" :key="index" :span="7" style="margin:10px;">
            <el-card :body-style="{ padding: '0px' }"  shadow="hover">
              <img :src="item.fm" class="image" @click="open_game(item.id)">
              <div style="padding: 4px;">
                <span>{{item.name}}</span>
              </div>
            </el-card>

          </el-col>
      </el-row>
    </div>

    <div v-show="!showGame">
      <el-page-header @back="showGame = true"></el-page-header>
      <div v-if="game == 'llk'">
        <Llk></Llk>
      </div>
      <div v-if="game == 'sd'">
        <Sd></Sd>
      </div>
      <div v-if="game == 'pt'">
        <Pt></Pt>
      </div>
      <div v-if="game == 'wzq'">
        <Wzq></Wzq>
      </div>
      <div v-if="game == 'jyfp'">
        <Jyfp></Jyfp>
      </div>
      <div v-if="game == 'elsb'">
        <Elsb></Elsb>
      </div>
    </div>
  </div>
</template>

<script>
  import Llk from './Game/linklink/llk.vue'
  import Sd from './Game/sd'
  import Pt from './Game/pt'
  import Wzq from './Game/wzq/wzq'
  import Jyfp from './Game/jyfp/jyfp'
  import Elsb from './Game/2048'
  export default {
  name: '',
//import引入的组件需要注入到对象中才能使用
  components: {
    Llk,
    Sd,
    Pt,
    Wzq,
    Jyfp,
    Elsb,
  },
  data() {return {
    showGame: true,
    gameList: [
      {'fm':'static/images/llkfm.png','name':"连连看",'id':'llk'},
      {'fm':'static/images/sdfm.png','name':"数独游戏",'id':'sd'},
      {'fm':'static/images/ptfm.png','name':"拼图游戏",'id':'pt'},
      {'fm':'static/images/wzqfm.png','name':"五子棋",'id':'wzq'},
      {'fm':'static/images/jyfpfm.png','name':'记忆翻牌','id':'jyfp'},
      {'fm':'static/images/elsbfm.png','name':'2048','id':'elsb'},
    ],
    game: '',
    }
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {
    open_game(id) {
      // this.showllk = false
      // this.showsd = false
      this.showGame = !this.showGame
      this.game = id
      console.log(id === 'llk')
      // if (id === 'llk') {
      //   this.showllk = true
      // }
      // else if (id === "sd") {
      //   this.showsd = true
      // }
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
.game .image {
  width: 80%;
  height: 180px;
}
</style>