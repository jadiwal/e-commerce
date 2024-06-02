import { Database } from '../config/db.config.js';

export class OrderModel {
  

  static async orderCount() {
      const query = `select 'sales' AS source, count(*) as count  from orders where order_status = 'delivered'
      UNION ALL
      select 'stores' AS source, count(*) as count from shops
      union all 
      select 'products' AS source, count(*) as count from products
      UNION ALL
      select 'customers' AS source, count(*) as count from users
      UNION all
      select 'pending' AS source, count(*) as count  from orders where order_status = 'pending'
      union all 
      select 'confirmed' AS source, count(*) as count  from orders where order_status = 'confirmed'
      union all 
      select 'packaging' AS source, count(*) as count  from orders where order_status = 'packaging'
      union all 
      select 'out of delivery' AS source, count(*) as count  from orders where order_status = 'out of delivery'
      union all 
      select 'delivered' AS source, count(*) as count  from orders where order_status = 'delivered'
      UNION ALL
      select 'canceled' AS source, count(*) as count  from orders where order_status = 'canceled'
      union all 
      select 'returned' AS source, count(*) as count  from orders where order_status = 'returned'
      union all 
      select 'failed to delivery' AS source, count(*) as count  from orders where order_status = 'failed to delivery'`;

      const result = await Database.executeQuery(query);

      return result;
    }


  static async orderList(status) {
    let query;
    if(status){
       query = `select o.id as order_id, o.created_at as order_at,CONCAT(u.f_name, ' ', u.l_name) AS full_name,u.phone,o.payment_method, o.coupon_discount_bearer as store, o.order_amount as total_amount, o.payment_status ,o.order_status from orders o inner join users u on u.id = o.customer_id WHERE o.order_status = ?`;
      }else{
      query = `select o.id as order_id, o.created_at as order_at,CONCAT(u.f_name, ' ', u.l_name) AS full_name,u.phone,o.payment_method, o.coupon_discount_bearer as store, o.order_amount as total_amount, o.payment_status ,o.order_status from orders o inner join users u on u.id = o.customer_id`;
    }

    const result = await Database.executeQuery(query, [status]);

    return result;
  }
  static async orderDetails(orderId) {
    const query = `select od.order_id,CONCAT(u.f_name, ' ', u.l_name) AS full_name, od.delivery_status, od.payment_status, o.payment_method, p.name, od.qty, p.unit_price, od.price,
    od.tax, od.discount, p.images, o.order_amount, o.shipping_cost, o.created_at, u.phone, u.email, o.order_amount, o.coupon_code      
    from order_details od
    inner join orders o on o.id = od.order_id
    inner join products p on p.id = od.product_id 
    inner join users u on u.id = o.customer_id where od.order_id = ?`;

    const result = await Database.executeQuery(query, [orderId]);

    return result;
  }
  static async orderInvoice(orderId) {
    const query = `SELECT 
    od.order_id, o.order_amount, sa.contact_person_name, sa.phone, sa.address, sa.zip, sa.address_type, 
    GROUP_CONCAT(p.name) AS product_names,od.price, od.qty, o.order_amount, od.tax, od.discount, o.shipping_cost, o.coupon_code, 
    p.discount as product_discount, o.created_at, o.billing_address_data    
      FROM 
        order_details od
      INNER JOIN 
        orders o ON o.id = od.order_id
      INNER JOIN 
        products p ON p.id = od.product_id 
      INNER JOIN 
        shipping_addresses sa ON sa.customer_id = o.customer_id 
      WHERE 
        o.id = ?
      GROUP BY 
          od.order_id`;

    const result = await Database.executeQuery(query, [orderId]);

    return result;
  }

}