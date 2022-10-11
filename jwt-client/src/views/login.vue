<template>
  <el-form :model="form" label-width="80px" ref="ruleFormRef">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">登录</el-button>
      <el-button type="primary" @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const { push } = useRouter();
//设置ref
const ruleFormRef = ref();
//设置响应式数据
const form = reactive({
  username: "",
  password: "",
});
// 提交表单
const onSubmit = (formEl) => {
  if (!formEl) return;
  console.log(formEl, form);
  formEl.validate((valid) => {
    if (valid) {
      //默认用得get请求，请求方式不对请求不到
      axios
        .post("/token", {
          username: form.username,
          password: form.password,
        })
        .then((res) => {
          const result = res.data;
          if (result.status) {
            localStorage.setItem("token", result.token);
            verifyToken();
          }
          console.log(res);
        });
    } else {
      return false;
    }
  });
};

//重置表单
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

//验证token有效性
const verifyToken = () => {
  axios
    .post("/verify", {
      token: localStorage.getItem("token"),
    })
    .then((res) => {
      debugger;
      const result = res.data;
      if (result.isValid) {
        //路由跳转
        // this.$router.push("/list");
        push({
          path: "/list",
        });
        ElMessage({
          message: "登录成功",
          type: "success",
        });
      }
    });
};
</script>
