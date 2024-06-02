import { Database } from '../config/db.config.js';

export class CustomersModel {
    static async customersList() {
        const query = `SELECT u.id, CONCAT(u.f_name, ' ', u.l_name) AS full_name,u.status, u.email, u.phone, u.is_active, COUNT(o.customer_id) AS orderCount,u.created_at 
        FROM users u 
        LEFT JOIN orders o ON u.id = o.customer_id 
        where u.is_active = 1
        GROUP BY u.id, full_name, u.email, u.phone, u.is_active`
    
        const result = await Database.executeQuery(query);
    
        return result;
      }

    static async walletTable() {
        const query = `select wt.id, wt.transaction_id, concat(u.f_name, '', u.l_name) as name, wt.credit, wt.debit, wt.balance, wt.transaction_type, wt.reference, wt.created_at  from wallet_transactions wt 
        inner join users u on u.id = wt.user_id `
    
        const result = await Database.executeQuery(query);
    
        return result;
      }
    static async customerDelete({id,is_active}) {
        const query = `update users set is_active = ${is_active}, updated_at = now() where id = ? `
    
        const result = await Database.executeQuery(query, [id]);
    
        return result;
      }
   
    static async customersDetails(id) {
        const query = `select o.id, o.order_amount, o.created_at, concat(u.f_name, ' ', u.l_name) as name, u.phone, u.email
        from orders o
        inner join users u on u.id = o.customer_id 
        where o.customer_id = ? `
    
        const result = await Database.executeQuery(query, [id]);
    
        return result;
      }
    static async customerStatus({id, status}) {
        const query = `UPDATE users
        SET  status= ${status}, updated_at = now() 
        WHERE id = ?`
    
        const result = await Database.executeQuery(query, [id]);
    
        return result;
      }

      static async customersReviews() {
        const query = `select r.id, p.name, u.name, r.rating, r.status,r.comment, r.created_at, r.status  from reviews r
        inner join products p on p.id = r.product_id 
        inner join users u on u.id = r.customer_id`
    
        const result = await Database.executeQuery(query);
    
        return result;
      }

    static async customerReviewStatusUpdate({customer_id, status}) {
      const query = `UPDATE reviews
      SET status=${status}, updated_at=now()
      WHERE id= ?;
      `
  
      const result = await Database.executeQuery(query, [customer_id]);
  
      return result;
    }
}