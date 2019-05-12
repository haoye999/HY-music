/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

/**
 * 将 http 请求转换为 https
 * @param {string} url
 */
export function httpsify(url = '') {
  return url.replace(/http:/, 'https:');
}

/**
 * 生成随机整数
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
function getRandom(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 打乱数组
 * @param {array} list 待打乱数组
 */
export function shuffle(list) {
  const result = list.slice(0);
  for (let i = 0; i < result.length; i++) {
    const random = getRandom(0, result.length - 1);
    [result[i], result[random]] = [result[random], result[i]];
  }

  return result;
}

/**
 * 解析歌词
 * @param {string} lyric 待解析歌词(字符串)
 */
export function parseLyric(lyric) {
  const lyricSentence = lyric.split('\n');
  lyricSentence.pop();
  const result = [];
  let padNum = 5;

  while (padNum--) {
    result.push({
      startTime: padNum - Number.MAX_SAFE_INTEGER,
      sentence: ''
    });
  }

  lyricSentence.forEach(item => {
    if (item === '') {
      return;
    }
    const regExp = /\[(.*)\](.*)/;
    // eslint-disable-next-line prefer-const
    let [, startTime, sentence] = item.match(regExp);
    if (sentence === '') {
      return;
    }
    const startTimeArr = startTime.split(':');
    startTime = startTimeArr[0] * 60 + parseFloat(startTimeArr[1]);

    result.push({
      startTime,
      sentence
    });
  });

  padNum = 5;

  while (padNum--) {
    result.push({
      startTime: Number.MAX_SAFE_INTEGER - padNum,
      sentence: ''
    });
  }

  return result;
}
