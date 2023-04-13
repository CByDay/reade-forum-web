import { createApp } from "vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// 应用实例必须在调用了 .mount() 方法后才会渲染出来
// createApp(App).use(store).use(router).use(ElementPlus).mount("#app");

// 本机
axios.defaults.baseURL = "http://localhost:8089";

const app = createApp(App);
app.use(store).use(router).use(ElementPlus).mount("#app");
