<template>
  <div class="singer-item" @click="$emit('select', singer)">
    <div class="singer-item-avatar" v-lazy:background-image="getSingerAvatar(singer.img1v1Url)"></div>
    <h3 class="sing-name">{{ singer.name }}</h3>
  </div>
</template>

<script>
import { httpsify } from 'assets/js/util';

export default {
  name: 'singer-item',
  props: {
    singer: {
      type: Object
    }
  },
  methods: {
    getSingerAvatar(url) {
      return httpsify(`${url}?param=120y120`);
    }
  }
};
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.singer-item {
  display: flex;
  width: 25%;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  .singer-item-avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    background: center / cover no-repeat;
  }
  .sing-name {
    font-size: @font-size-medium-s;
    text-align: center;
    padding: 5px;
  }
}
</style>
