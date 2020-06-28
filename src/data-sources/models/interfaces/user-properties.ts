import BaseInterface from './base';

export default interface UserPropertiesInterface extends BaseInterface {
  name: string,
  email: string,
  passcode?: string,
}
