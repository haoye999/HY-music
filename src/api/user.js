/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { commonParams } from './config';

export function loginCell(params) {
  const options = {
    method: 'get',
    url: `${commonParams.host}/login/cellphone`,
    params
  };

  return axios(options).then(res => res.data);
}

export function loginMail(params) {
  const options = {
    method: 'get',
    url: `${commonParams.host}/login`,
    params
  };

  return axios(options).then(res => res.data);
}

export function logout() {
  const options = {
    method: 'get',
    url: `${commonParams.host}/logout`
  };

  return axios(options).then(res => res.data);
}

export function getLoginStatus() {
  const options = {
    method: 'get',
    url: `${commonParams.host}/login/status`
  };

  return axios(options).then(res => res.data);
}

export function getUserDetail(params) {
  const options = {
    method: 'get',
    url: `${commonParams.host}/user/detail`,
    params
  };

  return axios(options).then(res => res.data);
}
