import { Database } from '../config/db.config.js';

export class OffersModel {

    static async addCoupon({ added_by,
        coupon_type,
        coupon_bearer,
        seller_id,
        customer_id,
        title,
        code,
        start_date,
        expire_date,
        min_purchase,
        max_discount,
        discount,
        discount_type,
        status,
        limit
    }) {

        const query = `INSERT INTO coupons
        (added_by, coupon_type, coupon_bearer, seller_id, customer_id, title, code, start_date, expire_date, min_purchase, max_discount, discount, discount_type, status, created_at, updated_at, \`limit\`)
        VALUES('${added_by}', '${coupon_type}', '${coupon_bearer}', '${seller_id}', '${customer_id}', '${title}', '${code}', '${start_date}', '${expire_date}', '${min_purchase}', '${max_discount}', '${discount}', '${discount_type}', '${status}', now(), now(), '${limit}');
        `;

        const result = await Database.executeQuery(query);

        return result;
    }

    static async couponList(coupon_type) {
        let query;
        if (coupon_type) {
            query = `select c.title, c.code, c.coupon_type, c.start_date , c.expire_date, c.\`limit\`, c.added_by  from coupons c where c.coupon_type = ?`;
        } else {
            query = `select c.title, c.code, c.coupon_type, c.start_date , c.expire_date, c.\`limit\`, c.added_by  from coupons c`;
        }

        const result = await Database.executeQuery(query, [coupon_type]);

        return result;
    }

    static async flashDeal({
        title,
        start_date,
        end_date,
        status,
        featured,
        background_color,
        text_color,
        banner,
        slug,
        product_id,
        deal_type
    }) {
        let query = `INSERT INTO flash_deals
        (title, start_date, end_date, status, featured, background_color, text_color, banner, slug, created_at, updated_at, product_id, deal_type)
        VALUES('${title}', '${start_date}', '${end_date}', '${status}', '${featured}', '${background_color}', '${text_color}', '${banner}', '${slug}', 'now()', 'now()', '${product_id}', '${deal_type}')`

        const result = await Database.executeQuery(query);

        return result;
    }

    static async dealOfTheDay({
        title,
        product_id
    }) {
        let query = `INSERT INTO deal_of_the_days
        (title, product_id,created_at, updated_at)
        VALUES('${title}', '${product_id}',now(), now());
        `

        const result = await Database.executeQuery(query);

        return result;
    }

    static async flashDealTableUpdate({
        id,
        status
    }) {
        let query = `UPDATE flash_deals
        SET status=${status}, updated_at=now()
        WHERE id= ?`

        const result = await Database.executeQuery(query, [id]);

        return result;
    }

    static async flasDealUpdate({
        id,
        title,
        start_date,
        end_date,
        banner
    }) {
        let query = `UPDATE flash_deals
        SET title='${title}', start_date='${start_date}', end_date='${end_date}', banner='${banner}', updated_at=now()
        WHERE id= ?`

        const result = await Database.executeQuery(query, [id]);

        return result;
    }

    static async flashDealAddProduct({
        id,
        product_id
    }) {
        let query = `INSERT INTO flash_deal_products
        (flash_deal_id, product_id, created_at, updated_at)
        VALUES(${id}, ${product_id},now(), now());
        `

        const result = await Database.executeQuery(query);

        return result;
    }

    static async flashDealTable() {
        let query;

        query = `SELECT fd.id,fd.title, fd.start_date, fd.end_date, fd.status, 
                    COALESCE(COUNT(fdp.product_id), 0) as active_product
                    FROM flash_deals fd
                    LEFT JOIN flash_deal_products fdp ON fdp.flash_deal_id = fd.id 
                    GROUP BY fd.title, fd.start_date, fd.end_date, fd.status;`;

        const result = await Database.executeQuery(query);

        return result;
    }
    static async flashDealUpdateData(id) {
        let query;
        if (id === "all") {
            query = `select fd.id,fd.title, p.name,fd.banner, fd.start_date, fd.end_date, fd.status, count(fdp.flash_deal_id) as active_product  from flash_deal_products fdp 
            inner join flash_deals fd on fd.id = fdp.flash_deal_id  
            inner join products p on p.id = fdp.product_id group by fdp.flash_deal_id`;
        } else {
            query = `select fd.id,fd.title, p.name,fd.banner, fd.start_date, fd.end_date, fd.status, count(fdp.flash_deal_id) as active_product  from flash_deal_products fdp 
            inner join flash_deals fd on fd.id = fdp.flash_deal_id  
            inner join products p on p.id = fdp.product_id where fd.id = ? group by fdp.flash_deal_id`;
        }


        const result = await Database.executeQuery(query, [id]);

        return result;
    }

    static async flashDealProductTable(id) {
        let query;

        query = `select fdp.id, p.name, p.unit_price 
      from flash_deal_products fdp 
      inner join products p on p.id = fdp.product_id 
      where fdp.flash_deal_id = ?`;


        const result = await Database.executeQuery(query, [id]);

        return result;
    }

    static async dealOfTheDayTableUpdate({
        id,
        status
    }) {
        let query = `UPDATE deal_of_the_days
        SET status=${status}, updated_at=now()
        WHERE id= ?`

        const result = await Database.executeQuery(query, [id]);

        return result;
    }

    static async dealOfTheDayUpdate({
        id,
        title,
        product_id,
        status
    }) {
        let query = `UPDATE deal_of_the_days
            SET title='${title}', product_id='${product_id}', status='${status}', created_at=now(), updated_at=now()
            WHERE id= ?`

        const result = await Database.executeQuery(query, [id]);

        return result;
    }
}