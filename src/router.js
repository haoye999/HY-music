import Vue from 'vue';
import Router from 'vue-router';
// eslint-disable-next-line import/no-unresolved
import Recommend from 'components/recommend/recommend.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'rank',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ 'components/rank/rank.vue')
    },
    {
      path: '/singer',
      name: 'singer',
      component: () => import('components/singer/singer.vue'),
      children: [
        {
          path: ':id',
          name: 'singer-detail',
          component: () => import('components/singer-detail/singer-detail.vue')
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('components/search/search.vue')
    },
    {
      path: '/dj',
      name: 'dj',
      component: () => import('components/dj/dj.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('components/login/login.vue'),
      children: [
        {
          path: '/login/logincell',
          name: 'logincell',
          component: () => import('components/login/login-cell.vue')
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('components/user/user.vue')
    }
  ]
});
