<!--  -->
<template>
  <div class="zstp2">
    <div id="VIS_draw1"></div>
    <el-row>
      <el-col :span="6" v-for="(item,index) in taginfo" :key="index">
        <div class="tag_div" :class="item.bg"></div>
        <span>{{item.text}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
  name: '',
//import引入的组件需要注入到对象中才能使用
  components: {},
  data() {return {
    taginfo: [
      {"bg":'bg1',"text":"用户"},
      {"bg":'bg2',"text":"用户的标签"},
      {"bg":'bg3',"text":"用户好友"},
      {"bg":'bg4',"text":"用户好友的标签"},
    ]
    };
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {

  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    var data = {
      nodes: [],
      edges: []
    };
    let ind = 0
    data.nodes.push({'group':'User','id':this.$store.state.user_id,'label':this.$store.state.user_nikename})
    for (let i of this.$store.state.sort_friends){
      data.nodes.push({'group':'Event','id':i.userId,'label':i.userName})
      for (let t of i.tags) {
        if (!this.$store.state.user_tag.includes(t)) {
          data.nodes.push({'group':'FTag','id':ind,'label':t})
          data.edges.push({'from':i.userId,'label':'','to':ind})
        }
        ind--
      }
    }
    for (let i of this.$store.state.user_tag) {
      data.nodes.push({'group':'Tag','id':ind,'label':i})
      for (let a of this.$store.state.sort_friends){
        for (let b of a.tags){
          if (i == b) {
            data.edges.push({'from':a.userId,'label':'','to':ind})
          }
        }
      }
      data.edges.push({'from':this.$store.state.user_id,'label':'','to':ind})
      console.log(ind)
      ind--
    }
    console.log(data)
    var container = document.getElementById("VIS_draw1");
    var options = {
      nodes: {
          shape: 'circle',
          size: 15,
          font: {
              size: 15
          }
      },
      edges: {
          font: {
              size: 10,
              align: 'center'
          },
          color: 'red',
          arrows: {
              to: {enabled: true, scaleFactor: 1.2}
          },
          smooth: {enabled: true}
      },
      physics: {
          enabled: true
      }
    };
    var vis = require('./vis.js')
    var network = new vis.Network(container, data, options);
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
#VIS_draw1 {
  height: 500px;
}
.tag_div {
  width: 10px;
  height: 10px;
  display: inline-block;
}

.zstp2 .el-row{
  width: 50%;
}

.zstp2 .bg1 {
  background: rgb(255, 255, 0);
}
.zstp2 .bg2 {
  background: rgb(123, 225, 65);
}
.zstp2 .bg3 {
  background: rgb(251, 126, 129);
}
.zstp2 .bg4 {
  background: rgb(151, 194, 252);
}
</style>