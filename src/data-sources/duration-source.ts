import Duration from './models/duration';
import DurationPropertiesInterface from './models/interfaces/duration-properties';
import BaseSource from './base-source';

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
}
