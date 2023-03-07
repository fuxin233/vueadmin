<template>

  <el-container>
    <el-aside width="200px">
      <AdminMenu></AdminMenu>
    </el-aside>

    <el-container>
      <el-header style="background:-webkit-linear-gradient(left bottom, white,lightslategray)">
        <strong>后台管理系统</strong>

        <div class="header-avatar" >
          <el-avatar size="medium" :src= this.userInfo.avatar></el-avatar>

          <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
           {{userInfo.name+'管理员'}}<i class="el-icon-arrow-down el-icon--right"></i>
           </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="{name:'UserCenter'}">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>

          <el-link href="https://www.baidu.com/" target="_blank">百度</el-link>
          <el-link href="https://www.bilibili.com/" target="_blank">B站</el-link>
        </div>
      </el-header>

      <el-main  style="background:-webkit-linear-gradient(left top, white,lightslategray)">
        <Tabs></Tabs>
        <div style="margin: 0 15px; ">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import AdminMenu from "../views/inc/AdminMenu";
import Tabs from "../views/inc/Tabs";

export default {
  name: "Home",
  components: {
    AdminMenu,
    Tabs
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
        this.$router.push("/login")
      })
    }
  },



}


</script>

<style scoped>


.el-container{
  padding: 0;
  margin: 0;
  height: 100vh;
}

.header-avatar{
  float: right;
  width: 210px;
  display:flex;
  justify-content: space-around;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #333333;
}

.el-header {
  background-color:lightslategray;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: left;
  line-height: 200px;
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
