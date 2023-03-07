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
          prop="gpuId"
          label="显卡ID"
      >
      </el-table-column>
      <el-table-column
          fixed
          width="200"
          prop="gpuName"
          label="显卡型号"
      >
      </el-table-column>

      <el-table-column
          width="120"
          prop="gpuTdp"
          label="显卡TDP功耗">
      </el-table-column>

      <el-table-column
          width="120"
          prop="gpuProcessor"
          label="流处理器数">
      </el-table-column>

      <el-table-column
          width="120"
          prop="gpuFrequency"
          label="GPU频率">
      </el-table-column>

      <el-table-column
          width="120"
          prop="boostFrequency"
          label="Boost频率">
      </el-table-column>

      <el-table-column
          width="120"
          prop="gpuMemoryRate"
          label="显存速率">
      </el-table-column>

      <el-table-column
          width="120"
          prop="gpuMemorySize"
          label="显存容量">
      </el-table-column>


      <el-table-column
          width="120"
          prop="gpuSize"
          label="显卡制程(工艺)">
      </el-table-column>

      <el-table-column
          width="120"
          prop="gpuArea"
          label="核心面积">
      </el-table-column>

      <el-table-column
          width="120"
          prop="gpuTransistor"
          label="晶体管数量">
      </el-table-column>

      <el-table-column
          width="120"
          prop="gpuPrice"
          label="价格">
      </el-table-column>

      <el-table-column
          width="150"
          prop="gpuDate"
          label="发布日期">
      </el-table-column>

      <el-table-column
          width="120"
          prop="gpuType"
          label="Nvdia/Amd">
      </el-table-column>


      <el-table-column
          width="120"
          prop="gpuIndex"
          label="显卡评分">
      </el-table-column>

      <el-table-column
          fixed="right"
          prop="icon"
          width="260px"
          label="操作">

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
        title="添加显卡"
        :visible.sync="saveVisible"
        width="600px"
        :before-close="handleClose">


      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="显卡型号" prop="gpuName" label-width="100px">
          <el-input placeholder="请输入显卡型号" v-model="editForm.gpuName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="显卡TDP功耗" prop="gpuTdp" label-width="100px">
          <el-input
              :controls="false"
              maxlength="8"
              placeholder="请输入显卡TDP功耗"
              v-model="editForm.gpuTdp"
              autocomplete="off">
            <template slot="append">W</template>
          </el-input>
        </el-form-item>



        <el-form-item label="流处理器数" prop="gpuProcessor" label-width="100px">
          <el-input
              :controls="false"
              maxlength="8"
              placeholder="请输入流处理器数"
              v-model="editForm.gpuProcessor"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="GPU频率" prop="gpuFrequency" label-width="100px">
          <el-input
              :controls="false"
              maxlength="8"
              placeholder="请输入GPU频率"
              v-model="editForm.gpuFrequency"
              autocomplete="off">
            <template slot="append">MHz</template>
          </el-input>
        </el-form-item>

        <el-form-item label="Boost频率" prop="boostFrequency" label-width="100px">
          <el-input
              :controls="false"
              maxlength="8"
              placeholder="请输入Boost频率"
              v-model="editForm.boostFrequency"
              autocomplete="off">
            <template slot="append">MHZ</template>
          </el-input>
        </el-form-item>

        <el-form-item label="显存速率" prop="gpuMemoryRate" label-width="100px">
          <el-input
              :controls="false"
              maxlength="8"
              placeholder="请输入显存速率"
              v-model="editForm.gpuMemoryRate"
              autocomplete="off">
            <template slot="append">Gbps</template>
          </el-input>

        </el-form-item>

        <el-form-item label="显存容量" prop="gpuMemorySize" label-width="100px">
          <el-input
              :controls="false"
              maxlength="8"
              placeholder="请输入显存容量"
              v-model="editForm.gpuMemorySize"
              autocomplete="off">
            <template slot="append">MB</template>
          </el-input>
        </el-form-item>


        <el-form-item label="显卡制程" prop="gpuSize" label-width="100px">
          <el-input
              :controls="false"
              :min="1"
              :max="20"
              maxlength="2"
              placeholder="请输入显卡制程"
              v-model="editForm.gpuSize"
              autocomplete="off">
            <template slot="append">nm</template>
          </el-input>
        </el-form-item>

        <el-form-item label="核心面积" prop="gpuArea" label-width="100px">
          <el-input
              :controls="false"
              maxlength="4"
              placeholder="请输入核心面积"
              v-model="editForm.gpuArea"
              autocomplete="off">
            <template slot="append">mm²</template>
          </el-input>
        </el-form-item>



        <el-form-item label="晶体管数量" prop="gpuTransistor" label-width="100px">
          <el-input
              :controls="false"
              maxlength="4"
              placeholder="请输入晶体管数量"
              v-model="editForm.gpuTransistor"
              autocomplete="off">
            <template slot="append">M</template>
          </el-input>
        </el-form-item>

        <el-form-item label="价格" prop="gpuPrice" label-width="100px">
          <el-input
              :controls="false"
              maxlength="4"
              placeholder="请输入价格"
              v-model="editForm.gpuPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="leaveTime" label-width="100px">

          <el-date-picker
              v-model="editForm.gpuDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择发布日期">
          </el-date-picker>

        </el-form-item>

        <el-form-item label="Nvdia/Amd" prop="gpuType" label-width="100px">
          <el-select v-model="editForm.gpuType" filterable placeholder="请选择">
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
        <el-form-item label="显卡型号" prop="gpuName" label-width="100px">
          <el-input placeholder="请输入显卡型号" v-model="editForm.gpuName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="显卡TDP功耗" prop="gpuTdp" label-width="100px">
          <el-input
              :controls="false"
              maxlength="10"
              placeholder="请输入显卡TDP功耗"
              v-model="editForm.gpuTdp"
              autocomplete="off">
          </el-input>
        </el-form-item>



        <el-form-item label="流处理器数" prop="gpuProcessor" label-width="100px">
          <el-input
              :controls="false"
              maxlength="8"
              placeholder="请输入流处理器数"
              v-model="editForm.gpuProcessor"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="GPU频率" prop="gpuFrequency" label-width="100px">
          <el-input
              :controls="false"
              maxlength="10"
              placeholder="请输入GPU频率"
              v-model="editForm.gpuFrequency"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="Boost频率" prop="boostFrequency" label-width="100px">
          <el-input
              :controls="false"
              maxlength="10"
              placeholder="请输入Boost频率"
              v-model="editForm.boostFrequency"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="显存速率" prop="gpuMemoryRate" label-width="100px">
          <el-input
              :controls="false"
              maxlength="10"
              placeholder="请输入显存速率"
              v-model="editForm.gpuMemoryRate"
              autocomplete="off">
          </el-input>

        </el-form-item>

        <el-form-item label="显存容量" prop="gpuMemorySize" label-width="100px">
          <el-input
              :controls="false"
              maxlength="10"
              placeholder="请输入显存容量"
              v-model="editForm.gpuMemorySize"
              autocomplete="off">
          </el-input>
        </el-form-item>


        <el-form-item label="显卡制程" prop="gpuSize" label-width="100px">
          <el-input
              :controls="false"
              :min="1"
              :max="20"
              maxlength="5"
              placeholder="请输入显卡制程"
              v-model="editForm.gpuSize"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="核心面积" prop="gpuArea" label-width="100px">
          <el-input
              :controls="false"
              maxlength="8"
              placeholder="请输入核心面积"
              v-model="editForm.gpuArea"
              autocomplete="off">
          </el-input>
        </el-form-item>



        <el-form-item label="晶体管数量" prop="gpuTransistor" label-width="100px">
          <el-input
              :controls="false"
              maxlength="5"
              placeholder="请输入晶体管数量"
              v-model="editForm.gpuTransistor"
              autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="价格" prop="gpuPrice" label-width="100px">
          <el-input
              :controls="false"
              maxlength="6"
              placeholder="请输入价格"
              v-model="editForm.gpuPrice"
              autocomplete="off">

          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="leaveTime" label-width="100px">

          <el-date-picker
              v-model="editForm.gpuDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择发布日期">
          </el-date-picker>

        </el-form-item>

        <el-form-item label="Nvdia/Amd" prop="gpuType" label-width="100px">
          <el-select v-model="editForm.gpuType" filterable placeholder="请选择">
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
        <el-button type="primary" @click="updateForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "GPU",
  title:"GPU信息管理",
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

      imageUrl: '',

      saveVisible: false,
      updateVisible: false,

      editForm: {

      },
        //选择框
        options: [{
          value: 'Nvdia',
          label: 'Nvdia'
        }, {
          value: 'Amd',
          label: 'Amd'
        }
        ],
        value: '',


      tableData: [],

      editFormRules: {
        gpuName: [
          { required: true, message: '请输入内存型号', trigger: 'blur' }
        ],
        gpuTdp: [
          { validator: validateValue, trigger: 'blur' },
        ],
        gpuProcessor: [
          { validator: validateValue, trigger: 'blur' },
        ],
        gpuFrequency: [
          { validator: validateValue, trigger: 'blur' },
        ],
        boostFrequency: [
          { validator: validateValue, trigger: 'blur' },
        ],
        gpuMemoryRate: [
          { validator: validateValue, trigger: 'blur' },
        ],
        gpuMemorySize: [
          { validator: validateValue, trigger: 'blur' },
        ],
        gpuSize: [
          { validator: validateValue, trigger: 'blur' },
        ],
        gpuArea: [
          { validator: validateValue, trigger: 'blur' },
        ],
        gpuTransistor: [
          { validator: validateValue, trigger: 'blur' },
        ],
        gpuPrice: [
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

    this.$axios.get("/sys/gpu/list").then(res => {
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
      this.$axios.get("/sys/gpu/list", {
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
      this.editForm.image =this.imageUrl;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/sys/gpu/save',
              {
                gpuId:this.editForm.gpuId,
                gpuName:this.editForm.gpuName,
                gpuTdp:this.editForm.gpuTdp+' W',
                gpuProcessor:this.editForm.gpuProcessor,
                gpuFrequency:this.editForm.gpuFrequency+' MHZ',
                boostFrequency:this.editForm.boostFrequency + ' MHz',
                gpuMemoryRate:this.editForm.gpuMemoryRate + ' Gbps',
                gpuMemorySize:this.editForm.gpuMemorySize + ' MB',
                gpuSize:this.editForm.gpuSize+' nm',
                gpuArea:this.editForm.gpuArea+' mm²',
                gpuTransistor:this.editForm.gpuTransistor+' M',
                gpuPrice:this.editForm.gpuPrice+' 元',
                gpuDate:this.editForm.gpuDate,
                gpuType:this.editForm.gpuType,
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
          this.$axios.post('/sys/gpu/update',this.editForm)
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
      this.$axios.get('/sys/gpu/info/' + id).then(res => {
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

      this.$axios.post("/sys/gpu/delete", ids).then(res => {
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
