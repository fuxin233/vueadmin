<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span style="float: left;color: white;">最新新闻</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push('/UserArticle')">了解更多</el-button>
      </div>
      <div v-for="item in tableData" class="text item">
        <strong STYLE="float: left">{{item.userName}} : {{item.title}}</strong>
      </div>
    </el-card>
    <div id="pie3" style="width: 300px; height: 400px;margin-top: 65px"></div>







  </div>

</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "EchartsComponent02",
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getTitleList()
  },
  methods: {


  getTitleList() {
    this.$axios.get("/article-detail/list").then(res => {
      this.tableData = res.data.data.records
    })
  }
},
  mounted(){  //页面元素渲染之后再触发

    const pieOption3 = {

      title:{
        text: "收录硬件占比",
        left: "center",
        textStyle: {
          color : "rgba(238, 229, 229, 1)",
          fontSize: 15
        },
      },

      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '10%',
        left: 'center',
        textStyle:{
          color : "rgba(238, 229, 229, 1)",
          fontSize: 14
        },
      },
      series: [
        {
          name: '硬件占比',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 3,
            borderColor: '#fff',
            borderWidth: 1
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          }
        }
      ]
    };


    const pieDom3 = document.getElementById('pie3');
    const myChart3 = echarts.init(pieDom3);
    this.$axios.get("/getHardwareNum").then(res =>{
      pieOption3.series[0].data=[
        { value: res.data.data.powerNum, name: "电源" },
        { value: res.data.data.pccaseNum, name: "机箱" },
        { value: res.data.data.mainBoardNum, name: "主板" },
        { value: res.data.data.cpuNum, name: "CPU" },
        { value: res.data.data.gpuNum, name: "显卡" },
        { value: res.data.data.memoryNum, name: "机箱" },
        { value: res.data.data.harddiskNum, name: "硬盘" },

      ]

      myChart3.setOption(pieOption3);
    })
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
  color: white;
  overflow :hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 280px;
  height: 300px;
  margin-left: 10px;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  margin-top: 100px
}
</style>
