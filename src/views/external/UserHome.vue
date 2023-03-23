<template>
  <div class="bg" ref="UserBg">
    <el-container>


      <el-aside class="leftSide">
        <EchartsComponent01></EchartsComponent01>
      </el-aside>

    <el-container style="height: 100%;width: 100%">
        <el-header style="position: absolute;right: 0;">

          <div class="header-avatar">
            <div class="group">
              <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
              <input placeholder="查找相关新闻" type="search" class="input" v-model="title">
            </div>
            <button class="shadow__btn" @click="linkToArticle()">
              搜索
            </button>


            <el-avatar size="medium" :src= this.userInfo.avatar style="margin-left: 100px;" >
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
            <el-link href="https://www.baidu.com/" style="color: white;margin-left: 50px;">百度</el-link>
            <el-link @click="$router.push('/AdminLogin')" style="color: white;margin-left: 50px;">管理员端</el-link>
          </div>
        </el-header>

        <el-main style="margin-top: 100px;display: flex;max-height: 900px;border: 3px solid white;border-radius: 30px;background-color: rgba(0,0,0,0.3);">

            <router-view></router-view>

        </el-main>
      </el-container>
      <el-aside width="200px" class="rightSide">
          <echarts-component02></echarts-component02>
      </el-aside>
    </el-container>
    <div style="display: flex;
        justify-content:center;
        align-items: center;
        margin-bottom: 10px;
        margin-top: 10px;">


    <button type="button" class="btn" @click="$router.push('/UserIndex')">
      <strong><i class="el-icon-c-scale-to-original"></i>显卡排行</strong>
      <div class="container-stars">
        <div class="stars"></div>
      </div>
      <div class="glow">
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </button>


      <button type="button" class="btn" @click="$router.push('/UserCpuSingle')">
        <strong><i class="el-icon-cpu"></i>CPU排行</strong>
        <div class="container-stars">
          <div class="stars"></div>
        </div>
        <div class="glow">
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </button>


      <button type="button" class="btn" @click="$router.push('/UserHarddisk')">
        <strong><i class="el-icon-receiving"></i>硬盘列表</strong>
        <div class="container-stars">
          <div class="stars"></div>
        </div>
        <div class="glow">
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </button>


      <button type="button" class="btn" @click="$router.push('/UserMainboard')">
        <strong><i class="el-icon-s-grid"></i>主板列表</strong>
        <div class="container-stars">
          <div class="stars"></div>
        </div>
        <div class="glow">
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </button>


      <button type="button" class="btn" @click="$router.push('/UserMemory')">
        <strong><i class="el-icon-wallet"></i>内存列表</strong>
        <div class="container-stars">
          <div class="stars"></div>
        </div>
        <div class="glow">
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </button>


      <button type="button" class="btn" @click="$router.push('/UserPccase')">
        <strong><i class="el-icon-mobile"></i>机箱列表</strong>
        <div class="container-stars">
          <div class="stars"></div>
        </div>
        <div class="glow">
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </button>


      <button type="button" class="btn" @click="$router.push('/UserPower')">
        <strong><i class="el-icon-odometer"></i>电源列表</strong>
        <div class="container-stars">
          <div class="stars"></div>
        </div>
        <div class="glow">
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </button>


      <button type="button" class="btn" @click="$router.push('/UserComputerList')">
        <strong><i class="el-icon-odometer"></i>配置单列表</strong>
        <div class="container-stars">
          <div class="stars"></div>
        </div>
        <div class="glow">
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </button>


    </div>
  </div>


</template>

<script>

import HALO from 'vanta/src/vanta.halo'
import * as THREE from "three";
import EchartsComponent01 from "../inc/EchartsComponent01";
import EchartsComponent02 from "../inc/EchartsComponent02";
export default {
  name: "UserHome",
  watch: {
    //有bug获取不到表头名
    // 解决刷新浏览器没有tab的问题
    $route(to, from) {
      console.log("to")
      console.log(to)
      if (to.path != '/AdminLogin') {
        let obj = {
          name: to.name,
          title: to.meta.title
        }
        this.$store.commit("addTabs", obj)
      }
    }
  },
  components: {
    EchartsComponent01,
    EchartsComponent02
  },
  data(){
    return{
      userInfo: {
        id: "",
        name: "",
        avatar:""
      }
      ,
      title:''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods:{
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
    },
    linkToArticle(){
      this.$router.push({
        name: 'UserArticle',
        query: {
          title : this.title
        }
      })
    },
  },
  mounted() {
    this.vantaEffect = HALO({
      el: this.$refs.UserBg,
      THREE: THREE
    }), VANTA.HALO({
      el: this.$refs.UserBg,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      amplitudeFactor: 3.00,
      size: 1.50
    });
  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  },
}


</script>

<style scoped>


::-webkit-scrollbar {
  width: 0;      /* Safari,Chrome 隐藏滚动条 */
  height: 0;     /* Safari,Chrome 隐藏滚动条 */
  display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
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



.el-container{
  padding: 0;
  margin: 0;
  bottom: 0;
  height: 92%;
}

.header-avatar{
  width: 100%;
  margin-right: 0px;
  display:flex;
  align-items: center;
  position: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #333333;
}

.el-header {
  text-align: center;
  line-height: 50px;
}

.leftSide {
  text-align: left;
  max-height: 100%;
  min-width: 300px;
  margin-right: 10px;
}

.rightSide {
  transform:translateY(60px);
  text-align: right;
  min-height: 800px;
  min-width: 300px;
}

.el-main {
  color: #333;
  text-align: left;
  padding:0;
}

a{
  text-decoration: none;
}
.group {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  max-width: 190px;
  margin-top: 5px;
}

.input {
  width: 100%;
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
.btn {
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
  margin-left: 20px;
}

.container-stars {
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
  font-size: 16px;
  letter-spacing: 5px;
  color: #FFFFFF;
  text-shadow: 0 0 4px white;
}

.glow {
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

.btn:hover .container-stars {
  z-index: 1;
  background-color: #212121;
}

.btn:hover {
  transform: scale(1.1)
}

.btn:active {
  border: double 4px #FE53BB;
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
}

.btn:active .circle {
  background: #FE53BB;
}

.stars {
  position: relative;
  background: transparent;
  width: 200rem;
  height: 200rem;
}

.stars::after {
  content: "";
  position: absolute;
  top: -10rem;
  left: -100rem;
  width: 100%;
  height: 100%;
  animation: animStarRotate 90s linear infinite;
}

.stars::after {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
}

.stars::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 170%;
  height: 500%;
  animation: animStar 60s linear infinite;
}

.stars::before {
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
