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
  </div>
</template>

<script>
import MHeader from 'components/layout/m-header/m-header.vue';
import Tab from 'components/layout/tab/tab.vue';
import Player from 'components/player/player.vue';

export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Player
  }
};
</script>


<style lang="less">
</style>
