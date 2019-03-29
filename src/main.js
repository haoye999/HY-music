// import 'babel-polyfill';
import Vue from 'vue';
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store/';
import './registerServiceWorker';


// eslint-disable-next-line import/no-unresolved
import 'assets/style/index.less';

axios.defaults.withCredentials = true;

fastclick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
  loading: 'https://s4.music.126.net/style/web2/img/default/default_album.jpg'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
