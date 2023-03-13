<template>

<div>
  <div class="one" @mouseover="inside()" @mouseout="out()" v-for="item in tableData">
    <el-popover
        placement="bottom"
        trigger="click"
    >
      显卡型号:   {{item.gpuName}}<br/>
      显卡TDP功耗:   {{item.gpuTdp}}<br/>
      流处理器数:   {{item.gpuProcessor}}<br/>
      GPU频率:   {{item.gpuFrequency}}<br/>
      Boost频率:   {{item.boostFrequency}}<br/>
      显存速率:   {{item.gpuMemoryRate}}<br/>
      显存容量:   {{item.gpuMemorySize}}<br/>
      显卡制程(工艺):   {{item.gpuArea}}<br/>
      核心面积:   {{item.gpuMemoryRate}}<br/>
      晶体管数量:   {{item.gpuTransistor}}<br/>
      价格:   {{item.gpuPrice}}<br/>
      发布日期:   {{item.gpuDate}}<br/>
      厂商:   {{item.gpuType}}<br/>
      显卡评分:   {{item.gpuIndex}}<br/>
      热度:   {{item.gpuHot}}<br/>
      <div class="left" slot="reference">
        <div class="inner">
          <div class="innerleft" ref="left"  v-if="item.gpuType=='NVIDIA'" :style="{width:item.gpuIndex + '%'}">{{item.gpuName}}</div>
        </div>
      </div>
    </el-popover>
    <div class="center"></div>
    <el-popover
        placement="bottom"
        trigger="click"
    >
      显卡型号:   {{item.gpuName}}<br/>
      显卡TDP功耗:   {{item.gpuTdp}}<br/>
      流处理器数:   {{item.gpuProcessor}}<br/>
      GPU频率:   {{item.gpuFrequency}}<br/>
      Boost频率:   {{item.boostFrequency}}<br/>
      显存速率:   {{item.gpuMemoryRate}}<br/>
      显存容量:   {{item.gpuMemorySize}}<br/>
      显卡制程(工艺):   {{item.gpuSize}}<br/>
      核心面积:   {{item.gpuArea}}<br/>
      晶体管数量:   {{item.gpuTransistor}}<br/>
      价格:   {{item.gpuPrice}}<br/>
      发布日期:   {{item.gpuDate}}<br/>
      厂商:   {{item.gpuType}}<br/>
      显卡评分:   {{item.gpuIndex}}<br/>
      热度:   {{item.gpuHot}}<br/>
      <div class="right" slot="reference" >
        <div class="innerright" ref="right" v-if="item.gpuType=='AMD'" :style="{width:item.gpuIndex + '%'}">{{item.gpuName}}</div>
      </div>
    </el-popover>
  </div>




</div>


</template>

<script>
import UserHome from "./UserHome";

export default {
  name: "UserIndex",
  components: {UserHome},
  data() {
    return {

      tableData: [],
      insides:false,

    }
  },
  created() {
    this.getGpuList()
  },
  methods:{
    getGpuList() {
      this.$axios.get("/gpu-detail/listByIndex").then(res => {
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

  }
}
</script>

<style scoped>
.one{
  font-size: 10px;
  width: 800px;
  height: 30px;
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
   font-size: 12px;
   color: rgb(249, 250, 207);
   height: 100%;
   line-height: 200%;
   background-color: rgb(2, 155, 38);
   background: linear-gradient(125deg,#343434,#727374,#14a24a,#05892f,#377500,#d6d5d7);
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
    font-size: 12px;
    height: 100%;
    line-height: 200%;
    background-color: rgb(174, 16, 16);
    background: linear-gradient(125deg,#f35656,#df1e1e,#ab1902,#e87305,#ec6d24,#fc9712);
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
</style>
