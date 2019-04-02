import { playMode } from 'assets/js/config';

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  loggedin: true,
  userId: 0,
  tips: ''
};

export default state;
