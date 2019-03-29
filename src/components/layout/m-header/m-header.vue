<template>
  <header class="m-header">
    <router-link class="person-content" to="/login">
      <i class="iconfont icon-person person"></i>
    </router-link>
    <div class="space-hold"></div>
    <div class="logo-content">
      <i class="iconfont icon-music logo"></i>
      <h1 class="title">HY Music</h1>
    </div>
    <div class="space-hold"></div>
    <div class="search-content">
      <i class="iconfont icon-search search"></i>
    </div>
  </header>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';
@import '~assets/style/mixin';

.m-header {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 44px;
  width: 100%;
  z-index: 10;
  padding: 0 10px;
  text-align: center;
  color: @color-theme;
  line-height: 44px;
  background: @color-background;
  // font-size: 0;
  .person-content {
    .person {
      font-size: @font-size-large-x;
      color: @color-icon;
    }
  }
  .logo-content {
    .logo {
      font-size: 30px;
      vertical-align: middle;
      margin-right: 10px;
      color: @color-icon;
    }
    .title {
      display: inline-block;
      vertical-align: middle;
      font-size: @font-size-large;
    }
  }
  .search-content {
    .search {
      font-size: @font-size-large-x;
      color: @color-icon;
    }
  }
}

</style>
