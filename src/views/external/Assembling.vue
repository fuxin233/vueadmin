<template>
  <div class="bg">
    <el-header style="background-color: #2c3e50">
      <button type="button" class="back" @click="$router.push('/UserIndex')">
        <strong>回 到 首 页</strong>
        <div id="container-stars">
          <div id="stars"></div>
        </div>

        <div id="glow">
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </button>
      <div style="display: flex;align-items: center;margin-left: 40%">
        <div class="group">
          <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
          <input placeholder="查找相关新闻" type="search" class="input" v-model="title">
        </div>
        <button class="shadow__btn" @click="linkToArticle()">
          搜索
        </button>
      </div>

      <div style="right: 0;display: flex;margin-right: 30px;position:absolute;align-items: center">
        <el-avatar size="medium" :src= this.userInfo.avatar style="display: flex;">
        </el-avatar>
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link" style="color: white;margin-left: 10px;">
           您好，{{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
           </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link :to="{name:'UserLogin'}" v-if="userInfo.id==0">登录</router-link>
              <router-link :to="{name:'UserCenter'}" v-if="userInfo.id!=0">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
        <el-link href="https://www.baidu.com/" style="color: white;margin-left: 40px;">百度</el-link>
        <el-link @click="$router.push('/AdminLogin')" style="color: white;margin-left: 40px;">管理员端</el-link>
      </div>

    </el-header>

    <div class="scene"  @click="dialogFormVisible = true">

      <div class="cube">
        <span class="side top">开始装机！</span>
        <span class="side front">点击这里！</span>
      </div>
    </div>
    <el-button type="primary" round @click="start">开始</el-button>
    <el-button type="primary" round @click="end">结束</el-button>
    <el-button type="info" round @click="repeat">复播</el-button>
    <el-button type="info" round @click="installGlass">组装玻璃</el-button>
    <el-button type="info" round @click="moveGlass">移除玻璃</el-button>
    <el-dialog title="选择你的配置"
               :visible.sync="dialogFormVisible"
               :before-close="handleClose"
               width="650px"
               :append-to-body="true"
               :center="true"
    >
      <el-form :model="computerList" ref="computerList" >

        <el-form-item label="显卡：" prop="gpuName" :rules="[{required: true, message: '请选择显卡'}]">

          <el-select v-model="computerList.gpuName" filterable :clearable="true" placeholder="请选择你的显卡" size="medium">
            <el-option
                v-for="item in gpuList"
                :key="item.gpuId"
                :label="item.gpuName"
                :value="item.gpuName">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="CPU：" prop="cpuName" :rules="[
      { required: true, message: '请选择CPU'}
        ]">

          <el-select v-model="computerList.cpuName" filterable :clearable="true" placeholder="请选择你的CPU" size="medium">
            <el-option
                v-for="item in cpuList"
                :key="item.cpuId"
                :label="item.cpuName"
                :value="item.cpuName">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="主板：" prop="mainboardName" :rules="[
      { required: true, message: '请选择主板'}
        ]">

          <el-select v-model="computerList.mainboardName" filterable :clearable="true" placeholder="请选择你的主板" size="medium">
            <el-option
                v-for="item in mainBoardList"
                :key="item.mainboardId"
                :label="item.mainboardName"
                :value="item.mainboardName">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="机箱：" prop="pccaseName" :rules="[
      { required: true, message: '请选择机箱'}
        ]">

          <el-select v-model="computerList.pccaseName" filterable :clearable="true" placeholder="请选择你的机箱" size="medium">
            <el-option
                v-for="item in pccaseList"
                :key="item.pccaseId"
                :label="item.pccaseName"
                :value="item.pccaseName">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="内存：" prop="memoryName" :rules="[
      { required: true, message: '请选择内存'}
        ]">

          <el-select v-model="computerList.memoryName" filterable :clearable="true" placeholder="请选择你的内存" size="medium">
            <el-option
                v-for="item in memoryList"
                :key="item.memoryId"
                :label="item.memoryName"
                :value="item.memoryName">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="数量：" prop="memoryNumber" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
        ]">
          <el-input-number v-model="computerList.memoryNumber" :min="1" :max="4"></el-input-number>
        </el-form-item>

        <el-form-item label="机械："  :rules="[
      { required: true, message: '该字段不能为空'}
        ]">

          <el-select v-model="computerList.mechHarddiskName" filterable :clearable="true" placeholder="请选择你的机械硬盘" size="medium">
            <el-option
                v-for="item in mechList"
                :key="item.harddiskId"
                :label="item.harddiskName"
                :value="item.harddiskName">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="数量：" prop="mechHarddiskNumber" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
        ]">
          <el-input-number v-model="computerList.mechHarddiskNumber" :min="0" :max="6"></el-input-number>
        </el-form-item>

        <el-form-item label="固态：" :rules="[
      { required: true, message: '该字段不能为空'}
        ]">

          <el-select v-model="computerList.ssdHarddiskName" filterable :clearable="true" placeholder="请选择你的固态硬盘" size="medium">
            <el-option
                v-for="item in ssdList"
                :key="item.harddiskId"
                :label="item.harddiskName"
                :value="item.harddiskName">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="数量：" prop="ssdHarddiskNumber" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
        ]">
          <el-input-number v-model="computerList.ssdHarddiskNumber" :min="0" :max="6"></el-input-number>
        </el-form-item>

        <el-form-item label="电源：" prop="powerName" :rules="[
      { required: true, message: '请选择电源'}
        ]">

          <el-select v-model="computerList.powerName" filterable :clearable="true" placeholder="请选择你的电源" size="medium">
            <el-option
                v-for="item in powerList"
                :key="item.powerId"
                :label="item.powerName"
                :value="item.powerName">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="隐私" prop="status" :rules="[
      { required: true, message: '该字段不能为空'}
        ]">
          <el-radio v-model="computerList.status" :label="1" style="margin-left: 20px">公开</el-radio>
          <el-radio v-model="computerList.status" :label="0">私有</el-radio>
        </el-form-item>


      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveForm('computerList')">确 定</el-button>
        <el-button @click="resetForm()">取 消</el-button>
      </div>
    </el-dialog>


  </div>


</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import gsap from "gsap"
export default {
  name: "Assembling",
  data(){
    return{
      userInfo: {
        id: "",
        name: "",
        avatar:""
      },
      title:'',
      computerList:{
        gpuName: '',
        cpuName: '',
        mainboardName: '',
        pccaseName: '',
        memoryName:'',
        memoryNumber:'',
        mechHarddiskName:'',
        mechHarddiskNumber:'',
        ssdHarddiskName:'',
        ssdHarddiskNumber:'',
        powerName:'',
        status: 1
      },
      gpuList:[],
      cpuList:[],
      mainBoardList:[],
      pccaseList:[],
      memoryList:[],
      mechList:[],
      ssdList:[],
      powerList:[],
      dialogFormVisible: false,




      screen: null,
      camera: null,
      renderer: null,
      controls: null,
      axesHelper: null,
      fbxLoader: null,
      light: null,
      pointLight: null,
      fbxObj: null,
      glassObj: null,
      gpuObj:null,
      gpuFanObj1:null,
      gpuFanObj2:null,
      houbanObj:null,
      houbanljObj:null,
      houbanCpuObj:null,
      XObj:null,
      yuanzhuObj:null,

      pian1Obj:null,
      pian2Obj:null,
      pian3Obj:null,
      pian4Obj:null,
      dyObj:null,
      wkObj:null,
      ypObj:null,

      fank1:null,
      fank2:null,
      fany1:null,
      fany2:null,
      fank3:null,
      fany3:null,

      fank4:null,
      fank5:null,
      fank6:null,

      fany4:null,
      fany5:null,
      fany6:null,
      fan4topObj:null,
      toppianObj:null,
      xianObj:null,
      guanObj:null,
      guantou1Obj:null,
      guantou2Obj:null,
      houkObj:null,
      tiepianObj1:null,
      tiepianObj2:null,


      // 动画
      tween1:null,
      tween2:null,
      tween3:null,
      tween4:null,
      tween5:null,

      tween6:null,
      tween7:null,
      tween8:null,
      tween9:null,
      tween10:null,
      tween11:null,
      tween12:null,

      tween13:null,
      tween14:null,
      tween15:null,

      tween16:null,
      tween17:null,
      tween18:null,
      tween19:null,

      tween20:null,
      tween21:null,

      tween22:null,
      tween23:null,
      tween24:null,
      tween25:null,
      tween26:null,
      tween27:null,

      tween28:null,
      tween29:null,

      tween30:null,
      tween31:null,

      tween32:null,
      tween33:null,

      tween34:null,
      tween35:null,

      tween36:null,
      tween37:null,

      // 定时器
      timeOut1:null,
      timeOut2:null,
      timeOut3:null,
      timeOut4:null,
      timeOut5:null,
      timeOut6:null,
      timeOut7:null,
      timeOut8:null,
      timeOut9:null,
      timeOut10:null,
      timeOut11:null,
      timeOut12:null,
      timeOut13:null,
      timeOut14:null,
      timeOut15:null,
      timeOut16:null,
      timeOut17:null,
      timeOut18:null,
      timeOut19:null,
      timeOut20:null,
      timeOut21:null,
      timeOut22:null,
      timeOut23:null,
      timeOut24:null,
      timeOut25:null,
      timeOut26:null,
      timeOut27:null,
      timeOut28:null,
      timeOut29:null,
      timeOut30:null,
      timeOut31:null,
      timeOut32:null,
      timeOut33:null,
      timeOut34:null,
      timeOut35:null,
      timeOut36:null,
      timeOut37:null,

    }
  },
  created() {
    // this.getUserInfo()
    // this.getGpuList()
    // this.getCpuList()
    // this.getMainBoardList()
    // this.getPccaseList()
    // this.getMemoryList()
    // this.getMecList()
    // this.getSsdList()
    // this.getPowerList()
  },
  methods:{
    linkToArticle(){
      location.href = "http://127.0.0.1:8080/UserArticle?title="+this.title
    },
    getUserInfo(){
      this.$axios.get("/user/userInfo").then(res=>{
        this.userInfo = res.data.data;
      })
    },
    //清除信息缓存
    logout(){
      this.$axios.post("/logout").then(res=>{
        localStorage.clear()
        sessionStorage.clear()
        this.$store.commit("resetState")
        ///跳转到登录页面
        this.$router.push("/UserLogin")
      })
    },
    resetForm() {
      this.computerList = {
        gpuName: '',
        cpuName: '',
        mainboardName: '',
        pccaseName: '',
        memoryName:'',
        memoryNumber:'',
        mechHarddiskName:'',
        mechHarddiskNumber:'',
        ssdHarddiskName:'',
        ssdHarddiskNumber:'',
        powerName:'',
        status: 1
      };
      this.dialogFormVisible = false
    },
    handleClose() {
      this.resetForm()
    },
    getGpuList() {
      this.$axios.get("/gpu-detail/listByIndex").then(res => {
        this.gpuList = res.data.data
      })
    },
    getCpuList() {
      this.$axios.get("/cpu-detail/listByPrice").then(res => {
        this.cpuList = res.data.data
      })
    },
    getMainBoardList() {
      this.$axios.get("/mainboard-detail/listByPrice").then(res => {
        this.mainBoardList = res.data.data
      })
    },
    getPccaseList() {
      this.$axios.get("/pccase-detail/listByPrice").then(res => {
        this.pccaseList = res.data.data
      })
    },
    getMemoryList() {
      this.$axios.get("/memory-detail/listByPrice").then(res => {
        this.memoryList = res.data.data
      })
    },
    getMecList() {
      this.$axios.get("/harddisk-detail/mechList").then(res => {
        this.mechList = res.data.data
      })
    },
    getSsdList() {
      this.$axios.get("/harddisk-detail/ssdList").then(res => {
        this.ssdList = res.data.data
      })
    },
    getPowerList() {
      this.$axios.get("/power-detail/listByPower").then(res => {
        this.powerList = res.data.data
      })
    },

    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/computer-list/save',this.computerList
          )
              .then(res => {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: 'success',
                });
                this.resetForm()
                this.dialogFormVisible = false
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    render() {
      this.controls.update();
      this.renderer.render(this.screen, this.camera);
      requestAnimationFrame(this.render);
    },
    animation(obj){
      let tween =  gsap.to(obj.position,{x:20,y:80,z:3,duration:1,ease:'power1.inOut',onComplete:()=>{
          console.log('动画结束');
        },onStart:()=>{
          console.log('动画开始');
        },repeat:0,paused: true})
      return tween
    },
    show(obj,tween,time){
      let timer = setTimeout(()=>{
        obj.material.transparent = true
        console.log(obj)
        obj.material.opacity = 1
        tween.play()
      },time)
      return timer
    },
    hide(obj){
      obj.position.set(20,0,60)
      obj.material.transparent = true
      obj.material.opacity = 0
    },
    start(){
      this.tween1 = this.animation(this.houbanObj)
      this.tween2 = this.animation(this.houbanljObj)
      this.tween3 = this.animation(this.houbanCpuObj)
      this.tween4 = this.animation(this.XObj)
      this.tween5 = this.animation(this.yuanzhuObj)

      this.tween6 = this.animation(this.pian1Obj)
      this.tween7 = this.animation(this.pian2Obj)
      this.tween8 = this.animation(this.pian3Obj)
      this.tween9 = this.animation(this.pian4Obj)

      this.tween10 = this.animation(this.gpuObj)
      this.tween11 = this.animation(this.gpuFanObj1)
      this.tween12 = this.animation(this.gpuFanObj2)

      this.tween13 = this.animation(this.dyObj)
      this.tween14 = this.animation(this.wkObj)
      this.tween15 = this.animation(this.ypObj)

      this.tween16 = this.animation(this.fank1)
      this.tween17 = this.animation(this.fank2)
      this.tween18 = this.animation(this.fany1)
      this.tween19 = this.animation(this.fany2)
      this.tween20 = this.animation(this.fank3)
      this.tween21 = this.animation(this.fany3)


      this.tween22 = this.animation(this.fank4)
      this.tween23 = this.animation(this.fany4)

      this.tween24 = this.animation(this.fank5)
      this.tween25 = this.animation(this.fany5)

      this.tween26 = this.animation(this.fank6)
      this.tween27 = this.animation(this.fany6)

      this.tween28 = this.animation(this.fan4topObj)
      this.tween29 = this.animation(this.toppianObj)

      this.tween30 = this.animation(this.xianObj)
      this.tween31 = this.animation(this.guanObj)

      this.tween32 = this.animation(this.guantou1Obj)
      this.tween33 = this.animation(this.guantou2Obj)

      this.tween34 = this.animation(this.houkObj)


      this.tween36 = this.animation(this.tiepianObj1)
      this.tween37 = this.animation(this.tiepianObj2)


      this.timeOut1 =  this.show(this.wkObj,this.tween14,0)
      this.timeOut2 =this.show(this.tiepianObj1,this.tween36,0)
      this.timeOut3 =this.show(this.tiepianObj2,this.tween37,0)
      this.timeOut4 =this.show(this.houbanObj,this.tween1,500)
      this.timeOut5 =this.show(this.houbanljObj,this.tween2,1000)
      this.timeOut6 =this.show(this.houbanCpuObj,this.tween3,1500)
      this.timeOut7 =this.show(this.XObj,this.tween4,2000)
      this.timeOut8 =this.show(this.yuanzhuObj,this.tween5,2500)

      this.timeOut9 =this.show(this.pian1Obj,this.tween6,3000)
      this.timeOut10 =this.show(this.pian2Obj,this.tween7,3500)
      this.timeOut11 =this.show(this.pian3Obj,this.tween8,4000)
      this.timeOut12 =this.show(this.pian4Obj,this.tween9,4500)

      this.timeOut13 =this.show(this.gpuObj,this.tween10,5000)
      this.timeOut14 =this.show(this.gpuFanObj1,this.tween11,5000)
      this.timeOut15 =this.show(this.gpuFanObj2,this.tween12,5000)

      this.timeOut16 =this.show(this.dyObj,this.tween13,5500)
      this.timeOut17 =this.show(this.ypObj,this.tween15,6000)


      this.timeOut18 =this.show(this.fank1,this.tween16,6500)
      this.timeOut19 =this.show(this.fank2,this.tween17,7000)
      this.timeOut20 =this.show(this.fany1,this.tween18,6500)
      this.timeOut21 =this.show(this.fany2,this.tween19,7000)

      this.timeOut22 =this.show(this.fank3,this.tween20,7500)
      this.timeOut23 =this.show(this.fany3,this.tween21,7500)

      this.timeOut24 =this.show(this.fank4,this.tween22,8000)
      this.timeOut25 =this.show(this.fany4,this.tween23,8000)

      this.timeOut26 =this.show(this.fank5,this.tween24,8500)
      this.timeOut27 =this.show(this.fany5,this.tween25,8500)

      this.timeOut28 =this.show(this.fank6,this.tween26,9000)
      this.timeOut29 =this.show(this.fany6,this.tween27,9000)

      this.timeOut30 =this.show(this.fan4topObj,this.tween28,9500)
      this.timeOut31 =this.show(this.toppianObj,this.tween29,10000)

      this.timeOut32 =this.show(this.xianObj,this.tween30,10500)

      this.timeOut33 =this.show(this.guantou1Obj,this.tween32,11000)
      this.timeOut34 =this.show(this.guantou2Obj,this.tween33,11500)

      this.timeOut35 =this.show(this.guanObj,this.tween31,12000)

      this.timeOut36 =this.show(this.houkObj,this.tween34,0)



    },
    installGlass(){
      this.tween35 = this.animation(this.glassObj)
      this.timeOut37 =this.show(this.glassObj,this.tween35,0)
    },
    moveGlass(){
      this.hide(this.glassObj)
    },
    end(){
      clearTimeout(this.timeOut1)
      clearTimeout(this.timeOut2)
      clearTimeout(this.timeOut3)
      clearTimeout(this.timeOut4)
      clearTimeout(this.timeOut5)
      clearTimeout(this.timeOut6)
      clearTimeout(this.timeOut7)
      clearTimeout(this.timeOut8)
      clearTimeout(this.timeOut9)
      clearTimeout(this.timeOut10)
      clearTimeout(this.timeOut11)
      clearTimeout(this.timeOut12)
      clearTimeout(this.timeOut13)
      clearTimeout(this.timeOut14)
      clearTimeout(this.timeOut15)
      clearTimeout(this.timeOut16)
      clearTimeout(this.timeOut17)
      clearTimeout(this.timeOut18)
      clearTimeout(this.timeOut19)
      clearTimeout(this.timeOut20)
      clearTimeout(this.timeOut21)
      clearTimeout(this.timeOut22)
      clearTimeout(this.timeOut23)
      clearTimeout(this.timeOut24)
      clearTimeout(this.timeOut25)
      clearTimeout(this.timeOut26)
      clearTimeout(this.timeOut27)
      clearTimeout(this.timeOut28)
      clearTimeout(this.timeOut29)
      clearTimeout(this.timeOut30)
      clearTimeout(this.timeOut31)
      clearTimeout(this.timeOut32)
      clearTimeout(this.timeOut33)
      clearTimeout(this.timeOut34)
      clearTimeout(this.timeOut35)
      clearTimeout(this.timeOut36)
      clearTimeout(this.timeOut37)
    },
    repeat(){
      this.hide(this.houbanObj)
      this.hide(this.houbanljObj)
      this.hide(this.houbanCpuObj)
      this.hide(this.XObj)
      this.hide(this.yuanzhuObj)

      this.hide(this.pian1Obj)
      this.hide(this.pian2Obj)
      this.hide(this.pian3Obj)
      this.hide(this.pian4Obj)

      this.hide(this.gpuObj)
      this.hide(this.gpuFanObj1)
      this.hide(this.gpuFanObj2)

      this.hide(this.dyObj)
      this.hide(this.wkObj)
      this.hide(this.ypObj)

      this.hide(this.fank1)
      this.hide(this.fank2)
      this.hide(this.fany1)
      this.hide(this.fany2)

      this.hide(this.fank3)
      this.hide(this.fany3)

      this.hide(this.fank4)
      this.hide(this.fany4)

      this.hide(this.fank5)
      this.hide(this.fany5)

      this.hide(this.fank6)
      this.hide(this.fany6)

      this.hide(this.fan4topObj)
      this.hide(this.toppianObj)

      this.hide(this.xianObj)
      this.hide(this.guanObj)

      this.hide(this.guantou1Obj)
      this.hide(this.guantou2Obj)
      this.hide(this.houkObj)
      this.hide(this.glassObj)

      this.hide(this.tiepianObj1)
      this.hide(this.tiepianObj2)



      this.start()
    },

    init() {
      this.screen = new THREE.Scene();
      this.screen.background = new THREE.Color(0xffffff);
      this.camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
      );
      this.camera.position.set(0, 5, 10);
      this.screen.add(this.camera);
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.render(this.screen, this.camera);
      let bgDom = document.querySelector(".bg");
      bgDom.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.axesHelper = new THREE.AxesHelper(5);
      this.screen.add(this.axesHelper);
      this.light = new THREE.AmbientLight(0x404040, 2);
      this.screen.add(this.light);

      this.pointLight = new THREE.DirectionalLight(0xffffff, 1);
      this.pointLight.position.set(5, 5, 5);
      this.pointLight.castShadow = true;

      this.pointLight.shadow.camera.near = 0.01;
      this.pointLight.shadow.camera.far = 60;
      this.pointLight.shadow.camera.top = 22;
      this.pointLight.shadow.camera.bottom = -22;
      this.pointLight.shadow.camera.left = -35;
      this.pointLight.shadow.camera.right = 35;
      // //设置阴影分辨率
      this.pointLight.shadow.mapSize.width = 2048; // default
      this.pointLight.shadow.mapSize.height = 2048; // default
      //阴影限制
      this.pointLight.shadow.radius = 1;
      this.screen.add(this.pointLight);

      const pl =  new THREE.SpotLight(0xFFFFFF,1)
      pl.position.set(0, 30, 1)
      this.screen.add(pl)
      const floorMat = new THREE.MeshStandardMaterial( {
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.2,
        bumpScale: 0.0005
      } );
      // const textureLoader = new THREE.TextureLoader();
      // textureLoader.load( 'assets/hardwood2_diffuse.jpg', function ( map ) {
      //
      //   map.wrapS = THREE.RepeatWrapping;
      //   map.wrapT = THREE.RepeatWrapping;
      //   map.anisotropy = 4;
      //   map.repeat.set( 10, 24 );
      //   map.encoding = THREE.sRGBEncoding;
      //   floorMat.map = map;
      //   floorMat.needsUpdate = true;
      //
      // } );
      // textureLoader.load( 'assets/hardwood2_bump.jpg', function ( map ) {
      //
      //   map.wrapS = THREE.RepeatWrapping;
      //   map.wrapT = THREE.RepeatWrapping;
      //   map.anisotropy = 4;
      //   map.repeat.set( 10, 24 );
      //   floorMat.bumpMap = map;
      //   floorMat.needsUpdate = true;
      //
      // } );
      // textureLoader.load( 'assets/hardwood2_roughness.jpg', function ( map ) {
      //
      //   map.wrapS = THREE.RepeatWrapping;
      //   map.wrapT = THREE.RepeatWrapping;
      //   map.anisotropy = 4;
      //   map.repeat.set( 10, 24 );
      //   floorMat.roughnessMap = map;
      //   floorMat.needsUpdate = true;
      //
      // } );
      const floorGeometry = new THREE.PlaneGeometry( 20, 20 );
      const floorMesh = new THREE.Mesh( floorGeometry, floorMat );
      floorMesh.receiveShadow = true;
      floorMesh.rotation.x = - Math.PI / 2.0;
      this.screen.add( floorMesh );



      // 加载模型
      this.fbxLoader = new FBXLoader();
      this.fbxLoader.load("models/ZJ4.fbx", (fbx) => {
        console.log(fbx);

        fbx.traverse((child) => {

          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            // //  child.receiveShadow = true;
            //  child.material.emissive = child.material.color
            //  child.material.emissiveMap = child.material.map

            child.material = new THREE.MeshPhongMaterial({
              color:child.material.color,
              map:child.material.map
            });
            child.material.transparent = true
            child.material.opacity = 0

            if (child.name == "Obj3d66-8915637-103-757") {
              // 玻璃
              this.glassObj = child;
              this.glassObj.material.transparent = true;
            }
            if(child.name== 'Obj3d66-8915637-91-603'){
              // 显卡
              this.gpuObj = child
            }
            if(child.name == 'Obj3d66-8915637-90-25'){
              // 显卡风扇
              this.gpuFanObj1 = child
            }
            if(child.name == 'Obj3d66-8915637-89-59'){
              // 显卡风扇
              this.gpuFanObj2 = child
            }
            if(child.name == 'Obj3d66-8915637-93-293'){
              // 主后板
              this.houbanObj = child
            }
          }
          if(child.name == 'Obj3d66-8915637-92-407'){
            this.houbanljObj = child
          }
          if(child.name == 'Obj3d66-8915637-42-613'){
            this.houbanCpuObj = child
          }
          if(child.name == 'Obj3d66-8915637-43-815'){
            this.XObj = child
          }
          if(child.name == 'Obj3d66-8915637-46-159'){
            this.yuanzhuObj = child
          }
          if(child.name == 'Obj3d66-8915637-88-220'){
            this.pian1Obj = child
          }
          if(child.name == 'Obj3d66-8915637-87-578'){
            this.pian2Obj = child
          }
          if(child.name == 'Obj3d66-8915637-86-574'){
            this.pian3Obj = child
          }
          if(child.name == 'Obj3d66-8915637-85-148'){
            this.pian4Obj = child
          }
          if(child.name == 'Obj3d66-8915637-68-511'){
            this.dyObj = child
          }
          if(child.name == 'Obj3d66-8915637-106-7'){
            this.wkObj = child
          }
          if(child.name == 'Obj3d66-8915637-96-859'){
            this.ypObj = child
          }

          if(child.name == 'Obj3d66-8915637-59-533'){
            this.fank1 = child
          }
          if(child.name == 'Obj3d66-8915637-57-143'){
            this.fank2 = child
          }
          if(child.name == 'Obj3d66-8915637-58-97'){
            this.fany1 = child
          }
          if(child.name == 'Obj3d66-8915637-56-761'){
            this.fany2 = child
          }
          if(child.name == 'Obj3d66-8915637-33-248'){
            this.fank3 = child
          }
          if(child.name == 'Obj3d66-8915637-32-123'){
            this.fany3 = child
          }

          if(child.name == 'Obj3d66-8915637-21-653'){
            this.fank4 = child
          }
          if(child.name == 'Obj3d66-8915637-20-802'){
            this.fany4 = child
          }
          if(child.name == 'Obj3d66-8915637-23-828'){
            this.fank5 = child
          }
          if(child.name == 'Obj3d66-8915637-22-182'){
            this.fany5 = child
          }
          if(child.name == 'Obj3d66-8915637-25-604'){
            this.fank6 = child
          }
          if(child.name == 'Obj3d66-8915637-24-1'){
            this.fany6 = child
          }
          if(child.name == 'Obj3d66-8915637-47-853'){
            this.fan4topObj = child
          }
          if(child.name == 'Obj3d66-8915637-102-939'){
            this.toppianObj = child
          }
          if(child.name == 'Obj3d66-8915637-2-859'){
            this.xianObj = child
          }
          if(child.name == 'Obj3d66-8915637-107-895'){
            this.guanObj = child
          }
          if(child.name == 'Obj3d66-8915637-44-133'){
            this.guantou1Obj = child
          }
          if(child.name == 'Obj3d66-8915637-45-192'){
            this.guantou2Obj = child
          }
          if(child.name == 'Obj3d66-8915637-104-217'){
            this.houkObj = child
          }
          if(child.name == 'Obj3d66-8915637-95-86'){
            this.tiepianObj1 = child
          }
          if(child.name == 'Obj3d66-8915637-97-343'){
            this.tiepianObj2 = child
          }

        });
        fbx.position.set(5, 0, 8);
        fbx.scale.set(0.055, 0.05, 0.05);
        this.screen.add(fbx);
        this.fbxObj = fbx;
      });
      this.render();
    },

  },
  mounted() {
    this.init();
  },
}


</script>

<style scoped>

.el-select{
  width: 100%;
}



.bg{
  background-size:100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  padding: 0px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}




.header-avatar{
  width: 100%;
  position: relative;

}

.el-dropdown-link {
  cursor: pointer;
  color: #333333;
}

.el-header {
  display: flex;
  line-height: 50px;
  width: 100%;
}

a{
  text-decoration: none;
}
.group {
  line-height: 28px;
  align-items: center;
  position: relative;
  margin-top: 5px;
}

.input {
  width: 300px;
  height: 40px;
  line-height: 28px;
  padding: 0 1rem;
  padding-left: 2.5rem;
  border: 2px solid transparent;
  border-radius: 8px;
  outline: none;
  background-color: #f3f3f4;
  color: #0d0c22;
  transition: .3s ease;
}

.input::placeholder {
  color: #9e9ea7;
}

.input:focus, input:hover {
  outline: none;
  border-color: rgba(234,76,137,0.4);
  background-color: #fff;
  box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
}

.icon {
  position: absolute;
  top: 10px;
  left: 1rem;
  fill: #9e9ea7;
  width: 1rem;
  height: 1rem;
}
.shadow__btn {

  padding: 10px 20px;
  border: none;
  font-size: 17px;
  color: #fff;
  border-radius: 7px;
  letter-spacing: 4px;
  font-weight: 700;
  text-transform: uppercase;
  transition: 0.5s;
  transition-property: box-shadow;
  margin-top: 5px;
}

.shadow__btn {
  height: 40px;
  background: rgb(0,140,255);
  box-shadow: 0 0 25px rgb(0,140,255);
  margin-left: 5px;
}

.shadow__btn:hover {
  box-shadow: 0 0 5px rgb(0,140,255),
  0 0 25px rgb(0,140,255),
  0 0 50px rgb(0,140,255),
  0 0 100px rgb(0,140,255);
}




.back {
  margin-top: 5px;
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
}

#container-stars {
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
  font-size: 12px;
  letter-spacing: 5px;
  color: #FFFFFF;
  text-shadow: 0 0 4px white;
}

#glow {
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

.back:hover #container-stars {
  z-index: 1;
  background-color: #212121;
}

.back:hover {
  transform: scale(1.1)
}

.back:active {
  border: double 4px #FE53BB;
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
}

.back:active .circle {
  background: #FE53BB;
}

#stars {
  position: relative;
  background: transparent;
  width: 200rem;
  height: 200rem;
}

#stars::after {
  content: "";
  position: absolute;
  top: -10rem;
  left: -100rem;
  width: 100%;
  height: 100%;
  animation: animStarRotate 90s linear infinite;
}

#stars::after {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
}

#stars::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 170%;
  height: 500%;
  animation: animStar 60s linear infinite;
}

#stars::before {
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
.el-form{
  width: 100%;
  display:flex;
  flex-wrap: wrap;

}
.el-form-item{
  width: 50%;
  display:flex;
  align-content: flex-start;
  align-items:center;

}
.scene {
  position: absolute;
  margin-top: 10px;
  margin-left: 40%;
}

.cube {
  color: #ccc;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  transition: all 0.85s cubic-bezier(.17,.67,.14,.93);
  transform-style: preserve-3d;
  transform-origin: 100% 50%;
  width: 10em;
  height: 4em;
}

.cube:hover {
  transform: rotateX(-90deg);
}

.side {
  box-sizing: border-box;
  position: absolute;
  display: inline-block;
  height: 4em;
  width: 200px;
  text-align: center;
  text-transform: uppercase;
  padding-top: 1.5em;
  font-weight: bold;
}

.top {
  background: wheat;
  color: #222229;
  transform: rotateX(90deg) translate3d(0, 0, 2em);
  box-shadow: inset 0 0 0 5px #fff;
}

.front {
  background: #222229;
  color: #fff;
  box-shadow: inset 0 0 0 5px #fff;
  transform: translate3d(0, 0, 2em);
}

</style>
