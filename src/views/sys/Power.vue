<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.atxName"
            placeholder="电源型号"
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
          prop="atxId"
          label="电源ID"
      >
      </el-table-column>
      <el-table-column
          fixed
          width="200"
          prop="atxName"
          label="电源型号"
      >
      </el-table-column>

      <el-table-column
          width="120"
          prop="atxPower"
          label="额定功率">
      </el-table-column>


      <el-table-column
          width="120"
          prop="atxStructure"
          label="基本结构">
      </el-table-column>

      <el-table-column
          width="120"
          prop="atxType"
          label="电源类型">
      </el-table-column>

      <el-table-column
          width="120"
          prop="atxVoltage"
          label="电压范围">
      </el-table-column>


      <el-table-column
          width="120"
          prop="atxWire"
          label="线材种类">
      </el-table-column>

      <el-table-column
          width="120"
          prop="atxWarranty"
          label="质保年限">
      </el-table-column>


      <el-table-column
          width="120"
          prop="atxPrice"
          label="价格">
      </el-table-column>

      <el-table-column
          width="150"
          prop="atxDate"
          label="发布日期">
      </el-table-column>

      <el-table-column
          width="120"
          prop="atxIndex"
          label="电源评分">
      </el-table-column>

      <el-table-column
          fixed="right"
          prop="icon"
          width="260px"
          label="操作">

        <template slot-scope="scope">

          <el-button type="text" @click="editHandle(scope.row.atxId)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.atxId)">
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
        title="添加电源信息"
        :visible.sync="saveVisible"
        width="600px"
        :before-close="handleClose">


      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="电源型号" prop="atxName" label-width="100px">
          <el-input placeholder="请输入电源型号" v-model="editForm.atxName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="额定功率" prop="atxPower" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入额定功率"
              v-model="editForm.atxPower"
              autocomplete="off">
            <template slot="append">W</template>
          </el-input>
        </el-form-item>



        <el-form-item label="基本结构" prop="atxStructure" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入基本结构"
              v-model="editForm.atxStructure"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="电源类型" prop="atxType" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入电源类型"
              v-model="editForm.atxType"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="电压范围" prop="atxVoltage" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入电压范围(格式110~120V)"
              v-model="editForm.atxVoltage"
              autocomplete="off">
          </el-input>
        </el-form-item>


        <el-form-item label="线材种类" prop="atxWire" label-width="100px">
          <el-input
              :controls="false"
              :min="1"
              :max="20"
              placeholder="线材种类"
              v-model="editForm.atxWire"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="质保年限" prop="atxWarranty" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入质保年限"
              v-model="editForm.atxWarranty"
              autocomplete="off">
            <template slot="append">年</template>
          </el-input>
        </el-form-item>


        <el-form-item label="价格" prop="atxPrice" label-width="100px">
          <el-input
              :controls="false"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              placeholder="请输入价格"
              v-model="editForm.atxPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="leaveTime" label-width="100px">

          <el-date-picker
              v-model="editForm.atxDate"
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
        title="更新电源信息"
        :visible.sync="updateVisible"
        width="600px"
        :before-close="handleClose">


      <el-form :model="editForm"  ref="editForm">
        <el-form-item label="电源型号" prop="atxName" label-width="100px">
          <el-input placeholder="请输入电源型号" v-model="editForm.atxName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="额定功率" prop="atxPower" label-width="100px">
          <el-input
              :controls="false"
              oninput="value=value.replace(/[^\d.]/g,'')"
              placeholder="请输入额定功率"
              v-model="editForm.atxPower"
              autocomplete="off">
            <template slot="append">W</template>
          </el-input>
        </el-form-item>



        <el-form-item label="基本结构" prop="atxStructure" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入基本结构"
              v-model="editForm.atxStructure"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="电源类型" prop="atxType" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入电源类型"
              v-model="editForm.atxType"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="电压范围" prop="atxVoltage" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入电压范围(格式110~120V)"
              v-model="editForm.atxVoltage"
              autocomplete="off">
          </el-input>
        </el-form-item>


        <el-form-item label="线材种类" prop="atxWire" label-width="100px">
          <el-input
              :controls="false"
              :min="1"
              :max="20"
              placeholder="线材种类"
              v-model="editForm.atxWire"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="质保年限" prop="atxWarranty" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入质保年限"
              v-model="editForm.atxWarranty"
              autocomplete="off">
            <template slot="append">年</template>
          </el-input>
        </el-form-item>


        <el-form-item label="价格" prop="atxPrice" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入价格"
              v-model="editForm.atxPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="leaveTime" label-width="100px">

          <el-date-picker
              v-model="editForm.atxDate"
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
    var validateValue = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电源信息'));
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

      imageUrl: '',

      saveVisible: false,
      updateVisible: false,

      editForm: {

      },
      //选择框
      options: [{
        value: 'Ryzen',
        label: 'Ryzen'
      }, {
        value: 'Core',
        label: 'Core'
      }
      ],
      value: '',


      tableData: [],

      editFormRules: {
        atxName: [
          { required: true, message: '请输入电源型号', trigger: 'blur' }
        ],
        atxPower: [
          { validator: validateValue, trigger: 'blur' },
        ],
        atxWarranty: [
          { validator: validateValue, trigger: 'blur' },
        ],
        atxPrice: [
          { validator: validateValue, trigger: 'blur' },
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

    this.$axios.get("/sys/atx/list").then(res => {
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
      this.$axios.get("/sys/atx/list", {
        params: {
          atxName: this.searchForm.atxName,
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
          this.$axios.post('/sys/atx/save',
              {
                atxId:this.editForm.atxId,
                atxName:this.editForm.atxName,
                atxPower:this.editForm.atxPower,
                atxStructure:this.editForm.atxStructure,
                atxType:this.editForm.atxType,
                atxVoltage:this.editForm.atxVoltage,
                atxWire:this.editForm.atxWire+' MHZ',
                atxWarranty:this.editForm.atxWarranty+'年',
                atxPrice:this.editForm.atxPrice,
                atxDate:this.editForm.atxDate,



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
          this.$axios.post('/sys/atx/update',this.editForm)
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
      this.$axios.get('/sys/atx/info/' + id).then(res => {
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
          ids.push(row.atxId)
        })
      }

      console.log(ids)

      this.$axios.post("/sys/atx/delete", ids).then(res => {
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
