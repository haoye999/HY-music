import axios from 'axios';
import { commonParams } from './config';

export function getBanners() {
  const options = {
    method: 'GET',
    url: `${commonParams.host}/banner`
  };

  return axios(options).then(res => res.data);
}

export function getPersonalized(params) {
  const options = {
    method: 'GET',
    url: `${commonParams.host}/personalized`,
    params
  };

  return axios(options).then(res => res.data);
}

export function getRecommendResource(params) {
  const options = {
    method: 'GET',
    url: `${commonParams.host}/recommend/resource`,
    params
  };

  return axios(options).then(res => res.data);
}

export function getAlbumNewest() {
  const options = {
    method: 'GET',
    url: `${commonParams.host}/album/newest`
  };

  return axios(options).then(res => res.data);
}

export function getDjRecommend() {
  const options = {
    method: 'GET',
    url: `${commonParams.host}/dj/recommend`
  };

  return axios(options).then(res => res.data);
}
