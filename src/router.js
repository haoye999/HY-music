import Vue from 'vue';
import Router from 'vue-router';
import Recommend from 'components/recommend/recommend.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'recommend',
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
    },
    {
      path: '/rank',
      name: 'rank',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ 'components/rank/rank.vue'),
    },
    {
      path: '/singer',
      name: 'singer',
      component: () => import('components/singer/singer.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('components/search/search.vue'),
    },
  ],
});
