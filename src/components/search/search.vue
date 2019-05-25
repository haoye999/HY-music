<template>
  <div class="search" @mousewheel.prevent @touchmove.prevent>
    <div class="back" @click="$emit('closeSearch')">
      <i class="iconfont icon-back icon"></i>
    </div>
    <div class="search-content">
      search
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.search {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: @color-background;
  .back {
    z-index: 100;
    .icon {
      font-size: @font-size-large;
      color: @color-icon;
    }
  }
  .search-content {
    margin: 50px 0 0 0;
  }
}
</style>
