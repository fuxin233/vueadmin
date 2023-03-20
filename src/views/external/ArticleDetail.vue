<template>
<div style="width: 100%">
  <div style="font-size: 25px;"><strong>{{tableData.title}}</strong></div>
  <div>By - {{tableData.userName}}</div>
  <div>{{tableData.created}}</div>
  <div class="ql-container ql-snow" style="height:70%;">
    <div class="ql-editor" v-html="tableData.content" ></div>
  </div>

  <div style="height: 110px;overflow :auto;">
    <div>
    <el-input
        type="textarea"
        :rows="2"
        placeholder="我也要评论"
        v-model="comment.comment"
        style="width: 80%;margin-top: 5px;"
    >
    </el-input>
    </div>
    <div style="float: right;margin-top: 5px;margin-right: 10%">
    <el-button type="primary" @click="submitComment" >确 定</el-button>
  </div>
  </div>
  <div class="comments">

    <hr>
    <div v-for="item in comments">
      <span class="name"><i class="el-icon-s-custom"></i>{{item.userName}}</span>
      <span class="comment"><i class="el-icon-s-comment"></i> {{item.comment}}</span>
      <span class="date"><i class="el-icon-date"></i>评论时间：{{item.created}}</span>

      <div @click="likeComment(item.id)" class="like">
        <i class="el-icon-star-on" style="color: red;"></i>{{item.likes}}
      </div>
      <hr>
    </div>
  </div>
</div>
</template>

<script>
import ArticleHome from "./ArticleHome";
export default {
  name: "ArticleDetail",
  components: {ArticleHome},
  data() {
    return {
      tableData: {},
      comments:[],
      articleId:0,
      title:'',
      comment:{
        comment:'',
        articleId:'',
      }
    }
  },
  created() {
    this.articleId = this.$route.query.articleId
    this.getArticle()
  },
  methods:{
    getArticle() {
      this.$axios.get("/article-detail/getDetailById", {
        params: {
          id: this.$route.query.articleId,
        }
      }).then(res => {
        this.tableData = res.data.data
        this.comments = res.data.data.comments
      })
    },
    likeComment(id){
      this.$axios.get("/comment-detail/like/"+id).then(res => {
        this.getArticle()
      })
    },
    submitComment(){
      let Jwt = localStorage.getItem("token");
      if (Jwt == null)
      {
        this.$message({
          showClose: false,
          message: '请先登陆后评论',
          type: 'warning',
          onClose:() => {
            this.$router.push('/UserLogin')
          }
        });

      }
      else
      {
        this.comment.articleId = this.articleId
        this.$axios.post("/comment-detail/save",this.comment).then(res => {
          this.$message({
            showClose: true,
            message: '恭喜你，操作成功',
            type: 'success',
            onClose:() => {
              this.getArticle()
            }
          });
        })
      }
    }
  }
}
</script>

<style scoped>

.comments{
  height: 200px;
  margin-top: 2px;
  overflow :auto;

}
.like{
  display: inline-block;
  padding-left: 20px ;
  align-items: center;
}
.name{
  display:-moz-inline-box;
  display:inline-block;
  width:50px;
  margin-left: 50px;
  overflow :hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
.comment{
  display:-moz-inline-box;
  display:inline-block;
  width:500px;
  margin-left: 50px;
  overflow :hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
.date{
  display:-moz-inline-box;
  display:inline-block;
  width:300px;
  margin-left: 50px;
  overflow :hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  right: 0;
}
</style>
