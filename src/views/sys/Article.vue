<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.title"
            placeholder="文章名"
            clearable
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getArticleList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true" >添加文章</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
          <el-button type="danger" slot="reference" :disabled="delBtlStatu" >批量删除</el-button>
        </el-popconfirm>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getArticleList">刷新</el-button>
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
          prop="userName"
          label="作者"
          align="center"
          >
      </el-table-column>

      <el-table-column
          prop="title"
          label="标题"
          align="center"
          >
      </el-table-column>


      <el-table-column
          prop="created"
          label="创建日期"
          align="center"
          >
        <template slot-scope="scope">
          <el-date-picker
              v-model= "scope.row.created"
              type="datetime"
              readonly>
          </el-date-picker>
        </template>
      </el-table-column>


      <el-table-column
          prop="locked"
          label="文章状态"
          align="center"
          >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.locked === 1" size="medium" type="success">可见</el-tag>
          <el-tag v-if="scope.row.locked === 0" size="medium" type="warning">不可见</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="icon"
          align="center"
          label="操作"
      width="200">

        <template slot-scope="scope">

          <el-button type="text" @click="editHandle(scope.row.id)">更改状态</el-button>
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
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
        title="撰写文章"
        :visible.sync="dialogVisible"
        width="80%"
        :fullscreen="true"
        :before-close="handleClose"
        :append-to-body="true">


      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="文章标题" prop="title" label-width="100px">
          <el-input placeholder="请输入标题" v-model="editForm.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content" label-width="100px" style="height: 700px">
          <editor  @contentData="saveArticle($event)" style="height: 700px"></editor>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="resetForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>


    <!--更改对话框-->

    <el-dialog
        title="撰写文章"
        :visible.sync="updateVisible"
        width="80%"
        :fullscreen="true"
        :before-close="handleClose"
        :append-to-body="true">


      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="文章标题" prop="title" label-width="100px">
          <el-input placeholder="请输入标题" v-model="editForm.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content" label-width="100px" style="height: 700px">
          <div class="ql-container ql-snow">
            <div class="ql-editor" v-html="editForm.content"></div>
          </div>
        </el-form-item>

        <el-form-item label="文章状态" prop="locked" label-width="100px" style="height: 700px">
          <el-radio v-model="editForm.locked" :label="1">可见</el-radio>
          <el-radio v-model="editForm.locked" :label="0">不可见</el-radio>
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
import editor from "../inc/Editor"

export default {
  name: "Article",
  title:"文章管理",
  components: {
    editor
  },
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
        title:"",
        content:""
      },

      tableData: [],

      editFormRules: {
        title:[
          { required: true, message: '请输入标题', trigger: 'blur' },
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
    this.getArticleList()
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
      this.getArticleList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getArticleList()
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.updateVisible=false
      this.editForm = {
        title:"",
        content:""
      }
      this.disable = false;

    },
    handleClose() {
      this.resetForm('editForm')
      console.log(this.editForm);
    },

    getArticleList() {
      this.$axios.get("/article-detail/list", {
        params: {
          title: this.searchForm.title,
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

    submitForm(formName) {
      console.log(this.editForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/article-detail/save/', this.editForm)
              .then(res => {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getArticleList()
                  }
                });
                this.resetForm(formName)
                this.dialogVisible = false
                location.reload()
              })
        } else {
          console.log('error submit!!');
          this.dialogVisible = true
          return false;
        }
      });
    },

    saveArticle (data) {
      this.editForm.content = data
    },
    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/article-detail/update/', this.editForm)
              .then(res => {

                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getArticleList()
                  }
                });
                this.resetForm(formName)
                this.updateVisible = false
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    editHandle(id) {
      this.$axios.get('/article-detail/getById/' + id).then(res => {
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
          ids.push(row.id)
        })
      }

      console.log(ids)
      this.$axios.post("/article-detail/delete", ids).then(res => {
        this.current = 1;
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose:() => {
            this.getArticleList()
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
.dialog-footer{
  position:absolute;
  bottom:10px;
  right: 10px;
}

</style>
