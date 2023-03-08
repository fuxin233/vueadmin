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
        <el-button @click="getCommentList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
          <el-button type="danger" slot="reference" :disabled="delBtlStatu" >批量删除</el-button>
        </el-popconfirm>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getCommentList()">刷新</el-button>
      </el-form-item>
    </el-form>

    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        border
        stripe
        :highlight-current-row = "true"
        @selection-change="handleSelectionChange"

    >

      <el-table-column
          type="selection"
          width="55"
          align="center">
      </el-table-column>


      <el-table-column
          prop="articleId"
          label="文章ID"
          width="70"
          align="center">
      </el-table-column>

      <el-table-column
          prop="articleTitle"
          label="文章标题"
          align="center">
      </el-table-column>

      <el-table-column
          prop="userName"
          label="评论用户"
          align="center">
      </el-table-column>

      <el-table-column
          prop="comment"
          label="评论内容"
          align="center">
      </el-table-column>

      <el-table-column
          prop="created"
          label="评论日期"
          align="center">
        <template slot-scope="scope">
          <el-date-picker
              v-model= "scope.row.created"
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
          prop="icon"
          width="260px"
          label="操作"
          align="center">
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
  name: "Comment",
  title:"评论管理",
  data() {
    return {
      searchForm: {},
      delBtlStatu: true,

      total: 0,
      size: 10,
      current: 1,


      dialogVisible: false,
      updateVisible: false,


      editForm: {
      },

      tableData: [],


      multipleSelection: [],

      roleDialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleForm: {},
      treeCheckedKeys: [],
      checkStrictly: true

    }



  },

  created() {
    this.getCommentList()

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
    },
    handleClose() {
      console.log(this.editForm.roleIds)
      this.resetForm('editForm')
    },

    getCommentList () {
      this.$axios.get("/comment-detail/list", {
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
      this.$axios.post("/comment-detail/delete", ids).then(res => {
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose:() => {
            this.getCommentList()
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
</style>
