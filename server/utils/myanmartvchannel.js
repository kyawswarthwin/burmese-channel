'use strict';

const cheerio = require('cheerio');

function getM3u8(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await Parse.Cloud.httpRequest({ url: url });
      const $ = cheerio.load(response.text);
      const m3u8Url = $('video source').attr('src');
      response = await Parse.Cloud.httpRequest({ url: m3u8Url });
      const baseUrl = m3u8Url
        .split('/')
        .slice(0, -1)
        .join('/');
      resolve(response.text.replace(/(.*.m3u8)/g, `${baseUrl}/$1`));
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getM3u8
};
