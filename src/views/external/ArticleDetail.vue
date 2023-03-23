<template>
  <div style="width: 100%;">
    <div style="font-size: 25px;"><strong>{{tableData.title}}</strong></div>
    <div>By - {{tableData.userName}}</div>
    <div>{{tableData.created}}</div>
    <div class="ql-container ql-snow" style="height:70%;">
      <div class="ql-editor" v-html="tableData.content"></div>
    </div>


    <div class="comments">
      <div style="overflow :auto;margin-bottom: 20px">
        <div>
          <el-input
              type="textarea"
              :rows="2"
              placeholder="我也要评论"
              v-model="comment.comment"
              autosize
              style="width: 80%;margin-top: 10px;"
          >
          </el-input>
        </div>
        <div style="float: right;margin-top: 5px;margin-right: 10%">
          <el-button type="primary" @click="submitComment" >确 定</el-button>
        </div>
      </div>



      <div v-for="item in comments" class="content">
        <el-avatar :size="100" :src= item.userAvatar style="float: left;margin-left: 7%;margin-top: 40px"></el-avatar>
        <div style="margin-top: 50px">
          <div class="name"><i class="el-icon-s-custom" style="margin-left: 0.5%"></i>{{item.userName}}</div>
          <div class="date"><i class="el-icon-date"></i>评论时间：{{item.created}}</div>
          <div class="commentText">
            <i class="el-icon-s-comment"></i> {{item.comment}}
          </div>
          <div>
            <el-button @click="likeComment(item.id)" class="like">
              <i class="el-icon-star-on" style="color: red;"></i>{{item.likes}}
            </el-button>
          </div>
        </div>
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
  margin-top: 2px;
  width: 100%;
  border: 2px dashed #4bc0c8;
  border-radius: 10px;
  background-color: beige;
}
.content{
  border-top: 1px solid #ccc;
  overflow: hidden;
}
.content::after {
  content: "";
  display: block;
  clear: both;
}
.like{
  float: right; /* 将 button 元素向右浮动 */
  display: block; /* 将 button 元素设置为块级元素 */
  margin-top: 10px;
  margin-right: 30px;
  margin-bottom: 20px;
  font-size: 18px;
}
.name{
  height: 36px;
  margin-top: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  font-size: 30px;
  font-weight: bolder;
}
.commentText{
  margin-left: 12.8%;
  margin-top: 10px;
  word-wrap: break-word;
  text-align: left;
  font-size: 20px;
  width:80%;

}
.date{
  margin-left: 13%;
  width:300px;
  overflow :hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  right: 0;
  font-size: 10px;
}
</style>
