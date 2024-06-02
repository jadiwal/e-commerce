import {
    STATUS_CODES,
    adminAuthRequiredFields,
    cookieAttributeForJwtToken
} from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { isAvailable, sendResponse } from '../helpers/utils.js';
import { AdminAuthService } from '../services/adminAuth.service.js';

export class VendorController {



    static vendorAdd(req, res, next) {
  
        res.render('vendor/addNewVendor', { url : env.url });
      }

    static vendorList(req, res, next) {
  
        res.render('vendor/vendorList', { url : env.url });
      }
      
}