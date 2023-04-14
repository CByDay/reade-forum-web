<template>
  <div style="width: 100vw; height: 100vh; overflow: hidden; display: flex">
    <div style="flex: 1"></div>
    <el-image
      style="width: 100%; height: 100%"
      fit="cover"
      src="https://img0.baidu.com/it/u=1275095085,1961143463&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800"
    />
    <div style="width: 400px; background-color: white">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import { post } from "@/api/login";
import router from "@/router";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";

const form = reactive({
  username: "",
  password: "",
  remember: false,
});

const form1 = reactive({
  username1: "",
  password1: "",
  password1_repeat: "",
  email1: "",
  emailCode: "",
});

const dialogVisible = ref(false);

const rules = {
  username1: [
    { require: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 5, message: "", trigger: "blur" },
  ],
};

// const validatePass = (rule: any, value: any, callback: any) => {
//   if (value === '') {
//     callback(new Error('Please input the password'))
//   } else {
//     if (ruleForm.checkPass !== '') {
//       if (!ruleFormRef.value) return
//       ruleFormRef.value.validateField('checkPass', () => null)
//     }
//     callback()
//   }
// }

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
        // router.push('/logout')
      }
    );
  }
};

const isEmailValid = ref(false);

const onValidate = (prop, isValid) => {
  if (prop === "email") isEmailValid.value = isValid;
};

const sendEmailCode = () => {
  post("/api/auth/valid-emial", {
    emailCode: form1.email1,
  }),
    (message) => [ElMessage.success(message)];
};

const register = () => {
  post(
    "/api/auth/register",
    {
      username: form1.username1,
      password: form1.password1,
      email: form1.email1,
      emailCode: form1.emailCode,
    },
    (message) => {
      ElMessage.success(message);
      router.push("/login");
    }
  );
};
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background-image: url();
  /* background-color: #112346; */
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
}

.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
