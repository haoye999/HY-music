<template>
  <ul class="cat-list">
    <li class="cat-list-item"
      :class="[{'cat-list-item-active': listItemKey === listItemActive}, {disabled: disabled}]"
      v-for="(listItem, listItemKey) in listItems" :key="listItemKey"
      :data-cat="listItemKey"
      @click="disabled || $emit('changeList', listItemKey)"
    >{{ listItem }}</li>
  </ul>
</template>

<script>
export default {
  name: 'cat-list',
  props: {
    listItems: {
      type: Object,
      default: { 1: '分类1', 2: '分类2' }
    },
    listItemActive: {
      type: String,
      default: '0'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.cat-list {
  font-size: @font-size-medium;
  white-space: nowrap;
  .cat-list-item {
    display: inline-block;
    padding-right: @font-size-large;
    color: @color-text;
    transition: color .3s;
  }
  .cat-list-item-active {
    color: @color-theme;
  }
  .disabled {
    color: @color-disabled;
  }
}
</style>
