import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

import 'assets/style/index.less';

fastclick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
  loading: 'https://s4.music.126.net/style/web2/img/default/default_album.jpg',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
