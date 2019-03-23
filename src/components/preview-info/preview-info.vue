<template>
  <div class="preview-info">
    <div ref="imgContent" class="img-content">
      <img v-lazy="imgSrc" alt="封面">
      <div class="mask"></div>
      <div class="play-count">
        <i class="iconfont icon-listen icon"></i>
        <span class="count">{{ playCount }}</span>
      </div>
    </div>
    <h3 class="title" v-html="info.name"></h3>
  </div>
</template>

<script>
export default {
  name: 'preview-info',
  data() {
    return {
      imgWidth: 140,
    }
  },
  props: {
    info: {
      type: Object,
    }
  },
  computed: {
    playCount() {
      return `${parseInt(Math.ceil(this.info.playCount / 1e4))}万`;
    },
    imgSrc() {
      return `${this.info.picUrl}?param=${this.imgWidth}y${this.imgWidth}&type=webp`;
    }
  },
  mounted() {
    this.imgWidth = this.$refs.imgContent.clientWidth;
  }
}
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.preview-info {
  padding: 1.5px;
  margin-top: 8px;
  .img-content {
    border-radius: 3px;
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
    padding: 10px 0 10px 0;
    font-size: @font-size-small-m;
    line-height: @font-size-medium;
    letter-spacing: 1px;
  }
}
</style>
