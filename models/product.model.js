import { Database } from '../config/db.config.js';

export class ProductModel {

  static async addProductbkp({ added_by,
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
    colorImage,
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
    code }) {

    // const colorsArray = ["#8A2BE2", "#A52A2A"];
    // const colorsString = JSON.stringify(colorsArray); 
    const query = `INSERT INTO products
    (added_by, user_id, name, slug, product_type, category_ids, category_id, sub_category_id, sub_sub_category_id, brand_id,
    unit, min_qty, refundable, digital_product_type, digital_file_ready, images, color_image, thumbnail, featured, flash_deal, 
    video_provider, video_url, colors, variant_product, attributes, choice_options, variation, published, unit_price,
    purchase_price, tax, tax_type, tax_model, discount, discount_type, current_stock, minimum_order_qty, details,
    free_shipping, attachment, created_at, updated_at, status, featured_status, meta_title, meta_description,
    meta_image, request_status, denied_note, shipping_cost, multiply_qty, temp_shipping_cost, is_shipping_cost_updated, code)
    VALUES('${added_by}', '${user_id}', '${name}', '${slug}', '${product_type}', '${category_ids}', '${category_id}', '${sub_category_id}', '${sub_sub_category_id}', '${brand_id}', '${unit}', '${min_qty}', '${refundable}', '${digital_product_type}', '${digital_file_ready}', '${images}', '${colorImage}', '${thumbnail}', '${featured}',
    '${flash_deal}', '${video_provider}', '${video_url}', '["#8A2BE2","#A52A2A"]', ${variant_product}, '${attributes}', '${choice_options}', '${variation}', ${published}, '${unit_price}', '${purchase_price}', '${tax}', '${tax_type}', '${tax_model}', '${discount}', '${discount_type}', '${current_stock}', '${minimum_order_qty}', '${details}', ${free_shipping}, '${attachment}',
    'current_timestamp', 'current_timestamp', '${status}', '${featured_status}', '${meta_title}', '${meta_description}', '${meta_image}', '${request_status}', '${denied_note}', '${shipping_cost}', '${multiply_qty}', '${temp_shipping_cost}', ${is_shipping_cost_updated}, '${code}');`;

    const result = await Database.executeQuery(query);

    return result;
  }
  static async addProduct({ user_id,name,
    slug,
    product_type,
    category_ids,
    category_id,
    sub_category_id,
    sub_sub_category_id,
    brand_id,
    unit,
    img,
    color_img,
    thumbnail,
    video_url,
    colors,
    attributes,
    variation,
    unit_price,
    purchase_price,
    tax,
    tax_model,
    discount,
    discount_type,
    current_stock,
    minimum_order_qty,
    details,
    meta_title,
    meta_description,
    meta_image,
    shipping_cost,
    multiply_qty,
    code }) {


      const selectQuery = `SELECT name FROM admins WHERE id = '${user_id}'`;
      const userResult = await Database.executeQuery(selectQuery);
  
      if (userResult.length === 0) {
          throw new Error("User not found"); // Or handle the error accordingly
      }
  
      const userName = userResult[0].name;
    // const colorsArray = ["#8A2BE2", "#A52A2A"];
    // const colorsString = JSON.stringify(colorsArray); 
    const query = `insert into products (added_by,user_id, name,details,slug,category_ids,category_id,sub_category_id,sub_sub_category_id, brand_id, product_type, code, unit, purchase_price
      , unit_price, minimum_order_qty, current_stock, discount_type, discount, tax, tax_model, shipping_cost, multiply_qty,
      colors, variation, attributes, thumbnail, color_image, images, video_url, meta_title, meta_description, meta_image, created_at, updated_at) 
      values (
      '${userName}','${user_id}','${name}','${details}','${slug}','${category_ids}','${category_id}','${sub_category_id}','${sub_sub_category_id}','${brand_id}', '${product_type}', '${code}', '${unit}', '${purchase_price}', '${unit_price}', '${minimum_order_qty}','${current_stock}','${discount_type}', '${discount}', '${tax}', '${tax_model}', '${shipping_cost}','${multiply_qty}', '${colors}','${variation}','${attributes}','${thumbnail}','${color_img}','${img}','${video_url}','${meta_title}','${meta_description}', '${meta_image}', now(), now())`;

    const result = await Database.executeQuery(query);

    return result;
  }


  static async updateProduct(productId, {
    UpdatecolorImage, 
    name,
    slug,
    product_type,
    category_ids,
    category_id,
    sub_category_id,
    sub_sub_category_id,
    brand_id,
    unit,
    img,
    color_img,
    Updatethumbnail,
    video_url,
    colors,
    attributes,
    variation,
    unit_price,
    purchase_price,
    tax,
    tax_model,
    discount,
    discount_type,
    current_stock,
    minimum_order_qty,
    details,
    meta_title,
    meta_description,
    Updatemeta_image,
    shipping_cost,
    multiply_qty,
    code }){

      // const selectQuery = `SELECT name FROM admins WHERE id = '${user_id}'`;
      // const userResult = await Database.executeQuery(selectQuery);
  
      // if (userResult.length === 0) {
      //     throw new Error("User not found"); // Or handle the error accordingly
      // }
  
    // const query = `UPDATE products SET added_by = 'admin',user_id = '1', name = '${name}', slug = '${slug}', product_type = '${product_type}', category_ids = '${category_ids}', category_id = '${category_id}', sub_category_id = '${sub_category_id}', sub_sub_category_id = '${sub_sub_category_id}', brand_id = '${brand_id}', unit = '${unit}', images = '${img}', color_image = '${color_img}', thumbnail = '${Updatethumbnail}', video_url ='${video_url}', colors = '${colors}', attributes = '${attributes}', variation = '${variation}', unit_price = '${unit_price}', purchase_price = '${purchase_price}', tax = '${tax}', tax_model = '${tax_model}', discount = '${discount}', discount_type = '${discount_type}', current_stock = '${current_stock}', minimum_order_qty = '${minimum_order_qty}', details = '${details}', meta_title = '${meta_title}', meta_description = '${meta_description}', meta_image = '${Updatemeta_image}', shipping_cost = '${shipping_cost}', multiply_qty = '${multiply_qty}', code = '${code}', updated_at = now() WHERE id = ?`;

    // Construct SQL query
let query = `UPDATE products SET added_by = 'admin',user_id = '1', name = '${name}', slug = '${slug}', product_type = '${product_type}', category_ids = '${category_ids}', category_id = '${category_id}', sub_category_id = '${sub_category_id}', sub_sub_category_id = '${sub_sub_category_id}', brand_id = '${brand_id}', unit = '${unit}', unit_price = '${unit_price}', purchase_price = '${purchase_price}', tax = '${tax}', tax_model = '${tax_model}', discount = '${discount}', discount_type = '${discount_type}', current_stock = '${current_stock}', minimum_order_qty = '${minimum_order_qty}', details = '${details}', meta_title = '${meta_title}', meta_description = '${meta_description}', shipping_cost = '${shipping_cost}', multiply_qty = '${multiply_qty}', code = '${code}', updated_at = now(), colors = '${colors}', attributes = '${attributes}', video_url = '${video_url}',variation = '${variation}'  `

// Append image-related fields to the query if data exists
if (UpdatecolorImage.length > 0) {
    query += `, color_image = '${color_img}'`;
}

if (img.length > 1) {
    query += `, images = '${img}'`;
}

if (Updatethumbnail.length > 0) {
    query += `, thumbnail = '${Updatethumbnail}'`;
}

if (Updatemeta_image.length > 0) {
    query += `, meta_image = '${Updatemeta_image}'`;
}

// Append WHERE clause to the query
    query += ` WHERE id = ?`;
    const result = await Database.executeQuery(query, [productId]);
    return result;
  }
  static async units() {

    const query = 'CALL GetUnits()';

    const result = await Database.executeQuery(query);
    return result;
  }
  static async deleteProductfetch(id) {

    const query = `select id, name, product_type, purchase_price, unit_price from products where is_active = 0`;

    const result = await Database.executeQuery(query, [id]);
    return result;
  }
  static async limitedStockData() {

    const query = `SELECT id,current_stock, thumbnail, name, product_type, purchase_price, unit_price, featured_status, status 
    FROM products 
    WHERE is_active = 1 && current_stock < 10`;

    const result = await Database.executeQuery(query);
    return result;
  }
  static async limitedStockDataByID(id) {

    const query = `select variation, current_stock from products p where id = ?`;

    const result = await Database.executeQuery(query, [id]);
    return result;
  }

  static async limitedStockDataUpdate(id, variationProduct, current_stock) {

    const query = `UPDATE products
    SET  variation='${variationProduct}', 
    current_stock=${current_stock},updated_at=now()
    WHERE id= ?;
    `;

    const result = await Database.executeQuery(query, [id]);
    return result;
  }
  static async colorImgDelete(id,index) {

    const query = `UPDATE products
    SET 
      color_image = JSON_REMOVE(color_image, '$[${index}]'),
      colors = JSON_REMOVE(colors, '$[${index}]'),
      variation = JSON_REMOVE(variation, '$[${index}]')
    WHERE id = ?`;

    const result = await Database.executeQuery(query, [id]);
    return result;
  }

  static async restoreProduct({ id, is_active }) {
    let query;
    query = `update products set is_active='${is_active}', updated_at = now()
            where id= ?`;

    const result = await Database.executeQuery(query, [id]);

    return result;
}
  static async brands() {

    const query = `SELECT * FROM brands`;

    const result = await Database.executeQuery(query);
    return result;
  }
  static async colors() {

    const query = `SELECT * FROM colors`;

    const result = await Database.executeQuery(query);
    return result;
  }
  static async productDetailByID(id) {

    const query = `SELECT p.*,c.name as category_name, b.name as brand_name,(SELECT COUNT(product_id) FROM order_details WHERE product_id = ${id}) AS order_count from products p inner join categories c on c.id = p.category_id inner join brands b on b.id = p.brand_id where p.id = ?`;

    const result = await Database.executeQuery(query, [id]);
    return result;
  }
  static async productDelete(id, is_active) {

    const query = `update products set is_active = ${is_active} where id = ?`;

    const result = await Database.executeQuery(query, [id]);
    return result;
  }

  static async productList(brand_id, category_id, sub_category_id, sub_sub_category_id) {

    let query = `SELECT id, thumbnail, name, product_type, purchase_price, unit_price, featured_status, status 
    FROM products 
    WHERE is_active = 1`;

    if (brand_id !== undefined) {
      query += ` AND brand_id = ${brand_id}`;
    }
    if (category_id !== undefined) {
      query += ` AND category_id = ${category_id}`;
    }
    if (sub_category_id !== undefined) {
      query += ` AND sub_category_id = ${sub_category_id}`;
    }
    if (sub_sub_category_id !== undefined) {
      query += ` AND sub_sub_category_id = ${sub_sub_category_id}`;
    }

    const result = await Database.executeQuery(query);
    return result;
  }
  static async productListShow(brand_id, category_id, sub_category_id, sub_sub_category_id) {

    let query = `SELECT id, thumbnail, name, product_type, purchase_price, unit_price, featured_status, status 
    FROM products 
    WHERE is_active = 1`;

    if (brand_id !== undefined) {
      query += ` AND brand_id = ${brand_id}`;
    }
    if (category_id !== undefined) {
      query += ` AND category_id = ${category_id}`;
    }
    if (sub_category_id !== undefined) {
      query += ` AND sub_category_id = ${sub_category_id}`;
    }
    if (sub_sub_category_id !== undefined) {
      query += ` AND sub_sub_category_id = ${sub_sub_category_id}`;
    }

    const result = await Database.executeQuery(query);
    return result;
  }

  static async filterProductList({ brand_id, category_id, sub_category_id, sub_sub_category_id }) {

    const query = `SELECT id, thumbnail, name, product_type, purchase_price, unit_price, featured_status, status 
    FROM products where status = 1`;

    const result = await Database.executeQuery(query);
    return result;
  }
  static async featuredStatusUpdate({ id, status }) {

    const query = `UPDATE products
    SET updated_at=now(), featured_status=${status}
    WHERE id= ?`;

    const result = await Database.executeQuery(query, [id]);
    return result;
  }

  static async activeStatusUpdate({ id, status }) {

    const query = `UPDATE products
    SET updated_at=now(), status=${status}
    WHERE id= ?`;

    const result = await Database.executeQuery(query, [id]);
    return result;
  }


  static async productDetails({ id }) {

    const query = `SELECT p.id, p.name, p.thumbnail, b.name, c.name, p.product_type, p.current_stock,p.code, p.purchase_price, p.unit_price, p.tax, p.shipping_cost  	 
    FROM products p 
    inner join brands b on b.id = p.brand_id
    inner join categories c on c.id = p.category_id 
    where p.id = ?`;

    const result = await Database.executeQuery(query, [id]);
    return result;
  }
}