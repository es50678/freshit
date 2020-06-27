import Base from './base';
import CategoryPropertiesInterface from './interfaces/category-properties';

export default class Category extends Base implements CategoryPropertiesInterface{
  name: string;

  constructor(categoryProperties: CategoryPropertiesInterface) {
    super(categoryProperties);

    this.id = categoryProperties.id;
    this.name = categoryProperties.name;
  }
}
