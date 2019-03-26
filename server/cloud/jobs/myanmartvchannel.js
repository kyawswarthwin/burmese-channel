'use strict';

const { forEach } = require('p-iteration');
const myanmartvchannel = require('../utils/myanmartvchannel');

const channels = [
  {
    name: '5 Plus',
    url: 'http://www.myanmartvchannel.com/5-plus-channel.html'
  },
  {
    name: 'MRTV Entertainment',
    url: 'http://www.myanmartvchannel.com/mrtv-entertainment.html'
  }
];

const Channel = Parse.Object.extend('Channel');

async function watchMyanmarTvChannel(request) {
  try {
    await forEach(channels, async ({ name, url }) => {
      const query = new Parse.Query(Channel);
      query.equalTo('name', name);
      const { id } = (await query.first()) || {};
      url = await myanmartvchannel.getM3u8Url(url);
      const channel = new Channel();
      channel.id = id;
      await channel.save({ name, url });
    });
    setTimeout(() => {
      watchMyanmarTvChannel(request);
    }, 300000);
  } catch (error) {
    watchMyanmarTvChannel(request);
  }
}

module.exports = {
  watchMyanmarTvChannel
};
