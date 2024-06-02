import { Database } from '../config/db.config.js';

export class categoryModel {
    static async categoryList() {
        let query;
        query = `select * from categories c where c.parent_id = 0 && c.is_active = 1`;

        const result = await Database.executeQuery(query);

        return result;
    }
    static async subCategoryList() {
        let query;
        query = `SELECT *
        FROM categories
        WHERE parent_id IN (
            SELECT id
            FROM categories
            WHERE parent_id = 0 
        )&& is_active = 1`;

        const result = await Database.executeQuery(query);

        return result;
    }
    static async subSubCategoryList() {
        let query;
        query = `SELECT 
        c_sub_sub.id AS subsubcategory_id,
        c_sub_sub.name AS subsubcategory_name,
        c_sub_sub.parent_id AS subsubcategory_parent_id,
        c_sub_sub.priority AS subsubcategory_priority
    FROM 
        categories c_sub
    JOIN 
        categories c_parent ON c_sub.parent_id = c_parent.id
    LEFT JOIN 
        categories c_sub_sub ON c_sub.id = c_sub_sub.parent_id
    WHERE 
        c_sub_sub.id IS NOT NULL && c_sub_sub.is_active = 1;
    `;

        const result = await Database.executeQuery(query);

        return result;
    }
    static async restoreCategoryList() {
        let query;
        query = `select id, name from categories where is_active = 0`;

        const result = await Database.executeQuery(query);

        return result;
    }
    static async categoryAdd({ name, priority, img, slug }) {
        let query;
        query = `INSERT INTO categories
            (name,slug,icon, parent_id, position, created_at, updated_at, home_status, priority)
            VALUES('${name}', '${slug}', '${img}', 0, 0, now(), now(), 0, ${priority})`;

        const result = await Database.executeQuery(query);

        return result;
    }
    static async subCategory({ name, priority, parent_id, slug }) {
        let query;
        query = `INSERT INTO categories
            (name,slug, parent_id, position, created_at, updated_at, home_status, priority)
            VALUES('${name}', '${slug}', ${parent_id}, 0, now(), now(), 0, ${priority})`;

        const result = await Database.executeQuery(query);

        return result;
    }
    static async subSubCategory({ name, priority, parent_id, slug }) {
        let query;
        query = `INSERT INTO categories
            (name,slug, parent_id, position, created_at, updated_at, home_status, priority)
            VALUES('${name}', '${slug}', ${parent_id}, 0, now(), now(), 0, ${priority})`;

        const result = await Database.executeQuery(query);

        return result;
    }

    static async categoryUpdate({ id, name, priority, image, slug }) {
        let query;
        query = `UPDATE categories
            SET name='${name}', slug='${slug}', icon='${image}',updated_at=now(), priority=${priority}
            WHERE id= ?;`;

        const result = await Database.executeQuery(query, [id]);

        return result;
    }
    static async subCategoryUpdate({ id, name, priority, slug }) {
        let query;
        query = `UPDATE categories
            SET name='${name}', slug='${slug}',updated_at=now(), priority=${priority}
            WHERE id= ?;`;

        const result = await Database.executeQuery(query, [id]);

        return result;
    }
    static async subSubCategoryUpdate({ id, name, priority, slug }) {
        let query;
        query = `UPDATE categories
            SET name='${name}', slug='${slug}',updated_at=now(), priority=${priority}
            WHERE id= ?;`;

        const result = await Database.executeQuery(query, [id]);

        return result;
    }
    static async categoryHomeStatusUpdate({ status, id }) {
        let query;
        query = `UPDATE categories
            SET updated_at=now(), home_status=${status}
            WHERE id= ?`;

        const result = await Database.executeQuery(query, [id]);

        return result;
    }
    static async categoryEditData({ id }) {
        let query;
        query = `SELECT id, name, slug, icon, parent_id, position, created_at, updated_at, home_status, priority
            FROM categories
            where id = ?`;

        const result = await Database.executeQuery(query, [id]);

        return result;
    }
    static async categoryDropdown({ id }) {
        let query;
        query = `SELECT id,name, parent_id
            FROM categories
            WHERE parent_id = ?;
            `;

        const result = await Database.executeQuery(query, [id]);

        return result;
    }
    static async categoryDefault({ id }) {
        let query;
        query = `SELECT id,name, parent_id
            FROM categories
            WHERE id = ?;
            `;

        const result = await Database.executeQuery(query, [id]);

        return result;
    }
    static async categoryDelete({ id, is_active }) {
        let query;
        query = `update categories set is_active='${is_active}', updated_at = now()
                where id= ?`;

        const result = await Database.executeQuery(query, [id]);

        return result;
    }
}