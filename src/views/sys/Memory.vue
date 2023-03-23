<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.memoryName"
            placeholder="内存型号"
            clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getMemoryList">搜索</el-button>
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
        <el-button type="primary" @click="getMemoryList()">刷新</el-button>
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
          fixed
          prop="memoryName"
          label="内存型号"
          align="center"
          width="320"
          show-overflow-tooltip
      >
      </el-table-column>


      <el-table-column
          prop="memoryDdr"
          label="内存条DDR代数"
          align="center">
        <template slot-scope="scope">
          DDR{{scope.row.memoryDdr}}代
        </template>
      </el-table-column>

      <el-table-column
          prop="memorySize"
          label="内存容量"
          align="center">
        <template slot-scope="scope">
          {{scope.row.memorySize}}GB
        </template>
      </el-table-column>



      <el-table-column
          prop="memoryFrequency"
          label="内存频率"
          align="center">
        <template slot-scope="scope">
          {{scope.row.memoryFrequency}}Mhz
        </template>
      </el-table-column>

      <el-table-column
          prop="memoryType"
          label="内存厂商"
          align="center">
        <template slot-scope="scope">
          {{scope.row.memoryType}}
        </template>
      </el-table-column>


      <el-table-column
          prop="memoryPrice"
          label="参考价格"
          align="center">
        <template slot-scope="scope">
          {{scope.row.memoryPrice}}元
        </template>
      </el-table-column>

      <el-table-column
          prop="memoryDate"
          label="发布日期"
          align="center"
          width="250"
      >
        <template slot-scope="scope">
          <el-date-picker
              v-model= "scope.row.memoryDate"
              type="date"
              readonly>
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column
          prop="memoryHot"
          label="内存条热度"
          align="center">
      </el-table-column>

      <el-table-column
          fixed="right"
          prop="icon"
          label="操作"
          align="center"
          width="200">

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
        title="添加内存"
        :visible.sync="saveVisible"
        width="700px"
        :append-to-body="true"
        top="5vh"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="内存型号" prop="memoryName" label-width="100px">
          <el-input placeholder="请输入内存型号" v-model="editForm.memoryName" autocomplete="off"></el-input>
        </el-form-item>




        <el-form-item label="DDR代数" prop="memoryDdr" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入DDR代数"
              v-model.number="editForm.memoryDdr"
              autocomplete="off">
            <template slot="append">代</template>
          </el-input>
        </el-form-item>

        <el-form-item label="内存容量" prop="memorySize" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入内存容量"
              v-model.number="editForm.memorySize"
              autocomplete="off">
            <template slot="append">GB</template>
          </el-input>
        </el-form-item>


        <el-form-item label="内存频率" prop="memoryFrequency" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入内存频率"
              v-model.number="editForm.memoryFrequency"
              autocomplete="off">
            <template slot="append">MHz</template>
          </el-input>
        </el-form-item>

        <el-form-item label="产商" prop="memoryType" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-input
              :controls="false"
              placeholder="产商"
              v-model.number="editForm.memoryType"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="参考价格" prop="memoryPrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入参考价格"
              v-model.number="editForm.memoryPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="memoryDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

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
        title="更新内存"
        :visible.sync="updateVisible"
        width="600px"
        :append-to-body="true"
        top="5vh"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="内存型号" prop="memoryName" label-width="100px">
          <el-input placeholder="请输入内存型号" v-model="editForm.memoryName" autocomplete="off"></el-input>
        </el-form-item>




        <el-form-item label="DDR代数" prop="memoryDdr" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入DDR代数"
              v-model.number="editForm.memoryDdr"
              autocomplete="off">
            <template slot="append">代</template>
          </el-input>
        </el-form-item>

        <el-form-item label="内存容量" prop="memorySize" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入内存容量"
              v-model.number="editForm.memorySize"
              autocomplete="off">
            <template slot="append">GB</template>
          </el-input>
        </el-form-item>


        <el-form-item label="内存频率" prop="memoryFrequency" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入内存频率"
              v-model.number="editForm.memoryFrequency"
              autocomplete="off">
            <template slot="append">MHz</template>
          </el-input>
        </el-form-item>

        <el-form-item label="产商" prop="memoryType" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-input
              :controls="false"
              placeholder="产商"
              v-model.number="editForm.memoryType"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="参考价格" prop="memoryPrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入参考价格"
              v-model.number="editForm.memoryPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="memoryDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

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
          { required: true, message: '请输入主板型号', trigger: 'change' }
        ]


      },

      multipleSelection: [],

      roleDialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleTreeData:  [],
      treeCheckedKeys: [],
      checkStrictly: true
    }

  },
  created() {
    this.getMemoryList()

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
      this.getMemoryList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getMemoryList()
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.updateVisible = false
      this.saveVisible=false
      this.editForm = {}
      this.total = 0
      this.size = 10
      this.current = 1

    },
    handleClose() {
      this.resetForm('editForm')
    },

    getMemoryList() {
      this.$axios.get("/memory-detail/list", {
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/memory-detail/save',this.editForm
          )
              .then(res => {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getMemoryList()
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

    updateForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/memory-detail/update',this.editForm)
              .then(res => {

                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getMemoryList()
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
      this.$axios.get('/memory-detail/getById/' + id).then(res => {
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

      this.$axios.post("/memory-detail/delete", ids).then(res => {
        this.current = 1;
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose:() => {
            this.getMemoryList()
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
