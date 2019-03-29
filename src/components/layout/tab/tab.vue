<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/dj">
      <span class="tab-link">电台
      </span>
    </router-link>
  </div>
</template>

<script>
export default { };
</script>

<style scoped lang="less">
@import "~src/assets/style/variable.less";

.tab {
  display: flex;
  position: fixed;
  top: 44px;
  left: 0;
  height: 44px;
  width: 100%;
  line-height: 44px;
  font-size: @font-size-medium;
  z-index: 10;
  background: @color-background;
  .tab-item {
    flex: 1;
    text-align: center;
    .tab-link {
      padding-bottom: 5px;
      color: @color-text-l;
    }
    &.router-link-active {
      .tab-link {
        color: @color-theme;
        border-bottom: 2px solid @color-theme;
      }
    }
  }
}
</style>
