<template>
  <div id="flexContainer" class="fixed top-0 box flexContainer">
    <div class="flex-shrink-0 left">Blog</div>
    <div class="center hidden sm:flex">
      <span
        :class="active == 'articleList' ? 'activeClass' : ''"
        @click="$router.push({ path: '/articleList' })"
      >
        <i class="el-icon-s-home"></i> 首页</span
      >
      <span
        :class="active == 'about' ? 'activeClass' : ''"
        @click="$router.push({ path: '/about' })"
      >
        <i class="el-icon-s-promotion"></i>
        关于</span
      >
    </div>
    <div v-if="active !== 'articleDetail'" class="center flex sm:hidden">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          标签<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu style="background-color: #224870" slot="dropdown">
          <el-dropdown-item
            class="dropItem"
            @click.native="labelSearch(item._id, item.labelName)"
            v-for="item in labelData"
            :key="item._id"
            style="color: #fff"
            >{{ item.labelName }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="flex-shrink-0 flex flex-row-reverse right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar
            class="rounded-full bg-cover logo w-full h-full"
            size="large"
            :src="user.avatar"
          >
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
          <!-- <div
            :style="{
              'background-image': 'url(' + user.avatar + ')',
            }"
            class="rounded-full bg-cover logo w-full h-full"
          ></div> -->
        </span>
        <el-dropdown-menu style="background-color: #224870" slot="dropdown">
          <el-dropdown-item
            class="dropItem"
            @click.native="myHome()"
            style="color: #fff"
            >个人主页</el-dropdown-item
          >
          <el-dropdown-item
            class="dropItem"
            @click.native="logOut()"
            style="color: #fff"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/util/auth.js";

export default {
  data() {
    return {
      user: {},
      active: "",
    };
  },
  mounted() {},
  computed: {
    labelData() {
      return this.$store.state.user.labelData;
    },
  },
  watch: {
    $route(to, from) {
      this.active = to.name;
    },
  },
  created() {
    this.active = this.$route.name;
  },
  methods: {
    logOut() {
      this.$store.dispatch("Logout").then((res) => {
        this.$router.push("/login");
      });
    },
    myHome() {
      location.href = "/admin";
    },
    getUser() {
      this.user = getUserInfo();
    },
    labelSearch(id, name) {
      this.$emit("labelSearch", id, name);
    },
    // handleScroll() {
    //   var scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   let offsetHeight = document.querySelector("#flexContainer").offsetHeight
    //   if(scrollTop-20 > offsetHeight) {
    //     document.querySelector("#flexContainer").style.position = "fixed"
    //   }else {
    //     document.querySelector("#flexContainer").style.position = "fixed"
    //   }
    // },
  },
};
</script>
<style>
.el-popper {
  border: none !important;
}
.el-popper .el-dropdown-menu__item:hover {
  background-color: #39c5bb !important;
}
.el-popper .popper__arrow {
  border: 0 !important;
}
.el-popper .popper__arrow::after {
  content: none !important;
}
</style>
<style scoped>
.activeClass {
  border-bottom: 2px solid #39c5bb;
}
.flexContainer {
  display: flex;
  justify-content: center;
}
.box {
  width: 100%;
  height: 3.4375rem;
  background-color: #224870;
  z-index: 9999;
}
.box .center {
  flex-grow: 10;
  justify-content: center;
}
.box .left {
  flex-grow: 1;
  padding-left: 10px;
  box-sizing: border-box;
  line-height: 3.4375rem;
  font-size: 28px;
  font-weight: 600;
  color: #4ea5d9;
}
.box .right {
  flex-grow: 1;
  flex-grow: 1;
  padding-right: 10px;
}
.center span {
  cursor: pointer;
  height: 100%;
  width: 7.25rem;
  display: inline-block;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 3.4375rem;
  color: #4ea5d9;
  margin-right: 0.625rem;
  margin-left: 0.625rem;
  -webkit-transition: background 0.5s 0s ease;
  -moz-transition: background 0.5s 0s ease;
  -o-transition: background 0.5s 0s ease;
  transition: background 0.5s 0s ease;
  transition: line-height 0.3s 0s ease;
}

/* 移动端hover移除 */
@media (any-hover: hover) {
  .center span:hover {
    background-color: #39c5bb;
    color: #122c34;
    line-height: 4rem;
  }
}

.logo {
  /* background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Foscimg.oschina.net%2Foscnet%2Fe6f34727c930cfa1dddff211fc74d4777e3.png&refer=http%3A%2F%2Foscimg.oschina.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639794447&t=ebbd52486b736faf4a8a88d49c4141ab"); */
  width: 3.4375rem;
  cursor: pointer;
}
</style>