import { v4 as uuidv4 } from 'uuid';

import driver from '../../lib/neo4j-driver';

export default class User {
  session: any;
  id: string;
  name: string;
  email: string;

  constructor(user) {
    this.session = driver.session();

    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
