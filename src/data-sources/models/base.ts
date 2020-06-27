import { Session } from 'neo4j-driver';
import driver from '../../lib/neo4j-driver';
import BaseInterface from './interfaces/base';

export default abstract class Base implements BaseInterface {
  id: string = '';

  protected session: Session;

  protected constructor(implementor: BaseInterface) {
    this.session = driver.session();
    this.id = implementor.id;
  }
}
