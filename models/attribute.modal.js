import { Database } from '../config/db.config.js';

export class AttributeModel{

    static async insertAttr(name) {

        const query = `CALL insert_attribute('${name}', now(), now())`
    
        const result = await Database.executeQuery(query);
        return result;
      }

    static async fetchAttr() {

        const query = `CALL select_attributes()`
    
        const result = await Database.executeQuery(query);
        return result;
      }

    static async deleteAttr(id, is_active) {

        const query = `update attributes set is_active = ${is_active} where id = ?`
    
        const result = await Database.executeQuery(query, [id]);
        return result;
      }
    static async fetchAttrId(id) {

        const query = `select * from attributes where id = ?`
    
        const result = await Database.executeQuery(query, [id]);
        return result;
      }
    static async updateAttr(name, id) {

        const query = `UPDATE attributes SET name='${name}', updated_at=now() WHERE id= ?`
    
        const result = await Database.executeQuery(query, [id]);
        return result;
      }
}