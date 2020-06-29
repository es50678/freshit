import BaseInterface from './base';
import {DateTime, Duration} from 'neo4j-driver';

export default interface DurationPropertiesInterface extends BaseInterface {
  end: DateTime,
  length: Duration,
  start: DateTime
}
