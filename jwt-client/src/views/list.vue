<template>
  <div class="home">
    <el-button @click="getContent">获取文章内容</el-button>
    <el-button @click="addContent">新增文章内容</el-button>
  </div>
</template>
<script setup>
import axios from "axios";
import { ElMessage } from "element-plus";
import { Base64 } from "js-base64";
const getContent = () => {
  axios.get("/content").then((res) => {
    console.log(res);
    ElMessage({
      message: res.data.msg,
      type: "success",
    });
  });
};
const addContent = () => {
  axios({
    url: "/content",
    method: "post",
    headers: {
      Authorization: _encode(),
    },
  }).then((res) => {
    if (res.data.status) {
      ElMessage({
        message: res.data.msg,
        type: "success",
      });
    } else {
      ElMessage({
        message: res.data.msg,
        type: "error",
      });
    }
  });
};

const _encode = () => {
  const token = localStorage.getItem("token");
  const encoded = Base64.encode(`${token}:`);
  return `Basic ${encoded}`;
};
</script>
