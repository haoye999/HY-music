/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
export function httpsify(url = '') {
  return url.replace(/http:/, 'https:');
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(list) {
  const result = list.slice(0);
  for (let i = 0; i < result.length; i++) {
    const random = getRandom(0, result.length - 1);
    [result[i], result[random]] = [result[random], result[i]];
  }

  return result;
}
