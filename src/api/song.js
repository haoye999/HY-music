/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { commonParams } from './config';

export function checkUseful(params) {
  const options = {
    method: 'GET',
    url: `${commonParams.host}/check/music`,
    params
  };

  return axios(options).then(res => res.data);
}
