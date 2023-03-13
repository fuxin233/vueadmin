<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.powerName"
            placeholder="内存型号"
            clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getPowerList">搜索</el-button>
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
        <el-button type="primary" @click="getPowerList()">刷新</el-button>
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
          prop="powerName"
          label="电源型号"
          align="center"
          width="320"
          show-overflow-tooltip
      >
      </el-table-column>


      <el-table-column
          prop="powerPower"
          label="额定功率"
          align="center">
        <template slot-scope="scope">
          {{scope.row.powerPower}}W
        </template>
      </el-table-column>

      <el-table-column
          prop="powerStructure"
          label="基本结构"
          align="center">
        <template slot-scope="scope">
          {{scope.row.powerStructure}}
        </template>
      </el-table-column>



      <el-table-column
          prop="powerVoltage"
          label="电压范围"
          align="center">
        <template slot-scope="scope">
          {{scope.row.powerVoltage}}V
        </template>
      </el-table-column>

      <el-table-column
          prop="powerWire"
          label="线材种类"
          align="center">
        <template slot-scope="scope">
          {{scope.row.powerWire}}
        </template>
      </el-table-column>


      <el-table-column
          prop="powerWarranty"
          label="质保年限"
          align="center">
        <template slot-scope="scope">
          {{scope.row.powerWarranty}}年
        </template>
      </el-table-column>



      <el-table-column
          prop="powerPrice"
          label="参考价格"
          align="center">
        <template slot-scope="scope">
          {{scope.row.powerPrice}}元
        </template>
      </el-table-column>

      <el-table-column
          prop="powerDate"
          label="发布日期"
          align="center"
          width="250"
      >
        <template slot-scope="scope">
          <el-date-picker
              v-model= "scope.row.powerDate"
              type="date"
              readonly>
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column
          prop="powerHot"
          label="电源热度"
          align="center">
      </el-table-column>

      <el-table-column
          fixed="right"
          prop="icon"
          label="操作"
          align="center"
      width="200px">

        <template slot-scope="scope">

          <el-button type="text" @click="editHandle(scope.row.powerId)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.powerId)">
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
        title="添加电源"
        :visible.sync="saveVisible"
        width="700px"
        :append-to-body="true"
        top="5vh"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="电源型号" prop="powerName" label-width="100px">
          <el-input placeholder="请输入电源型号" v-model="editForm.powerName" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="额定功率" prop="powerPower" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入额定功率"
              v-model.number="editForm.powerPower"
              autocomplete="off">
            <template slot="append">W</template>
          </el-input>
        </el-form-item>

        <el-form-item label="基本结构" prop="powerStructure" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-input
              :controls="false"
              placeholder="请输入基本结构"
              v-model.number="editForm.powerStructure"
              autocomplete="off">
          </el-input>
        </el-form-item>


        <el-form-item label="电压范围" prop="powerVoltage" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-input
              :controls="false"
              placeholder="请输入电压范围"
              v-model.number="editForm.powerVoltage"
              autocomplete="off">
            <template slot="append">V</template>
          </el-input>
        </el-form-item>

        <el-form-item label="线材种类" prop="powerWire" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-input
              :controls="false"
              placeholder="请输入线材种类"
              v-model.number="editForm.powerWire"
              autocomplete="off">
          </el-input>
        </el-form-item>


        <el-form-item label="质保年限" prop="powerWarranty" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入质保年限"
              v-model.number="editForm.powerWarranty"
              autocomplete="off">
            <template slot="append">年</template>
          </el-input>
        </el-form-item>


        <el-form-item label="参考价格" prop="powerPrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入参考价格"
              v-model.number="editForm.powerPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="powerDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

          <el-date-picker
              v-model="editForm.powerDate"
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
        <el-form-item label="电源型号" prop="powerName" label-width="100px">
          <el-input placeholder="请输入电源型号" v-model="editForm.powerName" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="额定功率" prop="powerPower" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入额定功率"
              v-model.number="editForm.powerPower"
              autocomplete="off">
            <template slot="append">W</template>
          </el-input>
        </el-form-item>

        <el-form-item label="基本结构" prop="powerStructure" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-input
              :controls="false"
              placeholder="请输入基本结构"
              v-model.number="editForm.powerStructure"
              autocomplete="off">
          </el-input>
        </el-form-item>


        <el-form-item label="电压范围" prop="powerVoltage" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},

    ]">
          <el-input
              :controls="false"
              placeholder="请输入电压范围"
              v-model.number="editForm.powerVoltage"
              autocomplete="off">
            <template slot="append">V</template>
          </el-input>
        </el-form-item>

        <el-form-item label="线材种类" prop="powerWire" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-input
              :controls="false"
              placeholder="请输入线材种类"
              v-model.number="editForm.powerWire"
              autocomplete="off">
          </el-input>
        </el-form-item>


        <el-form-item label="质保年限" prop="powerWarranty" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入质保年限"
              v-model.number="editForm.powerWarranty"
              autocomplete="off">
            <template slot="append">年</template>
          </el-input>
        </el-form-item>


        <el-form-item label="参考价格" prop="powerPrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入参考价格"
              v-model.number="editForm.powerPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="powerDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

          <el-date-picker
              v-model="editForm.powerDate"
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
  name: "Power",
  title:"电源信息管理",
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
        powerName: [
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
    this.getPowerList()

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
      this.getPowerList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getPowerList()
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

    getPowerList() {
      this.$axios.get("/power-detail/list", {
        params: {
          powerName: this.searchForm.powerName,
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
          this.$axios.post('/power-detail/save',this.editForm
          )
              .then(res => {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getPowerList()
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
          this.$axios.post('/power-detail/update',this.editForm)
              .then(res => {

                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getPowerList()
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
      this.$axios.get('/power-detail/getById/' + id).then(res => {
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
          ids.push(row.powerId)
        })
      }

      console.log(ids)

      this.$axios.post("/power-detail/delete", ids).then(res => {
        this.current = 1;
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose:() => {
            this.getPowerList()
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
