<template>

  <div >
    <div class="bg"></div>
    <vue-particles
        color="#409EFF"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#409EFF"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
    >   </vue-particles>

    <div class="lable" >
      管理员注册
    </div>
    <div id="login-container">

      <el-form :model="RegisterForm" :rules="rules" ref="RegisterForm" label-width="100px">

        <el-form-item prop="userName" >
          <span slot="label">
            <span style="color: black">
            用户名
          </span>
          </span>
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user-solid" v-model="RegisterForm.username" clearable></el-input>

        </el-form-item >

        <el-form-item prop="pass" >
          <span slot="label">
            <span style="color: black">
            密码
          </span>
          </span>
          <el-input placeholder="请输入密码" type="password" v-model="RegisterForm.pass" show-password clearable></el-input>
        </el-form-item>
        <el-form-item  prop="checkPass" >
          <span slot="label">
            <span style="color: black">
            确认密码
          </span>
          </span>

          <el-input placeholder="请再次输入密码" type="password" v-model="RegisterForm.checkPass" show-password clearable></el-input>
        </el-form-item>

          <el-form-item
              prop="email"
              :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
            <span slot="label">
            <span style="color: black">
            邮箱
          </span>
          </span>
            <el-input v-model="RegisterForm.email">
            </el-input>
          </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('RegisterForm')" >提交</el-button>
          <el-button @click="resetForm('RegisterForm')">重置</el-button>

        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>

import qs from "qs";
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.RegisterForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.RegisterForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      RegisterForm: {
        username:'',
        pass: '',
        checkPass: '',
        emile:'',
      },
      rules: {
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 5, max: 20, message: '密码至少为5个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 5, max: 20, message: '密码至少为5个字符', trigger: 'blur' }
        ],

      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin(){
      this.$router.push({path:'/Login'})
    },
  }
}
</script>

<style scoped>


.lizi{
  position: fixed;
  width: 100%;
  z-index: 1;
}

.bg{
  background-image: url("../assets/loginBackground.png");

  background-repeat: no-repeat;
  position: absolute;
  padding: 0px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

}


.captchaImg{
  float:left;
  margin-left:8px;
  border-radius: 4px;
}

.lable{
  position: absolute;
  top: 17%;
  left: 46.5%;
  text-align: center;
  font-size: xx-large;
  font-family: bold;
  color: white;
}
.setcolor
{
  color: black;
}
#login-container{

  width: 400px;
  height: 320px;

  background:rgba(112,146,190,0.8);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -220px;
  margin-top: -170px;
  border-radius: 5px;
  padding-top: 40px;
  padding-right: 40px;
  z-index: 1;
}

</style>
