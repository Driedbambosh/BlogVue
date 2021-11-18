<template>
  <div class="container flexContainer">
    <div class="left">title</div>
    <div class="center">
      <span>首页</span>
      <span>关于</span>
    </div>
    <div class="right">avatar</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.flexContainer {
  display: flex;
  justify-content: center;
}
.container {
  width: 100%;
  height: 3.4375rem;
  background-color: pink;
}
.container .center {
  flex-grow: 10;
  display: flex;
  justify-content: center;
}
.container .left {
  flex-grow: 1;
}
.container .right {
  flex-grow: 1;
}
.container span {
  cursor: pointer;
  height: 100%;
  width: 6.25rem;
  display: inline-block;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 3.4375rem;
  background-color: #fff;
  margin-right: 0.625rem;
  margin-left: 0.625rem;
  -webkit-transition: background 0.5s 0s ease;
  -moz-transition: background 0.5s 0s ease;
  -o-transition: background 0.5s 0s ease;
  transition: background 0.5s 0s ease;
}
.container span:hover {
  background-color: #39c5bb;
  color: #fff;
}
</style>