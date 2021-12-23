<template>
  <div class="bg-repeat-x bg-cover bg-fixed box p-0 sm:p-3">
    <div class="leftArticle w-full sm:w-9/12">
      <!-- 背景图 -->
      <div
        class="backImage bg-cover"
        :style="{ 'background-image': 'url(' + article.picture + ')' }"
      >
        <!-- <img class="articleListLeft" :src="article.picture" alt=""> -->
      </div>
      <div class="leftArticleContent p-0 sm:p-5">
        <!-- <div class="ql-editor" v-html="article.article"></div> -->
        <h1 style="font-size:2.125rem">{{article.title}}</h1>
        <div class="ql-container ql-snow">
          <div class="ql-editor" v-html="article.article"></div>
        </div>
      </div>
      <div class="comment sm:pl-5 sm:pr-5 sm:pb-5">
        <h1>Comment</h1>
        <!-- 评论 -->
        <div v-if="articleCommentList.length !== 0" class="commentList">
          <!-- 一级评论 -->
          <div
            class="commentListContent"
            v-for="item in articleCommentList"
            :key="item.id"
          >
            <div style="display: flex">
              <div
                :style="{
                  'background-image': 'url(' + item.userId.avatar + ')',
                }"
                class="leftAvatar"
              ></div>
              <div class="rightComment">
                <h2>{{ item.userId.nickName }}</h2>
                <p>{{ item.content }}</p>
                <div class="TimeComment">
                  <span>{{ isoTime(item.createdAt) }}</span>
                  <span
                    @click="reply(item)"
                    style="margin-left: 0.625rem; cursor: pointer"
                    >回复</span
                  >
                </div>
              </div>
            </div>
            <!-- 二级评论 -->
            <div
              class="commentListContentSon"
              v-for="itemSon in item.replayData"
              :key="itemSon.id"
            >
              <div style="display: flex">
                <div
                  :style="{
                    'background-image': 'url(' + itemSon.userId.avatar + ')',
                  }"
                  class="leftAvatarSon"
                ></div>
                <div class="rightComment">
                  <h2 style="font-size: 13px">
                    {{ itemSon.userId.nickName }} 回复@
                    {{ itemSon.commentUserId.nickName }}
                  </h2>
                  <p style="font-size: 14px">{{ itemSon.content }}</p>
                  <div class="TimeComment">
                    <span>{{ isoTime(itemSon.createdAt) }}</span>
                    <span
                      @click="replySon(itemSon, item)"
                      style="margin-left: 0.625rem; cursor: pointer"
                      >回复</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <!-- ----- -->
          </div>
          <!-- --------- -->
        </div>
        <div
          style="color: #b3b3b3; position: relative"
          v-else
          class="commentList"
        >
          <span
            style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            "
            >没有更多评论</span
          >
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
          :placeholder="
            isCommentFather ? '回复 @' + replyData.userId.nickName : ''
          "
          type="textarea"
          id="textarea"
          rows="5"
          @keyup.enter.native="sendInfo"
        ></el-input>
        <!-- ------------- -->
        <div style="margin-top: 0.625rem">
          <el-button
            @click="sendComment"
            style="float: right; margin-left: 0.625rem"
            type="primary"
            >评论</el-button
          >
          <el-button
            @click="noReply"
            v-if="isCommentFather"
            style="float: right"
            type="primary"
            >取消回复</el-button
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
      replyData: {}, // 回复数据
    };
  },
  computed: {
    // iso格式转换
    isoTime() {
      return (index) => {
        return moment(index, ["YYYY", moment.ISO_8601]).format(
          "YYYY-MM-DD hh:mm:ss"
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
    // 取消回复
    noReply() {
      this.isCommentFather = false;
      this.replyData = {};
    },
    // 回复
    reply(data) {
      this.isCommentFather = true;
      this.replyData = data;
    },
    // 回复
    replySon(dataSon, data) {
      this.isCommentFather = true;
      this.replyData = { ...dataSon };
      this.replyData._id = data._id;
    },
    // 获取文章评论
    getComment() {
      getArticleComment({ id: this.id, isFather: 1 }).then((res) => {
        this.articleCommentList = res;
      });
    },
    //评论
    sendComment() {
      // 判断是否为回复
      if (this.isCommentFather) {
        sendArticleComment({
          articleId: this.id,
          content: this.textarea,
          isFather: false,
          commentId: this.replyData._id,
          commentUserId: this.replyData.userId._id,
        }).then((res) => {
          this.getComment();
        });
      } else {
        sendArticleComment({
          articleId: this.id,
          content: this.textarea,
          isFather: true,
        }).then((res) => {
          this.getComment();
        });
      }
      this.isCommentFather = false;
      this.replyData = {};
      this.textarea = "";
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
  background-image: url(../../assets/indexBg.png);
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
  padding-bottom: 0.625rem;
}
.leftArticleContent {
}
.comment {
  /* padding: 0 1.25rem 1.25rem 1.25rem; */
}
.comment h1 {
  background-color: #21476e;
  color: #fff;
  padding: 0.3125rem;
}
.box .right {
  /* background-color: #39c5bb; */
  background: hsla(0, 0%, 0%, 0.25) border-box;
  border-radius: 5px;
  box-shadow: 0 0 0 1px hsl(0deg 0% 100% / 30%) inset,
    0 0.5em 1em rgb(0 0 0 / 60%);
  text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
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
.TimeComment {
  font-size: 12px;
  color: #b3b3b3;
}
.commentList {
  min-height: 12.5rem;
  /* background-color: pink; */
  margin-top: 0.625rem;
  padding: 0.625rem;
}
.commentListContent:first-child {
  margin-top: 0px;
}
.commentListContentSon:first-child {
  margin-top: 0px;
}
.commentListContent:last-child {
  border-bottom: 1px solid #696969;
}
.commentListContentSon {
  /* display: flex; */
  margin-left: 2.8125rem;
  margin-top: 0.3125rem;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
}
.commentListContent {
  /* display: flex; */
  margin-top: 0.3125rem;
  border-top: 1px solid #696969;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
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
  width: 2.8125rem;
  height: 2.8125rem;
  background-size: 100%;
  border-radius: 2.8125rem;
}
.leftAvatarSon {
  width: 2.1875rem;
  height: 2.1875rem;
  background-size: 100%;
  border-radius: 2.1875rem;
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
