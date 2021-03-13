<!--  -->
<template>
  <div id="VIS_draw"></div>
</template>

<script>
  import {send_data} from '../../../network/vuex_axios.js'
  import './vis.js'
  export default {
  name: 'zstp1',
//import引入的组件需要注入到对象中才能使用
  components: {},
  props:['mes'],
  data() {return {
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
    console.log(this.mes)
    // send_data({
    //   url: 'getZSTP/',
    //   data: {
    //     mes: this.mes
    //   }
    // })
    // .then((res) => {
      // console.log(res.data.data)
      send_data({
        url: 'getZSTP/',
        data: {
          text: this.mes
        }
      })
      .then((res) => {
        var data = {
          nodes: res.data.data[0],
          edges: res.data.data[1]
        };
        console.log(data)
        var container = document.getElementById("VIS_draw");
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
      })
      .catch((err) => {
        this.$message.error('获取失败')
      })
    // })
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
#VIS_draw {
  height: 100%;
}
</style>