<template>
  <div class="song-list-detail">
    <music-list :bgImg="songList.picUrl" :songs="songs" :title="songList.name">
      <div class="base-info-container">
        <h2 class="singer-name">{{ songList.name }}</h2>
      </div>
    </music-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSongListDetail } from 'src/api/songListDetail';
import { ERR_OK } from 'api/config';
import { createSong } from 'assets/js/song';

import MusicList from 'components/music-list/music-list.vue';

export default {
  name: 'song-list-detail',
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'songList'
    ])
  },
  created() {
    console.log(this.songList);
    this._getSongListDetail();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    _getSongListDetail() {
      if (!this.songList.id) {
        this.back();
      }
      getSongListDetail({
        id: this.songList.id
      }).then(data => {
        if (data.code === ERR_OK) {
          console.log(data);
          this.songs = this._normalizeSongs(data.playlist.tracks);
        }
      })
    },
    _normalizeSongs(hotSongs) {
      const ret = [];
      hotSongs.forEach(song => {
        if (song.id && song.al.id) {
          ret.push(createSong(song));
        }
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
  .base-info-container {
    position: relative;
    .singer-name {
      position: absolute;
      left: 10px;
      bottom: 60px;
      font-size: @font-size-large;
      color: @color-theme;
    }
  }
}
</style>
