<template>
  <div class="box sm: p-3">
    <div v-if="!isArticle" class="left w-full sm:w-9/12 sm:p-4">
      <div v-for="item in articleData.data" :key="item._id" class="articleList">
        <div @click="getArticleData(item._id)" class="articleContent">
          <div
            :style="{ 'background-image': 'url(' + item.picture + ')' }"
            class="bg-cover hidden sm:block"
            id="left"
          ></div>
          <div id="right" class="w-max sm:w-5/6">
            <h1 :title="item.title">{{ item.title }}</h1>
            <p>{{ item.introduction }}</p>
            <div class="absolute sm:static" style="bottom:0px">
              <span class="userInfo static sm:absolute">
                <el-avatar size="small" :src="item.userId.avatar"></el-avatar>
                <p style="margin-left: 10px;white-space:nowrap;">{{ item.userId.nickName }}</p>
              </span>
              <span class="time static sm:absolute"
                >更新时间:{{ isoTime(item.updatedAt) }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="articleData.total"
      >
      </el-pagination>
    </div>
    <div v-else class="leftArticle w-full sm:w-9/12">
      <!-- 背景图 -->
      <div
        class="backImage bg-cover"
        :style="{ 'background-image': 'url(' + article.picture + ')' }"
      ></div>
      <div class="leftArticleContent">
        <div @click="back" class="back">
          <i class="el-icon-arrow-left"></i>
          返回
        </div>
        <!-- <div class="ql-editor" v-html="article.article"></div> -->
        <div class="ql-container ql-snow">
            <div class="ql-editor" v-html="article.article">
            </div>
        </div>
      </div>
    </div>
    <div class="right sm:w-3/12"></div>
  </div>
</template>

<script>
import { getArticles, getArticle } from "@/api/article";
import moment from "moment";
import "highlight.js/styles/sunburst.css";
// import anime from "animejs";

export default {
  name: "home1",
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      articleData: {
        data: [],
        total: 0,
      },
      // 文章数据
      article: {},
      isArticle: false,
    };
  },
  computed: {
    // iso格式转换
    isoTime() {
      return (index) => {
        return moment(index, ["YYYY", moment.ISO_8601]).format(
          "YYYY-MM-DD h:mm:ss"
        );
      };
    },
  },
  created() {
    this.getArticless();
  },
  methods: {
    // back返回List
    back() {
      this.isArticle = false;
    },
    //获取文章详情
    getArticleData(id) {
      this.$emit("loadingtrue");
      getArticle({ articleId: id }).then((res) => {
        // 文章切换
        this.article = res;
        this.isArticle = true;
        this.$emit("loadingFalse");
      });
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getArticless();
    },
    // 获取文章List
    getArticless() {
      this.$emit("loadingtrue");
      getArticles({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      }).then((res) => {
        this.articleData = res;
        this.articleData.total = res.total;
        this.$emit("loadingFalse");
      });
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: 600;
  font-size: 21px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.box {
  min-height: 100vh;
  display: flex;
  background-color: #f3f5f6;
  z-index: 9999;
}
.box .left {
  background-color: #dcdcdc;
  -webkit-box-shadow: -4px 5px 27px 2px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: -4px 5px 27px 2px rgba(0, 0, 0, 0.3);
  box-shadow: -4px 5px 27px 2px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box .leftArticle {
  background-color: #fff;
  -webkit-box-shadow: -4px 5px 27px 2px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: -4px 5px 27px 2px rgba(0, 0, 0, 0.3);
  box-shadow: -4px 5px 27px 2px rgba(0, 0, 0, 0.3);
}
.leftArticleContent {
  padding: 1.25rem;
}
.box .right {
  background-color: #39c5bb;
}
.articleList {
  /* background-color: green; */
  height: 12.5rem;
  width: calc(100% - 2.5rem);
  padding: 0.625rem;
}
.articleContent {
  height: 100%;
  border-radius: 19px;
  background: #e0e0e0;
  box-shadow: -8px 8px 16px #b3b3b3, 8px -8px 16px #ffffff;
  display: flex;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
}
.backImage {
  width: 100%;
  height: 18.75rem;
}
.back {
  cursor: pointer;
  margin-bottom: 1.25rem;
  color: #39c5bb;
  width: 9.375rem
}
#left {
  width: 20%;
  background-color: #fff;
}
#right {
  /* width: 80%; */
  padding: 0.3125rem;
  position: relative;
}
#right .time {
  right: 0.625rem;
  bottom: 0.625rem;
  font-size: 12px;
  white-space:nowrap;
}
#right .userInfo {
  left: 0.625rem;
  bottom: 5px;
  display: flex;
  align-items: center;
  font-size: 12px;
  
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #39c5bb;
  color: #fff;
}
</style>