<template>
  <div class="preview-info" @click="$emit('select', info)">
    <div ref="imgContent" class="img-content">
      <img v-lazy="imgSrc" alt="封面">
      <div class="mask"></div>
      <div class="play-count" v-if="info.playCount || info.playcount">
        <i class="iconfont icon-listen icon"></i>
        <span class="count">{{ playCount }}</span>
      </div>
    </div>
    <h3 class="title" v-html="info.name"></h3>
    <h4 class="author-name" v-if="info.artist" v-html="info.artist.name"></h4>
  </div>
</template>

<script>
import { httpsify } from 'assets/js/util';

export default {
  name: 'preview-info',
  data() {
    return {
      imgWidth: 140
    };
  },
  props: {
    info: {
      type: Object
    }
  },
  computed: {
    playCount() {
      return `${parseInt(Math.ceil((this.info.playcount ? this.info.playcount : this.info.playCount) / 1e4))}万`;
    },
    imgSrc() {
      return httpsify(`${this.info.picUrl}?param=${this.imgWidth}y${this.imgWidth}&type=webp`);
    }
  },
  mounted() {
    this.imgWidth = this.$refs.imgContent.clientWidth;
  }
};
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.preview-info {
  padding: 5px;
  margin-top: 8px;
  .img-content {
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    img {
      display: block;
      width: 100%;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, .6), rgba(0, 0, 0, 0) 30%) no-repeat;
    }
    .play-count {
      position: absolute;
      right: 3px;
      top: 3px;
      font-size: @font-size-small-s;
      letter-spacing: .5px;
      display: flex;
      align-items: flex-end;
      .icon {
        font-size: @font-size-small-m;
        margin-right: 1px;
      }
    }
  }
  .title {
    padding: 10px 0 5px 0;
    font-size: @font-size-small-x;
    line-height: @font-size-medium;
  }
  .author-name {
    font-size: @font-size-small-s;
  }
}
</style>
