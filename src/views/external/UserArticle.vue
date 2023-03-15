<template>
  <div style="width: 100%">
    <div class="book" @click="toDetail(item.id)" v-for="item in tableData">
      <div class="ql-container ql-snow" style="margin-top: 25%">
        <div class="ql-editor" v-html="item.content"></div>
      </div>
      <div class="cover">
        <p class="userName">作者：{{item.userName}}</p><br/>
        <p class="title">{{item.title}}</p>
        <p class="date">{{item.created}}</p>
      </div>
    </div>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 6, 7, 8]"
        :current-page="current"
        :page-size="size"
        :total="total">
    </el-pagination>

  </div>
</template>

<script>
import ArticleHome from "./ArticleHome";
export default {
  name: "UserArticle",
  components: {ArticleHome},
  data() {
    return {
      tableData: [],
      title:'',
      total: 0,
      size: 5,
      current: 1,
    }
  },
  created() {
    this.title = this.$route.query.title
    this.getArticleList()
  },
  methods:{
    getArticleList() {
      this.$axios.get("/article-detail/listForUser", {
            params: {
              title: this.title,
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
    toDetail(id){
      this.$router.push({
        name: 'ArticleDetail',
        query: {
          articleId : id
        }
      })
    },
    handleSizeChange(val) {
      this.size = val
      this.getArticleList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getArticleList()
    },

  }
}
</script>

<style scoped>

::-webkit-scrollbar {
  width: 0;      /* Safari,Chrome 隐藏滚动条 */
  height: 0;     /* Safari,Chrome 隐藏滚动条 */
  display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
}
.book {
  position: relative;
  border-radius: 10px;
  width: 1200px;
  min-height: 130px;
  max-height: 130px;
  background-color: whitesmoke;
  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  -webkit-transform: preserve-3d;
  -ms-transform: preserve-3d;
  transform: preserve-3d;
  -webkit-perspective: 2000px;
  perspective: 2000px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #000;
  left: 18%;
  margin-bottom: 25px;
  top: 20px;
  overflow:auto
}

.cover {
  top: 0;
  position: absolute;
  background-color: lightgray;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform-origin: 0;
  -ms-transform-origin: 0;
  transform-origin: 0;
  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
}

.book:hover .cover {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform: rotatey(-80deg);
  -ms-transform: rotatey(-80deg);
  transform: rotatey(-80deg);
}

.userName {
  font-size: 20px;
  font-weight: bolder;
  word-break:break-all;
  overflow :hidden;
  margin-left: 20px;
}
.title{
  max-width: 500px;
  font-size: 20px;
  font-weight: bolder;
  word-break:break-all;
  margin-top: 50px;
  overflow :hidden;
  margin-left: 100px;
  overflow :hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: darkblue;
}
.date{
  margin-left: auto;
  margin-right: 20px;
}
.el-pagination {
  float: right;
  margin-top: 22px;
}
</style>
