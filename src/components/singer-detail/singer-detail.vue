<template>
  <div class="singer-detail">
    <music-list :bgImg="httpsify(artist.picUrl)" :songs="hotSongs" :title="artist.name">
      <div class="share">
        <i class="iconfont icon-share icon"></i>
      </div>
      <div class="base-info-container">
        <h2 class="singer-name">{{ artist.name }}<span v-show="artist.alias && artist.alias.length"> ({{ artist.alias && artist.alias[0] }}) </span></h2>
        <button class="follow" :class="{ followed: artist.followed }" @click="_toggleFollow">
          <i class="iconfont icon" :class="[artist.followed ? 'icon-check-circle' : 'icon-add']"></i><span class="follow-text">{{ artist.followed ? '已收藏' : '收藏' }}</span>
        </button>
      </div>
    </music-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { ERR_OK } from 'api/config';
import { getArtist, toggleFollow } from 'api/singerDetail';
import { createSong } from 'assets/js/song';
import { httpsify } from 'assets/js/util';

import MusicList from 'components/music-list/music-list.vue';

export default {
  name: 'singer-detail',
  data() {
    return {
      artist: {},
      hotSongs: []
    };
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this.initSinger();
    this._getArtist(this.singer.id);
  },
  methods: {
    httpsify: {
      httpsify(url);
    },
    initSinger() {
      // 第一次进入，为了响应速度，先使用VUEX的数据
      this.artist = this.singer;
    },
    back() {
      this.$router.go(-1);
    },
    _getArtist(id) {
      // 当前页面刷新，回退到上一页
      if (!this.singer.id) {
        this.back();
        return;
      }
      getArtist({
        id
      }).then(data => {
        if (data.code === ERR_OK) {
          this.artist = data.artist;
          this.hotSongs = this._normalizeSongs(data.hotSongs);
        }
      }).catch(err => {
        throw (err);
      });
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
    _toggleFollow() {
      toggleFollow({
        id: this.artist.id,
        t: ~~!this.artist.followed
      }).then(data => {
        if (data.code === ERR_OK) {
          this.artist.followed = !this.artist.followed;
        }
      });
    }
  },
  components: {
    MusicList
  }
};
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: @color-highlight-background;
  .share {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
    .icon {
      font-size: @font-size-large;
      color: @color-icon;
    }
  }
  .base-info-container {
    position: relative;
    .singer-name {
      position: absolute;
      left: 10px;
      bottom: 60px;
      font-size: @font-size-large;
      color: @color-theme;
    }
    .follow {
      position: absolute;
      bottom: 40px;
      right: 16px;
      height: 30px;
      width: 86px;
      border: none;
      outline: none;
      border-radius: 15px 15px;
      font-size: @font-size-small-x;
      color: @color-text-light;
      background: @color-icon;
      letter-spacing: 4px;
      .icon {
        font-size: @font-size-small-x;
      }
      &.followed {
        background: rgba(0, 0, 0, .3);
      }
    }
  }
}
</style>
