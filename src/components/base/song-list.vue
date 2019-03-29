<template>
  <ul class="song-list">
    <li @click="$emit('select', song, index)" v-for="(song, index) in songs" :key="song.id" class="song-item">
      <div class="song-deco-content flex-1">
        <span class="song-deco">{{ index + 1 }}</span>
      </div>
      <div class="song-info flex-10">
        <h2 class="song-name">{{ song.name }}<span class="alia" v-if="song.alia"> ({{ song.alia }}) </span></h2>
        <h4 class="song-desc">{{ getDesc(song) }}</h4>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'song-list',
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer} - ${song.album}`;
    }
  }
};
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.song-list {
  padding-bottom: 50px;
  .song-item {
    display: flex;
    padding: 10px 20px;
    height: 50px;
    align-items: center;
    .song-deco-content {
      margin-right: 8px;
      color: @color-text-d;
    }
    .song-info {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      justify-content: space-between;
      width: 90%;
      white-space: nowrap;
      .song-name {
        font-size: @font-size-medium;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 1px 0;
        .alia {
          color: @color-text-d;
        }
      }
      .song-desc {
        font-size: @font-size-small-m;
        color: @color-text-d;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
