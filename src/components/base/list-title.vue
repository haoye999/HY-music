<template>
  <a :href="href" class="list-title">
    <h1 class="title">
      <span><slot></slot></span>
      <i v-if="showMore" class="iconfont icon-jinru icon"></i>
    </h1>
  </a>
</template>

<script>
export default {
  name: "ListTitle",
  props: {
    // 显示图标
    showMore: {
      type: Boolean,
      default: true,
    },
    href: {
      type: String,
    }
  }
};
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.list-title {
  display: block;
  padding: 8px 0 0 0;
  font-size: @font-size-medium;
  letter-spacing: 1px;
  .title {
    display: flex;
    align-items: center;
    color: @color-text-light;
    .icon {
      color: @color-icon;
    }
  }
}
</style>
