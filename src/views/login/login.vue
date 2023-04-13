<template>
  <div class="login-wrap">
    <el-form class="login-container">
      <h1 class="title">用户登陆</h1>
      <el-form-item>
        <el-input
          type="text"
          v-model="form.username"
          placeholder="用户名/邮箱"
          autocomplete="off"
        >
          <template #prefix><User /></template>
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
        <el-button type="primary" @click="doLogin()" style="width: 100%"
          >登陆</el-button
        >
      </el-form-item>
      <el-row style="margin-top: 5xp">
        <el-col :span="12" style="text-align: left">
          <el-checkbox v-model="form.remember" label="记住我" size="large" />
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-link>忘记密码</el-link>
        </el-col>
      </el-row>
      <el-row style="text-align: center; margin-top: 10px">
        <!-- <el-link type="primary" @click="router.push('/register')" style="text-align: left;">注册账号</el-link> -->
        <el-button text @click="dialogVisible = true">
          click to open the Dialog
        </el-button>
      </el-row>
    </el-form>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="注册登录"
    width="20%"
    :before-close="handleClose"
  >
    <el-form :rules="rules" v-model="form1" @validate="onValidate">
      <el-form-item prop="username1">
        <el-input
          type="text"
          v-model="form1.username1"
          placeholder="用户名/邮箱"
          autocomplete="off"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="form1.password1"
          placeholder="密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="form1.password1_repeat"
          placeholder="重复密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="text"
          v-model="form1.email1"
          placeholder="邮箱"
          autocomplete="off"
        >
        </el-input>
      </el-form-item>
      <el-row :gutter="10" style="width: 100%">
        <el-col :span="17">
          <el-input type="testCode" placeholder="请输入验证码" :disabled="isEmailValid" v-model="form1.emailCode"></el-input>
        </el-col>
        <el-col :span="5"
          ><el-button type="success" @click="sendEmailCode">获取验证码</el-button></el-col
        >
      </el-row>

      <div style="margin-top: 80px">
        <el-button style="width: 270px" type="warning" @click="register">立即注册</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { post } from "@/api/login";
import router from "@/router";
import { ElMessage } from "element-plus";
import { isValid } from "ipaddr.js";
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
  username1:[
    {require:true,message:'请输入用户名',trigger:'blur'},
    {min:3,max:5,message:'',trigger:'blur'}
  ]
}

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

const isEmailValid = ref(false)

const onValidate = (prop,isValid) => {
  if(prop === 'email')
    isEmailValid.value = isValid
}

const sendEmailCode = () =>{
  post('/api/auth/valid-emial',{
    emailCode :form1.email1
  }),(message) =>[
    ElMessage.success(message)
  ]
}

const register = () => {
  post(
      "/api/auth/register",
      {
        username: form1.username1,
        password: form1.password1,
        email: form1.email1,
        emailCode: form1.emailCode
      },
      (message) => {
        ElMessage.success(message);
        router.push('/login')
      }
    );
}

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
