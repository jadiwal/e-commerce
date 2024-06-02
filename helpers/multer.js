import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import moment from 'moment';

class FileUploader {
    constructor() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        // Specify the destination folder relative to the 'public' directory
        const uploadFolder = path.join(__dirname, '../public/uploads');

        // Check if the uploads folder exists within the public folder, if not, create it
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
        }

        const storage = multer.diskStorage({
            destination: function (req, file, callBack) {
                  if (file.fieldname === "flash") {
                    callBack(null, "./public");
                  } else if (file.fieldname === "flash_update") {
                    callBack(null, "./public");
                  }else if (file.fieldname === "images") {
                    callBack(null, "./public");
                  }else if (file.fieldname === "color_image") {
                    callBack(null, "./public");
                  }else if (file.fieldname === "thumbnail") {
                    callBack(null, "./public");
                  }else if (file.fieldname === "meta_image") {
                    callBack(null, "./public");
                  }else if (file.fieldname === "Updateimages") {
                    callBack(null, "./public");
                  }else if (file.fieldname === "UpdatecolorImage") {
                    callBack(null, "./public");
                  }else if (file.fieldname === "Updatethumbnail") {
                    callBack(null, "./public");
                  }else if (file.fieldname === "Updatemeta_image") {
                    callBack(null, "./public");
                  }else if (file.fieldname === "category_image") {
                    callBack(null, "./public");
                  }else if (file.fieldname === "category_image_update") {
                    callBack(null, "./public");
                  }
            },
            filename: function (req, file, callBack) {
                let image_path = '';
                if (file.fieldname === "flash") {
                    const filename =
                      req.body.title +
                      "-flash" +
                      "-" +
                      moment() +
                      path.extname(file.originalname);
                    image_path = "uploads/flash/" + filename;
                  } else if (file.fieldname === "flash_update") {
                    const filename =
                      req.body.title +
                      "-flash" +
                      "-" +
                      moment() +
                      path.extname(file.originalname);
                    // console.log(filename);
                    image_path = "uploads/products/" + filename;
                  }else if (file.fieldname === "color_image") {
                    const filename =
                      req.body.name +
                      "-products" +
                      "-" +
                      moment() + '-' + Math.round(Math.random() * 1E9) +
                      path.extname(file.originalname);
                    // console.log(filename);
                    image_path = "uploads/products/" + filename;
                  }else if (file.fieldname === "images") {
                    const filename =
                      req.body.name +
                      "-products" +
                      "-" +
                      moment() + '-' + Math.round(Math.random() * 1E9) +
                      path.extname(file.originalname);
                    // console.log(filename);
                    image_path = "uploads/products/" + filename;
                  }else if (file.fieldname === "thumbnail") {
                    const filename =
                      req.body.name +
                      "-products" +
                      "-" +
                      moment() + '-' + Math.round(Math.random() * 1E9) +
                      path.extname(file.originalname);
                    // console.log(filename);
                    image_path = "uploads/products/" + filename;
                  }else if (file.fieldname === "meta_image") {
                    const filename =
                      req.body.name +
                      "-products" +
                      "-" +
                      moment() + '-' + Math.round(Math.random() * 1E9) +
                      path.extname(file.originalname);
                    // console.log(filename);
                    image_path = "uploads/products/" + filename;
                  }else if (file.fieldname === "Updateimages") {
                    const filename =
                      req.body.name +
                      "-products" +
                      "-" +
                      moment() +
                      path.extname(file.originalname);
                    // console.log(filename);
                    image_path = "uploads/products/" + filename;
                  }else if (file.fieldname === "UpdatecolorImage") {
                    const filename =
                      req.body.name +
                      "-products" +
                      "-" +
                      moment() +
                      path.extname(file.originalname);
                    // console.log(filename);
                    image_path = "uploads/products/" + filename;
                  }else if (file.fieldname === "Updatethumbnail") {
                    const filename =
                      req.body.name +
                      "-products" +
                      "-" +
                      moment() +
                      path.extname(file.originalname);
                    // console.log(filename);
                    image_path = "uploads/products/" + filename;
                  }else if (file.fieldname === "Updatemeta_image") {
                    const filename =
                      req.body.name +
                      "-products" +
                      "-" +
                      moment() +
                      path.extname(file.originalname);
                    // console.log(filename);
                    image_path = "uploads/products/" + filename;
                  }else if (file.fieldname === "category_image") {
                    const filename =
                      req.body.name +
                      "-category" +
                      "-" +
                      moment() +
                      path.extname(file.originalname);
                    // console.log(filename);
                    image_path = "uploads/category/" + filename;
                  }else if (file.fieldname === "category_image_update") {
                    const filename =
                      req.body.name.replace(/\s+/g, '_') +
                      "-category" +
                      "-" +
                      moment() +
                      path.extname(file.originalname);
                    // console.log(filename);
                    image_path = "uploads/category/" + filename;
                  }

                  callBack(null, image_path);
            }
        });

        this.upload = multer({ storage: storage });
    }
}

export default FileUploader;
