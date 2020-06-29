import Duration from './models/duration';
import DurationPropertiesInterface from './models/interfaces/duration-properties';
import BaseSource from './base-source';
import {v4 as uuidv4} from 'uuid';
import {int} from 'neo4j-driver'

export interface DurationCreationOptions {
  start: number;
  categoryID: string;
}

export default class DurationSource extends BaseSource {

  constructor() {
    super();
  }

  async findDurationById({ id }: { id: string }): Promise<Duration> {
    const result = await this.session.run('MATCH (duration:Duration {id: $id}) RETURN duration', { id });
    const record = result.records[0];
    const duration: DurationPropertiesInterface = record.get('duration').properties;

    return new Duration(duration);
  }

  async startDuration({ start, categoryID }: DurationCreationOptions): Promise<Duration> {
    const user = this.context?.loggedInUser;
    if (!user) {
      throw "NOT LOGGED IN";
    }

    const query = `
      MATCH (u:User {id: $userId})-[:OWNS]->(cat:Category {id: $categoryID})
      CREATE (u)-[:RECORDS]->(duration:Duration {id: $id, start: datetime({epochSeconds: $start}) })<-[:CONTAINS]-(cat) 
      RETURN duration;
    `;
    const result = await this.session
      .run(query, { userId: user.id, id: uuidv4(), start: int(start), categoryID});
    const record = result.records[0];
    const duration: DurationPropertiesInterface = record.get('duration').properties;

    return new Duration(duration);
  }
}
