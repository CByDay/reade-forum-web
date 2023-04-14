<template>
  <div style="text-align: center; margin: 0 20px">
    <div style="margin-top: 150px">
      <div style="font-size: 25px; font-weight: bold">登录</div>
      <div style="font-size: 14px; color: grey">
        再进入系统之前请先输入用户和密码进行登录
      </div>
      <div style="margin-top: 50px">
        <el-input
          type="text"
          placeholder="用户名/邮箱"
          v-model="form.username"
          autocomplete="off"
        >
        </el-input>
        <el-input
          type="password"
          v-model="form.password"
          style="margin-top: 10px"
          placeholder="密码"
          autocomplete="off"
        ></el-input>
      </div>
      <el-row style="margin-top: 5px; font-size: 14px">
        <el-col :span="12" style="text-align: left">
          <el-checkbox v-model="form.remember" label="记住我" size="large" />
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-link>忘记密码</el-link>
        </el-col>
      </el-row>
      <div style="margin-top: 40px">
        <el-button @click="doLogin()" style="width: 270px" type="success" plain
          >登录</el-button
        >
      </div>
      <el-divider>
        <span style="color: grey; font-size: 13px">没有账号</span>
      </el-divider>
      <div>
        <el-button style="width: 270px" type="warning" plain @click="router.push('/register')"
          >注册账号</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { post } from "@/api/login";
import router from "@/router";
import { ElMessage } from "element-plus";

const form = reactive({
  username: "",
  password: "",
  remember: false,
});

const doLogin = () => {
  if (!form.username || !form.password) {
    ElMessage.warning("请输入用户名和密码");
  } else {
    post(
      "/api/auth/login",
      {
        username: form.username,
        password: form.password,
        remember: form.remember,
      },
      (message) => {
        ElMessage.success(message);
        router.push('/logout')
      }
    );
  }
};
</script>

<style scoped></style>
