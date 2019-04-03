<template>
  <div v-if="showFlag" class="play-list" @click="close">
    <div class="play-list-content" @click.stop>
      <div class="play-mode">{{ mode }}</div>
      <scroll :data="sequenceList" class="song-list-wrapper">
        <ul class="song-list">
          <li class="song" v-for="song in sequenceList" :key="song.id">{{ song.name }}</li>
        </ul>
      </scroll>

      <div class="close" @click="close">
        <button>关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Scroll from 'components/base/scroll/scroll.vue';

export default {
  data() {
    return {
      showFlag: false
    }
  },
  computed: {
    ...mapGetters([
      'sequenceList',
      'mode'
    ])
  },
  methods: {
    close() {
      this.showFlag = false;
    },
    open() {
      this.showFlag = true;
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="less" scoped>
@import "~assets/style/variable.less";

.play-list {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .3);
  z-index: 200;
  .play-list-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    min-height: 40%;
    max-height: 60%;
    border-radius: 15px 15px 0 0;
    background: @color-background-o;
    display: flex;
    flex-direction: column;
    .play-mode {
      flex: 0 0;
      height: 30px;
    }
    .song-list-wrapper {
      overflow: auto;
      flex: 1;
      .song-list {
        height: 100%;
      }
    }
    .close {
      width: 100%;
      flex: 0 0;
      button {
        height: 35px;
        width: 100%;
        border: none;
        outline: none;
        border-radius: 15px 15px;
        font-size: @font-size-small-x;
        color: @color-text-light;
        background: @color-background;
        letter-spacing: 4px;
      }      
    }
  }
}
</style>
