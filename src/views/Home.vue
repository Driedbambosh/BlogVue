<template>
  <div class="home">
    <top-bar @labelSearch="tableLabel" ref="topBar"></top-bar>
    <router-view
      ref="router"
      @loadingtrue="loadingtrue"
      @loadingFalse="loadingFalse"
      class="sm:h-full home"
      style="overflow: auto"
    />
    <div
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      v-loading="loading"
      v-if="loading"
      class="loading"
    ></div>
    <bottom-bar class="visible sm:invisible" ref="bottomBar"></bottom-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import topBar from "@/components/topBar";
import bottomBar from "@/components/bottomBar";
import { getInfo } from "@/api/user";
import storage from "store";

export default {
  name: "Home",
  components: {
    topBar,
    bottomBar,
  },
  
  mounted() {
    this.getUser();
  },
 
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    tableLabel(id,name) {
      this.$refs.router.searchLabel(id,name)
    },
    getUser() {
      getInfo().then((res) => {
        storage.set("userInfo", res[0], 7 * 24 * 60 * 60 * 1000);
        this.$refs.topBar.getUser();
      });
    },
    loadingtrue() {
      this.loading = true;
    },
    loadingFalse() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.home {
  /* height: 100%; */
}

.loading {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  /* background-color: pink; */
}
</style>
