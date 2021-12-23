<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div v-if="active !== 'login'" id="topContent" class="block" style="height: 3.4375rem"></div>
    <router-view />
    <div v-if="active !== 'login'" class="block sm:hidden" style="height: 3.4375rem"></div>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      active: "",
    };
  },
  created() {
    this.active = this.$route.name;
  },
  watch: {
    $route(to, from) {
      this.active = to.name;
    },
  },
  methods: {},
};
</script>


<style>
#app {
  height: 100%;
}
</style>
