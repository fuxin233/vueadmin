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

      <router-link to="/ComputerList">
        <el-menu-item index="ComputerList" @click="selectMenu({name:'ComputerList',title:'配置单管理'})">
          <template slot="title">
            <i class="el-icon-s-platform"></i>
            <span slot="title">配置单管理</span>
          </template>
        </el-menu-item>
      </router-link>




    </el-submenu>

    <el-submenu index="硬件管理">
      <template slot="title">
        <i class="el-icon-s-claim"></i>
        <span>硬件管理</span>
      </template>

      <router-link to="/Cpu">
        <el-menu-item index="Cpu" @click="selectMenu({name:'Cpu',title:'CPU信息管理'})">
          <template slot="title">
            <i class="el-icon-cpu"></i>
            <span slot="title">CPU信息管理</span>
          </template>
        </el-menu-item>
      </router-link>



      <router-link to="/Gpu">
        <el-menu-item index="Gpu" @click="selectMenu({name:'Gpu',title:'GPU信息管理'})">
          <template slot="title">
            <i class="el-icon-c-scale-to-original"></i>
            <span slot="title">GPU信息管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/Harddisk">
        <el-menu-item index="Harddisk" @click="selectMenu({name:'Harddisk',title:'硬盘信息管理'})">
          <template slot="title">
            <i class="el-icon-receiving"></i>
            <span slot="title">硬盘信息管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/Mainboard">
        <el-menu-item index="Mainboard" @click="selectMenu({name:'Mainboard',title:'主板信息管理'})">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span slot="title">主板信息管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/Memory">
        <el-menu-item index="Memory" @click="selectMenu({name:'Memory',title:'内存信息管理'})">
          <template slot="title">
            <i class="el-icon-wallet"></i>
            <span slot="title">内存信息管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/Pccase">
        <el-menu-item index="Pccase" @click="selectMenu({name:'Pccase',title:'机箱信息管理'})">
          <template slot="title">
            <i class="el-icon-mobile"></i>
            <span slot="title">机箱信息管理</span>
          </template>
        </el-menu-item>
      </router-link>


      <router-link to="/Power">
        <el-menu-item index="Power" @click="selectMenu({name:'Power',title:'电源信息管理'})">
          <template slot="title">
            <i class="el-icon-odometer"></i>
            <span slot="title">电源信息管理</span>
          </template>
        </el-menu-item>
      </router-link>


    </el-submenu>

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
