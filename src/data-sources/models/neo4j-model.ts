import { Session } from 'neo4j-driver';
import neo4jModelInterface from './interfaces/neo4j-model';
import driver from '../../lib/neo4j-driver';

export default abstract class neo4jModel implements neo4jModelInterface{
  id: string;

  protected session: Session;

  protected constructor() {
    this.session = driver.session();
  }
}
