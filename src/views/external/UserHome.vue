<template>
  <div class="bg" ref="vantaRef">
    <el-container>
      <el-aside width="200px" class="leftSide">

      </el-aside>

    <el-container>
        <el-header >

          <div class="header-avatar">
            <el-avatar size="medium" :src= this.userInfo.avatar></el-avatar>
            <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link" style="color: white">
           {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
           </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link :to="{name:'UserLogin'}" v-if="userInfo.id==0">登录</router-link>
                  <router-link :to="{name:'UserCenter'}" v-if="userInfo.id!=0">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
            <el-link href="https://www.baidu.com/" style="color: white">百度</el-link>
            <el-link @click="$router.push('/AdminLogin')" style="color: white">管理员端</el-link>
          </div>
        </el-header>

        <el-main>
          <div style="margin: 0 15px;">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>


</template>

<script>

import HALO from 'vanta/src/vanta.halo'
import * as THREE from "three";
import * as echarts from 'echarts';
export default {
  name: "UserHome",
  components: {
  },
  data(){
    return{
      userInfo: {
        id: "",
        name: "",
        avatar:""
      }
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
        this.$router.push("/AdminLogin")
      })
    }
  },
  mounted() {
    this.vantaEffect = HALO({
      el: this.$refs.vantaRef,
      THREE: THREE
    }), VANTA.HALO({
      el: this.$refs.vantaRef,
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
  height: 70vh;
}

.header-avatar{
  float: right;
  width: 400px;
  display:flex;
  justify-content: space-around;
  align-items: center;
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

}

.rightSide {

  text-align: right;

}

.el-main {

  color: #333;
  text-align: left;
  padding:0;
}

a{
  text-decoration: none;
}


</style>
