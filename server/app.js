'use strict';

require('dotenv').config();
const http = require('http');
const express = require('express');
const responseTime = require('response-time');
const compression = require('compression');
const cors = require('cors');
const { ParseServer } = require('parse-server');
const ParseDashboard = require('parse-dashboard');
const path = require('path');
const redis = require('redis');
const { promisify } = require('util');
const hls = require('./utils/hls');
const livestream = require('./utils/livestream');
const myanmartvchannel = require('./utils/myanmartvchannel');

const app = express();

const host = process.env.HOST || '192.168.1.100';
const port = process.env.PORT || 80;
const mountPath = process.env.PARSE_MOUNT || '/parse';

const appName = 'Parse Server Boilerplate';
const appId = process.env.APP_ID || 'myAppId';
const masterKey = process.env.MASTER_KEY || 'myMasterKey';
const serverURL = process.env.SERVER_URL || `http://${host}:${port}${mountPath}`;

const api = new ParseServer({
  appId: appId,
  masterKey: masterKey,
  databaseURI:
    process.env.MONGODB_URI ||
    process.env.MONGO_URL ||
    process.env.DATABASE_URL ||
    'mongodb://localhost:27017/dev',
  // Cloud Code
  serverURL: serverURL,
  cloud: path.join(__dirname, 'cloud/main.js'),
  // Live Queries
  liveQuery: {
    classNames: []
  },
  // // Storage
  // filesAdapter: {
  //   module: '@parse/s3-files-adapter',
  //   options: {
  //     directAccess: true
  //   }
  // },
  // // Email Verification & Password Reset
  // verifyUserEmails: true,
  // appName: appName,
  // publicServerURL: serverURL,
  // emailAdapter: {
  //   module: '@parse/simple-mailgun-adapter',
  //   options: {
  //     apiKey: process.env.MAILGUN_API_KEY,
  //     domain: process.env.MAILGUN_DOMAIN,
  //     fromAddress: `no-reply@${process.env.MAILGUN_DOMAIN.split('.')
  //       .splice(1)
  //       .join('.')}`
  //   }
  // },
  // // Security
  // passwordPolicy: {
  //   validatorPattern: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]).{6,}$/,
  //   doNotAllowUsername: true,
  //   maxPasswordHistory: 5,
  //   resetTokenValidityDuration: 24 * 60 * 60
  // },
  // accountLockout: {
  //   threshold: 3,
  //   duration: 5
  // },
  allowClientClassCreation: process.env.NODE_ENV === 'production' ? false : true
});

const dashboard = new ParseDashboard(
  {
    apps: [
      {
        appId: appId,
        masterKey: masterKey,
        serverURL: serverURL,
        appName: appName
      }
    ],
    users: [
      {
        user: process.env.PARSE_DASHBOARD_USER_ID || 'admin',
        pass: process.env.PARSE_DASHBOARD_USER_PASSWORD || 'admin'
      }
    ]
  },
  {
    allowInsecureHTTP: true
  }
);

app.use(responseTime());
app.use(compression());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mountPath, api);
app.use('/dashboard', dashboard);

const client = redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);

app.get('/channels/mrtv.m3u8', async (req, res) => {
  try {
    let url = await getAsync('mrtv');
    if (!url) {
      url = await livestream.getM3u8Url('15604755', '4419934');
      setexAsync('mrtv', 300, url);
    }
    res.redirect(url);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

app.get('/channels/mitv.m3u8', async (req, res) => {
  try {
    let url = await getAsync('mitv');
    if (!url) {
      url = await livestream.getM3u8Url('7063221', '2739096');
      setexAsync('mitv', 300, url);
    }
    res.redirect(url);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

app.get('/channels/5_plus.m3u8', async (req, res) => {
  try {
    const url = await myanmartvchannel.getM3u8Url(
      'http://www.myanmartvchannel.com/5-plus-channel.html'
    );
    const m3u8 = await hls.getM3u8(url);
    res.send(m3u8);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

app.get('/channels/mrtv_entertainment.m3u8', async (req, res) => {
  try {
    const url = await myanmartvchannel.getM3u8Url(
      'http://www.myanmartvchannel.com/mrtv-entertainment.html'
    );
    const m3u8 = await hls.getM3u8(url);
    res.send(m3u8);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
ParseServer.createLiveQueryServer(server);
