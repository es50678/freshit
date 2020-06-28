import Base from './base';
import DurationPropertiesInterface from './interfaces/duration-properties';

export default class Duration extends Base implements DurationPropertiesInterface{
  end: string;
  length: string;
  start: string;

  constructor(durationProperties: DurationPropertiesInterface) {
    super(durationProperties);

    this.end = durationProperties.end;
    this.length = durationProperties.length;
    this.start = durationProperties.start;
  }
}
