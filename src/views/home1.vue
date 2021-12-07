<template>
  <div class="box sm: p-3">
    <div class="left w-full sm:w-9/12"></div>
    <div class="right sm:w-3/12"></div>
  </div>
</template>

<script>
export default {

  name: 'home1',
  data() {
    return {

    }
  }
};
</script>

<style scoped>
.box {
  height: 100%;
  display: flex;
}
.box .left {
  background-color: pink;
}
.box .right {
  background-color: blue;

}
</style>