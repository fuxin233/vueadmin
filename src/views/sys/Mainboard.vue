<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.mainboardName"
            placeholder="主板型号"
            clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getMainBoardList">搜索</el-button>
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
        <el-button type="primary" @click="getMainBoardList()">刷新</el-button>
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
          prop="mainboardName"
          label="主板型号"
          align="center"
          width="320"
          show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
          prop="mainboardWifi"
          label="是否支持wifi"
          align="center">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.mainboardWifi==1">支持</el-tag>
          <el-tag type="warning" effect="dark" v-if="scope.row.mainboardWifi==0">不支持</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="mainboardMemoryDdr"
          label="支持内存条DDR代数"
          align="center">
        <template slot-scope="scope">
          DDR{{scope.row.mainboardMemoryDdr}}代
        </template>
      </el-table-column>

      <el-table-column
          prop="mainboardMaxMemorySize"
          label="最大内存容量"
          align="center">
        <template slot-scope="scope">
          {{scope.row.mainboardMaxMemorySize}}GB
        </template>
      </el-table-column>



      <el-table-column
          prop="mainboardMaxMemorySocket"
          label="内存插槽"
          align="center">
        <template slot-scope="scope">
          {{scope.row.mainboardMaxMemorySocket}}个
        </template>
      </el-table-column>

      <el-table-column
          prop="mainboardSize"
          label="主板物理规格大小"
          align="center">
        <template slot-scope="scope">
          {{scope.row.mainboardSize}}cm²
        </template>
      </el-table-column>

      <el-table-column
          prop="mainboardChannelSound"
          label="主板声卡声道"
          align="center">
        <template slot-scope="scope">
          {{scope.row.mainboardChannelSound}}声道
        </template>
      </el-table-column>


      <el-table-column
          prop="mainboardSata"
          label="SATA接口数量"
          align="center">
        <template slot-scope="scope">
          {{scope.row.mainboardSata}}个
        </template>
      </el-table-column>

      <el-table-column
          prop="mainboardPcie"
          label="PCIE接口数量"
          align="center">
        <template slot-scope="scope">
          {{scope.row.mainboardPcie}}个
        </template>
      </el-table-column>

      <el-table-column
          prop="mainboardIntelSupport"
          label="支持英特尔CPU"
          align="center">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.mainboardIntelSupport==1">支持</el-tag>
          <el-tag type="warning" effect="dark" v-if="scope.row.mainboardIntelSupport==0">不支持</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="mainboardRyzenSupport"
          label="支持瑞龙CPU"
          align="center">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.mainboardRyzenSupport==1">支持</el-tag>
          <el-tag type="warning" effect="dark" v-if="scope.row.mainboardRyzenSupport==0">不支持</el-tag>
        </template>
      </el-table-column>


      <el-table-column
          prop="mainboardPrice"
          label="参考价格"
          align="center">
        <template slot-scope="scope">
          {{scope.row.mainboardPrice}}元
        </template>
      </el-table-column>

      <el-table-column
          prop="mainboardDate"
          label="发布日期"
          align="center"
          width="250"
      >
        <template slot-scope="scope">
          <el-date-picker
              v-model= "scope.row.mainboardDate"
              type="date"
              readonly>
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column
          prop="mainboardHot"
          label="主板热度"
          align="center">
      </el-table-column>

      <el-table-column
          fixed="right"
          prop="icon"
          label="操作"
          align="center">

        <template slot-scope="scope">

          <el-button type="text" @click="editHandle(scope.row.mainboardId)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.mainboardId)">
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
        title="添加主板"
        :visible.sync="saveVisible"
        width="700px"
        :append-to-body="true"
        top="5vh"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="主板型号" prop="harddiskName" label-width="100px">
          <el-input placeholder="请输入主板型号" v-model="editForm.mainboardName" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="主板类型" prop="mainboardType" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-select v-model="editForm.mainboardType" filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="支持wifi" prop="mainboardWifi" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-radio v-model="editForm.mainboardWifi" :label="1">支持</el-radio>
          <el-radio v-model="editForm.mainboardWifi" :label="0">不支持</el-radio>
        </el-form-item>


        <el-form-item label="DDR代数" prop="mainboardMemoryDdr" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入DDR代数"
              v-model.number="editForm.mainboardMemoryDdr"
              autocomplete="off">
            <template slot="append">代</template>
          </el-input>
        </el-form-item>



        <el-form-item label="内存容量" prop="mainboardMaxMemorySize" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入最大内存容量"
              v-model.number="editForm.mainboardMaxMemorySize"
              autocomplete="off">
            <template slot="append">GB</template>
          </el-input>
        </el-form-item>

        <el-form-item label="内存插槽" prop="mainboardMaxMemorySocket" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入内存插槽数"
              v-model.number="editForm.mainboardMaxMemorySocket"
              autocomplete="off">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>

        <el-form-item label="物理规格" prop="mainboardSize" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入主板物理规格大小"
              v-model.number="editForm.mainboardSize"
              autocomplete="off">
            <template slot="append">cm²</template>
          </el-input>
        </el-form-item>


        <el-form-item label="声卡声道" prop="mainboardChannelSound" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-input
              :controls="false"
              placeholder="请输入板载声卡声道"
              v-model.number="editForm.mainboardChannelSound"
              autocomplete="off">
            <template slot="append">声道</template>
          </el-input>
        </el-form-item>



        <el-form-item label="SATA接口数" prop="mainboardSata" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { required: true, message: '该字段不能为空'},
    ]">
          <el-input
              :controls="false"
              placeholder="请输入SATA接口数"
              v-model.number="editForm.mainboardSata"
              autocomplete="off">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>


        <el-form-item label="PCIE接口数" prop="mainboardPcie" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { required: true, message: '该字段不能为空'},
    ]">
          <el-input
              :controls="false"
              placeholder="请输入PCIE接口数"
              v-model.number="editForm.mainboardPcie"
              autocomplete="off">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>

        <el-form-item label="支持Intel" prop="mainboardIntelSupport" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-radio v-model="editForm.mainboardIntelSupport" :label="1">支持</el-radio>
          <el-radio v-model="editForm.mainboardIntelSupport" :label="0">不支持</el-radio>
        </el-form-item>

        <el-form-item label="支持Ryzen" prop="mainboardRyzenSupport" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-radio v-model="editForm.mainboardRyzenSupport" :label="1">支持</el-radio>
          <el-radio v-model="editForm.mainboardRyzenSupport" :label="0">不支持</el-radio>
        </el-form-item>


        <el-form-item label="参考价格" prop="mainboardPrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入参考价格"
              v-model.number="editForm.mainboardPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="mainboardDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

          <el-date-picker
              v-model="editForm.mainboardDate"
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
        title="更新主板"
        :visible.sync="updateVisible"
        width="600px"
        :append-to-body="true"
        top="5vh"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="主板型号" prop="harddiskName" label-width="100px">
          <el-input placeholder="请输入主板型号" v-model="editForm.mainboardName" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="主板类型" prop="mainboardType" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-select v-model="editForm.mainboardType" filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="支持wifi" prop="mainboardWifi" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-radio v-model="editForm.mainboardWifi" :label="1">支持</el-radio>
          <el-radio v-model="editForm.mainboardWifi" :label="0">不支持</el-radio>
        </el-form-item>


        <el-form-item label="DDR代数" prop="mainboardMemoryDdr" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入DDR代数"
              v-model.number="editForm.mainboardMemoryDdr"
              autocomplete="off">
            <template slot="append">代</template>
          </el-input>
        </el-form-item>



        <el-form-item label="内存容量" prop="mainboardMaxMemorySize" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入最大内存容量"
              v-model.number="editForm.mainboardMaxMemorySize"
              autocomplete="off">
            <template slot="append">GB</template>
          </el-input>
        </el-form-item>

        <el-form-item label="内存插槽" prop="mainboardMaxMemorySocket" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入内存插槽数"
              v-model.number="editForm.mainboardMaxMemorySocket"
              autocomplete="off">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>

        <el-form-item label="物理规格" prop="mainboardSize" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入主板物理规格大小"
              v-model.number="editForm.mainboardSize"
              autocomplete="off">
            <template slot="append">cm²</template>
          </el-input>
        </el-form-item>


        <el-form-item label="声卡声道" prop="mainboardChannelSound" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-input
              :controls="false"
              placeholder="请输入板载声卡声道"
              v-model.number="editForm.mainboardChannelSound"
              autocomplete="off">
            <template slot="append">声道</template>
          </el-input>
        </el-form-item>



        <el-form-item label="SATA接口数" prop="mainboardSata" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { required: true, message: '该字段不能为空'},
    ]">
          <el-input
              :controls="false"
              placeholder="请输入SATA接口数"
              v-model.number="editForm.mainboardSata"
              autocomplete="off">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>


        <el-form-item label="PCIE接口数" prop="mainboardPcie" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { required: true, message: '该字段不能为空'},
    ]">
          <el-input
              :controls="false"
              placeholder="请输入PCIE接口数"
              v-model.number="editForm.mainboardPcie"
              autocomplete="off">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>

        <el-form-item label="支持Intel" prop="mainboardIntelSupport" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-radio v-model="editForm.mainboardIntelSupport" :label="1">支持</el-radio>
          <el-radio v-model="editForm.mainboardIntelSupport" :label="0">不支持</el-radio>
        </el-form-item>

        <el-form-item label="支持Ryzen" prop="mainboardRyzenSupport" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-radio v-model="editForm.mainboardRyzenSupport" :label="1">支持</el-radio>
          <el-radio v-model="editForm.mainboardRyzenSupport" :label="0">不支持</el-radio>
        </el-form-item>


        <el-form-item label="参考价格" prop="mainboardPrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入参考价格"
              v-model.number="editForm.mainboardPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="mainboardDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

          <el-date-picker
              v-model="editForm.mainboardDate"
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
  name: "Mainboard",
  title:"主板信息管理",
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
        value: 'ATX',
        label: 'ATX'
      }, {
        value: 'M-ATX',
        label: 'M-ATX'
      },
        {
          value: 'MINI-ITX',
          label: 'MINI-ITX'
        }
      ],
      value: '',


      tableData: [],

      editFormRules: {
        mainboardName: [
          { required: true, message: '请输入主板型号', trigger: 'change' }
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
    this.getMainBoardList()

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
      this.getMainBoardList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getMainBoardList()
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

    getMainBoardList() {
      this.$axios.get("/mainboard-detail/list", {
        params: {
          mainboardName: this.searchForm.mainboardName,
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
          this.$axios.post('/mainboard-detail/save',this.editForm
          )
              .then(res => {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getMainBoardList()
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
          this.$axios.post('/mainboard-detail/update',this.editForm)
              .then(res => {

                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getMainBoardList()
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
      this.$axios.get('/mainboard-detail/getById/' + id).then(res => {
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
          ids.push(row.mainboardId)
        })
      }

      console.log(ids)

      this.$axios.post("/mainboard-detail/delete", ids).then(res => {
        this.current = 1;
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose:() => {
            this.getMainBoardList()
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
