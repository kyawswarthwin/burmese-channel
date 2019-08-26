'use strict';

function isCountrySupported(request) {
  return new Promise(async (resolve, reject) => {
    try {
      const supportedCountries = (await Parse.Config.get()).get('supportedCountries') || [];
      const country = request.headers['cf-ipcountry'];
      if (supportedCountries.length > 0 && country) {
        const countrySupported = supportedCountries.includes(country);
        resolve(countrySupported);
      } else {
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  isCountrySupported
};
