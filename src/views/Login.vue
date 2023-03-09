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

    <div id="login-container">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" >

        <div class="card">
          <div class="card2">
            <div class="form">
              <p id="heading">管理员登录</p>
              <el-form-item  prop="username">
                <div class="field">
                  <i class="el-icon-user-solid"></i>
                  <input type="text" class="input-field" placeholder="请输入用户名" autocomplete="off" v-model="loginForm.username">
                </div>
              </el-form-item>
              <el-form-item prop="password">
                <div class="field">
                  <i class="el-icon-lock"></i>
                  <input type="password" class="input-field" placeholder="请输入密码" v-model="loginForm.password">
                </div>
              </el-form-item>

              <el-form-item  prop="code">
                <div class="field" style="width: 50%" id="code">
                  <i class="el-icon-key"></i>
                  <input type="text" class="input-field" placeholder="请输入验证码" v-model="loginForm.code">
                </div>
                <el-image class="captchaImg" :src="captchaImg" @click="getCaptcha" id="key"></el-image>
              </el-form-item>
              <div class="btn">
                <el-button type="primary" @click="submitForm('loginForm')" class="button1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;登录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                <el-button @click="resetForm('loginForm')" class="button2">重置</el-button>
              </div>
            </div>
          </div>
        </div>
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
  float:right;
  margin-left:8px;
  border-radius: 4px;
  width: 140px;
  height: 34px
}

#login-container{
  width: 400px;
  height: 370px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -220px;
  margin-top: -170px;
  border-radius: 10px;

}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 2em;
  padding-right: 2em;
  padding-bottom: 0.4em;
  background-color: #171717;
  border-radius: 20px;
  height: 400px;
  z-index: 1;
}

#heading {
  text-align: center;
  margin: 2em;
  color: rgb(0, 255, 200);
  font-size: 1.2em;
}

.field {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  border-radius: 25px;
  padding: 0.6em;
  border: none;
  outline: none;
  color: white;
  background-color: #171717;
  box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
}

.input-icon {
  height: 1.3em;
  width: 1.3em;
  fill: rgb(0, 255, 200);
}

.input-field {
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: rgb(0, 255, 200);
}

.form .btn {
  display: flex;
  justify-content: center;
  flex-direction: row;

}

.button1 {
  margin-top: 0px;
  border-radius: 5px;
  margin-right: 0.5em;
  border: none;
  outline: none;
  transition: .4s ease-in-out;
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  color: rgb(0, 0, 0);
}

.button1:hover {
  background-image: linear-gradient(163deg, #00642f 0%, #13034b 100%);
  color: rgb(0, 255, 200);
}

.button2 {
  border-radius: 5px;
  border: none;
  outline: none;
  transition: .4s ease-in-out;
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  color: rgb(0, 0, 0);
}

.button2:hover {
  background-image: linear-gradient(163deg, #00642f 0%, #13034b 100%);
  color: rgb(0, 255, 200);
}

.card {
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 22px;
  transition: all .3s;
}

.card2 {
  border-radius: 0;
  transition: all .2s;
}

.card2:hover {
  transform: scale(0.98);
  border-radius: 20px;
}

.card:hover {
  box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
}

#code{
  position: absolute;

}
#key{
  position: absolute;

}
</style>