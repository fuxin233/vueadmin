<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.harddiskName"
            placeholder="显卡型号"
            clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getHarddiskList">搜索</el-button>
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
        <el-button type="primary" @click="getHarddiskList()">刷新</el-button>
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
          prop="harddiskName"
          label="硬盘型号"
          align="center"
          width="320"
          show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
          prop="harddiskSize"
          label="硬盘容量"
          align="center">
        <template slot-scope="scope">
          {{scope.row.harddiskSize}}GB
        </template>
      </el-table-column>

      <el-table-column
          prop="harddiskInterface"
          label="支持接口"
          align="center">
        <template slot-scope="scope">
          {{scope.row.harddiskInterface}}
        </template>
      </el-table-column>

      <el-table-column
          prop="harddiskSpeed"
          label="硬盘读速"
          align="center">
        <template slot-scope="scope">
          {{scope.row.harddiskSpeed}}MB/s
        </template>
      </el-table-column>



      <el-table-column
          prop="harddiskType"
          label="硬盘类型"
          align="center">
        <template slot-scope="scope">
          <el-tag type="info" effect="plain">{{scope.row.harddiskType}}</el-tag>
        </template>
      </el-table-column>


      <el-table-column
          prop="harddiskPrice"
          label="参考价格"
          align="center">
        <template slot-scope="scope">
          {{scope.row.harddiskPrice}}元
        </template>
      </el-table-column>

      <el-table-column
          prop="harddiskDate"
          label="发布日期"
          align="center"
          width="250"
      >
        <template slot-scope="scope">
          <el-date-picker
              v-model= "scope.row.harddiskDate"
              type="date"
              readonly>
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column
          prop="harddiskHot"
          label="硬盘热度"
          align="center">
      </el-table-column>

      <el-table-column
          fixed="right"
          prop="icon"
          label="操作"
          align="center"
          width="200">

        <template slot-scope="scope">

          <el-button type="text" @click="editHandle(scope.row.harddiskId)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.harddiskId)">
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
        title="添加硬盘"
        :visible.sync="saveVisible"
        width="600px"
        :append-to-body="true"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="硬盘型号" prop="harddiskName" label-width="100px">
          <el-input placeholder="请输入硬盘型号" v-model="editForm.harddiskName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="硬盘容量" prop="harddiskSize" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入硬盘容量"
              v-model.number="editForm.harddiskSize"
              autocomplete="off">
            <template slot="append">GB</template>
          </el-input>
        </el-form-item>

        <el-form-item label="支持接口" prop="harddiskInterface" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-select v-model="editForm.harddiskInterface" filterable placeholder="请选择">
            <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>



        <el-form-item label="硬盘读速" prop="harddiskSpeed" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入硬盘读速"
              v-model.number="editForm.harddiskSpeed"
              autocomplete="off">
            <template slot="append">MB/s</template>
          </el-input>
        </el-form-item>

        <el-form-item label="硬盘类型" prop="harddiskType" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-select v-model="editForm.harddiskType" filterable placeholder="请选择">
            <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="参考价格" prop="harddiskPrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入参考价格"
              v-model.number="editForm.harddiskPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="harddiskDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

          <el-date-picker
              v-model="editForm.harddiskDate"
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
        :append-to-body="true"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="硬盘型号" prop="harddiskName" label-width="100px">
          <el-input placeholder="请输入硬盘型号" v-model="editForm.harddiskName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="硬盘容量" prop="harddiskSize" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入硬盘容量"
              v-model.number="editForm.harddiskSize"
              autocomplete="off">
            <template slot="append">GB</template>
          </el-input>
        </el-form-item>

        <el-form-item label="支持接口" prop="harddiskInterface" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-select v-model="editForm.harddiskInterface" filterable placeholder="请选择">
            <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>



        <el-form-item label="硬盘读速" prop="harddiskSpeed" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入硬盘读速"
              v-model.number="editForm.harddiskSpeed"
              autocomplete="off">
            <template slot="append">MB/s</template>
          </el-input>
        </el-form-item>

        <el-form-item label="硬盘类型" prop="harddiskType" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-select v-model="editForm.harddiskType" filterable placeholder="请选择">
            <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="参考价格" prop="harddiskPrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入参考价格"
              v-model.number="editForm.harddiskPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="harddiskDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

          <el-date-picker
              v-model="editForm.harddiskDate"
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
  name: "Harddisk",
  title:"硬盘信息管理",
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
      //选择框
      options1: [{
        value: 'PCIE',
        label: 'PCIE'
      }, {
        value: 'SATA',
        label: 'SATA'
      }
      ],
      options2: [{
        value: '固态硬盘',
        label: '固态硬盘'
      }, {
        value: '机械硬盘',
        label: '机械硬盘'
      }
      ],
      value: '',


      tableData: [],

      editFormRules: {
        harddiskName: [
          { required: true, message: '请输入硬盘型号', trigger: 'change' }
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
    this.getHarddiskList()

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
      this.getHarddiskList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getHarddiskList()
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

    getHarddiskList() {
      this.$axios.get("/harddisk-detail/list", {
        params: {
          harddiskName: this.searchForm.harddiskName,
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
          this.$axios.post('/harddisk-detail/save',this.editForm
          )
              .then(res => {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getHarddiskList()
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
          this.$axios.post('/harddisk-detail/update',this.editForm)
              .then(res => {

                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getHarddiskList()
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
      this.$axios.get('/harddisk-detail/getById/' + id).then(res => {
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
          ids.push(row.harddiskId)
        })
      }

      console.log(ids)

      this.$axios.post("/harddisk-detail/delete", ids).then(res => {
        this.current = 1;
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose:() => {
            this.getHarddiskList()
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
