// 登录组件
<template>
  <div class="signIn" @keyup.enter="signIn">
    <el-form :model="sign">
      <el-form-item>
        <el-input v-model="sign.username" placeholder="请输入用户名" prefix-icon="el-icon-user" ref="login"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="sign.password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <yzm @tpok="tpok"></yzm>
      </el-form-item>
      <el-form-item>
        
        <!-- 测试用的，正式上线要提交数据给服务器验证 -->
        <el-button type="primary" :disabled="signdesabled" @click="signIn">登录</el-button>
        
        <el-divider>or</el-divider>
        <router-link to="/reset" class='forget'>忘记密码?</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import yzm from '../Home/yzm/yzm';
import {send_data} from '../../network/vuex_axios'
export default {
  name: 'SignIn',
  components: {
    yzm
  },
  data() {
    return {
      sign: {
        username: '',
        password: '',
      },
      yzm: false,
    }
  },
  methods: {
    signIn(){
      if (!this.signdesabled){
        send_data({
          url: 'signdata/' ,
          data:{
            'username' : this.sign['username'],
            'password' : this.sign['password']
          }
        }).then(res =>{
          this.$store.commit('setSignDate',[this.sign.username,this.sign.password])
          console.log(res.data)
          this.$store.commit('setUserinfo',res.data)
          this.$store.dispatch('setWebSocket')
          this.$router.replace('/home/personal')
        }).catch(err => {
          console.log()
          if (err.response.status == 443){
            this.$message.error('用户名或密码错误');
          }
          else if (err.response.status == 444){
            this.$message.error('您已被封号')
          }
        })
      }
    },
    tpok(){
      this.yzm = true
    }
  },
  computed: {
    signdesabled: th => th.sign['usename']=="" || th.sign['password']=="" || !th.yzm
  },
  mounted(){
    document.title = '登录'
    this.$refs.login.focus()
  },
}
</script>

<style scoped>
.forget{
  -webkit-font-smoothing: antialiased;
}
</style>
