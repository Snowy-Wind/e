<!-- 忘记密码 -->
<template>
  <div class='reset'>
    <el-card class="box-card">
      <em class='el-icon-lock'></em>
      <h3>无法登录?</h3>
      <p>请输入你的电子邮箱地址，方便我们给你发送账户找回链接</p>
      <el-form :model="reset">
        <el-form-item>
          <!-- <el-input v-model="reset.EmailNum" placeholder="请输入您的电子邮箱" prefix-icon="el-icon-phone"></el-input> -->
          <el-input v-model="reset.email" placeholder="请输入邮箱" prefix-icon="el-icon-mobile-phone" type="email">
            <el-button type="primary" slot="append" @click="sendVerificationCode">发送验证码</el-button>
          </el-input>
          <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="reset.verificationCode"></el-input>
          <el-input placeholder="请输入新密码" prefix-icon="el-icon-lock" show-password v-model="reset.password"></el-input>
          <el-input placeholder="请重新输入新密码" prefix-icon="el-icon-lock" show-password v-model="reset.checkPassword"></el-input>
        </el-form-item>
        <el-button @click="forget_password">发送</el-button>
      </el-form>
      <router-link to="/"><el-link :underline="false">返回登录</el-link></router-link>
    </el-card>
  </div>
</template>

<script>
import { send_data } from '../../network/vuex_axios';

  export default {
  name: 'Reset',
//import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // const validataUserName = (rule,value,callback) => {
    //   if (value === '')
    //     callback(new Error('请输入用户名'))
    //   else if (!/^[a-zA-Z0-9_]+$/.test(value) || 4>value.length || value.length>14)
    //     callback(new Error('输入的用户名不合法'))
    //   callback();
    // };
    // const validatePass1 = (rule, value, callback) => {
    //   if (value === '')
    //     callback(new Error('请输入密码'))
    //   else if (value.length<8 || value.length>16) {
    //     callback(new Error('输入的密码不合法'));
    //   }
    //   callback();
    // };
    // const validatePass2 = (rule, value, callback) => {
    //   if (value === '')
    //     callback(new Error('请输入密码'))
    //   else if (value !== this.sign.password) {
    //     callback(new Error('两次输入密码不一致!'));
    //   }
    //   callback();
    // };
    // const validatePhoneNum = (rule,value,callback) => {
    //   if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value))
    //     callback(new Error('请输入正确的邮箱地址'))
    //   callback();
    // }
    // const validateVC = (rule,value,callback) => {callback()}
    return {
    reset: {
      email: '',
      verificationCode: '',
      password: '',
      checkPassword: '',
    },
    // rules: {
    //   表达验证
    //   username: [
    //     { validator: validataUserName,trigger: 'blur' },
    //   ],
    //   password: [
    //     { validator: validatePass1,trigger: 'blur'},
    //   ],
    //   checkPassword: [
    //     { validator: validatePass2, trigger: 'blur'}
    //   ],
    //   emailNumber: [
    //     { validator: validatePhoneNum, trigger: 'blur'}
    //   ]
    // },
    };
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {
    sendVerificationCode() {
      send_data({
        url: 'sendVerificationCode/',
        data: {'email': this.reset.email}
      })
      .then((res) => {
        this.$message({
          message: '验证码发送成功',
          type: 'success'
        })
      })
    },
    forget_password() {
      send_data({
        url: 'reset_password/',
        data: this.reset
      })
      .then((res) => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      .catch((res) =>{
        this.$message.error('修改失败');
      })
      })
    },
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    document.title = '忘记密码'
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
  .reset .box-card{
    margin: 30px auto;
    text-align:center;
    width: 480px;
    }
  .reset em{
    font-size: 100px;
    }
  .reset .el-form-item{
    margin: 10px auto;
    width: 400px;
  }
</style>