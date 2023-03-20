<template>
  <div class="bg">

      <el-container style="height: 100%;width: 100%">
        <el-header>
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


          <div style="display: flex;align-items: center;margin-left: 40%">
          <div class="group">
            <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <input placeholder="查找相关新闻" type="search" class="input" v-model="title">
          </div>
          <button class="shadow__btn" @click="linkToArticle()">
            搜索
          </button>
          </div>

          <div style="right: 0;display: flex;margin-right: 30px;position:absolute;align-items: center">
            <el-avatar size="medium" :src= this.userInfo.avatar style="display: flex;">
            </el-avatar>
            <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link" style="color: white;margin-left: 10px;">
           您好，{{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
           </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link :to="{name:'UserLogin'}" v-if="userInfo.id==0">登录</router-link>
                  <router-link :to="{name:'UserCenter'}" v-if="userInfo.id!=0">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
            <el-link href="https://www.baidu.com/" style="color: white;margin-left: 40px;">百度</el-link>
            <el-link @click="$router.push('/AdminLogin')" style="color: white;margin-left: 40px;">管理员端</el-link>
</div>
        </el-header>

        <el-main style="border: 3px solid white;background-color: rgba(255,255,255,1);">

          <router-view></router-view>

        </el-main>
      </el-container>

  </div>


</template>

<script>

export default {
  name: "ArticleHome",
  data(){
    return{
      userInfo: {
        id: "",
        name: "",
        avatar:""
      },
      title:''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods:{

    linkToArticle(){
      location.href = "http://127.0.0.1:8080/UserArticle?title="+this.title
    },


    getUserInfo(){
      this.$axios.get("/user/userInfo").then(res=>{
        this.userInfo = res.data.data;
      })
    },

    //清除信息缓存
    logout(){
      this.$axios.post("/logout").then(res=>{
        localStorage.clear()
        sessionStorage.clear()
        this.$store.commit("resetState")
        ///跳转到登录页面
        this.$router.push("/UserLogin")
      })
    }
  },
}


</script>

<style scoped>


.bg{
  background-image: url("../../assets/adminHome.jpg");
  background-size:100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  padding: 0px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}



.el-container{
  padding: 0;
  margin: 0;
  bottom: 0;
  height: 100%;
}

.header-avatar{
  width: 100%;
  position: relative;

}

.el-dropdown-link {
  cursor: pointer;
  color: #333333;
}

.el-header {
  display: flex;
  line-height: 50px;
  width: 1400px;
}

a{
  text-decoration: none;
}
.group {
  line-height: 28px;
  align-items: center;
  position: relative;
  margin-top: 5px;
}

.input {
  width: 300px;
  height: 40px;
  line-height: 28px;
  padding: 0 1rem;
  padding-left: 2.5rem;
  border: 2px solid transparent;
  border-radius: 8px;
  outline: none;
  background-color: #f3f3f4;
  color: #0d0c22;
  transition: .3s ease;
}

.input::placeholder {
  color: #9e9ea7;
}

.input:focus, input:hover {
  outline: none;
  border-color: rgba(234,76,137,0.4);
  background-color: #fff;
  box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
}

.icon {
  position: absolute;
  top: 10px;
  left: 1rem;
  fill: #9e9ea7;
  width: 1rem;
  height: 1rem;
}
.shadow__btn {

  padding: 10px 20px;
  border: none;
  font-size: 17px;
  color: #fff;
  border-radius: 7px;
  letter-spacing: 4px;
  font-weight: 700;
  text-transform: uppercase;
  transition: 0.5s;
  transition-property: box-shadow;
  margin-top: 5px;
}

.shadow__btn {
  height: 40px;
  background: rgb(0,140,255);
  box-shadow: 0 0 25px rgb(0,140,255);
  margin-left: 5px;
}

.shadow__btn:hover {
  box-shadow: 0 0 5px rgb(0,140,255),
  0 0 25px rgb(0,140,255),
  0 0 50px rgb(0,140,255),
  0 0 100px rgb(0,140,255);
}




.back {
  margin-top: 5px;
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
