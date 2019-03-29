// /* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { commonParams } from './config';

export function getTopArtists(params) {
  const options = {
    method: 'GET',
    url: `${commonParams.host}/top/artists`,
    params
  };

  return axios(options).then(res => res.data);
}

export function getArtistList(params) {
  const options = {
    method: 'GET',
    url: `${commonParams.host}/artist/list`,
    params
  };

  return axios(options).then(res => res.data);
}
