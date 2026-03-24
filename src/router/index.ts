import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/HomePage.vue'),
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('@/pages/SearchPage.vue'),
        },
        {
          path: 'drama/:bookId',
          name: 'detail',
          component: () => import('@/pages/DetailPage.vue'),
        },
        {
          path: 'watch/:bookId/:chapterId',
          name: 'watch',
          component: () => import('@/pages/WatchPage.vue'),
        },
      ],
    },
  ],
});

export default router;
