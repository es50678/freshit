import { Session } from 'neo4j-driver';
import driver from '../../lib/neo4j-driver';
import BaseInterface from './interfaces/base';

export default abstract class Base implements BaseInterface {
  id: string = '';

  protected constructor(implementor: BaseInterface) {
    this.id = implementor.id;
  }

  protected session(): Session {
    return driver.session();
  }
}
