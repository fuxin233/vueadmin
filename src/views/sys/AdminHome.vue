<template>
  <div class="bg">
  <el-container>
    <el-aside width="200px">
      <AdminMenu></AdminMenu>
    </el-aside>

    <el-container>
      <el-header >

        <div class="header-avatar" >
          <el-avatar size="medium" :src= this.userInfo.avatar></el-avatar>

          <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
           {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
           </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="{name:'AdminCenter'}">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>

          <el-link href="https://www.baidu.com/" target="_blank">百 度</el-link>
          <el-link @click="$router.push('/UserIndex')" target="_blank">主 站</el-link>
        </div>
      </el-header>

      <el-main>
        <Tabs></Tabs>
        <div style="margin: 0 15px; ">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
  </div>


</template>

<script>

import AdminMenu from "../inc/AdminMenu";
import Tabs from "../inc/Tabs";
export default {
  name: "AdminHome",
  components: {
    AdminMenu,
    Tabs
  },
  watch: {
    //有bug获取不到表头名
    // 解决刷新浏览器没有tab的问题
    $route(to, from) {
      console.log("to")
      console.log(to)
      if (to.path != '/AdminLogin'
          && to.path != '/ArticleDetail'
          && to.path != '/ArticleHome'
          && to.path != '/Assembling'
          && to.path != '/UserArticle'
          && to.path != '/UserCenter'
          && to.path != '/UserCpuMulti'
          && to.path != '/UserCpuSingle'
          && to.path != '/UserHarddisk'
          && to.path != '/UserHome'
          && to.path != '/UserLogin'
          && to.path != '/UserMainboard'
          && to.path != '/UserMemory'
          && to.path != '/UserPccase'
          && to.path != '/UserPower'
          && to.path != '/Login') {
        let obj = {
          name: to.name,
          title: to.meta.title
        }
        this.$store.commit("addTabs", obj)
      }
    }
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
  }
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
  height: 100vh;
}

.header-avatar{
  float: right;
  width: 300px;
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
