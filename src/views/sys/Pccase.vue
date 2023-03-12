<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.pccaseName"
            placeholder="机箱型号"
            clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getPccaseList">搜索</el-button>
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
        <el-button type="primary" @click="getPccaseList()">刷新</el-button>
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
          prop="pccaseName"
          label="机箱型号"
          align="center"
          width="320"
          show-overflow-tooltip
      >
      </el-table-column>


      <el-table-column
          prop="pccaseWeight"
          label="机箱重量"
          align="center">
        <template slot-scope="scope">
          {{scope.row.pccaseWeight}}Kg
        </template>
      </el-table-column>


      <el-table-column
          prop="pccaseImg"
          label="机箱照片"
          align="center">
        <template slot-scope="scope">
          <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.pccaseImg"
              fit="fill">

          </el-image>
        </template>
      </el-table-column>


      <el-table-column
          prop="pccaseHarddiskPcie"
          label="机箱固态硬盘位"
          align="center">
        <template slot-scope="scope">
          {{scope.row.pccaseHarddiskPcie}}个
        </template>
      </el-table-column>



      <el-table-column
          prop="pccaseHarddiskSata"
          label="机箱机械硬盘位"
          align="center">
        <template slot-scope="scope">
          {{scope.row.pccaseHarddiskSata}}个
        </template>
      </el-table-column>

      <el-table-column
          prop="pccaseSupportAtx"
          label="机箱是否支持ATX"
          align="center">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.pccaseSupportAtx==1">支持</el-tag>
          <el-tag type="warning" effect="dark" v-if="scope.row.pccaseSupportAtx==0">不支持</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="pccaseSupportAtx"
          label="机箱是否支持M-ATX"
          align="center">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.pccaseSupportMAtx==1">支持</el-tag>
          <el-tag type="warning" effect="dark" v-if="scope.row.pccaseSupportMAtx==0">不支持</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="pccaseSupportAtx"
          label="机箱是否支持MINI-ATX"
          align="center">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.pccaseSupportMiniAtx==1">支持</el-tag>
          <el-tag type="warning" effect="dark" v-if="scope.row.pccaseSupportMiniAtx==0">不支持</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="pccasePrice"
          label="参考价格"
          align="center">
        <template slot-scope="scope">
          {{scope.row.pccasePrice}}元
        </template>
      </el-table-column>

      <el-table-column
          prop="pccaseDate"
          label="发布日期"
          align="center"
          width="250"
      >
        <template slot-scope="scope">
          <el-date-picker
              v-model= "scope.row.pccaseDate"
              type="date"
              readonly>
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column
          prop="pccaseHot"
          label="机箱热度"
          align="center">
      </el-table-column>

      <el-table-column
          fixed="right"
          prop="icon"
          label="操作"
          align="center">

        <template slot-scope="scope">

          <el-button type="text" @click="editHandle(scope.row.pccaseId)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.pccaseId)">
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
        title="添加机箱"
        :visible.sync="saveVisible"
        width="700px"
        :append-to-body="true"
        top="5vh"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="机箱型号" prop="pccaseName" label-width="100px">
          <el-input placeholder="请输入机箱型号" v-model="editForm.pccaseName" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="机箱重量" prop="pccaseWeight" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入机箱重量"
              v-model.number="editForm.pccaseWeight"
              autocomplete="off">
            <template slot="append">Kg</template>
          </el-input>
        </el-form-item>


        <el-form-item label="机箱照片" prop="pccaseImg" label-width="100px">
          <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:8081/pccase-detail/saveImg"
              :show-file-list="false"
              :multiple="false"
              :on-success="handleImgSuccess"
              :before-upload="beforeImgUpload"
              name="file">
            <el-image v-if="editForm.pccaseImg" :src="editForm.pccaseImg" style="width: 100px;height: 100px" ></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>



        <el-form-item label="固态硬盘位" prop="pccaseHarddiskPcie" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入机箱固态硬盘位"
              v-model.number="editForm.pccaseHarddiskPcie"
              autocomplete="off">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>


        <el-form-item label="机械硬盘位" prop="pccaseHarddiskSata" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入机箱机械硬盘位"
              v-model.number="editForm.pccaseHarddiskSata"
              autocomplete="off">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>


        <el-form-item label="ATX" prop="pccaseSupportAtx" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-radio v-model="editForm.pccaseSupportAtx" :label="1">支持</el-radio>
          <el-radio v-model="editForm.pccaseSupportAtx" :label="0">不支持</el-radio>
        </el-form-item>


        <el-form-item label="M-ATX" prop="pccaseSupportMAtx" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-radio v-model="editForm.pccaseSupportMAtx" :label="1">支持</el-radio>
          <el-radio v-model="editForm.pccaseSupportMAtx" :label="0">不支持</el-radio>
        </el-form-item>


        <el-form-item label="MINI-ATX" prop="pccaseSupportMiniAtx" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-radio v-model="editForm.pccaseSupportMiniAtx" :label="1">支持</el-radio>
          <el-radio v-model="editForm.pccaseSupportMiniAtx" :label="0">不支持</el-radio>
        </el-form-item>


        <el-form-item label="参考价格" prop="pccasePrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入参考价格"
              v-model.number="editForm.pccasePrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="pccaseDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

          <el-date-picker
              v-model="editForm.pccaseDate"
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
        top="5vh"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="机箱型号" prop="pccaseName" label-width="100px">
          <el-input placeholder="请输入机箱型号" v-model="editForm.pccaseName" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="机箱重量" prop="pccaseWeight" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入机箱重量"
              v-model.number="editForm.pccaseWeight"
              autocomplete="off">
            <template slot="append">Kg</template>
          </el-input>
        </el-form-item>


        <el-form-item label="机箱照片" prop="pccaseImg" label-width="100px">
          <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:8081/pccase-detail/saveImg"
              :show-file-list="false"
              :multiple="false"
              :on-success="handleImgSuccess"
              :before-upload="beforeImgUpload"
              name="file">
            <el-image v-if="editForm.pccaseImg" :src="editForm.pccaseImg" style="width: 100px;height: 100px" ></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>



        <el-form-item label="固态硬盘位" prop="pccaseHarddiskPcie" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入机箱固态硬盘位"
              v-model.number="editForm.pccaseHarddiskPcie"
              autocomplete="off">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>


        <el-form-item label="机械硬盘位" prop="pccaseHarddiskSata" label-width="100px"
                      :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入机箱机械硬盘位"
              v-model.number="editForm.pccaseHarddiskSata"
              autocomplete="off">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>


        <el-form-item label="ATX" prop="pccaseSupportAtx" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-radio v-model="editForm.pccaseSupportAtx" :label="1">支持</el-radio>
          <el-radio v-model="editForm.pccaseSupportAtx" :label="0">不支持</el-radio>
        </el-form-item>


        <el-form-item label="M-ATX" prop="pccaseSupportMAtx" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-radio v-model="editForm.pccaseSupportMAtx" :label="1">支持</el-radio>
          <el-radio v-model="editForm.pccaseSupportMAtx" :label="0">不支持</el-radio>
        </el-form-item>


        <el-form-item label="MINI-ATX" prop="pccaseSupportMiniAtx" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">
          <el-radio v-model="editForm.pccaseSupportMiniAtx" :label="1">支持</el-radio>
          <el-radio v-model="editForm.pccaseSupportMiniAtx" :label="0">不支持</el-radio>
        </el-form-item>


        <el-form-item label="参考价格" prop="pccasePrice" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
          <el-input
              :controls="false"
              placeholder="请输入参考价格"
              v-model.number="editForm.pccasePrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="pccaseDate" label-width="100px" :rules="[
      { required: true, message: '该字段不能为空'},
    ]">

          <el-date-picker
              v-model="editForm.pccaseDate"
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
  name: "Pccase",
  title:"机箱信息管理",
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
        pccaseImg:''
      },

      value: '',


      tableData: [],

      editFormRules: {
        pccaseName: [
          { required: true, message: '请输入主板型号', trigger: 'change' }
        ]


      },

      multipleSelection: [],

      roleDialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeCheckedKeys: [],
      checkStrictly: true
    }

  },
  created() {
    this.getPccaseList()

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
      this.getPccaseList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getPccaseList()
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.updateVisible = false
      this.saveVisible=false
      this.editForm = {
        pccaseImg:''
      }
      this.total = 0
      this.size = 10
      this.current = 1

    },
    handleClose() {
      this.resetForm('editForm')
    },

    getPccaseList() {
      this.$axios.get("/pccase-detail/list", {
        params: {
          pccaseName: this.searchForm.pccaseName,
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
          this.$axios.post('/pccase-detail/save',this.editForm
          )
              .then(res => {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getPccaseList()
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
          this.$axios.post('/pccase-detail/update',this.editForm)
              .then(res => {

                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getPccaseList()
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
      this.$axios.get('/pccase-detail/getById/' + id).then(res => {
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
          ids.push(row.pccaseId)
        })
      }
      this.$axios.post("/pccase-detail/delete", ids).then(res => {
        this.current = 1;
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose:() => {
            this.getPccaseList()
          }
        });
      })
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
      this.editForm.pccaseImg = res.data.filePath
    }


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
