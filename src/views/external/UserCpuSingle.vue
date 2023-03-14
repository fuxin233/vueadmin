<template>
  <div class="center-in-center">

    <div style="display: flex;
        justify-content:center;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px">

      <el-button type="info" plain size="mini" @click="getCpuListBySingleIndex">按单核评分</el-button>
      <el-button type="info" plain size="mini" @click="getCpuListByMultiIndex">按多核评分</el-button>
      <el-button type="info" plain size="mini" @click="getCpuListByDate">按发布时间</el-button>
      <el-button type="info" plain size="mini" @click="getCpuListByHot">按CPU热度</el-button>
      <el-button type="info" plain size="mini" @click="getCpuListByPrice">按参考价格</el-button>
    </div>

    <div class="oneData" @mouseover="inside()" @mouseout="out()" v-for="item in tableData">
      <el-popover
          placement="bottom-end"
          trigger="click"
      >
        CPU型号:&nbsp;&nbsp;{{item.cpuName}}<br/>
        基础频率:&nbsp;&nbsp;{{item.cpuFrequency}} MHz<br/>
        最大睿频:&nbsp;&nbsp;{{item.cpuMaxFrequency}} MHz<br/>
        核心/线程:&nbsp;&nbsp;{{item.cpuCore}} C/{{item.cpuThread}} T<br/>
        缓存:&nbsp;&nbsp;{{item.cpuCache}} MB<br/>
        制程:&nbsp;&nbsp;{{item.cpuSize}} nm<br/>
        TDP功耗:&nbsp;&nbsp;{{item.cpuTdp}} W<br/>
        发布价格:&nbsp;&nbsp;{{item.cpuPrice}} 元<br/>
        发布日期:&nbsp;&nbsp;{{item.cpuDate}}<br/>
        厂商:&nbsp;&nbsp;{{item.cpuType}}<br/>
        多核评分:&nbsp;&nbsp;{{item.cpuMultiIndex}}<br/>
        单核评分:&nbsp;&nbsp;{{item.cpuSingleIndex}}<br/>
        热度:&nbsp;&nbsp;{{item.cpuHot}}<br/>
        <div class="left" slot="reference" >
          <div class="inner" v-if="item.cpuType=='Intel'">
            <div class="innerleft"  :style="{width:item.cpuSingleIndex + '%'}">{{item.cpuName}}</div>
          </div>
        </div>
      </el-popover>
      <div class="center"></div>
      <el-popover
          placement="bottom-start"
          trigger="click"
      >
        CPU型号:&nbsp;&nbsp;{{item.cpuName}}<br/>
        基础频率:&nbsp;&nbsp;{{item.cpuFrequency}} MHz<br/>
        最大睿频:&nbsp;&nbsp;{{item.cpuMaxFrequency}} MHz<br/>
        核心/线程:&nbsp;&nbsp;{{item.cpuCore}} C/{{item.cpuThread}} T<br/>
        缓存:&nbsp;&nbsp;{{item.cpuCache}} MB<br/>
        制程:&nbsp;&nbsp;{{item.cpuSize}} nm<br/>
        TDP功耗:&nbsp;&nbsp;{{item.cpuTdp}} W<br/>
        发布价格:&nbsp;&nbsp;{{item.cpuPrice}} 元<br/>
        发布日期:&nbsp;&nbsp;{{item.cpuDate}}<br/>
        厂商:&nbsp;&nbsp;{{item.cpuType}}<br/>
        多核评分:&nbsp;&nbsp;{{item.cpuMultiIndex}}<br/>
        单核评分:&nbsp;&nbsp;{{item.cpuSingleIndex}}<br/>
        热度:&nbsp;&nbsp;{{item.cpuHot}}<br/>
        <div class="right" slot="reference" v-if="item.cpuType=='Ryzen'" >
          <div class="innerR" >
            <div class="innerright"  :style="{width:item.cpuSingleIndex + '%'}">{{item.cpuName}}</div>
          </div>
        </div>
      </el-popover>
    </div>

  </div>


</template>

<script>
import UserHome from "./UserHome";

export default {
  name: "UserCpuSingle",
  components: {UserHome},
  data() {
    return {
      tableData: [],
      insides:false,
    }
  },
  created() {
    this.getCpuListBySingleIndex()
  },
  methods:{
    getCpuListByMultiIndex() {
    this.$router.push('/UserCpuMulti')
    },
    getCpuListBySingleIndex() {
      this.$axios.get("/cpu-detail/listBySingle").then(res => {
        this.tableData = res.data.data
      })
    },

    getCpuListByDate() {
      this.$axios.get("/cpu-detail/listByDate").then(res => {
        this.tableData = res.data.data
      })
    },
    getCpuListByPrice() {
      this.$axios.get("/cpu-detail/listByPrice").then(res => {
        this.tableData = res.data.data
      })
    },
    getCpuListByHot() {
      this.$axios.get("/cpu-detail/listByHot").then(res => {
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
  height: 40px;
  position: relative;
  left: 60px;
}
.left{
  display: inline-block;
  width: 45%;
  height: 100%;
  white-space: nowrap;
  cursor: pointer;
}
.right{
  display: inline-block;
  width: 45%;
  height: 100%;
  margin-top: auto;
  margin-bottom: auto;
  white-space: nowrap;
  cursor: pointer;
}
.center{
  display: inline-block;
  width: 0%;
  height: 100%;
  /* background-color: rgb(25, 29, 30); */
}
.innerleft{
  box-shadow: #727374 3px 5px 5px ;
  padding-left: 10px;
  border-radius: 5px 0px 0px 5px;
  display: flex;
  font-size: 15px;
  flex-direction: row;
  align-items: center;
  color: rgb(249, 250, 207);
  height: 100%;
  line-height: 200%;
  background: linear-gradient(125deg, #646464, #757f89, #74bec6, #4283b5, #095480, #0434b9);
  /*设置渐变颜色*/
  background-size: 1000% 1000%;
  /*设置渐变背景的大小*/
  animation: gradient-move 15s infinite;

}
.innerright{
  padding-left: 10px;
  box-shadow: #727374 3px 5px 5px ;
  color: rgb(217, 234, 250);
  border-radius: 0px 5px 5px 0px;
  display: flex;
  font-size: 15px;
  flex-direction: row;
  align-items: center;
  flex-direction: row;
  align-items: center;
  height: 100%;
  line-height: 200%;
  background: rgb(174, 16, 16) linear-gradient(125deg, #f35656, #df1e1e, #ab1902, #e87305, #ec6d24, #fc9712);
  /*设置渐变颜色*/
  background-size: 1000% 1000%;
  /*设置渐变背景的大小*/
  animation: gradient-move 10s infinite;
}
.inner{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
}
.innerR{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
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
