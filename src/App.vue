<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <transition name="root-router-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <player></player>
    <transition name="root-router-fade" mode="out-in">
      <div v-if="tips" class="tips">{{ tips }}</div>
    </transition>
  </div>
</template>

<script>
import MHeader from 'components/layout/m-header/m-header.vue';
import Tab from 'components/layout/tab/tab.vue';
import Player from 'components/player/player.vue';

import { mapGetters, mapMutations } from 'vuex';
import { loginCell, getLoginStatus } from 'api/user';
import { ERR_OK, NEED_LOGIN } from 'api/config';

export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Player
  },
  created() {
    this._getLoginStatus();
  },
  computed: {
    ...mapGetters([
      'loggedin',
      'tips'
    ])
  },
  methods: {
    _getLoginStatus() {
      getLoginStatus().then(data => {
        if (data.code === ERR_OK) {
          this.setLoggedin(true);
          this.setUserId(data.profile.userId);
        }
      }).catch(e => {
        if(e.response.data.code === NEED_LOGIN) {
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
.tips {
  position: fixed;
  bottom: 40%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: greenyellow;
  background: rgba(0, 0, 0, .3);
  z-index: 500;
}
</style>
