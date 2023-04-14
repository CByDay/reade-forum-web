<template>
  <div style="text-align: center; margin: 0 20px">
    <div style="margin-top: 150px">
      <div style="margin-top: 50px">
        <el-form :rules="rules" v-model="form" @validate="onValidate">
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="form.username"
              placeholder="用户名/邮箱"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              v-model="form.password"
              placeholder="密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              v-model="form.password_repeat"
              placeholder="重复密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="text"
              v-model="form.email"
              placeholder="邮箱"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-row :gutter="10" style="width: 100%">
            <el-col :span="17">
              <el-input
                type="testCode"
                placeholder="请输入验证码"
                :disabled="isEmailValid"
                v-model="form.emailCode"
              ></el-input>
            </el-col>
            <el-col :span="5"
              ><el-button type="success" @click="sendEmailCode"
                >获取验证码</el-button
              ></el-col
            >
          </el-row>

          <div style="margin-top: 80px">
            <el-button style="width: 270px" type="warning" @click="register"
              >立即注册</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { post } from "@/api/login";
import router from "@/router";
import { ElMessage } from "element-plus";

const form = reactive({
  username: "",
  password: "",
  password_repeat: "",
  email: "",
  emailCode: "",
});

const isEmailValid = ref(false);
const onValidate = (prop, isValid) => {
  if (prop === "email") isEmailValid.value = isValid;
};
const sendEmailCode = () => {
  post("/api/auth/valid-email", {
    emailCode: form.email,
  }),
    (message) => [ElMessage.success(message)];
};

const register = () => {
  post(
    "/api/auth/register",
    {
      username: form.username,
      password: form.password,
      email: form.email,
      emailCode: form.emailCode,
    },
    (message) => {
      ElMessage.success(message);
      router.push("/login");
    }
  );
};
</script>

<style scoped></style>
