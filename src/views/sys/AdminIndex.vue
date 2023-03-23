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
      <el-col :span="6">
        <el-card>
          <div style="color: #409EFF"><i class="el-icon-user-solid"></i> 注册用户数</div>
          <div style="color: #409EFF; padding: 10px 0;text-align: center;font-weight: bold">
            {{UserNum}} 人
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div style="color: #409EFF"><i class="el-icon-cpu"></i> 收录硬件</div>
          <div style="color: #409EFF; padding: 10px 0;text-align: center;font-weight: bold">
            {{hardwareNum}} 个
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div style="color: #409EFF"><i class="el-icon-user-solid"></i> 新闻数量</div>
          <div style="color: #409EFF; padding: 10px 0;text-align: center;font-weight: bold">
            {{ArticleNum}} 篇
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row STYLE="position: absolute; left: 50%; top: 50%; transform: translate(-40%, 0);">
      <el-col :span="12" >
        <div id="pie1" style="width: 500px; height: 400px;margin-left: -100px"></div>
      </el-col>
      <el-col :span="12">
        <div id="pie2" style="width: 500px; height: 400px"></div>
      </el-col>
    </el-row>
    <el-row STYLE="position: absolute; left: 50%; top: 50%; transform: translate(-40%,-60%);">
      <el-col :span="24">
        <div id="pie3" style="width: 500px; height: 400px;"></div>
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
      LiveUser:0,
      UserNum:0,
      hardwareNum:0,
      ArticleNum:0,
    }
  },
  created() {
    this.getLiveUser()
    this.getUserNum()
    this.getHardwareNum()
    this.getArticleNum()
  },
  methods:{
    getLiveUser(){
      this.$axios.get("/user/getLiveUsers").then(res=>{
        this.LiveUser = res.data.data
      })
    },
    getUserNum(){
      this.$axios.get("/user/getUserNum").then(res=>{
        this.UserNum = res.data.data
      })
    },
    getHardwareNum(){
      this.$axios.get("/getHardwareNum").then(res=>{
        this.hardwareNum = res.data.data.count
      })
    },
    getArticleNum(){
      this.$axios.get("/getArticleNum").then(res=>{
        this.ArticleNum = res.data.data
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
    const pieOption3 = {

      title:{
        text: "收录硬件占比",
        left: "center",
        textStyle: {
          fontSize: 15
        },
      },

      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle:{
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
    const pieDom1 = document.getElementById('pie1');
    const pieDom2 = document.getElementById('pie2');
    const pieDom3 = document.getElementById('pie3');

    const myChart1 = echarts.init(pieDom1);
    const myChart2 = echarts.init(pieDom2);
    const myChart3 = echarts.init(pieDom3);
    this.$axios.get("/getHardwareNum").then(res =>{
      pieOption1.series[0].data=[
        { value: res.data.data.intelNum, name: "Intel" },
        { value: res.data.data.ryzenNum, name: "Ryzen" },
      ]
      pieOption2.series[0].data=[
        { value: res.data.data.amdNum, name: "AMD" },
        { value: res.data.data.nvidiaNum, name: "NVIDIA" },
      ]
      pieOption3.series[0].data=[
        { value: res.data.data.powerNum, name: "电源" },
        { value: res.data.data.pccaseNum, name: "机箱" },
        { value: res.data.data.mainBoardNum, name: "主板" },
        { value: res.data.data.cpuNum, name: "CPU" },
        { value: res.data.data.gpuNum, name: "显卡" },
        { value: res.data.data.memoryNum, name: "机箱" },
        { value: res.data.data.harddiskNum, name: "硬盘" },

      ]

      myChart1.setOption(pieOption1);
      myChart2.setOption(pieOption2);
      myChart3.setOption(pieOption3);
    })

  }
}
</script>

<style scoped>

</style>

