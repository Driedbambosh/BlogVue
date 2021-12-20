<template>
  <div class="box sm: p-3">
    <div class="leftArticle w-full sm:w-9/12">
      <!-- 背景图 -->
      <div
        class="backImage bg-cover"
        :style="{ 'background-image': 'url(' + article.picture + ')' }"
      >
        <!-- <img class="articleListLeft" :src="article.picture" alt=""> -->
      </div>
      <div class="leftArticleContent">
        <!-- <div class="ql-editor" v-html="article.article"></div> -->
        <div class="ql-container ql-snow">
          <div class="ql-editor" v-html="article.article"></div>
        </div>
      </div>
      <div class="comment">
        <h1>Comment</h1>
        <!-- 评论 -->
        <div class="commentList">
          <div
            class="commentListContent"
            v-for="item in articleCommentList"
            :key="item.id"
          >
            <div
              :style="{ 'background-image': 'url(' + item.userId.avatar + ')' }"
              class="leftAvatar"
            ></div>
            <div class="rightComment">
              <h2>{{ item.userId.nickName }}</h2>
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>

        <!-- 评论输入框 -->
        <el-popover
          placement="top-start"
          width="400"
          trigger="click"
          class="emoBox"
        >
          <div class="emotionList">
            <a
              href="javascript:void(0);"
              @click="getEmo(index)"
              v-for="(item, index) in faceList"
              :key="index"
              class="emotionItem"
              >{{ item }}</a
            >
          </div>
          <el-button
            class="emotionSelect"
            icon="el-icon-my-export"
            slot="reference"
          >
          </el-button>
        </el-popover>
        <el-input
          v-model="textarea"
          class="chatText"
          resize="none"
          type="textarea"
          id="textarea"
          rows="5"
          @keyup.enter.native="sendInfo"
        ></el-input>
        <!-- ------------- -->
        <div style="margin-top: 0.625rem">
          <el-button v-if="isCommentFather" style="float: right" type="primary"
            >取消</el-button
          >
          <el-button @click="sendComment" style="float: right" type="primary"
            >评论</el-button
          >
        </div>
      </div>
    </div>
    <div class="right sm:w-3/12"></div>
  </div>
</template>

<script>
import {
  getArticle,
  sendArticleComment,
  getArticleComment,
} from "@/api/article";
import moment from "moment";
import "highlight.js/styles/monokai-sublime.css";
// import anime from "animejs";
const appData = require("../../assets/emoji.json");

export default {
  name: "articleList",
  data() {
    return {
      faceList: [], // emoji
      textarea: "", // 评论
      isCommentFather: false, // 是否为父级评论
      id: "",
      articleCommentList: [], // 文章评论数据
      // 文章数据
      article: {
        picture: "",
      },
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
  mounted() {
    for (let i in appData) {
      this.faceList.push(appData[i].char);
    }
  },
  created() {
    this.id = this.$route.query.articleId;
    this.getArticleData(this.id);
    this.getComment();
  },
  methods: {
    // 获取文章评论
    getComment() {
      getArticleComment({ id: this.id, isFather: 1 }).then((res) => {
        this.articleCommentList = res;
      });
    },
    //评论
    sendComment() {
      sendArticleComment({
        articleId: this.id,
        content: this.textarea,
        isFather: true,
      }).then((res) => {
        this.getComment();
      });
    },
    //获取文章详情
    getArticleData(id) {
      this.$emit("loadingtrue");
      getArticle({ articleId: id }).then((res) => {
        // 文章切换
        this.article = res;
        document.title = res.title;
        this.$emit("loadingFalse");
      });
    },
    getEmo(index) {
      var textArea = document.getElementById("textarea");
      function changeSelectedText(obj, str) {
        if (window.getSelection) {
          // 非IE浏览器
          textArea.setRangeText(str);
          // 在未选中文本的情况下，重新设置光标位置
          textArea.selectionStart += str.length;
          textArea.focus();
        } else if (document.selection) {
          // IE浏览器
          obj.focus();
          var sel = document.selection.createRange();
          sel.text = str;
        }
      }
      changeSelectedText(textArea, this.faceList[index]);
      this.textarea = textArea.value; // 要同步data中的数据
      // console.log(this.faceList[index]);
      return;
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
.comment {
  padding: 0 1.25rem 1.25rem 1.25rem;
}
.comment h1 {
  background-color: #21476e;
  color: #fff;
  padding: 0.3125rem;
}
.box .right {
  background-color: #39c5bb;
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
.commentList {
  min-height: 12.5rem;
  background-color: pink;
  margin-top: 0.625rem;
  padding: 0.625rem;
}
.commentListContent:first-child {
  margin-top: 0px;
}
.commentListContent:last-child {
  border-bottom: 1px solid #696969;
}
.commentListContent {
  display: flex;
  margin-top:.3125rem;
  border-top: 1px solid #696969;
  padding-top: .3125rem;
  padding-bottom: .3125rem;
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
  white-space: nowrap;
}
#right .userInfo {
  left: 0.625rem;
  bottom: 5px;
  display: flex;
  align-items: center;
  font-size: 12px;
}
.articleListLeft {
  object-fit: cover;
}

.rightComment {
  margin-left: 0.625rem;
}
.rightComment h2 {
  color: #71797e;
}
.leftAvatar {
  width: 3.125rem;
  height: 3.125rem;
  background-size: 100%;
  border-radius: 3.125rem;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #39c5bb;
  color: #fff;
}
</style>

<style>
.el-icon-my-export {
  background: url(../../assets/emoji.png) center no-repeat;
  /* background-size: cover;*/
  background-size: 100%;
}
.el-icon-my-export:before {
  content: "替";
  visibility: hidden;
}
.el-icon-my-export {
  font-size: 24px;
}
.el-icon-my-export:before {
  content: "\e611";
}
</style>

<style scoped>
.emotionSelect {
  padding: 5px 10px;
  border: none;
}
.chatIcon {
}
.emotionList {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
}
.emotionItem {
  width: 10%;
  font-size: 20px;
  text-align: center;
}
/*包含以下四种的链接*/
.emotionItem {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
.emotionItem:link {
  text-decoration: none;
}
/*已经访问过的链接*/
.emotionItem:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
  text-decoration: none;
}
/* 正在点击的链接*/
.emotionItem:active {
  text-decoration: none;
}
</style>
