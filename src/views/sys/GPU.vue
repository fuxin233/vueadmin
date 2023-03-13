<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.gpuName"
            placeholder="显卡型号"
            clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getGpuList">搜索</el-button>
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
        <el-button type="primary" @click="getGpuList()">刷新</el-button>
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
          prop="gpuName"
          label="GPU型号"
          align="center"
          width="280"
      >
      </el-table-column>

      <el-table-column
          prop="gpuTdp"
          label="显卡TDP功耗"
          align="center">
        <template slot-scope="scope">
          {{scope.row.gpuTdp}}W
        </template>
      </el-table-column>

      <el-table-column
          prop="gpuProcessor"
          label="流处理器数"
          align="center">
        <template slot-scope="scope">
          {{scope.row.gpuProcessor}}
        </template>
      </el-table-column>

      <el-table-column
          prop="gpuFrequency"
          label="GPU频率"
          align="center">
        <template slot-scope="scope">
          {{scope.row.gpuFrequency}}Mhz
        </template>
      </el-table-column>
      <el-table-column
          prop="boostFrequency"
          label="Boost频率"
          align="center">
        <template slot-scope="scope">
          {{scope.row.boostFrequency}}Mhz
        </template>
      </el-table-column>

      <el-table-column
          prop="gpuMemoryRate"
          label="显存速率"
          align="center">
        <template slot-scope="scope">
          {{scope.row.gpuMemoryRate}}Gbps
        </template>
      </el-table-column>

      <el-table-column
          prop="gpuMemorySize"
          label="显存容量"
          align="center">
        <template slot-scope="scope">
          {{scope.row.gpuMemorySize}}MB
        </template>
      </el-table-column>

      <el-table-column
          prop="gpuSize"
          label="显卡制程"
          align="center">
        <template slot-scope="scope">
          {{scope.row.gpuSize}}nm
        </template>
      </el-table-column>
      <el-table-column
          prop="gpuArea"
          label="核心面积"
          align="center">
        <template slot-scope="scope">
          {{scope.row.gpuArea}}mm²
        </template>
      </el-table-column>
      <el-table-column
          prop="gpuTransistor"
          label="晶体管数量"
          align="center">
        <template slot-scope="scope">
          {{scope.row.gpuTransistor}}M
        </template>
      </el-table-column>


      <el-table-column
          prop="gpuType"
          label="GPU类型"
          align="center">
        <template slot-scope="scope">
          <el-tag type="info" effect="plain">{{scope.row.gpuType}}</el-tag>
        </template>
      </el-table-column>


      <el-table-column
          prop="gpuPrice"
          label="价格"
          align="center">
        <template slot-scope="scope">
          {{scope.row.gpuPrice}}元
        </template>
      </el-table-column>

      <el-table-column
          prop="gpuDate"
          label="发布日期"
          align="center"
          width="250"
      >
        <template slot-scope="scope">
          <el-date-picker
              v-model= "scope.row.gpuDate"
              type="date"
              readonly>
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column
          prop="gpuIndex"
          label="显卡评分"
          align="center">
      </el-table-column>
      <el-table-column
          prop="gpuHot"
          label="GPU热度"
          align="center">
      </el-table-column>

      <el-table-column
          fixed="right"
          prop="icon"
          label="操作"
          align="center"
          width="200">

        <template slot-scope="scope">

          <el-button type="text" @click="editHandle(scope.row.gpuId)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.gpuId)">
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
        title="添加GPU"
        :visible.sync="saveVisible"
        width="600px"
        :append-to-body="true"
        top="5vh"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="GPU型号" prop="gpuName" label-width="100px">
          <el-input placeholder="请输入GPU型号" v-model="editForm.gpuName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="显卡功耗" prop="gpuTdp" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入显卡功耗"
              v-model.number="editForm.gpuTdp"
              autocomplete="off">
            <template slot="append">W</template>
          </el-input>
        </el-form-item>



        <el-form-item label="流处理器数" prop="gpuProcessor" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入流处理器数"
              v-model.number="editForm.gpuProcessor"
              autocomplete="off">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>

        <el-form-item label="GPU频率" prop="gpuFrequency" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入GPU频率"
              v-model.number="editForm.gpuFrequency"
              autocomplete="off">
            <template slot="append">Mhz</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Boost频率" prop="boostFrequency" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入Boost频率"
              v-model.number="editForm.boostFrequency"
              autocomplete="off">
            <template slot="append">Mhz</template>
          </el-input>
        </el-form-item>


        <el-form-item label="显存速率" prop="gpuMemoryRate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入显存速率"
              v-model.number="editForm.gpuMemoryRate"
              autocomplete="off">
            <template slot="append">Gbps</template>
          </el-input>
        </el-form-item>


        <el-form-item label="显存容量" prop="gpuMemorySize" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              :min="1"
              :max="20"
              placeholder="请输入显存容量"
              v-model.number="editForm.gpuMemorySize"
              autocomplete="off">
            <template slot="append">MB</template>
          </el-input>
        </el-form-item>

        <el-form-item label="显卡制程" prop="gpuSize" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入显卡制程"
              v-model.number="editForm.gpuSize"
              autocomplete="off">
            <template slot="append">nm</template>
          </el-input>
        </el-form-item>


        <el-form-item label="核心面积" prop="gpuArea" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入核心面积"
              v-model.number="editForm.gpuArea"
              autocomplete="off">
            <template slot="append">mm²</template>
          </el-input>
        </el-form-item>
        <el-form-item label="晶体管数量" prop="gpuTransistor" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入晶体管数量"
              v-model.number="editForm.gpuTransistor"
              autocomplete="off">
            <template slot="append">M</template>
          </el-input>
        </el-form-item>
        <el-form-item label="参考价格" prop="gpuPrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入参考价格"
              v-model.number="editForm.gpuPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="gpuDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

          <el-date-picker
              v-model="editForm.gpuDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择发布日期">
          </el-date-picker>

        </el-form-item>

        <el-form-item label="GPU类型" prop="gpuType" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-select v-model="editForm.gpuType" filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显卡评分" prop="gpuIndex" label-width="100px" :rules="[
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入评分"
              v-model.number="editForm.gpuIndex"
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
        top="5vh"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="GPU型号" prop="gpuName" label-width="100px">
          <el-input placeholder="请输入GPU型号" v-model="editForm.gpuName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="显卡功耗" prop="gpuTdp" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入显卡功耗"
              v-model.number="editForm.gpuTdp"
              autocomplete="off">
            <template slot="append">W</template>
          </el-input>
        </el-form-item>



        <el-form-item label="流处理器数" prop="gpuProcessor" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入流处理器数"
              v-model.number="editForm.gpuProcessor"
              autocomplete="off">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>

        <el-form-item label="GPU频率" prop="gpuFrequency" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入GPU频率"
              v-model.number="editForm.gpuFrequency"
              autocomplete="off">
            <template slot="append">Mhz</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Boost频率" prop="boostFrequency" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入Boost频率"
              v-model.number="editForm.boostFrequency"
              autocomplete="off">
            <template slot="append">Mhz</template>
          </el-input>
        </el-form-item>


        <el-form-item label="显存速率" prop="gpuMemoryRate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入显存速率"
              v-model.number="editForm.gpuMemoryRate"
              autocomplete="off">
            <template slot="append">Gbps</template>
          </el-input>
        </el-form-item>


        <el-form-item label="显存容量" prop="gpuMemorySize" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              :min="1"
              :max="20"
              placeholder="请输入显存容量"
              v-model.number="editForm.gpuMemorySize"
              autocomplete="off">
            <template slot="append">MB</template>
          </el-input>
        </el-form-item>

        <el-form-item label="显卡制程" prop="gpuSize" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入显卡制程"
              v-model.number="editForm.gpuSize"
              autocomplete="off">
            <template slot="append">nm</template>
          </el-input>
        </el-form-item>


        <el-form-item label="核心面积" prop="gpuArea" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入核心面积"
              v-model.number="editForm.gpuArea"
              autocomplete="off">
            <template slot="append">mm²</template>
          </el-input>
        </el-form-item>
        <el-form-item label="晶体管数量" prop="gpuTransistor" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入晶体管数量"
              v-model.number="editForm.gpuTransistor"
              autocomplete="off">
            <template slot="append">M</template>
          </el-input>
        </el-form-item>
        <el-form-item label="参考价格" prop="gpuPrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入参考价格"
              v-model.number="editForm.gpuPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="gpuDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

          <el-date-picker
              v-model="editForm.gpuDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择发布日期">
          </el-date-picker>

        </el-form-item>

        <el-form-item label="GPU类型" prop="gpuType" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-select v-model="editForm.gpuType" filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显卡评分" prop="gpuIndex" label-width="100px" :rules="[
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入评分"
              v-model.number="editForm.gpuIndex"
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
  name: "GPU",
  title:"显卡信息管理",
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
        value: 'AMD',
        label: 'AMD'
      }, {
        value: 'NVIDIA',
        label: 'NVIDIA'
      }
      ],
      value: '',


      tableData: [],

      editFormRules: {
        gpuName: [
          { required: true, message: '请输入GPU型号', trigger: 'change' }
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
    this.getGpuList()

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
      this.getGpuList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getGpuList()
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

    getGpuList() {
      this.$axios.get("/gpu-detail/list", {
        params: {
          gpuName: this.searchForm.gpuName,
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
          this.$axios.post('/gpu-detail/save',this.editForm
          )
              .then(res => {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getGpuList()
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
          this.$axios.post('/gpu-detail/update',this.editForm)
              .then(res => {

                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getGpuList()
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
      this.$axios.get('/gpu-detail/getById/' + id).then(res => {
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
          ids.push(row.gpuId)
        })
      }

      console.log(ids)

      this.$axios.post("/gpu-detail/delete", ids).then(res => {
        this.current = 1;
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose:() => {
            this.getGpuList()
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
