import { Model } from './database/base.model.js';
import { Column } from './database/column.js';

const CategoryModel = new class CategoryModel extends Model {
  /**
   * @description
   * the following method fetches all categories from the database
   * @returns the array of category fetched from the database
   */
  constructor() {
    super('categories')
  }

}

export { CategoryModel }
