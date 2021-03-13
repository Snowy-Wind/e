<template>
  <div id="app" v-loading="$store.state.appLoading">
    <router-link to="/"></router-link>
    <!-- <div id="nav">
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>

    <!-- 上线以后删了 -->
    <!-- <router-view name="Home"></router-view> -->
  </div>
</template>

<script>
import {getObj,setObj} from './css_js/refresh'
export default {
  name: 'App',
  mounted() {
    // 在DOM渲染数据时，设置下区域高度为浏览器可视区域高度．
    this.$store.commit('setScreenHeight',document.body.clientHeight)
    // 监听window的resize事件．在浏览器窗口变化时再设置下区域高度．
    const _this = this;
    window.onresize = function temp() {
        _this.$store.commit('setScreenHeight',document.body.clientHeight)
    };
  },
  created() {
    if(getObj('store')){
      this.$store.replaceState(Object.assign({},this.$store.state,getObj('store')))
      setObj('store',null)
    }
  },
}
</script>

<style>
html,body {
  overflow: hidden;
  height: 100%;
  margin: 0;
}

a{
  text-decoration: none;
}

#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

.pHidden,.el-timeline-item__content {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
