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

module.exports = {
  getM3u8Url
};
