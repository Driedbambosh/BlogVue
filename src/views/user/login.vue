<template>
  <div class="wrap">
    <div class="rounded-none sm:rounded-2xl login-box h-full sm:h-3/5">
      <div class="left hidden sm:block"></div>
      <div @keyup.enter="loginFrom" class="right w-full sm:w-9/12">
        <h1 class="miku">登录</h1>
        <el-form style="width: 60%; height: 40%" ref="form" :model="form">
          <el-form-item>
            <el-input
              class="loginInput"
              v-model="form.userName"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 40px">
            <el-input
              class="loginInput"
              v-model="form.passWord"
              placeholder="密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <button @click="loginFrom">Login</button>
        <div
          class="flexBox"
          style="width: 60%; color: #39c5bb; margin-top: 50px"
        >
          <a>注册</a>
          <a>找回密码</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { login } from "@/api/user";

export default {
  name: "login",
  created() {},
  mounted() {},
  data() {
    return {
      form: {},
    };
  },
  methods: {
    //登录
    loginFrom() {
      this.$store
        .dispatch("Login", {
          userName: this.form.userName,
          passWord: this.form.passWord,
        })
        .then((res) => this.loginSuccess(res))
        .catch((err) => this.loginFailed(err))
        .finally(() => {
          this.loginBtn = false;
        });
    },
    // 登录成功要做的事
    loginSuccess(res) {
      this.$router.push("/");

      this.$message.success(res.message);
    },
    loginFailed(err) {
      console.log(err);
      this.$message.warning(err);
    },
  },
};
</script>

<style scoped>
a {
  cursor: pointer;
}
.flexBox {
  display: flex;
  justify-content: space-between;
}
.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(180deg, #009efd 0%, #2af598 100%);
}
.login-box {
  width: 900px;
  /* height: 500px; */
  /* border-radius: 10px; */
  overflow: hidden;
  box-shadow: -5px 3px 10px rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);

  display: flex;
}
.login-box .left {
  background-color: pink;
  overflow: hidden;
  height: 100%;
  width: 30%;
  background: url(../../assets/loginBgc.jpg) no-repeat;
  background-size: 63.75rem;
  background-position: -452px 0;
}
.login-box .right {
  height: 100%;
  /* width: 70%; */
  display: flex;
  box-sizing: border-box;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  padding: 40px;
}
.loginInput /deep/ .el-input__inner {
  background-color: rgba(0, 0, 0, 0);
  border-radius: 0px;
  border: none;
  /* border-bottom: 1px solid #39c5bb; */
  border-radius: 77px;
  background: #f2ebe6;
  box-shadow: -5px 5px 9px #a09b98, 5px -5px 9px #ffffff;
}
.loginInput /deep/ .el-input__inner:focus {
  border-radius: 77px;
  background: #f2ebe6;
  box-shadow: inset -5px 5px 9px #a09b98, inset 5px -5px 9px #ffffff;
}
.miku {
  color: #39c5bb;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 32px;
}

button {
  background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
  font-size: 22px;
  border: none;
  color: #fff;
  width: 150px;
  height: 50px;
  border-radius: 77px;
  box-shadow: -5px 5px 9px #a09b98, 5px -5px 9px #ffffff;
  cursor: pointer;
}
button:active {
  box-shadow: none;
  border-radius: 77px;
  box-shadow: inset -5px 5px 9px #a09b98, inset 5px -5px 9px #ffffff;
}
</style>