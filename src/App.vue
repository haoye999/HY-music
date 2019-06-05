<template>
  <div id="app">
    <m-header @openSearch="handleOpenSearch" />
    <tab />
    <transition :name="rootRouteDirection" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <player />
    <transition name="right-in-out" mode="out-in">
      <search v-if="openSearch" @closeSearch="handleCloseSearch" />
    </transition>
    <transition name="tips" mode="out-in">
      <div v-show="tips" class="tips">{{ tips }}</div>
    </transition>
  </div>
</template>

<script>
import MHeader from 'components/layout/m-header/m-header.vue';
import Tab from 'components/layout/tab/tab.vue';
import Player from 'components/player/player.vue';
import Search from 'components/search/search.vue';

import { mapGetters, mapMutations } from 'vuex';
import { tabs } from 'assets/js/config';
import { getLoginStatus } from 'api/user';
import { ERR_OK, NEED_LOGIN } from 'api/config';

export default {
  name: 'App',
  data() {
    return {
      openSearch: false,
      rootRouteDirection: 'root-router-l2r'
    };
  },
  components: {
    MHeader,
    Tab,
    Player,
    Search
  },
  created() {
    this._getLoginStatus();
  },
  computed: {
    ...mapGetters(['loggedin', 'tips'])
  },
  methods: {
    handleOpenSearch() {
      this.openSearch = true;
    },
    handleCloseSearch() {
      this.openSearch = false;
    },
    _getLoginStatus() {
      getLoginStatus()
        .then(data => {
          if (data.code === ERR_OK) {
            this.setLoggedin(true);
            this.setUserId(data.profile.userId);
          }
        })
        .catch(e => {
          if (e.response.data.code === NEED_LOGIN) {
            this.setLoggedin(false);
          }
        });
    },
    ...mapMutations({
      setLoggedin: 'SET_LOGGEDIN',
      setUserId: 'SET_USER_ID',
      setTips: 'SET_TIPS'
    })
  },
  watch: {
    tips(newTips) {
      if (newTips !== '') {
        setTimeout(() => {
          this.setTips('');
        }, 2000);
      }
    },
    $route(to, from, next) {
      const fromIndex = tabs.findIndex(
        tab => tab.path === '/' + from.path.split('/').pop()
      );
      const toIndex = tabs.findIndex(
        tab => tab.path === '/' + to.path.split('/').pop()
      );

      this.rootRouteDirection =
        fromIndex > toIndex ? 'root-router-l2r' : 'root-router-r2l';
    }
  }
};
</script>


<style lang="less">
@import '~assets/style/variable.less';

.tips {
  position: fixed;
  top: 5px;
  left: 10%;
  height: 40px;
  width: 80%;
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
  background: @color-background-o;
  color: @color-theme;
  z-index: 500;
}
</style>
