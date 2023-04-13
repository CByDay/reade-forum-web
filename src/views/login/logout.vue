<template>
  <div>xxxx</div>
  <el-button type="warning" @click="doLogout">Warning</el-button>
</template>

<script setup>
// export default {

import { get } from "@/api/login";
import router from "@/router";
import { ElMessage } from "element-plus";

// }
const doLogout = () => {
  get("/api/auth/logout", (message) => {
    ElMessage.success(message);
    router.push("/login");
  });
};
</script>

<style scoped></style>
