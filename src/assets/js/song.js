export default class Song {
  constructor({
    id, mid, name, alia, singer, album, albumId, duration, image, url
  }) {
    this.id = id;
    this.mid = mid;
    this.name = name;
    this.alia = alia;
    this.singer = singer;
    this.album = album;
    this.albumId = albumId;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }
}

export function createSong(musicData) {
  function filterSinger(artists) {
    if (!artists) {
      return '';
    }
    const res = [];
    artists.forEach(artist => {
      res.push(artist.name);
    });
    return res.join('/');
  }

  return new Song({
    id: musicData.id,
    mid: musicData.mv,
    name: musicData.name,
    alia: musicData.alia[0],
    singer: filterSinger(musicData.ar),
    album: musicData.al.name,
    albumId: musicData.al.id,
    duration: musicData.dt / 1000,
    image: musicData.al.picUrl,
    url: `https://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`
  });
}
