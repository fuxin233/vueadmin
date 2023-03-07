<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.adminName"
            placeholder="用户名"
            clearable
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getUserList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true" >新增</el-button>
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
        @selection-change="handleSelectionChange">

      <el-table-column
          type="selection"
          width="55">
      </el-table-column>



      <el-table-column
          prop="adminName"
          label="管理员用户名"
          width="300">
      </el-table-column>

      <el-table-column
          prop="role"
          label="角色权限">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.role === 'ROLE_admin'" size="small" type="success">全局管理员</el-tag>
          <el-tag v-if="scope.row.role === 'ROLE_user_admin'" size="small" type="success">用户管理员</el-tag>
          <el-tag v-if="scope.row.role === 'ROLE_hardware_admin'" size="small" type="success">硬件管理员</el-tag>
        </template>
      </el-table-column>


      <el-table-column
          prop="icon"
          width="260px"
          label="操作">

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
        title="管理员信息"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">


      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名" prop="adminName" label-width="100px">
          <el-input placeholder="请输入用户名" v-model="editForm.adminName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="adminPwd" label-width="100px">
          <el-input placeholder="请输入密码" v-model="editForm.adminPwd" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass" label-width="100px">
          <el-input placeholder="再次输入密码" v-model="editForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限"  prop="role" label-width="100px">
          <el-select v-model="editForm.role" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配权限对话框 -->


  </div>
</template>

<script>
export default {
  name: "User",
  title:"用户管理",
  data() {
    //新增管理员 密码验证规则
    var validatePass2 = (rule, value, callback) => {
      if(this.editForm.adminPwd!==null){
        if (this.editForm.checkPass === '') {
          callback(new Error('请再次输入密码'));
        } else if (this.editForm.checkPass !== this.editForm.adminPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }

    };
    return {
      //保存后端传来的用户名
      searchForm: {},
      delBtlStatu: true,

      total: 0,
      size: 10,
      current: 1,

      dialogVisible: false,
      editForm: {
          role:'ROLE_admin'
      },
      options: [{
        value: 'ROLE_admin',
        label: '全局管理员'
      }, {
        value: 'ROLE_user_admin',
        label: '用户管理员'
      }, {
        value: 'ROLE_hardware_admin',
        label: '硬件管理员'
      }],

      tableData: [],

      editFormRules: {
        adminName:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        adminPwd: [
          { min: 5, max: 20, message: '密码至少为5个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 5, max: 20, message: '密码至少为5个字符', trigger: 'blur' }
        ],
      },

      multipleSelection: [],

      roleDialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleForm: {},
      roleTreeData:  [],
      treeCheckedKeys: [],
      checkStrictly: true

    }
  },
  created() {
    this.getUserList()

    this.$axios.get("/sys/admin/list").then(res => {
      this.roleTreeData = res.data.data.records
    })
  },
  methods: {
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
      this.editForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },

    getUserList() {
      this.$axios.get("/sys/admin/list", {
        params: {
          adminName: this.searchForm.adminName,
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
    //编辑和新增表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/sys/admin/' + (this.editForm.id?'update' : 'save'), this.editForm)
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
          return false;
        }
      });
    },


    editHandle(id) {
      this.$axios.get('/sys/admin/info/' + id).then(res => {
        this.editForm = res.data.data

        this.dialogVisible = true
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

      this.$axios.post("/sys/admin/delete", ids).then(res => {
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