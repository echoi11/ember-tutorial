import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

// store is built in ember data store for accessing models

  async model() {
    return this.store.findAll('rental'); // gets all objects of this type from store
  }
}
