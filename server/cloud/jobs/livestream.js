'use strict';

const { forEach } = require('p-iteration');
const livestream = require('../utils/livestream');

const channels = [
  {
    name: 'MRTV',
    account_id: '15604755',
    event_id: '4419934'
  },
  {
    name: 'MITV',
    account_id: '7063221',
    event_id: '2739096'
  }
];

const Channel = Parse.Object.extend('Channel');

async function watchLivestream(request) {
  await forEach(channels, async ({ name, account_id, event_id }) => {
    const query = new Parse.Query(Channel);
    query.equalTo('name', name);
    const { id } = (await query.first()) || {};
    const url = await livestream.getM3u8Url(account_id, event_id);
    const channel = new Channel();
    channel.id = id;
    await channel.save({ name, url });
  });
  setTimeout(() => {
    watchLivestream(request);
  }, 20000);
}

module.exports = {
  watchLivestream
};
