<template>
  <div class="tab">
    <router-link
      v-for="tab of tabs"
      :key="tab.index"
      tag="div"
      class="tab-item"
      :to="tab.path"
    >
      <span class="tab-link">{{ tab.title }}</span>
    </router-link>
  </div>
</template>

<script>
import { tabs } from 'assets/js/config';

export default {
  data() {
    return {
      tabs
    };
  }
};
</script>

<style scoped lang="less">
@import '~src/assets/style/variable.less';

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
