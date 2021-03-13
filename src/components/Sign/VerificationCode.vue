<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lock"></el-button>
                    </el-input>
                </el-form-item>

                <el-form-item prop="sidentify"> // 验证码
                    <el-col :span="14">
                    <el-input placeholder="sidentify" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                    </el-input>
                    </el-col>
                    <el-col :span="8">
                        <v-sidentify></v-sidentify>
                    </el-col>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Sidentify from '../components/common/Sidentify'  //**引入验证码组件**
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    sidentify: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    sidentify:[
                        {required: true}
                    ]
                }
            }
        },
        components: {
            'v-sidentify':Sidentify 
        },
      
    }
</script>