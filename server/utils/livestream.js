'use strict';

function getM3u8Url(account_id, event_id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await Parse.Cloud.httpRequest({
        url: `https://api.new.livestream.com/accounts/${account_id}/events/${event_id}/stream_info`
      });
      response = await Parse.Cloud.httpRequest({
        url: response.data.m3u8_url
      });
      const m3u8Url = response.headers.location;
      resolve(m3u8Url);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getM3u8Url
};
