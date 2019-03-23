import axios from 'axios';
import { commonParams } from './config';

export function getBanners() {
  const options = {
    method: 'get',
    url: commonParams.host + '/banner',
  };

  return axios(options).then(req => req.data);
}

export function getPersonalized(params) {
  const options = {
    method: 'get',
    url: commonParams.host + '/personalized',
    params,
  };

  return axios(options).then(req => req.data);
}
