<!--  -->
<template>
  <div class=''>
        <div id="VIS_draw"></div>
  </div>
</template>

<script>
  import {send_data} from '../../../network/vuex_axios.js'
  import './vis.js'
  export default {
  name: '',
//import引入的组件需要注入到对象中才能使用
  components: {},
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
    send_data({
      url: 'getZSTP/',
      data: {
        text: this.content
      }
    })
    .then((res) => {
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
      var network = new vis.Network(container, data, options);
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

</style>