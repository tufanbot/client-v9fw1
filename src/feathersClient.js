import feathers from 'feathers-client';
var fetch = require('isomorphic-fetch');

const STAGE = 'dev';

function getConfig() {
  try {
    const location =
      window.location.protocol + '//' + window.location.host + '/';
      return fetch(location + 'appconfig.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('data - ' + JSON.stringify(data));
        return data;
      });
  } catch (err) {
    console.log(err);
  }
}

const client = function() {
  let host;
  return getConfig().then(function(data) {
    host = data.apiUrl[STAGE];
    return feathers()
           .configure(feathers.hooks())
           .configure(feathers.rest(host).fetch(window.fetch.bind(window)))
  })
}

export default client;