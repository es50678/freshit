import driver from '../../lib/neo4j-driver';

export default class Category {
  session: any;
  id: string;
  name: string;

  constructor(category) {
    this.session = driver.session();

    this.id = category.id;
    this.name = category.name;
  }
}
