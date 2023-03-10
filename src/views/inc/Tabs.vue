<template>
  <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab" >
    <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "Tabs",
  data() {
    return {
      //editableTabsValue: this.$store.state.menus.editableTabsValue,
      // editableTabs: this.$store.state.menus.editableTabs
    }
  },
  computed:{
    editableTabs:{
      get(){
        return this.$store.state.menus.editableTabs
      },
      set(val){
        this.$store.state.menus.editableTabs=val
      }
    },

    editableTabsValue:{
      get(){
        return this.$store.state.menus.editableTabsValue
      },
      set(val){
        this.$store.state.menus.editableTabsValue=val
      }
    }
  },

  methods: {

    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;

      if (targetName==='Index'){
        return
      }

      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      this.$router.push({name: activeName})
    },
    clickTab(target){
      this.$router.push({name: target.name})
    },
  }
}
</script>

<style scoped>
.card {
  box-sizing: border-box;
  width: 190px;
  height: 254px;
  background: rgba(217, 217, 217, 0.58);
  border: 1px solid white;
  box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(6px);
  border-radius: 17px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-weight: bolder;
}

.card:hover {
  border: 1px solid black;
  transform: scale(1.05);
}

.card:active {
  transform: scale(0.95) rotateZ(1.7deg);
}
</style>
