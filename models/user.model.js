import { Database } from '../config/db.config.js';

export class UserModel {
  /**
   * @description
   * the following method fetches all blogs from the database
   * @returns the array of blogs fetched from the database
   */
  static async getAllBlogs() {
    const query = 'SELECT * FROM blogs';

    const blogs = await Database.executeQuery(query);

    return blogs;
  }

  /**
   * @description
   * the following method fetches the blog corresponding to a particular id
   * @param {number} blogId the id of the blog
   * @returns the blog fetched from the database
   */
  static async getBlogById(blogId) {
    const query = 'SELECT * FROM blogs WHERE id = ?';
    const params = [blogId];

    const result = await Database.executeQuery(query, params);

    return result[0];
  }

  /**
   * @description
   * the following method creates a blog for a particular user
   * @param {string} title the title for the blog to be created
   * @param {string} description the description for the blog to be created
   * @param {number} userId the id of the user for whom the blog needs to be created
   * @returns the result of an sql insertion operation
   */
  static async createBlog(title, description, userId) {
    const query = 'INSERT INTO blogs SET ?';
    const params = { userId, title, description };

    const result = await Database.executeQuery(query, params);

    return result;
  }

  /**
   * @description
   * the following method updates the blog corresponding to a particular id
   * @param {object} targetObj the fields and their corresponding values of the blog to be updated
   * @param {number} blogId the id of the blog
   * @returns the blog updation result
   */
  static async updateBlog(targetObj, blogId) {
    let query = 'UPDATE blogs SET updated_at = ?, ';
    const currentTime = new Date();
    const params = [currentTime];

    Object.entries(targetObj).forEach(([key, value], index) => {
      if (index === Object.keys(targetObj).length - 1) query += `${key} = '${value}' WHERE id = ?`;
      else query += `${key} = '${value}', `;
    });

    params.push(blogId);

    const result = await Database.executeQuery(query, params);

    return result;
  }

  /**
   * @description
   * the following method deletes a blog corresponding to a particular id
   * @param {number} blogId the id of the blog
   * @returns the blog deletion result
   */
  static async deleteBlog(blogId) {
    const query = 'DELETE FROM blogs WHERE id = ?';
    const params = [blogId];

    const result = await Database.executeQuery(query, params);

    return result;
  }

  /**
   * @description
   * the following method updates the user corresponding to a particular id
   * @param {object} targetObj the fields and their corresponding values of the user to be updated
   * @param {number} userId the id of the user
   * @returns the user updation result
   */
  static async updateUser(targetObj, userId) {
    let query = 'UPDATE users SET ';

    Object.entries(targetObj).forEach(([key, value], index) => {
      if (index === Object.keys(targetObj).length - 1) query += `${key} = '${value}' WHERE id = ?`;
      else query += `${key} = '${value}', `;
    });

    const params = [userId];

    const result = await Database.executeQuery(query, params);

    return result;
  }

  /**
   * @description
   * the following method deletes a user corresponding to a particular id
   * @param {number} userId the id of the user
   * @returns the user deletion result
   */
  static async deleteUser(userId) {
    const query = 'DELETE FROM users WHERE id = ?';
    const params = [userId];

    const result = await Database.executeQuery(query, params);

    return result;
  }




  // Added by Deepak Jadiwal Start
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


  static async orderList(){
    const query = `select o.id as order_id, o.created_at as order_at,CONCAT(u.f_name, ' ', u.l_name) AS full_name, o.coupon_discount_bearer as store, o.order_amount as total_amount, o.payment_status ,o.order_status from orders o inner join users u on u.id = o.customer_id`;
    
    const result = await Database.executeQuery(query);

    return result;
  }
  static async orderDetails(orderId){
    const query = `select od.order_id,CONCAT(u.f_name, ' ', u.l_name) AS full_name, od.delivery_status, od.payment_status, o.payment_method, p.name, od.qty, p.unit_price, od.price,
    od.tax, od.discount, p.images, o.order_amount, o.shipping_cost, o.created_at, u.phone, u.email, o.order_amount, o.coupon_code      
    from order_details od
    inner join orders o on o.id = od.order_id
    inner join products p on p.id = od.product_id 
    inner join users u on u.id = o.customer_id where od.order_id = ?`;
    
    const result = await Database.executeQuery(query, [orderId]);

    return result;
  }


  static async addProduct(added_by){
    
    const query = `INSERT INTO dibo.products
    (added_by, user_id, name, slug, product_type, category_ids, category_id, sub_category_id, sub_sub_category_id, brand_id,
    unit, min_qty, refundable, digital_product_type, digital_file_ready, images, color_image, thumbnail, featured, flash_deal, 
    video_provider, video_url, colors, variant_product, attributes, choice_options, variation, published, unit_price,
    purchase_price, tax, tax_type, tax_model, discount, discount_type, current_stock, minimum_order_qty, details,
    free_shipping, attachment, created_at, updated_at, status, featured_status, meta_title, meta_description,
    meta_image, request_status, denied_note, shipping_cost, multiply_qty, temp_shipping_cost, is_shipping_cost_updated, code)
    VALUES('${added_by}', '${user_id}', '${name}', ${slug}, '${product_type}', ${category_ids}, '${category_id}', '${sub_category_id}', '${sub_sub_category_id}', '${brand_id}', '${unit}', ${min_qty}, ${refundable}, '${digital_product_type}', '${digital_file_ready}', '${images}', '${color_image}', '${thumbnail}', '${featured}',
    '${flash_deal}', '${video_provider}', '${video_url}', '${colors}', '${variant_product}', '${attributes}', '${choice_options}', '${variation}', '${published}', '${unit_price}', '${purchase_price}', '${tax}', '${tax_type}', '${tax_model}', '${discount}', '${discount_type}', '${current_stock}', ${minimum_order_qty}, '${details}', ${free_shipping}, '${attachment}',
    '${created_at}', '${updated_at}', ${status}, ${featured_status}, '${meta_title}', '${meta_description}', '${meta_image}', ${request_status}, '${denied_note}', '${shipping_cost}', '${multiply_qty}', '${temp_shipping_cost}', '${is_shipping_cost_updated}', '${code}');`;
    
    const result = await Database.executeQuery(query);

    return result;
  }
  // Added by Deepak Jadiwal End


  // Added By Deepak Jadwial Start
  static async addProduct({added_by,
    user_id,
    name,
    slug,
    product_type,
    category_ids,
    category_id,
    sub_category_id,
    sub_sub_category_id,
    brand_id,
    unit,
    min_qty,
    refundable,
    digital_product_type,
    digital_file_ready,
    images,
    color_image,
    thumbnail,
    featured,
    flash_deal,
    video_provider,
    video_url,
    colors,
    variant_product,
    attributes,
    choice_options,
    variation,
    published,
    unit_price,
    purchase_price,
    tax,
    tax_type,
    tax_model,
    discount,
    discount_type,
    current_stock,
    minimum_order_qty,
    details,
    free_shipping,
    attachment,
    created_at,
    updated_at,
    status,
    featured_status,
    meta_title,
    meta_description,
    meta_image,
    request_status,
    denied_note,
    shipping_cost,
    multiply_qty,
    temp_shipping_cost,
    is_shipping_cost_updated,
    code}){
  
    const query = `INSERT INTO products
    (added_by, user_id, name, slug, product_type, category_ids, category_id, sub_category_id, sub_sub_category_id, brand_id,
    unit, min_qty, refundable, digital_product_type, digital_file_ready, images, color_image, thumbnail, featured, flash_deal, 
    video_provider, video_url, colors, variant_product, attributes, choice_options, variation, published, unit_price,
    purchase_price, tax, tax_type, tax_model, discount, discount_type, current_stock, minimum_order_qty, details,
    free_shipping, attachment, created_at, updated_at, status, featured_status, meta_title, meta_description,
    meta_image, request_status, denied_note, shipping_cost, multiply_qty, temp_shipping_cost, is_shipping_cost_updated, code)
    VALUES('${added_by}', '${user_id}', '${name}', '${slug}', '${product_type}', '${category_ids}', '${category_id}', '${sub_category_id}', '${sub_sub_category_id}', '${brand_id}', '${unit}', '${min_qty}', '${refundable}', '${digital_product_type}', '${digital_file_ready}', '${images}', '${color_image}', '${thumbnail}', '${featured}',
    '${flash_deal}', '${video_provider}', '${video_url}', '${colors}', ${variant_product}, '${attributes}', '${choice_options}', '${variation}', ${published}, '${unit_price}', '${purchase_price}', '${tax}', '${tax_type}', '${tax_model}', '${discount}', '${discount_type}', '${current_stock}', '${minimum_order_qty}', '${details}', ${free_shipping}, '${attachment}',
    'current_timestamp', 'current_timestamp', '${status}', '${featured_status}', '${meta_title}', '${meta_description}', '${meta_image}', '${request_status}', '${denied_note}', '${shipping_cost}', '${multiply_qty}', '${temp_shipping_cost}', ${is_shipping_cost_updated}, '${code}');`;
    
    const result = await Database.executeQuery(query);

    return result;
  }


  static async orderInvoice(orderId) {
    const query = `SELECT 
    od.order_id, o.order_amount, sa.contact_person_name, sa.phone, sa.address, sa.zip, sa.address_type, 
    GROUP_CONCAT(p.name) AS product_names,od.price, od.qty, o.order_amount, od.tax, od.discount, o.shipping_cost, o.coupon_code, 
    p.discount as product_discount, o.created_at  
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
  // Added By Deepak Jadwial End
}
