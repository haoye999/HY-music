<template>
  <div class="progress-bar">
    <div class="progress-wrapper" @click.stop="click" ref="progressWrapper">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" 
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend.prevent="progressTouchEnd"
        ref="btn"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      touch: {}
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && newPercent <= 1 && !this.touch.init)
      this.fresh(newPercent);
    }
  },
  methods: {
    click(e) {
      // progress 和 progressWrap 原始宽度相同
      let newPercent = (e.clientX - e.target.getBoundingClientRect().left) / e.target.clientWidth;
      this.fresh(newPercent);
      this.$emit('percentChange', newPercent);
    },
    progressTouchStart(e) {
      this.touch.init = true;
      this.touch.startX = e.touches[0].pageX;
      // 没移动会有问题
      this.touch.newPercent = this.percent;
      console.log(this.touch.newPercent);
    },
    progressTouchMove(e) {
      if (!this.touch.init) {
        return;
      }

      let deltaX = (e.touches[0].pageX - this.touch.startX) / this.$refs.progressWrapper.clientWidth;
      // this.percent += deltaX;
      this.touch.newPercent = this.percent + deltaX;
      this.fresh(this.touch.newPercent);
    },
    progressTouchEnd() {
      this.$emit('percentChange', this.touch.newPercent);
      this.touch.init = false;
    },
    fresh(newPercent) {
      newPercent = Math.min(Math.max(newPercent, 0), 1);
      const currentPos = this.$refs.progressWrapper.clientWidth * newPercent - 5;
      this.$refs.progress.style.transform = `scaleX(${newPercent})`;
      this.$refs.btn.style.transform = `translate3d(${currentPos}px, -6px, 0)`;
    }
  }
};
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.progress-bar {
  width: 100%;
  height: 12px;
  .progress-wrapper {
    position: relative;
    padding: 5px 0;
    width: 100%;
    height: 100%;
    background: @color-text-d;
    background-clip: content-box;
    .progress {
      width: 100%;
      height: 100%;
      background: @color-text;
      transform-origin: left;
      transform: scaleX(0);
    }
    .progress-btn-wrapper {
      position: relative;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      overflow: hidden;
      transform: translate(0, -6px);
      background: @color-theme;
      display: flex;
      align-items: center;
      justify-content: center;
      .progress-btn {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: @color-icon;
      }
    }
  }
}
</style>
