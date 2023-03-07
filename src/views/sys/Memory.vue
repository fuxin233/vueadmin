<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.memoryName"
            placeholder="memory型号"
            clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getUserList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveVisible= true" >新增</el-button>
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
          fixed
          width="100"
          prop="memoryId"
          label="内存ID"
      >
      </el-table-column>
      <el-table-column
          fixed
          width="200"
          prop="memoryName"
          label="内存型号"
      >
      </el-table-column>

      <el-table-column
          width="120"
          prop="memoryDdr"
          label="DDR代数">
      </el-table-column>

      <el-table-column
          width="120"
          prop="memorySize"
          label="内存容量">
      </el-table-column>

      <el-table-column
          width="120"
          prop="memoryFrequency"
          label="内存频率">
      </el-table-column>

      <el-table-column
          width="120"
          prop="memoryType"
          label="产商">
      </el-table-column>


      <el-table-column
          width="120"
          prop="memoryPrice"
          label="价格">
      </el-table-column>

      <el-table-column
          width="150"
          prop="memoryDate"
          label="发布日期">
      </el-table-column>

      <el-table-column
          width="120"
          prop="memoryIndex"
          label="内存评分">
      </el-table-column>

      <el-table-column
          fixed="right"
          prop="icon"
          width="260px"
          label="操作">

        <template slot-scope="scope">

          <el-button type="text" @click="editHandle(scope.row.memoryId)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.memoryId)">
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
        title="添加内存信息"
        :visible.sync="saveVisible"
        width="600px"
        :before-close="handleClose">


      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="内存型号" prop="memoryName" label-width="100px">
          <el-input placeholder="请输入内存型号" v-model="editForm.memoryName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="DDR代数" prop="memoryDdr" label-width="100px">
          <el-input
              :controls="false"

              placeholder="请输入DDR代数"
              v-model="editForm.memoryDdr"
              autocomplete="off">
          </el-input>
        </el-form-item>



        <el-form-item label="内存容量" prop="memorySize" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入内存容量"
              v-model="editForm.memorySize"
              autocomplete="off">
            <template slot="append">GB</template>
          </el-input>
        </el-form-item>

        <el-form-item label="内存频率" prop="memoryFrequency" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入内存频率(32C/24T)"
              v-model="editForm.memoryFrequency"
              autocomplete="off">
            <template slot="append">MHZ</template>
          </el-input>
        </el-form-item>

        <el-form-item label="产商" prop="memoryType" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入产商"
              v-model="editForm.memoryType"
              autocomplete="off">
          </el-input>
        </el-form-item>


        <el-form-item label="价格" prop="memoryPrice" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入价格"
              v-model="editForm.memoryPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="leaveTime" label-width="100px">

          <el-date-picker
              v-model="editForm.memoryDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择发布日期">
          </el-date-picker>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="saveForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--更新对话框-->
    <el-dialog
        title="更新显卡"
        :visible.sync="updateVisible"
        width="600px"
        :before-close="handleClose">


      <el-form :model="editForm"  ref="editForm">
        <el-form-item label="显卡型号" prop="memoryName" label-width="100px">
          <el-input placeholder="请输入显卡型号" v-model="editForm.memoryName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="内存型号" prop="memoryDdr" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入内存型号"
              v-model="editForm.memoryDdr"
              autocomplete="off">
          </el-input>
        </el-form-item>



        <el-form-item label="内存容量" prop="memorySize" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入内存容量"
              v-model="editForm.memorySize"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="内存频率" prop="memoryFrequency" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入内存频率"
              v-model="editForm.memoryFrequency"
              autocomplete="off">
          </el-input>

        </el-form-item>

        <el-form-item label="产商" prop="memoryType" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入产商"
              v-model="editForm.memoryType"
              autocomplete="off">
          </el-input>
        </el-form-item>



        <el-form-item label="价格" prop="memoryPrice" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入价格"
              v-model="editForm.memoryPrice"
              autocomplete="off">
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="leaveTime" label-width="100px">

          <el-date-picker
              v-model="editForm.memoryDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择发布日期">
          </el-date-picker>

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
  name: "Memory",
  title:"内存信息管理",
  data() {
    var validateValue = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入内存信息'));
      }
      else if(value !== value.replace(/[^0-9.]/g,'')) {
        callback(new Error('请输入数字'));
      }
      else {
        callback();
      }
    };


    return {
      searchForm: {},
      delBtlStatu: true,
      total: 0,
      size: 10,
      current: 1,

      saveVisible: false,
      updateVisible: false,

      editForm: {

      },

      value: '',


      tableData: [],

      editFormRules: {
        memoryName: [
          { required: true, message: '请输入内存型号', trigger: 'blur' }
        ],
        memoryDdr: [
          { validator: validateValue, trigger: 'blur' },
        ],
        memorySize: [
          { validator: validateValue, trigger: 'blur' },
        ],
        memoryFrequency: [
          { validator: validateValue, trigger: 'blur' },
        ],
        memoryPrice: [
          { validator: validateValue, trigger: 'blur' },
        ]

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

    this.$axios.get("/sys/memory/list").then(res => {
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
      this.updateVisible = false
      this.saveVisible=false
      this.editForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },

    getUserList() {
      this.$axios.get("/sys/memory/list", {
        params: {
          memoryName: this.searchForm.memoryName,
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

    saveForm(formName) {
      this.editForm.image =this.imageUrl;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/sys/memory/save',
              {
                memoryId:this.editForm.memoryId,
                memoryName:this.editForm.memoryName,
                memoryDdr:this.editForm.memoryDdr,
                memorySize:this.editForm.memorySize + 'GB',
                memoryFrequency:this.editForm.memoryFrequency+'MHZ',
                memoryType:this.editForm.memoryType,
                memoryPrice:this.editForm.memoryPrice,
                memoryDate:this.editForm.memoryDate,



              })
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
                this.imageUrl=''
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    updateForm(formName){
      this.editForm.image =this.imageUrl;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/sys/memory/update',this.editForm)
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
                this.imageUrl=''
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    editHandle(id) {
      this.$axios.get('/sys/memory/info/' + id).then(res => {
        this.editForm = res.data.data

        this.updateVisible = true
      })
    },

    delHandle(id) {

      var ids = []

      if (id) {
        ids.push(id)
      } else {
        this.multipleSelection.forEach(row => {
          ids.push(row.memoryId)
        })
      }

      console.log(ids)

      this.$axios.post("/sys/memory/delete", ids).then(res => {
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.el-pagination {
  float: right;
  margin-top: 22px;
}

</style>
