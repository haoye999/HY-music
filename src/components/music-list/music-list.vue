<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="iconfont icon-back icon"></i>
    </div>
    <h1 class="music-list-title" v-show="titleShow">{{ title }}</h1>
    <div class="background" ref="background" :style="backgroundPaddingTop">
      <div class="background-image" ref="backgroundImage"></div>
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
import { httpsify } from 'assets/js/util';

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
    bgHeight: {
      type: Number,
      default: 70
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
    backgroundPaddingTop() {
      this.backgroundPaddingTopPx = Math.max(this.initTop + this.scrollY, MIN_PADDING_TOP);
      return `padding-top: ${this.backgroundPaddingTopPx}px`;
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
    this.throttledUpdateBGImgBlur = _.throttle(this.updateBGImgBlur, 50);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    loadImage() {
      if (this.bgImg === '') {
        return;
      }
      let image = new Image();
      image.src = `${httpsify(this.bgImg)}?param=400y325`;
      image.onload = () => {
        this.$refs.backgroundImage.style.backgroundImage = `url(${httpsify(this.bgImg)}?param=400y325)`;
      }
    },
    scroll(pos) {
      this.scrollY = pos.y;
      this.throttledUpdateBGImgBlur();
    },
    updateBGImgBlur() {
      if (this.backgroundPaddingTopPx === MIN_PADDING_TOP) {
        return;
      }
      this.$refs.backgroundImage.style.filter = `blur(${Math.floor((-this.scrollY) / 50)}px)`;
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    ...mapMutations({
      setTips: 'SET_TIPS'
    }),
    ...mapActions([
      'selectPlay'
    ])
  },
  mounted() {
    this.initTop = this.$refs.background.clientWidth * this.bgHeight / 100;
    this.$refs.background.style.paddingTop = `${this.initTop}px`;
    this.$refs.list.$el.style.top = `${this.initTop}px`;
    this.loadImage();
  },
  watch: {
    bgImg() {
      this.loadImage();
    }
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
    right: 20px;
    height: 40px;
    line-height: 40px;
    z-index: 100;
    // text-align: center;
    color: @color-theme;
    font-size: @font-size-large;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
      background: no-repeat center / cover url(https://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg);
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
