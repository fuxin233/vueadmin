<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.username"
            placeholder="用户名"
            clearable
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getUserList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true" >新增管理员</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
          <el-button type="danger" slot="reference" :disabled="delBtlStatu" >批量删除</el-button>
        </el-popconfirm>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getUserList()">刷新</el-button>
      </el-form-item>
    </el-form>

    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
        :highlight-current-row = "true"
        @selection-change="handleSelectionChange">

      <el-table-column
          type="selection"
          width="55"
          align="center">
      </el-table-column>


      <el-table-column
          label="头像"
          width="70"
          align="center">
        <template slot-scope="scope">
          <el-avatar size="medium" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column
          prop="name"
          label="用户名"
          width="120"
          align="center">
      </el-table-column>

      <el-table-column
          prop="sex"
          label="性别"
          width="120"
          align="center">
      </el-table-column>

      <el-table-column
          prop="email"
          label="邮箱"
          width="200"
          align="center">
      </el-table-column>

      <el-table-column
          prop="created"
          label="创建日期"
          width="250"
          align="center">
        <template slot-scope="scope">
        <el-date-picker
            v-model= "scope.row.created"
            type="datetime"
            readonly>
        </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column
          prop="lastLogin"
          label="最后登录"
          width="250"
          align="center">
        <template slot-scope="scope">
          <el-date-picker
              v-model= "scope.row.lastLogin"
              type="datetime"
              readonly>
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column
          prop="locked"
          label="账号状态"
          align="center"
          width="78">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.locked === 1" size="small" type="success">正常</el-tag>
          <el-tag v-if="scope.row.locked === 0" size="small" type="danger">封禁</el-tag>
      </template>
      </el-table-column>

      <el-table-column
          prop="roles"
          label="角色权限"
          align="center">
        <template slot-scope="scope">
          <div v-for="item in scope.row.roles" style="display: inline-block;margin-right : 10px ">
            <el-tag size="small" type="success">{{item.remark}}</el-tag>
          </div>
        </template>
      </el-table-column>



      <el-table-column
          prop="icon"
          width="200px"
          label="操作"
          align="center">

        <template slot-scope="scope">

          <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>

        </template>
      </el-table-column>

    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="current"
        :page-size="size"
        :total="total">
    </el-pagination>


    <!--新增对话框-->
    <el-dialog
        title="添加管理员"
        :visible.sync="dialogVisible"
        width="600px"
        :append-to-body="true"
        :before-close="handleClose">


      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名" prop="name" label-width="100px">
          <el-input placeholder="请输入用户名" v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex" label-width="100px">
          <el-radio v-model="editForm.sex" label="男">男</el-radio>
          <el-radio v-model="editForm.sex" label="女">女</el-radio>
        </el-form-item>

        <el-form-item label="密码" prop="password" label-width="100px">
          <el-input placeholder="默认密码为123456" v-model="editForm.password" autocomplete="off" show-password clearable></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass" label-width="100px">
          <el-input placeholder="再次输入密码" v-model="editForm.checkPass" autocomplete="off" show-password clearable></el-input>
        </el-form-item>

        <el-form-item label="邮箱"  prop="email" label-width="100px">
          <el-input placeholder="请输入邮箱" v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱验证码"  label-width="100px">
        <el-input placeholder="请输入邮箱验证码" v-model="code"  style="width: 148px; margin-right:8px;float: left" maxlength=""></el-input>
        <el-button v-show="editForm.email != ''" type="primary" @click="sendEmail(editForm.email)" :disabled="disable">{{buttonName}}</el-button>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>


    <!--更改对话框-->
    <el-dialog
        title="更改用户信息"
        :visible.sync="updateVisible"
        width="600px"
        :before-close="handleClose"
        :append-to-body="true"
    >


      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名" prop="userName" label-width="100px">
          <el-input placeholder="请输入用户名" v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex" label-width="100px">
          <el-radio v-model="editForm.sex" :label="'男'">男</el-radio>
          <el-radio v-model="editForm.sex" :label="'女'">女</el-radio>
        </el-form-item>

        <el-form-item label="账号状态" prop="locked" label-width="100px">
          <el-radio v-model="editForm.locked" :label="1">正常</el-radio>
          <el-radio v-model="editForm.locked" :label="0">封禁</el-radio>
        </el-form-item>


        <el-form-item label="邮箱"  prop="email" label-width="100px">
          <el-input placeholder="请输入邮箱" v-model="editForm.email" autocomplete="off"  label-width="50px"></el-input>
        </el-form-item>

        <el-form-item label="角色"  label-width="100px">
<!--          <el-checkbox-group v-model="editForm.roleIds">-->
<!--            <el-checkbox label="1">管理员</el-checkbox>-->
<!--            <el-checkbox label="2">普通用户</el-checkbox>-->
<!--            <el-checkbox label="3">vip用户</el-checkbox>-->
<!--          </el-checkbox-group>-->
          <el-checkbox-group v-model="editForm.roleIds">
          <el-checkbox v-for="item in this.roleList" :label="item.id">{{item.remark}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>




      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="updateForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "User",
  title:"用户管理",
  data() {
    return {
      searchForm: {},
      delBtlStatu: true,
      code:'',
      key:'',
      roleList:[],

      //获取验证码倒计时
      buttonName:'获取邮箱验证码',
      count: 60,
      disable: false,

      total: 0,
      size: 10,
      current: 1,


      dialogVisible: false,
      updateVisible: false,


      editForm: {
        email:''
      },

      tableData: [],

      editFormRules: {
        name:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { min: 5, max: 20, message: '密码至少为5个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 5, max: 20, message: '密码至少为5个字符', trigger: 'blur' }
        ],

        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
      },

      multipleSelection: [],

      roleDialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleForm: {},
      treeCheckedKeys: [],
      checkStrictly: true

    }


    var validatePass = (rule, value, callback) => {
      if (this.editForm.userPwd === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.editForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if(this.editForm.userPwd!==null){
        if (this.editForm.checkPass === '') {
          callback(new Error('请再次输入密码'));
        } else if (this.editForm.checkPass !== this.editForm.userPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }

    };
  },

  created() {
    this.getUserList()
    this.getRoleList()
  },
  methods: {
    getRoleList(){
      this.$axios.get("/role/list").then(res => {
        this.roleList = res.data.data.records;
      })
    },
    sendEmail(userEmail){
        console.log(userEmail),
            this.$axios.get('/user/sendMail/'+userEmail).then(res=>{
              this.key = res.data.data;
              let timeout= setInterval(() => {
                if (this.count < 1) {
                  this.disable = false;
                  this.buttonName = "获取邮箱验证码";
                  this.count = 60;
                  clearInterval(timeout);
                } else {
                  this.disable = true;
                  this.buttonName = this.count-- + "s后重发";
                }
              }, 1000);

            })

    },


    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log("勾选")
      console.log(val)
      this.multipleSelection = val;
      this.delBtlStatu = val.length == 0

    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getUserList()
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.updateVisible=false
      this.editForm = {}
      this.editForm.roleIds=[]
      this.disable = false;
      this.buttonName = "获取邮箱验证码";
      this.code ="";
      this.count = 0

    },
    handleClose() {
      console.log(this.editForm.roleIds)
      this.resetForm('editForm')
    },

    getUserList () {
      this.$axios.get("/user/list", {
        params: {
          username: this.searchForm.username,
          current: this.current,
          size: this.size
        }
      }).then(res => {
        this.tableData = res.data.data.records
        this.size = res.data.data.size
        this.current = res.data.data.current
        this.total = res.data.data.total
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/user/addAdmin/'+this.key+'/'+this.code, this.editForm)
              .then(res => {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getUserList()
                  }
                });
                this.resetForm(formName)
                this.dialogVisible = false
              })
        } else {
          console.log('error submit!!');
          this.dialogVisible = true
          return false;
        }
      });
    },

    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/user/update', this.editForm)
              .then(res => {

                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getUserList()
                  }
                });
                this.resetForm(formName)
                this.updateVisible = false
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    editHandle(id) {
      this.$axios.get('/user/getById/' + id).then(res => {
        this.editForm = res.data.data
        this.updateVisible = true
        this.getRoleList()
      })
    },
    delHandle(id) {

      var ids = []

      if (id) {
        ids.push(id)
      } else {
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
      }

      console.log(ids)
      this.$axios.post("/user/delete", ids).then(res => {
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose:() => {
            this.getUserList()
          }
        });
      })
    },

  }
}
</script>

<style scoped>

.el-pagination {
  float: right;
  margin-top: 22px;
}

</style>
