import { Session } from 'neo4j-driver';
import driver from '../../lib/neo4j-driver';

export default abstract class Base{
  id: string;

  protected session: Session;

  protected constructor() {
    this.session = driver.session();
  }
}
