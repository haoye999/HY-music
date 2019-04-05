<template>
  <div class="player" v-show="playlist.length" @mousewheel.prevent @touchmove.prevent>
    <transition name="normal" :duration="500">
      <div class="normal-player" v-show="fullScreen">
        <div class="background" :style="backgroundImage"></div>
        <div class="top">
          <div class="back" @click="toggleFullScreen">
            <i class="iconfont icon-zhankai"></i>
          </div>
          <div class="title-content">
            <h1 class="title">{{ currentSong.name }}</h1>
            <h2 class="subtitle">{{ currentSong.singer }}</h2>
          </div>
          <div class="share">
            <i class="iconfont icon-share"></i>
          </div>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-container">
              <div class="cd-wrapper">
                <div class="cd rotate" :class="{ pause: !playing }" :style="backgroundImage"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-content">
            <div class="current-time">{{ formatTime(currentTime) }}</div>
            <div class="progress-bar-content">
              <progress-bar ref="progressBarNormal" :percent="percent" @percentChange="percentChange"/>
            </div>
            <div class="duration">{{ formatTime(currentSong.duration) }}</div>
          </div>
          <div class="operators">
            <div class="i-left icon-container">
              <i class="iconfont" :class="modeClass" @click="togglemode"></i>
            </div>
            <div class="i-left icon-container">
              <i class="iconfont icon-verticalright" @click="lastSong" :class="{ disabled: !songReady }"></i>
            </div>
            <div class="i-center icon-container">
              <i :class="[playing ? 'icon-timeout' : 'icon-play-circle', { disabled: !songReady }]" @click="togglePlaying" class="iconfont"></i>
            </div>
            <div class="i-right icon-container">
              <i class="iconfont icon-verticalleft"  :class="{ disabled: !songReady }" @click="nextSong"></i>
            </div>
            <div class="i-right icon-container" @click="openPlayList">
              <i class="iconfont icon-indent"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="toggleFullScreen">
        <div class="mini-progress-bar-container">
          <progress-bar ref="progressBarMini" :percent="percent" @percentChange="percentChange"/>
        </div>
        <div class="avatar rotate" :class="{ pause: !playing }" :style="backgroundImage"></div>
        <div class="text">
          <h2 class="name">{{ currentSong.name }}</h2>
          <p class="desc">{{ currentSong.singer }}</p>
        </div>
        <div class="controls">
          <div class="control icon-container">
            <i :class="[ playing ? 'icon-timeout' : 'icon-play-circle' ]" @click.stop="togglePlaying" class="iconfont"></i>
          </div>
          <div class="control icon-container">
            <i class="iconfont icon-indent" @click.stop="openPlayList"></i>          
          </div>          
        </div>
      </div>
    </transition>
      <audio ref="audio" :src="currentSong.url" @ended="ended" @canplay="canplay" @error="error" @timeupdate="timeupdate"></audio>
    <transition name="bottom-in-out">
      <play-list v-if="showPlayList" ref="playList" @close="closePlayList" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { playMode } from 'assets/js/config';
import { httpsify, shuffle } from 'assets/js/util';

import ProgressBar from 'components/base/progress-bar/progress-bar.vue';
import PlayList from 'components/play-list/play-list.vue';

export default {
  name: 'player',
  data() {
    return {
      songReady: false,
      currentTime: 0,
      showPlayList: false
    };
  },
  computed: {
    modeClass(){
      return this.mode === playMode.sequence ? 'icon-xunhuan' : this.mode === playMode.loop ? 'icon-danquxunhuan' : 'icon-bofangye-caozuolan-suijibofang'
    },
    backgroundImage() {
      return `background: center / cover url(${httpsify(this.currentSong.image)}?param=180y180) no-repeat`;
    },
    percent() {
      return this.currentTime / this.currentSong.duration;
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'sequenceList',
      'playing',
      'currentIndex',
      'mode'
    ])
  },
  methods: {
    openPlayList() {
      this.showPlayList = true;
      this.$nextTick(() => {
        this.$refs.playList.scrollToCurrent();
      })
    },
    closePlayList() {
      this.showPlayList = false;
    },
    togglemode() {
      this.setmode((this.mode + 1) % 3);
      let list = {};
      if (this.mode === playMode.random) {
        list = this.sequenceList;
        list = shuffle(list);
        
        this.resetCurrentSong(list);
        this.setPlaylist(list);
      }
    },
    resetCurrentSong(list) {
      let currentIndex = list.findIndex((song) => {
        return song.id === this.currentSong.id;
      })

      this.setCurrentIndex(currentIndex);
    },
    toggleFullScreen() {
      this.fullScreen ? this.setFullScreen(false) : this.setFullScreen(true);
      this.$nextTick(() => {
        console.log(this.fullScreen);
        this.$refs.progressBarNormal.fresh(this.percent);
        this.$refs.progressBarMini.fresh(this.percent);
      });
    },
    togglePlaying() {
      if (!this.songReady) {
        return;
      }
      this.setPlayingState(!this.playing);
    },
    lastSong() {
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playlist.length - 1;
      }
      this.setCurrentIndex(index);
      this.songReady = false;
    },
    nextSong() {
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex + 1;
      if (index === this.playlist.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      this.songReady = false;
    },
    ended() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.nextSong();
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
    },
    canplay() {
      this.songReady = true;
    },
    error() {
      this.songReady = true;
    },
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
    },
    formatTime(interval) {
      interval = Math.round(interval);
      const minutes = Math.round(interval / 60).toString().padStart(2, '0');
      const seconds = (interval % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    },
    percentChange(percent) {
      this.$refs.audio.currentTime = percent * this.currentSong.duration;
      this.setPlayingState(true);
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setmode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST'
    })
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return;
      }
      this.$nextTick(() => {
        this.$refs.audio.play();
        this.setPlayingState(true);
      });
    },
    playing(newPlaying) {
      const { audio } = this.$refs;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    }
  },
  components: {
    ProgressBar,
    PlayList
  }
};
</script>

<style lang="less" scoped>
@import "~assets/style/variable.less";

.player {
  .normal-player {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 150;
    background: @color-background;
    &.normal-enter-active,
    &.normal-leave-active {
      transition: transform 0.3s, opacity 0.3s;
      .top,
      .middle,
      .bottom {
        transition: transform 0.5s;
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      transform: translate3d(0, 40%, 0);
      opacity: 0;
      .top,
      .middle,
      .bottom {
        transform: scale(0);
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: blur(40px);
      transition: background-image .3s;
    }
    .top {
      position: absolute;
      width: 100%;
      height: 40px;
      display: flex;
      .back {
        width: 40px;
        position: static;
        display: flex;
        align-items: center;
        justify-content: center;
        color: @color-icon;
      }
      .title-content {
        flex: 1;
        padding: 5px 0 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        white-space: nowrap;
        width: 0px;
        .title {
          font-size: @font-size-large;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .subtitle {
          font-size: @font-size-small-x;
          color: @color-text-d;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .share {
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: @color-icon;
      }
    }
    .middle {
      position: absolute;
      top: 40px;
      width: 100%;
      height: 75%;
      .middle-l {
        .cd-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          width: 250px;
          height: 250px;
          background: linear-gradient(
            to bottom,
            #000000 0%,
            #333 51%,
            #000000 100%
          );
          border-radius: 50%;
          .cd-wrapper {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            width: 180px;
            height: 180px;
            background: #45484d;
            border-radius: 50%;
            overflow: hidden;
            .cd {
              width: 100%;
              height: 100%;
              background: center / cover no-repeat;
              transition: background-image .3s;
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      width: 100%;
      bottom: 30px;
      .progress-content {
        display: flex;
        margin-bottom: 10px;
        padding: 0 10px;
        align-items: center;
        .current-time, .duration {
          font-size: @font-size-small-m;
        }
        .progress-bar-content {
          flex: 1;
          padding: 0 10px;
        }
      }
      .operators {
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: @color-icon;
        i {
          font-size: 25px;
        }
        .i-center > i {
          font-size: 50px;
        }
      }
    }
  }

  .mini-player {
    display: flex;
    position: fixed;
    bottom: 0;
    height: 50px;
    width: 100%;
    padding: 5px;
    z-index: 149;
    align-items: center;
    background: @color-highlight-background;
    opacity: .95;
    .mini-progress-bar-container {
      position: absolute;
      top: -6px;
      left: 0;
      width: 100%;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .text {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 0;
      padding-left: 8px;
      justify-content: space-around;
      white-space: nowrap;
      .name {
        font-size: @font-size-medium-s;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .desc {
        font-size: @font-size-small-s;
        color: @color-text-d;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .controls {
      width: 70px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .control {
        // width: 30px;
        // height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
            font-size: 30px;
        }
      }
    }
  }
}
</style>
