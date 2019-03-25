'use strict';

const puppeteer = require('puppeteer');

function getM3u8(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Parse.Cloud.httpRequest({ url: url });
      const baseUrl = url
        .split('/')
        .slice(0, -1)
        .join('/');
      const m3u8 = response.text.replace(/(.*.m3u8)/g, `${baseUrl}/$1`);
      resolve(m3u8);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getM3u8
};
