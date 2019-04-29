export default class Song {
  constructor({
    id, mid, name, alia, singer, album, albumId, duration, image, url, useful
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
    this.useful = useful;
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

  if (musicData.ar) {
    return new Song({
      id: musicData.id,
      mid: musicData.mv || musicData.mvid,
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
  return new Song({
    id: musicData.id,
    mid: musicData.mv || musicData.mvid,
    name: musicData.name,
    alia: musicData.alias[0],
    singer: filterSinger(musicData.artists),
    album: musicData.album.name,
    albumId: musicData.album.id,
    duration: musicData.duration / 1000,
    image: musicData.album.picUrl,
    url: `https://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`
  });
}
