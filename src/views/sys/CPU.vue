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
          prop="cpuId"
          label="CPU ID"
      >
      </el-table-column>
      <el-table-column
          fixed
          width="200"
          prop="cpuName"
          label="CPU型号"
      >
      </el-table-column>

      <el-table-column
          width="120"
          prop="cpuFrequency"
          label="基础频率">
      </el-table-column>

      <el-table-column
          width="120"
          prop="cpuMaxFrequency"
          label="最大睿频">
      </el-table-column>

      <el-table-column
          width="120"
          prop="cpuCoreThread"
          label="核心/线程">
      </el-table-column>

      <el-table-column
          width="120"
          prop="cpuCache"
          label="缓存">
      </el-table-column>

      <el-table-column
          width="120"
          prop="cpuSize"
          label="制程">
      </el-table-column>

      <el-table-column
          width="120"
          prop="cpuTdp"
          label="TDP">
      </el-table-column>


      <el-table-column
          width="120"
          prop="cpuType"
          label="CPU类型">
      </el-table-column>


      <el-table-column
          width="120"
          prop="cpuPrice"
          label="价格">
      </el-table-column>

      <el-table-column
          width="150"
          prop="cpuDate"
          label="发布日期">
      </el-table-column>

      <el-table-column
          width="120"
          prop="cpuIndex"
          label="显卡评分">
      </el-table-column>

      <el-table-column
          fixed="right"
          prop="icon"
          width="260px"
          label="操作">

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
        title="添加显卡"
        :visible.sync="saveVisible"
        width="600px"
        :before-close="handleClose">


      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="显卡型号" prop="cpuName" label-width="100px">
          <el-input placeholder="请输入显卡型号" v-model="editForm.cpuName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="基础频率" prop="cpuFrequency" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入基础频率"
              v-model="editForm.cpuFrequency"
              autocomplete="off">
            <template slot="append">MHZ</template>
          </el-input>
        </el-form-item>



        <el-form-item label="最大睿频" prop="cpuMaxFrequency" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入最大睿频"
              v-model="editForm.cpuMaxFrequency"
              autocomplete="off">
            <template slot="append">MHZ</template>
          </el-input>
        </el-form-item>

        <el-form-item label="核心/线程" prop="cpuCoreThread" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入核心"
              v-model="editForm.cpuCore"
              autocomplete="off">
            <template slot="append">C</template>
          </el-input>
          <div style="margin: 20px 0;"></div>
          <el-input
              :controls="false"
              placeholder="请输入线程"
              v-model="editForm.cpuThread"
              autocomplete="off">
            <template slot="append">T</template>
          </el-input>
        </el-form-item>

        <el-form-item label="缓存" prop="cpuCache" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入缓存"
              v-model="editForm.cpuCache"
              autocomplete="off">
            <template slot="append">MB</template>
          </el-input>
        </el-form-item>


        <el-form-item label="制程" prop="cpuSize" label-width="100px">
          <el-input
              :controls="false"
              :min="1"
              :max="20"
              placeholder="请输入制程"
              v-model="editForm.cpuSize"
              autocomplete="off">
            <template slot="append">nm</template>
          </el-input>
        </el-form-item>

        <el-form-item label="TDP" prop="cpuTdp" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入TDP"
              v-model="editForm.cpuTdp"
              autocomplete="off">
            <template slot="append">W</template>
          </el-input>
        </el-form-item>


        <el-form-item label="价格" prop="cpuPrice" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入价格"
              v-model="editForm.cpuPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="leaveTime" label-width="100px">

          <el-date-picker
              v-model="editForm.cpuDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择发布日期">
          </el-date-picker>

        </el-form-item>

        <el-form-item label="CPU类型" prop="cpuType" label-width="100px">
          <el-select v-model="editForm.cpuType" filterable placeholder="请选择">
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


      <el-form :model="editForm" ref="editForm">
        <el-form-item label="显卡型号" prop="cpuName" label-width="100px">
          <el-input placeholder="请输入显卡型号" v-model="editForm.cpuName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="基础频率" prop="cpuFrequency" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入基础频率"
              v-model="editForm.cpuFrequency"
              autocomplete="off">
            <template slot="append">MHZ</template>
          </el-input>
        </el-form-item>



        <el-form-item label="最大睿频" prop="cpuMaxFrequency" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入最大睿频"
              v-model="editForm.cpuMaxFrequency"
              autocomplete="off">
            <template slot="append">MHZ</template>
          </el-input>
        </el-form-item>

        <el-form-item label="核心/线程" prop="cpuCoreThread" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入核心/线程(32C/24T)"
              v-model="editForm.cpuCoreThread"
              autocomplete="off">
            <template slot="append">Gbps</template>
          </el-input>

        </el-form-item>

        <el-form-item label="缓存" prop="cpuCache" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入缓存"
              v-model="editForm.cpuCache"
              autocomplete="off">
            <template slot="append">MB</template>
          </el-input>
        </el-form-item>


        <el-form-item label="制程" prop="cpuSize" label-width="100px">
          <el-input
              :controls="false"

              :min="1"
              :max="20"
              maxlength="2"
              placeholder="请输入制程"
              v-model="editForm.cpuSize"
              autocomplete="off">
            <template slot="append">nm</template>
          </el-input>
        </el-form-item>

        <el-form-item label="TDP" prop="cpuTdp" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入TDP"
              v-model="editForm.cpuTdp"
              autocomplete="off">
            <template slot="append">W</template>
          </el-input>
        </el-form-item>


        <el-form-item label="价格" prop="cpuPrice" label-width="100px">
          <el-input
              :controls="false"
              placeholder="请输入价格"
              v-model="editForm.cpuPrice"
              autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>


        <el-form-item label="发布时间" prop="leaveTime" label-width="100px">

          <el-date-picker
              v-model="editForm.cpuDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择发布日期">
          </el-date-picker>

        </el-form-item>

        <el-form-item label="CPU类型" prop="cpuType" label-width="100px">
          <el-select v-model="editForm.cpuType" filterable placeholder="请选择">
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
  name: "CPU",
  title:"CPU信息管理",
  data() {
    var validateValue = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入CPU信息'));
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
        cpuName: [
          { required: true, message: '请输入CPU型号', trigger: 'blur' }
        ],
        cpuFrequency: [
          { validator: validateValue, trigger: 'blur' },
        ],
        cpuMaxFrequency: [
          { validator: validateValue, trigger: 'blur' },
        ],
        cpuCore: [
          { validator: validateValue, trigger: 'blur' },
        ],
        cpuThread: [
          { validator: validateValue, trigger: 'blur' },
        ],
        cpuCache: [
          { validator: validateValue, trigger: 'blur' },
        ],
        cpuSize: [
          { validator: validateValue, trigger: 'blur' },
        ],
        cpuTdp: [
          { validator: validateValue, trigger: 'blur' },
        ],
        cpuPrice: [
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

    this.$axios.get("/sys/cpu-multi/list").then(res => {
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
      this.$axios.get("/sys/cpu-multi/list", {
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
      this.editForm.image =this.imageUrl;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/sys/cpu-multi/save',
              {
                cpuId:this.editForm.cpuId,
                cpuName:this.editForm.cpuName,
                cpuFrequency:this.editForm.cpuFrequency+' MHZ',
                cpuMaxFrequency:this.editForm.cpuMaxFrequency + ' MHz',
                cpuCoreThread:this.editForm.cpuCore+'C/'+this.editForm.cpuThread+'T',
                cpuCache:this.editForm.cpuCache,
                cpuSize:this.editForm.cpuSize+' nm',
                cpuTdp:this.editForm.cpuTdp+' W',
                cpuPrice:this.editForm.cpuPrice+' 元',
                cpuDate:this.editForm.cpuDate,
                cpuType:this.editForm.cpuType,
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
          this.$axios.post('/sys/cpu-multi/update',this.editForm)
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
      this.$axios.get('/sys/cpu-multi/info/' + id).then(res => {
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

      this.$axios.post("/sys/cpu-multi/delete", ids).then(res => {
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
