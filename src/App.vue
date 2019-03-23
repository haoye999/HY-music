<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import MHeader from 'components/layout/m-header/m-header.vue';
import Tab from 'components/layout/tab/tab.vue';

export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
  },
};
</script>


<style lang="less" scoped>
.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .1s ease-out, transform .1s;
}
.router-fade-enter, .router-fade-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
