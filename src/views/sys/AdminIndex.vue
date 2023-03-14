<template>
  <div>
    <el-row :gutter="10" style="margin-bottom: 40px">
      <el-col :span="6">
        <el-card>
          <div style="color: #409EFF"><i class="el-icon-user-solid"></i> 在线人数</div>
          <div style="color: #409EFF; padding: 10px 0;text-align: center;font-weight: bold">
            {{LiveUser}} 人
          </div>
        </el-card>
      </el-col>

    </el-row>
    <el-row STYLE="position: absolute; left: 50%; top: 50%; transform: translate(-40%, -50%);">
    <el-col :span="12" >
      <div id="pie1" style="width: 500px; height: 400px;margin-left: -100px"></div>
    </el-col>

      <el-col :span="12">
        <div id="pie2" style="width: 500px; height: 400px"></div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import AdminHome from "./AdminHome";
//导入统计图插件
import * as echarts from 'echarts';

export default {
  name: "AdminIndex",
  components: {AdminHome},
  data() {
    return {
      userInfo: {
        id: "",
        adminName: ""
      },
      LiveUser:0
    }
  },
  created() {
        this.getLiveUser()
  },
  methods:{
    getLiveUser(){
      this.$axios.get("/user/getLiveUsers").then(res=>{
        this.LiveUser = res.data.data
      })
    }
  },
  mounted(){  //页面元素渲染之后再触发

    const pieOption1 = {
      title: {
        text: 'Cpu统计',
        subtext: 'CPU比例图',
        left: 'center'
      },
      tooltip: {
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },

      series: [
        {
          name: 'pie',
          type: 'pie',
          selectedMode: 'single',
          selectedOffset: 30,
          clockwise: true,
          label: {
            fontSize: 18,
            color: '#235894'
          },
          labelLine: {
            lineStyle: {
              color: '#235894'
            }
          },
          data: [
          ],
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      ]
    };
    const pieOption2 = {
      title: {
        text: 'Gpu统计',
        subtext: '显卡比例图',
        left: 'center'
      },
      tooltip: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },

      series: [
        {
          name: 'pie',
          type: 'pie',
          selectedMode: 'single',
          selectedOffset: 30,
          clockwise: true,
          label: {
            fontSize: 18,
            color: '#235894'
          },
          labelLine: {
            lineStyle: {
              color: '#235894'
            }
          },
          data: [
          ],
          itemStyle: {shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      ]
    }
    ;
    const pieDom1 = document.getElementById('pie1');
    const pieDom2 = document.getElementById('pie2');
    const myChart1 = echarts.init(pieDom1);
    const myChart2 = echarts.init(pieDom2);
    this.$axios.get("/getHardwareNum").then(res =>{
      pieOption1.series[0].data=[
        { value: res.data.data.intelNum, name: "Intel" },
        { value: res.data.data.ryzenNum, name: "Ryzen" },
      ]
      pieOption2.series[0].data=[
        { value: res.data.data.amdNum, name: "AMD" },
        { value: res.data.data.nvidiaNum, name: "NVIDIA" },
      ]


      myChart1.setOption(pieOption1);
      myChart2.setOption(pieOption2);
    })
  }
}
</script>

<style scoped>

</style>

