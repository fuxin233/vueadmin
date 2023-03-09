<template>

  <div class="bg" ref="vantaRef">
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

      <el-form :model="loginForm" :rules="rules" ref="loginForm" >
        <el-form-item prop="username" style="width: 100%" >
          <div class="form__group field">
            <input id="username" required="" placeholder="请输入用户名" class="form__field" type="input" v-model="loginForm.username">
            <label class="form__label" for="username">用户名</label>
          </div>
<!--          <el-input placeholder="请输入用户名" v-model="loginForm.username" clearable></el-input>-->

        </el-form-item>
        <el-form-item  prop="password" style="width: 100%">
          <div class="form__group field">
            <input id="password" required="" placeholder="请输入密码" class="form__field" type="input" v-model="loginForm.password">
            <label class="form__label" for="password">密码</label>
          </div>
<!--          <el-input placeholder="请输入密码" v-model="loginForm.password" show-password clearable></el-input>-->
        </el-form-item>

        <el-form-item label="" prop="code" style="width: 100% ">

          <div class="form__group field">
            <input id="code" required="" placeholder="请输入验证码" class="form__field" type="input" v-model="loginForm.code">
            <label class="form__label" for="code">验证码</label>
          </div>
          <el-image class="captchaImg" :src="captchaImg" @click="getCaptcha" style="float: right"></el-image>
<!--          <el-input placeholder="请输入验证码"v-model="loginForm.code" style="width: 172px;float: left" maxlength="5" clearable></el-input>-->

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
import * as THREE from 'three'
import Net from 'vanta/src/vanta.net'

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
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
  },
  mounted() {
    this.vantaEffect = Net({
      el: this.$refs.vantaRef,
      THREE: THREE
    }),
        VANTA.NET({
          el: this.$refs.vantaRef,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x409eff,
          backgroundColor: 0x584d7d,
          spacing: 12.00
        })
  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  },

}
</script>

<style scoped>


.lizi{
  position: fixed;
  width: 100%;
  z-index: 1;
}

.bg{
  /*background-image: url("../assets/loginBackground.png");*/
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
  background:rgba(112,146,190,1);
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
.form__group {
  position: relative;
  padding: 20px 0 0;
  margin-top: 10px;
  width: 100%;
  max-width: 180px;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: none;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 17px;
  color: #fff;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form__field::placeholder {
  color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
  font-size: 17px;
  cursor: text;
  top: 20px;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 17px;
  color: #9b9b9b;
  pointer-events: none;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #116399, #38caef);
  border-image-slice: 1;
}

.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 17px;
  color: #38caef;
  font-weight: 700;
}

/* reset input */
.form__field:required, .form__field:invalid {
  box-shadow: none;
}
</style>
