/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { commonParams } from './config';

export function getSongListDetail(params) {
  const options = {
    method: 'GET',
    url: `${commonParams.host}/playlist/detail`,
    params
  };

  return axios(options).then(res => res.data);
}
