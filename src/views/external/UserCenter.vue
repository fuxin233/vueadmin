<template>
  <div style="text-align: center;">

    <h2>你好！{{userInfo.name}} </h2>
    <el-avatar :src="userInfo.avatar" style="width: 200px;height: 200px" ></el-avatar>
    <div class="elbdiv">
      <el-button @click="avatarVisible = true" class="el-buttons">更改头像</el-button>
    </div>
    <hr style="width: 200px;filter: alpha(opacity=100,finishOpacity=0,style=3);" color="#987cb9" SIZE="1">
    <!--修改头像-->
    <el-dialog
        title="修改当前头像"
        :visible.sync="avatarVisible"
        width="300px"
        :append-to-body="true"
        :before-close="resetAvatar"
    >
      <el-form >
        <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:8081/user/saveAvatar"
            :show-file-list="false"
            :multiple="false"
            :on-success="handleImgSuccess"
            :before-upload="beforeImgUpload"
            name="file">
          <el-avatar v-if="imageUrl" :src="imageUrl" style="width: 150px;height: 150px" ></el-avatar>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div >
          <el-button  @click="updateAvatar()" class="el-buttons">确认更改</el-button>
        </div>
      </el-form>
    </el-dialog>
    <div class="elbdiv">
      <el-button class="el-buttons"  @click="passwordVisible = true">更改密码</el-button>
    </div>

    <!--修改密码-->
    <el-dialog
        title="修改当前密码"
        :visible.sync="passwordVisible"
        :append-to-body="true"
        width="600px"
        :before-close="handleClose">
      <el-form :model="passForm" status-icon :rules="rules" ref="passForm" label-width="100px">
        <el-form-item label="旧密码" prop="currentPass">
          <el-input type="password" v-model="passForm.currentPass" autocomplete="off"  show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="passForm.password" autocomplete="off"  show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="passForm.checkPass" autocomplete="off"  show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="submitForm('passForm')" >提交</el-button>
          <el-button @click="resetForm('passForm')" class="el-buttons">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>



    <div class="flip" v-for="(item,index) in computerLists">
      <div class="content">
        <div class="front">
          <h2>
            游戏评分：{{ item.gameIndex}}
            <BR/>
            办公评分：{{ item.workIndex}}</h2>

          <p style="font-size: 20px">我的配置单{{index+1}}</p>
          <h2><i class="el-icon-star-on"></i>
          {{ item.likes }}</h2>
        </div>
        <div class="back">
          <p>CPU型号：{{ item.cpuName}}</p>
          <p>显卡型号：{{ item.gpuName}}</p>
          <p>电源型号：{{ item.powerName}}</p>
          <p>机械硬盘：{{ item.mechHarddiskName}} * {{ item.mechHarddiskNumber}}</p>
          <p>固态硬盘：{{ item.ssdHarddiskName}} * {{ item.ssdHarddiskNumber}}</p>
          <p>主板型号：{{ item.mainboardName}}</p>
          <p>内存型号：{{ item.memoryName}} * {{ item.memoryNumber}}</p>
          <p>机箱型号：{{ item.pccaseName}}</p>
          <p>装机建议：{{ item.advice}}</p>
          <p>装机时间：{{ item.created}}</p>
          <p><el-button type="danger" icon="el-icon-delete" circle @click="deleteMyComputerList(item.id)"></el-button></p>

        </div>
      </div>
    </div>



  </div>
</template>

<script>
export default {
  name: "UserCenter",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
      },
      passForm: {
        password: '',
        checkPass: '',
        currentPass: ''
      },

      imageUrl: '',
      rules: {
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        currentPass: [
          { required: true, message: '请输入当前密码', trigger: 'blur' },
        ]
      },
      passwordVisible: false,
      avatarVisible: false,
      computerLists:[],
    }
  },
  created() {
    this.getUserInfo()
    this.getComputerList()
  },
  methods: {
    getUserInfo(){
      this.$axios.get("/user/userInfo").then(res=>{
        this.userInfo = res.data.data
      })
    },
    //清除信息缓存
    logout(){
      this.$axios.post("/logout").then(res=>{
        localStorage.clear()
        sessionStorage.clear()

        this.$store.commit("resetState")
        ///跳转到登录页面
        this.$router.push("/AdminLogin")
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post('/user/updatePwd', this.passForm).then(res => {
            _this.$alert(res.data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$refs[formName].resetFields();
              }
            });
          })
          this.logout();
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    resetAvatar(){
      this.imageUrl='';
      this.avatarVisible=false
    },
    resetForm(formName) {
      this.imageUrl = ""
      this.avatarVisible = false
      this.$refs[formName].resetFields();
      this.passwordVisible = false

    },
    handleClose() {
      this.resetForm('passForm')
    },
    beforeImgUpload(file) {
      // 设置限定格式
      console.log(file)
      const img_mimetype = ['image/jpeg', 'image/jpg', 'image/png']
      const isJPG = img_mimetype.includes(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传头像只能是图片格式!')
        return false
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
        return false
      }
      return isJPG && isLt5M
    },
    handleImgSuccess(res) {
      // 把图片名给img
      console.log(res.data.filePath)
      this.imageUrl = 'http://127.0.0.1:8081/AC_system/avatar/'+res.data.filePath
      console.log(this.imageUrl)
    },
    updateAvatar(){
      this.$axios.post('/user/updateAvatar', {
        url:this.imageUrl
      })
          .then(res => {
            this.$message({
              showClose: true,
              message: '恭喜你，操作成功',
              type: 'success',
              onClose:() => {
                this.getUserInfo()
              }
            });
            this.resetForm()
          })
    },
    getComputerList() {
      this.$axios.get("/computer-list/getMyList").then(res=>{
        this.computerLists = res.data.data
      })
    },
    deleteMyComputerList(id){
      var ids = []
      if (id) {
        ids.push(id)
      }
        this.$axios.post("/computer-list/delete", ids).then(res => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success',
            onClose: () => {
              this.getComputerList()
            }
          });
        })
    }
  }
}

</script>
<style scoped>
.el-form {
  text-align: center;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.elbdiv{
  margin-top: 20px;
  margin-bottom : 20px
}
.el-buttons {
  background: #22415d;
  color: #b9c4d3;
  border: 1px solid #126ca0;
  opacity: 1
}

.el-button:active {
  background: #126c9e !important;
  font-weight: bold;
}
/*按钮悬浮*/
.el-button:hover {
  background: #126c9e !important;
  color: white !important;
  font-weight: bold;
  border-color: #01a8f9 !important;
}
/*按钮点击*/
.el-button:focus {
  background: #126c9e !important;
  color: white !important;
  font-weight: bold;

  border-color: #01a8f9 !important;
}



/*装机单*/
.flip {
  box-shadow: 0 0 10px rgba(128, 128, 128, 0.5);
  padding: 1em;
  width: 500px;
  height: 600px;
  transform-style: preserve-3d;
  transition: 3s ease;
  display: inline-block;
  float: left;
  margin-right: 1.8%;
  margin-left: 1.8%;
  margin-top: 20px;
}

.flip:hover {
  transform: rotateY(180deg);
}
/* Content */
.flip .content {
  transform-style: preserve-3d;
}

.flip .back, .flip .front {
  transform-style: preserve-3d;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
}

.flip .back {
  transform: rotateY(180deg);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.flip h2,
.flip p {
  transform: translateZ(90px);
  text-shadow: 0 0 3px black;
  text-align: center;
}

.flip h2 {
  font-size: 2em;
  color: #fff;
  letter-spacing: 1px;
  margin-top: 30%;
}

.flip p {
  font-size: 1em;
  color: #eee;
}

.flip::before,
.flip::after {
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  background-image: linear-gradient(purple, red);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transform: rotateY(180deg)translateZ(1px);
}

.flip::before {
  transform: none;
  background-image: linear-gradient(violet, orange);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
