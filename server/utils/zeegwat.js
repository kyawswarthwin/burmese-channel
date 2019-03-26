'use strict';

function getM3u8Url(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Parse.Cloud.httpRequest({
        url: 'https://www.zeegwat.com/_api/jsonfile/zeegwat/v1/liveTv/index.json'
      });
      const channels = response.data.data.filter(data => data.category_id === '6')[0].category_data;
      const m3u8Url = channels.filter(data => data.ChannelId === id)[0].ChannelUrl;
      resolve(m3u8Url);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getM3u8Url
};
