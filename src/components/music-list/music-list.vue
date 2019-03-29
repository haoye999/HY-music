<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="iconfont icon-back icon"></i>
    </div>
    <h1 class="music-list-title" v-show="titleShow">{{ title }}</h1>
    <div class="background" ref="background" :style="backgroundPaddingTop">
      <div class="background-image" :style="backgroundImageFilter" v-lazy:background-image="imgObj" ref="backgroundImage"></div>
      <div class="top-block" :style="topBlockOpacity" ref="topBlock"></div>
      <slot></slot>
    </div>
    <scroll @scroll="scroll" :data="songs" :probe-type="probeType" :listen-scroll="listenScroll" class="list" ref="list">
      <div class="song-list-wrapper">
        <div class="loading-container">
          <loading v-show="!songs.length"></loading>
        </div>
        <song-list @select="selectItem" :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from 'components/base/song-list.vue';
import Scroll from 'components/base/scroll/scroll.vue';
import Loading from 'components/base/loading';

import { mapMutations, mapActions } from 'vuex';

import lodash from 'lodash';

const MIN_PADDING_TOP = 40;

export default {
  name: 'music-list',
  props: {
    bgImg: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollY: 0,
      backgroundPaddingTopPx: MIN_PADDING_TOP
    };
  },
  computed: {
    imgObj() {
      return {
        src: `${this.bgImg}?param=400y325`,
        loading: 'http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
      };
    },
    backgroundPaddingTop() {
      this.backgroundPaddingTopPx = Math.max(this.initTop + this.scrollY, MIN_PADDING_TOP);
      return `padding-top: ${this.backgroundPaddingTopPx}px`;
    },
    backgroundImageFilter() {
      return `filter: blur(${(-this.scrollY) / 80 | 0}px)`;
    },
    topBlockOpacity() {
      return `opacity: ${1 - (-this.scrollY) / this.initTop}`;
    },
    titleShow() {
      return this.backgroundPaddingTopPx === MIN_PADDING_TOP;
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  mounted() {
    this.initTop = this.$refs.background.clientHeight;
    this.$refs.list.$el.style.top = `${this.initTop}px`;
  },
  components: {
    Scroll,
    SongList,
    Loading
  }
};
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: @color-background;
  .back {
    z-index: 100;
    .icon {
      font-size: @font-size-large;
      color: @color-icon;
    }
  }
  .music-list-title {
    position: absolute;
    top: 0;
    left: 50px;
    right: 50px;
    height: 40px;
    line-height: 40px;
    z-index: 100;
    // text-align: center;
    color: @color-theme;
    font-size: @font-size-large;
  }
  .background {
    position: relative;
    padding-top: 70%;
    z-index: 10;
    overflow: hidden;
    // transition: all .1s;
    .top-block {
      position: absolute;
      bottom: 0;
      z-index: 100;
      height: 40px;
      width: 100%;
      border-radius: 80% 80% 0 0;
      background: @color-background-o;
    }
    .background-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: background-image .5s;
      background: no-repeat center / cover;
    }
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: @color-background;
    // overflow: hidden;
    .song-list-wrapper {
      padding-top: 10px;
      .loading-container {
        position: absolute;
        width: 30%;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
  }
}
</style>