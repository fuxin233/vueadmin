<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.cpuName"
            placeholder="CPU型号"
            clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getCpuList">搜索</el-button>
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
        <el-button type="primary" @click="getCpuList()">刷新</el-button>
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
          prop="cpuName"
          label="CPU型号"
          align="center"
          width="280"
      >
      </el-table-column>

      <el-table-column
          prop="cpuFrequency"
          label="基础频率"
          align="center">
        <template slot-scope="scope">
          {{scope.row.cpuFrequency}}Mhz
        </template>
      </el-table-column>

      <el-table-column
          prop="cpuMaxFrequency"
          label="最大睿频"
          align="center">
        <template slot-scope="scope">
          {{scope.row.cpuMaxFrequency}}Mhz
        </template>
      </el-table-column>

      <el-table-column
          prop="cpuCore"
          label="核心"
          align="center">
        <template slot-scope="scope">
          {{scope.row.cpuCore}}C
        </template>
      </el-table-column>
      <el-table-column
          prop="cpuThread"
          label="线程"
          align="center">
        <template slot-scope="scope">
          {{scope.row.cpuThread}}T
        </template>
      </el-table-column>

      <el-table-column
          prop="cpuCache"
          label="缓存"
          align="center">
        <template slot-scope="scope">
          {{scope.row.cpuCache}}MB
        </template>
      </el-table-column>

      <el-table-column
          prop="cpuSize"
          label="制程"
          align="center">
      </el-table-column>

      <el-table-column
          prop="cpuTdp"
          label="TDP"
          align="center">
        <template slot-scope="scope">
          {{scope.row.cpuTdp}}W
        </template>
      </el-table-column>


      <el-table-column
          prop="cpuType"
          label="CPU类型"
          align="center">
        <template slot-scope="scope">
        <el-tag type="info" effect="plain">{{scope.row.cpuType}}</el-tag>
        </template>
      </el-table-column>


      <el-table-column
          prop="cpuPrice"
          label="价格"
          align="center">
        <template slot-scope="scope">
          {{scope.row.cpuPrice}}元
        </template>
      </el-table-column>

      <el-table-column
          prop="cpuDate"
          label="发布日期"
          align="center"
          width="250"
      >
        <template slot-scope="scope">
          <el-date-picker
              v-model= "scope.row.cpuDate"
              type="date"
              readonly>
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column
          prop="cpuMultiIndex"
          label="多核评分"
          align="center">
      </el-table-column>
      <el-table-column
          prop="cpuSingleIndex"
          label="单核评分"
          align="center">
      </el-table-column>
      <el-table-column
          prop="cpuHot"
          label="CPU热度"
          align="center">
      </el-table-column>

      <el-table-column
          fixed="right"
          prop="icon"
          label="操作"
          align="center">

        <template slot-scope="scope">

          <el-button type="text" @click="editHandle(scope.row.cpuId)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.cpuId)">
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
        title="添加CPU"
        :visible.sync="saveVisible"
        width="600px"
        :append-to-body="true"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="CPU型号" prop="cpuName" label-width="100px">
          <el-input placeholder="请输入CPU型号" v-model="editForm.cpuName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="基础频率" prop="cpuFrequency" label-width="100px"
      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入基础频率"
              v-model.number="editForm.cpuFrequency"
              autocomplete="off">
            <template slot="append">Mhz</template>
          </el-input>
        </el-form-item>



        <el-form-item label="最大睿频" prop="cpuMaxFrequency" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入最大睿频"
              v-model.number="editForm.cpuMaxFrequency"
              autocomplete="off">
            <template slot="append">Mhz</template>
          </el-input>
        </el-form-item>

        <el-form-item label="核心" prop="cpuCore" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入核心"
              v-model.number="editForm.cpuCore"
              autocomplete="off">
            <template slot="append">C</template>
          </el-input>
        </el-form-item>
        <el-form-item label="线程" prop="cpuThread" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入线程"
              v-model.number="editForm.cpuThread"
              autocomplete="off">
            <template slot="append">T</template>
          </el-input>
        </el-form-item>


        <el-form-item label="缓存" prop="cpuCache" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入缓存"
              v-model.number="editForm.cpuCache"
              autocomplete="off">
            <template slot="append">MB</template>
          </el-input>
        </el-form-item>


        <el-form-item label="制程" prop="cpuSize" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              :min="1"
              :max="20"
              placeholder="请输入制程"
              v-model.number="editForm.cpuSize"
              autocomplete="off">
            <template slot="append">nm</template>
          </el-input>
        </el-form-item>

        <el-form-item label="TDP" prop="cpuTdp" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入TDP"
              v-model.number="editForm.cpuTdp"
              autocomplete="off">
            <template slot="append">W</template>
          </el-input>
        </el-form-item>


        <el-form-item label="参考价格" prop="cpuPrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入参考价格"
              v-model.number="editForm.cpuPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="cpuDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

          <el-date-picker
              v-model="editForm.cpuDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择发布日期">
          </el-date-picker>

        </el-form-item>

        <el-form-item label="CPU类型" prop="cpuType" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-select v-model="editForm.cpuType" filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="多核评分" prop="cpuMultiIndex" label-width="100px" :rules="[
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入多核评分"
              v-model.number="editForm.cpuMultiIndex"
              autocomplete="off">
            <template slot="append">分</template>
          </el-input>
        </el-form-item>
        <el-form-item label="单核评分" prop="cpuSingleIndex" label-width="100px"
                      :rules="[
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入多核评分"
              v-model.number="editForm.cpuSingleIndex"
              autocomplete="off">
            <template slot="append">分</template>
          </el-input>
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
        <el-form-item label="CPU型号" prop="cpuName" label-width="100px">
          <el-input placeholder="请输入CPU型号" v-model="editForm.cpuName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="基础频率" prop="cpuFrequency" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入基础频率"
              v-model.number="editForm.cpuFrequency"
              autocomplete="off">
            <template slot="append">Mhz</template>
          </el-input>
        </el-form-item>



        <el-form-item label="最大睿频" prop="cpuMaxFrequency" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入最大睿频"
              v-model.number="editForm.cpuMaxFrequency"
              autocomplete="off">
            <template slot="append">Mhz</template>
          </el-input>
        </el-form-item>

        <el-form-item label="核心" prop="cpuCore" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入核心"
              v-model.number="editForm.cpuCore"
              autocomplete="off">
            <template slot="append">C</template>
          </el-input>
        </el-form-item>
        <el-form-item label="线程" prop="cpuThread" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入线程"
              v-model.number="editForm.cpuThread"
              autocomplete="off">
            <template slot="append">T</template>
          </el-input>
        </el-form-item>


        <el-form-item label="缓存" prop="cpuCache" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入缓存"
              v-model.number="editForm.cpuCache"
              autocomplete="off">
            <template slot="append">MB</template>
          </el-input>
        </el-form-item>


        <el-form-item label="制程" prop="cpuSize" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              :min="1"
              :max="20"
              placeholder="请输入制程"
              v-model.number="editForm.cpuSize"
              autocomplete="off">
            <template slot="append">nm</template>
          </el-input>
        </el-form-item>

        <el-form-item label="TDP" prop="cpuTdp" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入TDP"
              v-model.number="editForm.cpuTdp"
              autocomplete="off">
            <template slot="append">W</template>
          </el-input>
        </el-form-item>


        <el-form-item label="价格" prop="cpuPrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入价格"
              v-model.number="editForm.cpuPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="cpuDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

          <el-date-picker
              v-model="editForm.cpuDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择发布日期">
          </el-date-picker>

        </el-form-item>

        <el-form-item label="CPU类型" prop="cpuType" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-select v-model="editForm.cpuType" filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="多核评分" prop="cpuMultiIndex" label-width="100px" :rules="[
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入多核评分"
              v-model.number="editForm.cpuMultiIndex"
              autocomplete="off">
            <template slot="append">分</template>
          </el-input>
        </el-form-item>
        <el-form-item label="单核评分" prop="cpuSingleIndex" label-width="100px"
                      :rules="[
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入多核评分"
              v-model.number="editForm.cpuSingleIndex"
              autocomplete="off">
            <template slot="append">分</template>
          </el-input>
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
  name: "CPU",
  title:"CPU信息管理",
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
      options: [{
        value: 'Ryzen',
        label: 'Ryzen'
      }, {
        value: 'Intel',
        label: 'Intel'
      }
      ],
      value: '',


      tableData: [],

      editFormRules: {
        cpuName: [
          { required: true, message: '请输入CPU型号', trigger: 'change' }
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
    this.getCpuList()

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
      this.getCpuList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getCpuList()
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

    getCpuList() {
      this.$axios.get("/cpu-detail/list", {
        params: {
          cpuName: this.searchForm.cpuName,
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
          this.$axios.post('/cpu-detail/save',this.editForm
              )
              .then(res => {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getCpuList()
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
          this.$axios.post('/cpu-detail/update',this.editForm)
              .then(res => {

                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getCpuList()
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
      this.$axios.get('/cpu-detail/getById/' + id).then(res => {
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
          ids.push(row.cpuId)
        })
      }

      console.log(ids)

      this.$axios.post("/cpu-detail/delete", ids).then(res => {
        this.current = 1;
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose:() => {
            this.getCpuList()
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
