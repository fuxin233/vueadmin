<template>
  <div class="center-in-center">

    <div style="display: flex;
        justify-content:center;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px">

      <el-button type="info" plain size="mini" @click="getListByPrice">按参考价格</el-button>
      <el-button type="info" plain size="mini" @click="getListByDate">按发布时间</el-button>
      <el-button type="info" plain size="mini" @click="getListByHot">按内存热度</el-button>

    </div>

    <div class="oneData" @mouseover="inside()" @mouseout="out()" v-for="item in tableData">
      <el-popover
          placement="top"
          trigger="hover"
      >
        内存型号:&nbsp;&nbsp;{{item.memoryName}}<br/>
        DDR代数:&nbsp;&nbsp;DDR{{item.memoryDdr}}代<br/>
        内存容量:&nbsp;&nbsp;{{item.memorySize}}GB<br/>
        内存频率:&nbsp;&nbsp;{{item.memoryFrequency}}MHz<br/>
        产商:&nbsp;&nbsp;{{item.memoryType}}<br/>
        发布价格:&nbsp;&nbsp;{{item.memoryPrice}} 元<br/>
        发布日期:&nbsp;&nbsp;{{item.memoryDate}}<br/>
        热度:&nbsp;&nbsp;{{item.memoryHot}}<br/>
        <div class="left" slot="reference" >
          <div class="inner">
            <div class="innerleft"  :style="{width:item.memoryPrice/item.maxPrice *100 + '%'}">{{item.memoryName}}</div>
          </div>
        </div>
      </el-popover>

    </div>

  </div>


</template>

<script>
import UserHome from "./UserHome";

export default {
  name: "UserMemory",
  components: {UserHome},
  data() {
    return {
      tableData: [],
      insides:false,
    }
  },
  created() {
    this.getListByPrice()

  },
  methods:{
    getListByPrice() {
      this.$axios.get("/memory-detail/listByPrice").then(res => {
        this.tableData = res.data.data

      })
    },

    getListByDate() {
      this.$axios.get("/memory-detail/listByDate").then(res => {
        this.tableData = res.data.data
      })
    },
    getListByHot() {
      this.$axios.get("/memory-detail/listByHot").then(res => {
        this.tableData = res.data.data
      })
    },
    inside(){
      this.insides = true
    },
    out(){
      this.insides = false
    },

  },
  mounted() {
  },

}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0;      /* Safari,Chrome 隐藏滚动条 */
  height: 0;     /* Safari,Chrome 隐藏滚动条 */
  display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
}



.center-in-center{
  height: 100%;
  width: 100%;


}

.oneData{
  margin:0 auto;
  font-size: 20px;
  width: 1200px;
  height: 50px;
  position: relative;

}
.left{
  display: inline-block;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  cursor: pointer;
}


.innerleft{
  box-shadow: #727374 3px 5px 5px ;
  padding-left: 10px;
  border-radius: 5px 5px 5px 5px;
  font-size: 18px;
  flex-direction: row;
  justify-content: center;
  display: flex;
  align-items: center;
  color: rgb(249, 250, 207);
  height: 100%;
  line-height: 200%;
  background: linear-gradient(125deg,#feac5e,#c779d0,#4bc0c8,#feac5e,#c779d0,#4bc0c8);
  /*设置渐变颜色*/
  background-size: 1000% 1000%;
  /*设置渐变背景的大小*/
  animation: gradient-move 15s infinite;

}
.inner{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

@keyframes gradient-move{
  /*设置图片移动位置，左上到右下到左上*/
  0%
  {background-position:0% 50%}
  50%
  {
    background-position:100% 50%
  }
  100%
  {background-position:0% 50%}

}
li{
  list-style:none;
}
</style>
