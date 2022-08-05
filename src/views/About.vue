<template>
  <div class="bg-repeat-x bg-cover bg-fixed about">
    <el-row class="main" type="flex" justify="center">
      <el-col :span="16">
        <h5 class="title"><i class="el-icon-star-on" />关于自己</h5>
        <div class="statement">
          <div class="item">it技术的探索者</div>
          <div class="item">
            座右铭：向上的路并不拥挤，而大多数人选择了安逸。
          </div>
        </div>
        <div class="statement">
          <div class="item">Email：fengziy@aliyun.com</div>
          <div class="item">QQ：1224971566</div>
          <div class="item">
            CSDN：
            <a target="_blank" href="https://blog.csdn.net/feng_zi_ye"
              >https://blog.csdn.net/feng_zi_ye</a
            >
          </div>
        </div>
        <h5 class="title"><i class="el-icon-star-on" />关于博客</h5>
        <el-card shadow="always">
          <dl class="dl-blog">
            <dt>博客开源</dt>
            <dd></dd>
            <dt>涉及技术</dt>
            <dd>Vue、Vue-Router、Element-ui、Vue-i18n</dd>
            <dt>其他</dt>
            <dd>百度分享、点击爱心特效、复制追加版权信息</dd>
          </dl>
        </el-card>
        <h5 class="title"><i class="el-icon-star-on" />给我留言</h5>
        <el-card shadow="always">
          <el-form
            ref="formLabelAlign"
            label-position="left"
            :rules="rules"
            label-width="80px"
            :model="formLabelAlign"
          >
            <el-form-item label="称谓" prop="name">
              <el-input v-model="formLabelAlign.name" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formLabelAlign.email" />
            </el-form-item>
            <el-form-item label="留言内容" prop="content">
              <el-input v-model="formLabelAlign.content" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('formLabelAlign')">
                提交留言</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      formLabelAlign: {
        name: "",
        email: "",
        content: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "",
            trigger: "blur",
          },
          {
            type: "email",
            message: "",
            trigger: ["blur", "change"],
          },
        ],
        content: [
          {
            required: true,
            message: "",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.about {
  background-image: url(../assets/indexBg.png);
}
.dl-blog dd {
  margin-left: 30px;
}

.dl-blog .icon {
  width: 20px;
  height: 20px;
}

.title {
  margin-top: 40px;
}

.statement {
  border-left: 3px solid #f56c6c;
  padding: 20px;
  background-color: #ebeef5;
  margin-top: 20px;
}
</style>
