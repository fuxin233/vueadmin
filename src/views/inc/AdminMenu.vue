<template>
  <el-menu
      :default-active="this.$route.name"
      class="el-menu-vertical-demo"
      background-color="rgba(50,50,50,0.8)"
      text-color="white"
  >

    <router-link to="/index">
      <el-menu-item index="Index" @click="selectMenu({name:'Index',title:'首页'})">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </template>
      </el-menu-item>
    </router-link>

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-operation"></i>
        <span>系统管理</span>
      </template>
      <router-link to="/User">

        <el-menu-item index="User" @click="selectMenu({name:'User',title:'用户管理'})">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/Article">
        <el-menu-item index="Article" @click="selectMenu({name:'Article',title:'文章管理'})">
          <template slot="title">
            <i class="el-icon-s-management"></i>
            <span slot="title">文章管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/Comment">
        <el-menu-item index="Comment" @click="selectMenu({name:'Comment',title:'评论管理'})">
          <template slot="title">
            <i class="el-icon-s-comment"></i>
            <span slot="title">评论管理</span>
          </template>
        </el-menu-item>
      </router-link>




    </el-submenu>

    <el-submenu index="硬件管理">
      <template slot="title">
        <i class="el-icon-s-claim"></i>
        <span>硬件管理</span>
      </template>

      <router-link to="/sys/Gpu">
        <el-menu-item index="SysGpu" @click="selectMenu({name:'SysGpu',title:'GPU信息管理'})">
          <template slot="title">
            <i class="el-icon-edit"></i>
            <span slot="title">GPU信息管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/sys/Cpu">
        <el-menu-item index="SysSet" @click="selectMenu({name:'SysCpu',title:'CPU信息管理'})">
          <template slot="title">
            <i class="el-icon-edit"></i>
            <span slot="title">CPU信息管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/sys/Atx">
        <el-menu-item index="SysAtx" @click="selectMenu({name:'SysAtx',title:'电源信息管理'})">
          <template slot="title">
            <i class="el-icon-edit"></i>
            <span slot="title">电源信息管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/sys/Memory">
        <el-menu-item index="SysMemory" @click="selectMenu({name:'SysMemory',title:'内存信息管理'})">
          <template slot="title">
            <i class="el-icon-edit"></i>
            <span slot="title">内存信息管理</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-submenu>




    <!--    <el-submenu  default-active="Index" :index="menu.name" v-for="menu in menuList">-->


    <!--      <router-link :to="item.path" v-for="item in menu.children">-->
    <!--        <el-menu-item :index="item.name" @click="selectMenu(item)">-->
    <!--          <template slot="title">-->
    <!--            <i :class="item.icon"></i>-->
    <!--            <span slot="title">{{item.title}}</span>-->
    <!--          </template>-->
    <!--        </el-menu-item>-->
    <!--      </router-link>-->
    <!--    </el-submenu>-->
  </el-menu>


</template>

<script>
export default {
  name: "AdminMenu",

  methods: {
    selectMenu(item) {
      console.log(item)
      let obj = {
        name: item.name,
        title: item.title
      }
      this.$store.commit("addTabs", obj)
    }
  }
}
</script>

<style scoped>

.el-menu-vertical-demo{
  height: 100vh;
}    a{
       text-decoration:none;
       background-color: rgba(23, 22, 22,0.8);
     }

</style>
