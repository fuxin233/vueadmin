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
      管理员登录
    </div>
    <div id="login-container">

      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
        <el-form-item prop="username" style="width: 380px" >
          <span slot="label">
            <span style="color: black">
            用户名
          </span>
          </span>
          <el-input placeholder="请输入用户名" v-model="loginForm.username" clearable></el-input>

        </el-form-item>
        <el-form-item  prop="password" style="width: 380px">
          <span slot="label">
          <span style="color: black">
            密码
          </span>
          </span>
          <el-input placeholder="请输入密码" v-model="loginForm.password" show-password clearable></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code" style="width: 380px ">
          <span slot="label">
          <span style="color: black">
            验证码
          </span>
          </span>
          <el-input placeholder="请输入验证码"v-model="loginForm.code" style="width: 172px;float: left" maxlength="5" clearable></el-input>
          <el-image class="captchaImg" :src="captchaImg" @click="getCaptcha"></el-image>
        </el-form-item>


        <el-form-item style="width: 350px ">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>

        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'BYC',
        password: '111111',
        code: '',
        key:''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '验证码为5个字符', trigger: 'blur' }
        ],
      },
      captchaImg:''
    };
  },
  methods: {
    submitForm(formName) {
      this.getCaptcha();

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getCaptcha();
          this.$axios.post('/login?',this.loginForm).then(res=>{

            const  jwt = res.headers['authorization']

            this.$store.commit('SET_TOKEN',jwt)

            this.$router.push("/index")

          })

        } else {
          this.getCaptcha();
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getCaptcha();
    },



    //获取验证码
    getCaptcha(){
      this.$axios.get('/captcha').then(res=>{
        this.loginForm.key = res.data.data.token
        this.captchaImg=res.data.data.captchaImg
      })
    }
  },
  created(){
    localStorage.clear()
    sessionStorage.clear()
    this.getCaptcha()
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
  background-size:100% 100%;
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
