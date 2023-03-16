<template>
  <div>
    <button type="button" class="btn" @click="toLink">
      <strong><i class="el-icon-s-platform"></i>模拟装机</strong>
      <div class="container-stars">
        <div class="stars"></div>
      </div>
      <div class="glow">
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </button>
    <div id="pie1" style="width: 300px; height: 350px;margin-top: 100px"></div>
    <div id="pie2" style="width: 300px; height: 350px;margin-top: 20px"></div>
  </div>

</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "EchartsComponent01",
  methods:{
    toLink(){
        let Jwt = localStorage.getItem("token");
        if (Jwt == null)
        {
          this.$message({
            showClose: false,
            message: '该功能仅对登录用户开放，请先登陆',
            type: 'warning',
            onClose:() => {
              this.$router.push('/UserLogin')
            }
          });

        }
        else
        {
          this.$router.push('/Assembling')
        }
    }
  },
  mounted(){  //页面元素渲染之后再触发

    const pieOption1 = {

      title:{
        text: "Cpu比例图",
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
          fontSize: 20
        },
      },
      series: [
        {
          name: '厂商占比',
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


    const pieOption2 = {
      title:{
        text: "显卡比例图",
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
          fontSize: 20
        }
      },
      series: [
        {
          name: '厂商占比',
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

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  height: 3rem;
  background-size: 300% 300%;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
  transition: 0.5s;
  animation: gradient_301 5s ease infinite;
  border: double 4px transparent;
  background-image: linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%,#FE53BB 45%, #8F51EA 67%, #0044ff 87%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 60px;
}

.container-stars {
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.5s;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
}

strong {
  z-index: 2;
  font-family: 'Avalors Personal Use';
  font-size: 16px;
  letter-spacing: 5px;
  color: #FFFFFF;
  text-shadow: 0 0 4px white;
}

.glow {
  position: absolute;
  display: flex;
  width: 12rem;
}

.circle {
  width: 100%;
  height: 30px;
  filter: blur(2rem);
  animation: pulse_3011 4s infinite;
  z-index: -1;
}

.circle:nth-of-type(1) {
  background: rgba(254, 83, 186, 0.636);
}

.circle:nth-of-type(2) {
  background: rgba(142, 81, 234, 0.704);
}

.btn:hover .container-stars {
  z-index: 1;
  background-color: #212121;
}

.btn:hover {
  transform: scale(1.1)
}

.btn:active {
  border: double 4px #FE53BB;
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
}

.btn:active .circle {
  background: #FE53BB;
}

.stars {
  position: relative;
  background: transparent;
  width: 200rem;
  height: 200rem;
}

.stars::after {
  content: "";
  position: absolute;
  top: -10rem;
  left: -100rem;
  width: 100%;
  height: 100%;
  animation: animStarRotate 90s linear infinite;
}

.stars::after {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
}

.stars::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 170%;
  height: 500%;
  animation: animStar 60s linear infinite;
}

.stars::before {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
  opacity: 0.5;
}

@keyframes animStar {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-135rem);
  }
}

@keyframes animStarRotate {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0);
  }
}

@keyframes gradient_301 {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse_3011 {
  0% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
