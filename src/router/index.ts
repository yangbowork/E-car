import { createRouter, createWebHashHistory, Router } from 'vue-router';
import routes from './routes';

const router: Router = createRouter({
  history: createWebHashHistory('/'),
  routes: routes,
});

// 将routes中meta.title设置为页面标题
router.beforeEach(async (_to, _from, next) => {
  if (_to.meta.title) {
    document.title = _to.meta.title;
  } else {
    document.title = 'H5';
  }

  next();
});

export default router;
