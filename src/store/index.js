import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import * as getters from './getters';
import * as actions from './actions';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: process.env.NODE_ENV !== 'production'
});
