<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="dot in dots" :key="dot" :class="{ active: currentPageIndex === dot - 1 }"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import lodash from 'lodash';

export default {
  name: "Slider",
  data() {
    return {
      dots: 0,
      currentPageIndex: 0,
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    this.$nextTick(function () {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();

      if (this.autoPlay) {
        this._play();
      }

      window.addEventListener('resize', _.debounce(() => {
        this._setSliderWidth(true);
        this.slider.refresh();
      },300));
    })
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;
      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].classList.add('slider-item');
        this.children[i].style.width = sliderWidth + 'px';
        width += sliderWidth;
      }

      // 循环，首尾添加
      if (this.loop && !isResize) {
        width += sliderWidth * 2;
      }

      this.$refs.sliderGroup.style.width = width + 'px';
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400,
        },
      });

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        this.currentPageIndex = pageIndex;

        if (this.autoPlay) {
          this._play()
        }
      })
    },
    _initDots() {
      this.dots = this.children.length;
    },
    _play() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slider.next();
      }, this.interval);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="less">
@import "~assets/style/variable.less";

.slider {
  min-height: 1px;
  overflow: hidden;
  .slider-group {
    .slider-item {
      float: left;
      position: relative;
      a {
        display: block;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: @color-text-l;
      &.active {
        background: @color-sub-theme;
      }
    }
  }
}
</style>
