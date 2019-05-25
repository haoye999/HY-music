<template>
  <div id="app">
    <m-header @openSearch="handleOpenSearch" />
    <tab />
    <transition name="root-router-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <player />
    <search v-if="openSearch" @closeSearch="handleCloseSearch" />
    <transition name="tips" mode="out-in">
      <div v-if="tips" class="tips">{{ tips }}</div>
    </transition>
  </div>
</template>

<script>
import MHeader from 'components/layout/m-header/m-header.vue';
import Tab from 'components/layout/tab/tab.vue';
import Player from 'components/player/player.vue';
import Search from 'components/search/search.vue';

import { mapGetters, mapMutations } from 'vuex';
import { loginCell, getLoginStatus } from 'api/user';
import { ERR_OK, NEED_LOGIN } from 'api/config';

export default {
  name: 'App',
  data() {
    return {
      openSearch: false
    }
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
    tips(newTips, oldTips) {
      if (newTips !== '') {
        setTimeout(() => {
          this.setTips('');
        }, 2000);
      }
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
