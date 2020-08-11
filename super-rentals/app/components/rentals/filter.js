import Component from '@glimmer/component';

export default class RentalsFilterComponent extends Component {
  get results() {
    let { rentals, query } = this.args;
    query = query.toLowerCase();
    if (query) {
      rentals = rentals.filter(rental => rental.title.toLowerCase().includes(query));
    }

    return rentals;
  }
}
