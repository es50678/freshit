import BaseInterface from './interfaces/base';
import UniqueSessions from '../unique-sessions';

export default abstract class Base extends UniqueSessions implements BaseInterface {
  id: string = '';

  protected constructor(implementor: BaseInterface) {
    super();
    this.id = implementor.id;
  }
}
