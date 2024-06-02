import { Model } from './base.model.js';

const BannerModel = new class BannerModel extends Model {
  /**
   * @description
   * the following method fetches all categories from the database
   * @returns the array of Banner fetched from the database
   */

  constructor() {
    super('banners')
  }

}

export { BannerModel }
