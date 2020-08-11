import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = 'api'; // prefixes data location with api

  buildURL(...args) {
    return `${super.buildURL(...args)}.json`; // adds .json to data source location
  }
}
