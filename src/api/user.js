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
