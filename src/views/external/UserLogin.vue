<template>

  <div class="bg" ref="vantaRef">

    <button type="button" class="back" @click="$router.push('/UserIndex')">
      <strong>回 到 首 页</strong>
      <div id="container-stars">
        <div id="stars"></div>
      </div>

      <div id="glow">
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </button>


    <div class="container noselect">
      <div class="canvas">
        <div class="tracker tr-1"></div>
        <div class="tracker tr-2"></div>
        <div class="tracker tr-3"></div>
        <div class="tracker tr-4"></div>
        <div class="tracker tr-5"></div>
        <div class="tracker tr-6"></div>
        <div class="tracker tr-7"></div>
        <div class="tracker tr-8"></div>
        <div class="tracker tr-9"></div>
        <div class="tracker tr-10"></div>
        <div class="tracker tr-11"></div>
        <div class="tracker tr-12"></div>
        <div class="tracker tr-13"></div>
        <div class="tracker tr-14"></div>
        <div class="tracker tr-15"></div>
        <div class="tracker tr-16"></div>
        <div class="tracker tr-17"></div>
        <div class="tracker tr-18"></div>
        <div class="tracker tr-19"></div>
        <div class="tracker tr-20"></div>
        <div class="tracker tr-21"></div>
        <div class="tracker tr-22"></div>
        <div class="tracker tr-23"></div>
        <div class="tracker tr-24"></div>
        <div class="tracker tr-25"></div>
        <div id="card">
          <p id="prompt">计算机硬件交流网</p>
          <div class="subtitle">By Byc</div>
          <div class="title">基于SpringBoot与Vue实现<br>内置3D装机动画

          </div>

        </div>
      </div>
    </div>



    <div id="login-container">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" >

        <div class="card">
          <div class="card2">
            <div class="form">
              <p id="heading">登录</p>
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
                <el-button type="primary" @click="submitForm('loginForm')" class="button" :plain="true">&nbsp;&nbsp;&nbsp;&nbsp;登录&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                <el-button @click="dialogVisible = true" class="button" :plain="true" type="info">注册</el-button>
              </div>
              <div>
                <el-link type="primary" @click="$router.push('/AdminLogin')">管理员登录</el-link>
              </div>
            </div>
          </div>
        </div>
      </el-form>

    </div>
    <!--注册对话框-->
    <el-dialog
        title="注册"
        :visible.sync="dialogVisible"
        width="600px"
        :append-to-body="true"
        :before-close="handleClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名" prop="name" label-width="100px">
          <el-input placeholder="请输入用户名" v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex" label-width="100px">
          <el-radio v-model="editForm.sex" label="男">男</el-radio>
          <el-radio v-model="editForm.sex" label="女">女</el-radio>
        </el-form-item>

        <el-form-item label="密码" prop="password" label-width="100px">
          <el-input placeholder="默认密码为123456" v-model="editForm.password" autocomplete="off" show-password clearable></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass" label-width="100px">
          <el-input placeholder="再次输入密码" v-model="editForm.checkPass" autocomplete="off" show-password clearable></el-input>
        </el-form-item>

        <el-form-item label="邮箱"  prop="email" label-width="100px">
          <el-input placeholder="请输入邮箱" v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱验证码"  label-width="100px">
          <el-input placeholder="请输入邮箱验证码" v-model="code"  style="width: 148px; margin-right:8px;float: left" maxlength=""></el-input>
          <el-button v-show="editForm.email != ''" type="primary" @click="sendEmail(editForm.email)" :disabled="disable">{{buttonName}}</el-button>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="registerForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import * as THREE from 'three'
import RINGS from 'vanta/src/vanta.rings'
export default {
  name: "UserLogin",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        key:''
      },
      code:'',
      key:'',
      dialogVisible: false,
      editForm:{},
      editFormRules: {
        name:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { min: 5, max: 20, message: '密码至少为5个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 5, max: 20, message: '密码至少为5个字符', trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
      },
      //获取验证码倒计时
      buttonName:'获取邮箱验证码',
      count: 60,
      disable: false,
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
    var validatePass2 = (rule, value, callback) => {
      if(this.editForm.userPwd!==null){
        if (this.editForm.checkPass === '') {
          callback(new Error('请再次输入密码'));
        } else if (this.editForm.checkPass !== this.editForm.userPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }

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
            this.$router.push("/UserIndex")
          })
        } else {
          this.getCaptcha();
          console.log('error submit!!');
          return false;
        }
      });
    },
    registerForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/user/register/'+this.key+'/'+this.code, this.editForm)
              .then(res => {
                this.$message({
                  showClose: true,
                  message: '恭喜你，注册成功',
                  type: 'success',
                });
                this.resetForm(formName)
                this.dialogVisible = false
              })
        } else {
          console.log('error submit!!');
          this.dialogVisible = true
          return false;
        }
      });
    },
    handleClose() {
      console.log(this.editForm.roleIds)
      this.resetForm('editForm')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.getCaptcha();
    },
    //获取验证码
    getCaptcha(){
      this.$axios.get('/captcha').then(res=>{
        this.loginForm.key = res.data.data.token
        this.captchaImg=res.data.data.captchaImg
      })
    },
    sendEmail(userEmail){
      console.log(userEmail),
          this.$axios.get('/user/sendMail/'+userEmail).then(res=>{
            this.key = res.data.data;
            let timeout= setInterval(() => {
              if (this.count < 1) {
                this.disable = false;
                this.buttonName = "获取邮箱验证码";
                this.count = 60;
                clearInterval(timeout);
              } else {
                this.disable = true;
                this.buttonName = this.count-- + "s后重发";
              }
            }, 1000);

          })

    }
  },
  created(){
    localStorage.clear()
    sessionStorage.clear()
    this.getCaptcha()
  },
  mounted() {
    this.vantaEffect = RINGS({
      el: this.$refs.vantaRef,
      THREE: THREE
    }),
        VANTA.RINGS({
          el: this.$refs.vantaRef,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundAlpha: 0.75
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
/deep/ .el-dialog {
  background: rgb(147,207,240);
  border-radius: 20px;
  transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: inset 0 -3em 3em rgba(0,0,0,0.1),
  0 0  0 2px rgb(190, 190, 190),
  0.3em 0.3em 1em rgba(0,0,0,0.3);
}


.lizi{
  position: fixed;
  width: 100%;
  z-index: 1;
}
.bg{
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
  height: 400px;
  position: absolute;
  left: 80%;
  top: 45%;
  transform: translate(-50%,-50%);
  border-radius: 10px;
  z-index: 900;

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

.button {
  padding: 1em 2em;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #2c9caf;
  transition: all 1000ms;
  font-size: 15px;
  position: relative;
  overflow: hidden;
  outline: 2px solid #2c9caf;
  margin-right: 10px;
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


/*works janky on mobile :<*/
.container {
  position: relative;
  width: 1200px;
  height: 500px;
  transition: 200ms;
  position: absolute;
  left: 5%;
  top: 20%;
}

#card {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  transition: 700ms;
  background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
  opacity: 0.9;
}


.title {
  opacity: 0;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  transition-delay: 100ms;
  position: absolute;
  font-size: 50px;
  font-weight: bold;
}

.tracker:hover ~ #card .title {
  opacity: 1;
}

#prompt {
  top: 30px;
  left: 18%;
  z-index: 20;
  font-weight: bold;
  transition: 300ms ease-in-out-out;
  position: absolute;
  max-width: 800px;
  font-size: 100px;
  color:hsla(0, 75%, 75%, 0.5);
  text-shadow:0 0 1px currentColor,
    /*highlight*/-1px -1px 1px hsl(184,80%,50%),
  0 -1px 1px hsl(184,80%,55%),
  1px -1px 1px hsl(184,80%,50%),
    /*light shadow*/
  1px 1px 1px hsl(184,80%,10%),
  0 1px 1px hsl(184,80%,10%),
  -1px 1px 1px hsl(184,80%,10%),
    /*outline*/-2px -2px 1px hsl(184,80%,15%),
  -1px -2px 1px hsl(184,80%,15%),
  0 -2px 1px hsl(184,80%,15%),
  1px -2px 1px hsl(184,80%,15%),
  2px -2px 1px hsl(184,80%,15%),
  2px -1px 1px hsl(184,80%,15%),
  2px 0 1px hsl(184,80%,15%),
  2px 1px 1px hsl(184,80%,15%),
  -2px 0 1px hsl(184,80%,15%),
  -2px -1px 1px hsl(184,80%,15%),
  -2px 1px 1px hsl(184,80%,15%),
    /*dark shadow*/
  2px 2px 2px hsl(184,80%,5%),
  1px 2px 2px hsl(184,80%,5%),
  0 2px 2px hsl(184,80%,5%),
  -1px 2px 2px hsl(184,80%,5%),
  -2px 2px 2px hsl(184,80%,5%)
}
.fontStyle{

}


.tracker {
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 100%;
}


.tracker:hover {
  cursor: pointer;
}


.tracker:hover ~ #card {
  transition: 300ms;
  filter: brightness(1.1);
}
.tracker:hover ~ #card #prompt {
  opacity: 0;
}

.container:hover #card::before {
  transition: 200ms;
  content: '';
  opacity: 80%;
}

.canvas {
  perspective: 800px;
  inset: 0;
  z-index: 200;
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas: "tr-1 tr-2 tr-3 tr-4 tr-5"
    "tr-6 tr-7 tr-8 tr-9 tr-10"
    "tr-11 tr-12 tr-13 tr-14 tr-15"
    "tr-16 tr-17 tr-18 tr-19 tr-20"
    "tr-21 tr-22 tr-23 tr-24 tr-25";
}

#card::before {
  content: '';
  background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
  filter: blur(2rem);
  opacity: 30%;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  transition: 200ms;
}

.tr-1 {
  grid-area: tr-1;
}

.tr-2 {
  grid-area: tr-2;
}

.tr-3 {
  grid-area: tr-3;
}

.tr-4 {
  grid-area: tr-4;
}

.tr-5 {
  grid-area: tr-5;
}

.tr-6 {
  grid-area: tr-6;
}

.tr-7 {
  grid-area: tr-7;
}

.tr-8 {
  grid-area: tr-8;
}

.tr-9 {
  grid-area: tr-9;
}

.tr-10 {
  grid-area: tr-10;
}

.tr-11 {
  grid-area: tr-11;
}

.tr-12 {
  grid-area: tr-12;
}

.tr-13 {
  grid-area: tr-13;
}

.tr-14 {
  grid-area: tr-14;
}

.tr-15 {
  grid-area: tr-15;
}

.tr-16 {
  grid-area: tr-16;
}

.tr-17 {
  grid-area: tr-17;
}

.tr-18 {
  grid-area: tr-18;
}

.tr-19 {
  grid-area: tr-19;
}

.tr-20 {
  grid-area: tr-20;
}

.tr-21 {
  grid-area: tr-21;
}

.tr-22 {
  grid-area: tr-22;
}

.tr-23 {
  grid-area: tr-23;
}

.tr-24 {
  grid-area: tr-24;
}

.tr-25 {
  grid-area: tr-25;
}

.tr-1:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-2:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-3:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg);
}

.tr-4:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(5deg) rotateZ(0deg);
}

.tr-5:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(10deg) rotateZ(0deg);
}

.tr-6:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-7:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-8:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(0deg) rotateZ(0deg);
}

.tr-9:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(5deg) rotateZ(0deg);
}

.tr-10:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(10deg) rotateZ(0deg);
}

.tr-11:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-12:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-13:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
}

.tr-14:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(5deg) rotateZ(0deg);
}

.tr-15:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(10deg) rotateZ(0deg);
}

.tr-16:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-17:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-18:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(0deg) rotateZ(0deg);
}

.tr-19:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(5deg) rotateZ(0deg);
}

.tr-20:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(10deg) rotateZ(0deg);
}

.tr-21:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-22:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-23:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
}

.tr-24:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(5deg) rotateZ(0deg);
}

.tr-25:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(10deg) rotateZ(0deg);
}

.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                 supported by Chrome, Edge, Opera and Firefox */
}
.subtitle {
  position: absolute;
  left: 40%;
  bottom: 5%;
  color: rgb(54, 50, 56);
  font-size: 40px;
  text-align: center;
  width: 100%;
}



.back {
  top: 3%;
  left: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  height: 3rem;
  background-size: 300% 300%;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
  transition: 0.5s;
  animation: gradient_301 5s ease infinite;
  border: double 4px transparent;
  background-image: linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%,#FE53BB 45%, #8F51EA 67%, #0044ff 87%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

#container-stars {
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.5s;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
}

strong {
  z-index: 2;
  font-family: 'Avalors Personal Use';
  font-size: 12px;
  letter-spacing: 5px;
  color: #FFFFFF;
  text-shadow: 0 0 4px white;
}

#glow {
  position: absolute;
  display: flex;
  width: 12rem;
}

.circle {
  width: 100%;
  height: 30px;
  filter: blur(2rem);
  animation: pulse_3011 4s infinite;
  z-index: -1;
}

.circle:nth-of-type(1) {
  background: rgba(254, 83, 186, 0.636);
}

.circle:nth-of-type(2) {
  background: rgba(142, 81, 234, 0.704);
}

.back:hover #container-stars {
  z-index: 1;
  background-color: #212121;
}

.back:hover {
  transform: scale(1.1)
}

.back:active {
  border: double 4px #FE53BB;
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
}

.back:active .circle {
  background: #FE53BB;
}

#stars {
  position: relative;
  background: transparent;
  width: 200rem;
  height: 200rem;
}

#stars::after {
  content: "";
  position: absolute;
  top: -10rem;
  left: -100rem;
  width: 100%;
  height: 100%;
  animation: animStarRotate 90s linear infinite;
}

#stars::after {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
}

#stars::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 170%;
  height: 500%;
  animation: animStar 60s linear infinite;
}

#stars::before {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
  opacity: 0.5;
}

@keyframes animStar {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-135rem);
  }
}

@keyframes animStarRotate {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0);
  }
}

@keyframes gradient_301 {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse_3011 {
  0% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}

</style>
