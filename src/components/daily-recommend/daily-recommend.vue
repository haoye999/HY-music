<template>
  <div class="song-list-detail">
    <music-list v-if="songs.length" :songs="songs" :bgImg="songs[0].image" :bgHeight="30">
      <div class="background-dark"></div>
      <div class="time">
        <span class="time-date">{{ time.date }}</span>/<span class="time-month">{{ time.month }}</span>
      </div>
      <div class="title">根据你的音乐口味，为你推荐好音乐</div>
    </music-list>
  </div>
</template>

<script>
import { ERR_OK } from 'api/config';
import { createSong } from 'assets/js/song';
import { getRecommendSongs } from 'src/api/recommend';

import MusicList from 'components/music-list/music-list.vue';

export default {
  name: 'song-list-detail',
  data() {
    return {
      songs: [],
      time: {
        date: 1,
        month: 1
      }
    }
  },
  created() {
    this._getRecommendSongs();
    this.getTime();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getTime() {
      let date = new Date;
      this.time = {
        date: date.getDate().toString().padStart(2, '0'),
        month: (date.getMonth() + 1).toString().padStart(2, '0')
      }
    },
    _getRecommendSongs() {
      getRecommendSongs().then(data => {
        if (data.code === ERR_OK) {
          this.songs = this._normalizeSongs(data.recommend);
        }
      })
    },
    _normalizeSongs(hotSongs) {
      const ret = [];
      hotSongs.forEach(song => {
        ret.push(createSong(song));
      });
      return ret;
    },
  },
  components: {
    MusicList
  }
}
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.song-list-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: @color-highlight-background;
  .background-dark {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .6);
  }
  .time {
    position: absolute;
    top: 25%;
    left: 40px;
    .time-date {
      font-size: @font-size-large-xx;
      padding-right: 3px;
    }
    .time-month {
      font-size: @font-size-medium;
      padding-left: 3px;
    }
  }
  .title {
    position: absolute;
    top: 40%;
    left: 120px;
    font-size: @font-size-small-m;
  }
}
</style>
