<template>
  <div class="catalog-btn">
    <div class="catalog-icon"><slot></slot></div>
    <h3 class="catalog-title">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: 'catalog-btn',
  props: {
    title: String,
    default: '分类',
  }
}
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.catalog-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  .catalog-icon {
    padding: 12px;
    border-radius: 50%;
    background: grey;
    .icon {
      font-size: @font-size-large-x;
      color: #fff;
    }
  }
  .catalog-title {
    padding-top: 10px;
    flex-grow: 1;
    font-size: @font-size-small-x;
    letter-spacing: .8px;
  }
}
</style>
