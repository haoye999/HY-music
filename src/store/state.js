import { playMode } from 'assets/js/config';

const state = {
  songList: {},
  singer: {},
  tips: '',
  userId: 0,
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  loggedin: true,
  loginWay: ''
};

export default state;
