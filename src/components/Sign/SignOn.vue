// 注册组件
<template>
  <div class="signOn">
    <el-form :model="sign" :rules="rules" ref="sign" class="demo-sign">
      <!-- 第一页,主要信息 -->
      <div v-show="active==0">
        <el-tooltip class="item" effect="dark" content="用户名需要4-14位且只能是英文,数字或下划线" placement="top-start">
          <el-form-item prop="username">
            <el-input v-model="sign.username" placeholder="请输入用户名"  prefix-icon="el-icon-user" autofocus="autofocus"></el-input>
          </el-form-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="密码需要8到16位" placement="top-start">
          <el-form-item prop="password" class='item'>
            <el-input v-model="sign.password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password></el-input>
          </el-form-item>
        </el-tooltip>
        <el-form-item prop="checkPassword" class='item'>
          <el-input v-model="sign.checkPassword" placeholder="请确认密码" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <el-form-item prop="emailNumber" class='item'>
          <el-row :gutter="5">
            <el-col :span="16">
              <el-input v-model="sign.emailNumber" placeholder="请输入邮箱" prefix-icon="el-icon-mobile-phone" type="email"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="sendVerificationCode">{{content}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="verificationCode" class='item'>
          <el-input v-model="sign.verificationCode" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
        </el-form-item>
      </div>

      <!-- 第二页，个人信息 -->
      <div v-show="active==1">
        <el-upload
          class="avatar-uploader"
          action="upload-img/"
          :show-file-list="false"
          :on-success="change_ava">
          <img v-if="sign.ava" :src="sign.ava" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <article class="tags">
          <el-tag :key="tag" v-for="tag in sign.dynamicTags" closable :disable-transitions="false"  @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" > </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </article>
        <el-row>
          <el-col :span="6" class="col-r"><span>真实姓名：</span></el-col>
          <el-col :span="18" class="col-l"><el-input v-model="sign.truename"></el-input></el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="col-r"><span>住址：</span></el-col>
          <el-col :span="18" class="col-l"><el-input v-model="sign.address"></el-input></el-col>
        </el-row>

        <el-row>
          <el-col :span="6" class="col-r"><span>性别：</span></el-col>
          <el-col :span="18" class="col-l">
            <template>
              <el-radio v-model="sign.sex" label="1">男</el-radio>
              <el-radio v-model="sign.sex" label="2">女</el-radio>
            </template>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6" class="col-r"><span>生日：</span></el-col>
          <el-col :span="18" class="col-l">
            <el-date-picker
              v-model="sign.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-row>
        

        
        
      </div>
    </el-form>

    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
    </el-steps>
    <el-button type="primary" class="submit" @click="submitForm('sign')" v-show="active==1">注册</el-button>
    <el-button style="margin-top: 12px;" @click="next" v-show="active==0">下一步</el-button>
  </div>
</template>

<script>
import { send_data } from '../../network/vuex_axios';

export default {
  name: 'SignOn',
  data() {
    const validataUserName = (rule,value,callback) => {
      if (value === '')
        callback(new Error('请输入用户名'))
      else if (!/^[a-zA-Z0-9_]+$/.test(value) || 4>value.length || value.length>14)
        callback(new Error('输入的用户名不合法'))
      callback();
    };
    const validatePass1 = (rule, value, callback) => {
      if (value === '')
        callback(new Error('请输入密码'))
      else if (value.length<8 || value.length>16) {
        callback(new Error('输入的密码不合法'));
      }
      callback();
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '')
        callback(new Error('请输入密码'))
      else if (value !== this.sign.password) {
        callback(new Error('两次输入密码不一致!'));
      }
      callback();
    };
    const validatePhoneNum = (rule,value,callback) => {
      if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value))
        callback(new Error('请输入正确的邮箱地址'))
      callback();
    }
    const validateVC = (rule,value,callback) => {callback()}
    return {
      active: 0,
      sign: {
        username: '',
        password: '',
        checkPassword: '',
        emailNumber: '',
        verificationCode: '',
        ava: '',
        dynamicTags: ['前端'],
        truename: '',
        address: '',
        sex: '1',
        birthday: '',
      },
      isSend: false,
      content: '发送验证码',
      totalTime: 60,
      canClick: true, //添加canClick
      inputVisible: false,
      inputValue: '',
      rules: {//表达验证
        username: [
          { validator: validataUserName,trigger: 'blur' },
        ],
        password: [
          { validator: validatePass1,trigger: 'blur'},
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur'}
        ],
        emailNumber: [
          { validator: validatePhoneNum, trigger: 'blur'}
        ],
        verificationCode: [
          { validator: validateVC, trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    next() {
      if (this.active++ > 1) this.active = 0;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid,list) => {
        if (valid) {
          // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
          send_data({method:'post',
            url:'signonData/',
            data:this.sign,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },}
          ).then((res)=>{
            console.log(res)
            this.$message({
              message: '注册成功，请登录',
              type: 'success'
            })
            this.$router.replace('/')
          })
        } else {
          console.log(list);
          return false;
        }
      })
    },
    sendVerificationCode() {
      if (!this.canClick) return  //改动的是这两行代码
      if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.emailNumber)) {
        send_data({
          url: 'sendVerificationCode/',
          data: {'email': this.sign.emailNumber}
        })
        .then((res) => {
          this.$message({
            message: '验证码发送成功',
            type: 'success'
          })
        })
      }
      this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
        window.clearInterval(clock)
        this.content = '重新发送验证码'
        this.totalTime = 10
        this.canClick = true  //这里重新开启
        }
      },1000)
    },
    change_ava(res){
      this.sign.ava = res.data
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    countDown () {
      if (!this.canClick) return  //改动的是这两行代码
      this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
        window.clearInterval(clock)
        this.content = '重新发送验证码'
        this.totalTime = 10
        this.canClick = true  //这里重新开启
        }
      },1000)
    }
  },
  computed: {
    checkSub:(th) => {Boolean(th.sign.username )}
  },
  mounted:(th) =>{
    document.title = '注册'
  },
}
</script>

<style>
  .signOn .item {
    margin: 25px 10px;
  }
  .signOn .tags {
    text-align: initial;
  }
  .signOn .submit{
    margin: 10px;
    width: 100px;
  }
  .el-steps {
    margin-top: 20px;
  }
  .el-step__icon.is-text {
    display: grid;
  }
  .signOn .el-tag {
    margin: 5px;
  }
  .signOn .el-row {
    margin-top: 10px;
  }
  .signOn .col-r {
    line-height: 40px;
    text-align: right;
  }
  .signOn .col-l {
    line-height: 40px;
    text-align: left;
  }

</style>
