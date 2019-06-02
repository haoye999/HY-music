/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { commonParams } from './config';

export function searchSuggest(params) {
  const options = {
    method: 'GET',
    url: `${commonParams.host}/search/suggest`,
    params: {
      ...params,
      type: 'mobile'
    }
  };

  return axios(options).then(res => res.data);
}

export function searchHot() {
  const options = {
    method: 'GET',
    url: `${commonParams.host}/search/hot`
  };

  return axios(options).then(res => res.data);
}
