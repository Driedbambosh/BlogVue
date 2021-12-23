<template>
  <div class="bg-repeat-x bg-cover bg-fixed box p-0 sm:p-3">
    <div class="w-full sm:w-9/12 sm:p-4">
      <h1 class="searchLabel" v-if="searchStatus">
        标签:{{ searchLabelName }}
        <i
          style="cursor: pointer"
          @click="dontSearch"
          class="el-icon-error"
        ></i>
      </h1>
      <div v-for="item in articleData.data" :key="item._id" class="articleList">
        <div class="articleContent">
          <div
            :style="{ 'background-image': 'url(' + item.picture + ')' }"
            class="bg-cover hidden sm:block articleListLeft"
            style="cursor: pointer"
            id="left"
            @click="getArticleData(item._id)"
          >
            <!-- <img class="articleListLeft" :src="item.picture" alt=""> -->
          </div>
          <div id="right" class="w-full sm:w-5/6 p-5">
            <h1
              style="cursor: pointer; font-size: 26px"
              @click="getArticleData(item._id)"
              :title="item.title"
            >
              {{ item.title }}
            </h1>
            <p
              style="cursor: pointer"
              @click="getArticleData(item._id)"
              class="introduction"
            >
              {{ item.introduction }}
            </p>
            <el-tag
              style="
                color: #fff;
                border: none;
                margin-right: 2px;
                margin-bottom: 2px;
              "
              :color="label.color"
              v-for="label in item.label"
              :key="label._id"
              size="medium"
              >{{ label.labelName }}</el-tag
            >
            <div class="absolute sm:static" style="bottom: 0px">
              <span class="userInfo static sm:absolute">
                <el-avatar size="small" :src="item.userId.avatar"></el-avatar>
                <p style="margin-left: 10px; white-space: nowrap">
                  {{ item.userId.nickName }}
                </p>
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
    <div class="hidden sm:flex right sm:w-3/12">
      <div id="label-content" class="label-content">
        <div
          style="
            height: 3.125rem;
            line-height: 3.125rem;
            padding-left: 1.25rem;
            border-bottom: 1px solid #696969;
          "
        >
          标签：
        </div>
        <div class="tagContent">
          <el-tag
            style="
              color: #fff;
              border: none;
              margin-right: 2px;
              margin-bottom: 2px;
              cursor: pointer;
            "
            :color="label.color"
            v-for="label in options"
            :key="label._id"
            size="medium"
            @click="searchLabel(label._id, label.labelName)"
            >{{ label.labelName }}</el-tag
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getArticlesLabel } from "@/api/article";
import moment from "moment";
import { getLabel } from "@/api/label";
// import anime from "animejs";

export default {
  name: "articleList",
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      searchStatus: false, // 查询状态
      searchLabelName: "", // 当前搜索标签名
      options: [], // 标签数据
      articleData: {
        data: [],
        total: 0,
      },
      offsetTop: "",
      isLabelSearch: false,
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
    this.getLabelData();
  },
  mounted() {
    this.offsetTop = document.querySelector("#label-content").offsetTop;
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 取消搜索
    dontSearch() {
      this.searchStatus = false;
      this.searchLabelName = "";
      this.pageNo = 1;
      this.getArticless();
    },
    searchLabel(id, name) {
      this.$emit("loadingtrue");
      if (!this.searchStatus) {
        this.pageNo = 1;
        this.searchStatus = true;
      }
      getArticlesLabel({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        labelId: id,
      }).then((res) => {
        this.searchLabelName = name;
        this.articleData.data = res.data1;
        this.articleData.total = res.total;
        this.$emit("loadingFalse");
      });
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // let offsetTop = document.querySelector("#label-content").offsetTop
      let offsetHeight = document.querySelector("#flexContainer").offsetHeight;
      if (scrollTop + offsetHeight + 4 > this.offsetTop) {
        document.querySelector("#label-content").style.position = "fixed";
        document.querySelector("#label-content").style.top = "4rem";
      } else {
        document.querySelector("#label-content").style.position = "static";
        document.querySelector("#label-content").style.top = "";
      }
    },
    // 获取文章标签
    getLabelData() {
      getLabel({
        pageSize: 99999,
        pageNo: 1,
      }).then((res) => {
        this.options = res.data;
      });
    },
    //获取文章详情
    getArticleData(id) {
      let routeData = this.$router.resolve({
        name: "articleDetail",
        query: {
          articleId: id,
        },
      });
      window.open(routeData.href, "_blank");
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

.introduction {
  margin: 0.625rem 0 0.625rem 0;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.box {
  min-height: 100vh;
  display: flex;
  z-index: 9999;
  background-image: url(../../assets/indexBg.png);
}
.box .left {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box .leftArticle {
  background-color: #fff;
  /* -webkit-box-shadow: -4px 5px 27px 2px rgba(0, 0, 0, 0.3); */
  /* -moz-box-shadow: -4px 5px 27px 2px rgba(0, 0, 0, 0.3); */
  /* box-shadow: -4px 5px 27px 2px rgba(0, 0, 0, 0.3); */
}
.leftArticleContent {
  padding: 1.25rem;
}
.searchLabel {
  font-size: 2rem;
  margin-left: 2rem;
  align-self: flex-start;
  color: #2c476d;
}
.box .right {
  /* background-color: #39c5bb; */
  flex-direction: column;
  align-items: center;
  padding: 1.625rem;
}
.label-content {
  width: 19rem;
  min-height: 25rem;
  background-color: #ffffff;
  background: hsla(0, 0%, 0%, 0.25) border-box;
  border-radius: 5px;
  box-shadow: 0 0 0 1px hsl(0deg 0% 100% / 30%) inset,
    0 0.5em 1em rgb(0 0 0 / 60%);
  text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
}
.tagContent {
  padding: 1.25rem;
}
.articleList {
  /* background-color: green; */
  height: 14.5rem;
  /* width: calc(100% - 2.5rem); */
  padding: 0.625rem;
}
.articleContent {
  height: 100%;
  border-radius: 19px;
  /* box-shadow: -8px 8px 16px #b3b3b3, 8px -8px 16px #ffffff; */
  display: flex;
  border-radius: 0.5rem;
  overflow: hidden;
}
.backImage {
  width: 100%;
  height: 18.75rem;
}
.back {
  cursor: pointer;
  margin-bottom: 1.25rem;
  color: #39c5bb;
  width: 9.375rem;
}
#left {
  width: 20%;
  background-color: #fff;
}
#right {
  /* width: 80%; */
  position: relative;
  background: hsla(0, 0%, 0%, 0.25) border-box;
  box-shadow: 0 0 0 1px hsl(0deg 0% 100% / 30%) inset,
    0 0.5em 1em rgb(0 0 0 / 60%);
  text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
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
  object-fit: scale-down;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  /* background-color: #39c5bb; */
  color: #fff;
}
::v-deep .el-pagination {
  display: flex;
  justify-content: center;
}
</style>