<template>
  <div class="play-list" @click="$emit('close')">
    <div class="main-content play-list-content" @click.stop>
      <div class="play-mode">
        <div class="icon-container">
          <i class="iconfont" :class="modeClass"></i>
        </div>
        <h3 class="play-mode-name">{{ currentMode }}</h3>
      </div>
      <scroll ref="scroll" :data="sequenceList" class="song-list-wrapper">
        <ul class="song-list">
          <li class="song" ref="songList" @click="selectItem(song, index)" :class="{ 'song-active': index === indexSequenceList }" v-for="(song, index) in sequenceList" :key="song.id">
            <h3 class="song-title"><span class="song-name">{{ song.name }}</span><span class="song-singer"> - {{ song.singer }}</span></h3>
            <div class="delete-wrapper" @click.stop="deleteItem(song)">
              <i class="iconfont icon-delete"></i>
            </div>
          </li>
        </ul>
      </scroll>

      <div class="close" @click="$emit('close')">
        <button>关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { playMode } from 'assets/js/config';
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
      'playlist',
      'mode',
      'currentIndex',
      'current',
      'currentSong'
    ]),
    currentMode() {
      if (this.mode === playMode.sequence) {
        return '列表循环';
      } else if (this.mode === playMode.loop) {
        return '单曲循环';
      } else if (this.mode === playMode.random) {
        return '随机播放';
      } else {
        return '错了';
      }
    },
    indexSequenceList() {
      this._index = this.sequenceList.findIndex((song) => {
        return song.id === this.currentSong.id;
      })
      return this._index;
    },
    modeClass(){
      return this.mode === playMode.sequence ? 'icon-xunhuan' : this.mode === playMode.loop ? 'icon-danquxunhuan' : 'icon-bofangye-caozuolan-suijibofang'
    },
  },
  methods: {
    scrollToCurrent() {
      this.$nextTick(() => {
        let index = Math.max(this._index - 4, 0);
        this.$refs.scroll.scrollToElement(this.$refs.songList[index], 300);
      })
    },
    selectItem(selectSong, index) {
      let _index = index;
      if (this.mode === playMode.random) {
        _index = this.playlist.findIndex((song) => {
          return song.id === selectSong.id;
        })
      }
      this.setCurrentIndex(_index);
      this.scrollToCurrent();
    },
    deleteItem(song) {
      this.deleteSong(song);
    },
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX'
    }),
    ...mapActions([
      'deleteSong'
    ])
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
    max-height: 70%;
    border-radius: 20px 20px 0 0;
    background: @color-background-o;
    display: flex;
    flex-direction: column;
    .play-mode {
      flex: 0 0;
      height: 50px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      i {
        font-size: @font-size-large-x;
        color: @color-icon;
      }
      .play-mode-name {
        font-size: @font-size-medium-x;
        letter-spacing: 1px;
        color: @color-theme;
        padding-left: 3px;
      }
    }
    .song-list-wrapper {
      overflow: auto;
      flex: 1;
      .song-list {
        height: 100%;
        .song {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          .song-title {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .song-singer {
              color: @color-text-d;
              font-size: @font-size-small-m;
            }
          }
          &.song-active {
            color: @color-icon;
            .song-name {
              &::before {
                font-family: "iconfont" !important;
                font-size: 16px;
                font-style: normal;
                padding-right: 10px;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                content: '\e7ca'
              }
            }            
          }
          i {
            color: @color-text-d;
            font-size: @font-size-large;
          }
        }
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
