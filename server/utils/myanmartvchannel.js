'use strict';

const cheerio = require('cheerio');

function getM3u8Url(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Parse.Cloud.httpRequest({ url: url });
      const $ = cheerio.load(response.text);
      const m3u8Url = $('video source').attr('src');
      resolve(m3u8Url);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getM3u8Url
};
