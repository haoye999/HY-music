<template>
  <header class="m-header">
    <i class="iconfont icon-music icon"></i>
    <h1 class="text">HY Music</h1>
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
  height: 44px;
  text-align: center;
  color: @color-theme;
  line-height: 44px;
  // font-size: 0;
  .icon {
    font-size: 30px;
    vertical-align: middle;
    margin-right: 10px;
    color: @color-icon;
  }
  .text {
    display: inline-block;
    vertical-align: middle;
    font-size: @font-size-large;
  }
}

</style>
