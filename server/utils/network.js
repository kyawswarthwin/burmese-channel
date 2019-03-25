'use strict';

function checkUrlAlive(url) {
  return new Promise(async (resolve, reject) => {
    try {
      await Parse.Cloud.httpRequest({
        url: url,
        method: 'HEAD'
      });
      resolve(true);
    } catch (error) {
      resolve(false);
    }
  });
}

module.exports = {
  checkUrlAlive
};
