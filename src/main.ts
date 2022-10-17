import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import router from './router';
import { setupStore } from '@/store';
import './assets/font/iconfont.css';
import './assets/css/index.css';
import './assets/app.css';

import Vconsole from 'vconsole';

if (import.meta.env.VITE_NODE_ENV === 'development') {
  const vConsole = new Vconsole();
  console.log(vConsole);
}

const app = createApp(App);
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});

setupStore(app);
app.mount('#app');
