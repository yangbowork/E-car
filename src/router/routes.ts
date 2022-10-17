const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/basic/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/home.vue'),
        meta: {
          title: '浦发银行 E汽融产品',
          keepAlive: false,
        },
      },
      {
        path: 'info',
        component: () => import('@/views/info.vue'),
        meta: {
          title: '授信审批信息确认',
          keepAlive: false,
        },
      },
      {
        path: 'result',
        component: () => import('@/views/result.vue'),
        meta: {
          title: '浦发银行 E汽融产品',
          keepAlive: false,
          usePathKey: 'result',
        },
      },
    ],
  },
];

export default routes;
