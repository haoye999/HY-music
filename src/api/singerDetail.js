/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { commonParams } from './config';

export function getArtist(params) {
  const options = {
    method: 'GET',
    url: `${commonParams.host}/artists`,
    params
  };

  return axios(options).then(res => res.data);
}

export function toggleFollow(params) {
  const options = {
    method: 'GET',
    url: `${commonParams.host}/artist/sub`,
    params
  };

  return axios(options).then(res => res.data);
}
