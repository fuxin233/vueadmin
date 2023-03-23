<template>
  <div class="center-in-center">

    <div style="display: flex;
        justify-content:center;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px">

      <el-button type="info" plain size="mini" @click="getListByGameIndex">按娱乐评分</el-button>
      <el-button type="info" plain size="mini" @click="getListByWorkIndex">按办公评分</el-button>
      <el-button type="info" plain size="mini" @click="getListByDate">按发布时间</el-button>
      <el-button type="info" plain size="mini" @click="getListByHot">按配置单热度</el-button>
      <el-button type="info" plain size="mini" @click="getListByPrice">按参考价格</el-button>
    </div>

    <div class="oneData" @mouseover="inside()" @mouseout="out()" v-for="(item,index) in tableData">
      <el-popover
          placement="bottom-end"
          trigger="click"
      >
        用户名：{{item.userName}}<br/>
        显卡型号：{{ item.gpuName}}<br/>
        电源型号：{{ item.powerName}}<br/>
        机械硬盘：{{ item.mechHarddiskName}} * {{ item.mechHarddiskNumber}}<br/>
        固态硬盘：{{ item.ssdHarddiskName}} * {{ item.ssdHarddiskNumber}}<br/>
        主板型号：{{ item.mainboardName}}<br/>
        内存型号：{{ item.memoryName}} * {{ item.memoryNumber}}<br/>
        机箱型号：{{ item.pccaseName}}<br/>
        装机建议：{{ item.advice}}<br/>
        装机时间：{{ item.created}}<br/>
        娱乐评分：{{ item.gameIndex}}<br/>
        办公评分：{{ item.workIndex}}<br/>
<<<<<<< HEAD
        热度：{{ item.likes }}
        <el-button  icon="el-icon-star-off" circle @click="likeComputerList(item.id)" style="float: right;margin-right: 3%;"></el-button>
=======
        热度：{{ item.likes }}<br/>
>>>>>>> origin/master
        <div class="left" slot="reference" >
          <div class="inner">
            <div class="innerleft"  :style="{width:item.gameIndex + '%'}">第{{index+1}}名&nbsp;&nbsp;&nbsp;</div>
          </div>
        </div>
      </el-popover>
      <div class="center"></div>
      <el-popover
          placement="bottom-start"
          trigger="click"
      >
        用户名：{{item.userName}}<br/>
        显卡型号：{{ item.gpuName}}<br/>
        电源型号：{{ item.powerName}}<br/>
        机械硬盘：{{ item.mechHarddiskName}} * {{ item.mechHarddiskNumber}}<br/>
        固态硬盘：{{ item.ssdHarddiskName}} * {{ item.ssdHarddiskNumber}}<br/>
        主板型号：{{ item.mainboardName}}<br/>
        内存型号：{{ item.memoryName}} * {{ item.memoryNumber}}<br/>
        机箱型号：{{ item.pccaseName}}<br/>
        装机建议：{{ item.advice}}<br/>
        装机时间：{{ item.created}}<br/>
        娱乐评分：{{ item.gameIndex}}<br/>
        办公评分：{{ item.workIndex}}<br/>
<<<<<<< HEAD
        热度：{{ item.likes }}
        <el-button  icon="el-icon-star-off" circle @click="likeComputerList(item.id)" style="float: right;margin-right: 3%;"></el-button>
=======
        热度：{{ item.likes }}<br/>
>>>>>>> origin/master
        <div class="right" slot="reference" >
          <div class="innerR" >
            <div class="innerright"  :style="{width:item.workIndex + '%'}">用户：{{item.userName}}</div>
          </div>
        </div>
      </el-popover>
    </div>

  </div>


</template>

<script>
import UserHome from "./UserHome";

export default {
  name: "UserComputerList",
  components: {UserHome},
  data() {
    return {
      tableData: [],
      insides:false,
    }
  },
  created() {
    this.getListByGameIndex()
  },
  methods:{
    getListByGameIndex() {
      this.$axios.get("/computer-list/listByGame").then(res => {
        this.tableData = res.data.data
      })
    },
    getListByWorkIndex() {
      this.$axios.get("/computer-list/listByWork").then(res => {
        this.tableData = res.data.data
      })
    },
    getListByPrice() {
      this.$axios.get("/computer-list/listByPrice").then(res => {
        this.tableData = res.data.data
      })
    },
    getListByDate() {
      this.$axios.get("/computer-list/listByDate").then(res => {
        this.tableData = res.data.data
      })
    },
    getListByHot() {
      this.$axios.get("/computer-list/listByHot").then(res => {
        this.tableData = res.data.data
      })
    },
<<<<<<< HEAD
    likeComputerList(id){
      this.$axios.get("/computer-list/like/"+id).then(res => {
        this.getListByGameIndex()
      })
    },
=======
>>>>>>> origin/master
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
  justify-content: right;
  color: rgb(249, 250, 207);
  height: 100%;
  line-height: 200%;
  background: linear-gradient(125deg, cornflowerblue, rebeccapurple, wheat, hotpink, honeydew, darkblue);
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
  background: rgb(174, 16, 16) linear-gradient(125deg, yellow, cornflowerblue, burlywood, silver, deeppink, red);
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
