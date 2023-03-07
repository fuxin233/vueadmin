<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>

export default {
  name: "App",
  watch: {
    //有bug获取不到表头名
    // 解决刷新浏览器没有tab的问题
    $route(to, from) {
      console.log("to")
      console.log(to)
      if (to.path != '/login') {
        let obj = {
          name: to.name,
          title: to.meta.title
        }
        this.$store.commit("addTabs", obj)
      }
    }
  }
}
</script>


<style>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
