<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.username"
            placeholder="用户名"
            clearable
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getComputerList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
          <el-button type="danger" slot="reference" :disabled="delBtlStatu">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getComputerList()">刷新</el-button>
      </el-form-item>
    </el-form>


    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        border
        stripe
        :highlight-current-row="true"
        @selection-change="handleSelectionChange"

    >

      <el-table-column
          type="selection"
          width="55"
          align="center">
      </el-table-column>


      <el-table-column
          prop="userName"
          label="用户名"
          width="70"
          align="center"
          fixed>
      </el-table-column>

      <el-table-column
          prop="powerName"
          label="电源型号"
          align="center"
          width="220"
          show-overflow-tooltip>
      </el-table-column>

      <el-table-column
          prop="cpuName"
          label="Cpu型号"
          align="center"
          width="180"
          show-overflow-tooltip>
      </el-table-column>

      <el-table-column
          prop="gpuName"
          label="显卡型号"
          align="center"
          width="180"
          show-overflow-tooltip>
      </el-table-column>

      <el-table-column
          prop="mechHarddiskName"
          label="机械硬盘型号"
          align="center"
          width="260"
          show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
          prop="mechHarddiskNumber"
          label="(数量)"
          align="center"
          width="60"
      >
      </el-table-column>
      <el-table-column
          prop="ssdHarddiskName"
          label="固态硬盘型号"
          align="center"
          width="280"
          show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
          prop="mechHarddiskNumber"
          label="(数量)"
          align="center"
          width="60"
      >
      </el-table-column>
      <el-table-column
          prop="mainboardName"
          label="主板型号"
          align="center"
          width="280"
          show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
          prop="memoryName"
          label="内存型号"
          align="center"
          width="180"
          show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
          prop="memoryNumber"
          label="(数量)"
          align="center"
          width="60"
      >
      </el-table-column>
      <el-table-column
          prop="pccaseName"
          label="机箱型号"
          align="center"
          width="240"
          show-overflow-tooltip
      ></el-table-column>
      <el-table-column
          prop="gameIndex"
          label="游戏评分"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="workIndex"
          label="办公评分"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="advice"
          label="装机建议"
          align="center"
          width="280"
          show-overflow-tooltip
          resizable
      ></el-table-column>
      <el-table-column
          prop="price"
          label="价格"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="created"
          label="创建日期"
          align="center"
          width="250"
      >
        <template slot-scope="scope">
          <el-date-picker
              v-model="scope.row.created"
              type="datetime"
              readonly>
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column
          prop="likes"
          label="点赞数"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="status"
          label="当前状态"
          align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="medium" type="success">可见</el-tag>
          <el-tag v-if="scope.row.status === 0" size="medium" type="warning">不可见</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="icon"
          width="100px"
          label="操作"
          align="center"
          fixed="right">
        <template slot-scope="scope">
          <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
            <el-button type="text" slot="reference">删除</el-button>
          </el-popconfirm>
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


  </div>
</template>

<script>
export default {
  name: "ComputerList",
  title: "配置单管理",
  data() {
    return {
      searchForm: {},
      delBtlStatu: true,

      total: 0,
      size: 10,
      current: 1,


      dialogVisible: false,
      updateVisible: false,


      editForm: {},

      tableData: [],


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
    this.getComputerList()

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
      this.getComputerList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getComputerList()
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose() {
      console.log(this.editForm.roleIds)
      this.resetForm('editForm')
    },

    getComputerList() {
      this.$axios.get("/computer-list/list", {
        params: {
          username: this.searchForm.username,
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

    delHandle(id) {

      var ids = []

      if (id) {
        ids.push(id)
      } else {
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
      }
      this.$axios.post("/computer-list/delete", ids).then(res => {
        this.current = 1;
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose: () => {
            this.getComputerList()
          }
        });
      })
    },

  }
}
</script>

<style scoped>

.el-pagination {
  float: right;
  margin-top: 22px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
