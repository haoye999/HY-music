/* eslint-disable import/prefer-default-export */
import { playMode } from 'assets/js/config';
import { shuffle } from 'assets/js/util';
import * as types from './mutation-types';

function findIndex(list, song) {
  return list.findIndex(item => song.id === item.id);
}

export function selectPlay({ commit, state }, { list, index }) {
  let newList = list;
  let newIndex = index;
  commit(types.SET_SEQUENCE_LIST, newList);
  if (state.mode === playMode.random) {
    newList = shuffle(newList);
    newIndex = findIndex(newList, list[index]);
  }
  commit(types.SET_PLAYLIST, newList);
  commit(types.SET_CURRENT_INDEX, newIndex);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
}

export function deleteSong({ commit, state }, song) {
  const playlist = state.playlist.slice();
  const sequenceList = state.sequenceList.slice();
  let { currentIndex } = state;
  const pIndex = findIndex(playlist, song);
  const sIndex = findIndex(sequenceList, song);
  playlist.splice(pIndex, 1);
  sequenceList.splice(sIndex, 1);

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--;
  }

  commit(types.SET_PLAYLIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);
}
