'use strict';

const puppeteer = require('puppeteer');

function getM3u8Url(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      await page.goto(url);
      const m3u8Url = await page.evaluate(
        () => document.querySelector('div.mobileonly video source').src
      );
      await browser.close();
      resolve(m3u8Url);
    } catch (error) {
      reject(error);
    }
  });
}

function getM3u8(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const m3u8Url = await getM3u8Url(url);
      const response = await Parse.Cloud.httpRequest({ url: m3u8Url });
      const baseUrl = m3u8Url
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
  getM3u8Url,
  getM3u8
};
