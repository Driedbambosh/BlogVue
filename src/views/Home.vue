<template>
  <div class="home">
    <top-bar ref="topBar"></top-bar>
    <router-view class="h-86vh sm:h-full home" style="overflow: auto" />
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
  created() {},
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      getInfo().then((res) => {
        storage.set("userInfo", res[0], 7 * 24 * 60 * 60 * 1000);
        this.$refs.topBar.getUser();
      });
    },
  },
};
</script>

<style scoped>

</style>
