/* eslint-disable import/prefer-default-export */
export const singer = state => state.singer;

export const playing = state => state.playing;

export const fullScreen = state => state.fullScreen;

export const playlist = state => state.playlist;

export const sequenceList = state => state.sequenceList;

export const mode = state => state.mode;

export const currentIndex = state => state.currentIndex;

export const currentSong = state => state.playlist[state.currentIndex] || {};

export const loggedin = state => state.loggedin;

export const userId = state => state.userId;

export const tips = state => state.tips;

export const songList = state => state.songList;
