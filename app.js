import express from 'express';
import cookieParser from 'cookie-parser';
import { STATUS_CODES, env } from './helpers/constants.js';
import { AppError, handleError } from './helpers/error.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { ROOT_PATH } from './helpers/root_path.js'
import cors from 'cors';

// routes file import
import { adminAuthRoutes } from './routes/adminAuth.routes.js';
import {orderRoutes} from './routes/order.routes.js';
import {customersRoutes} from './routes/customers.routes.js';
import { offersRoutes } from './routes/offers.routes.js';
import { productRoutes } from './routes/product.routes.js';
import { vendorRoutes } from './routes/vendor.routes.js';
import { categoryRoutes } from './routes/category.routes.js';
import { attributeRoutes } from './routes/attribute.routes.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

global.env = env;

const app = express();

app.use(cors())
// middlewares
app.use(express.json());
app.use(cookieParser());

// routes initalization
adminAuthRoutes(new ROOT_PATH(),app);
orderRoutes(new ROOT_PATH('/order'),app);
customersRoutes(new ROOT_PATH('/customers'),app);
productRoutes(new ROOT_PATH("/product"),app);
offersRoutes(new ROOT_PATH("/offer"),app);
vendorRoutes(new ROOT_PATH("/vendor"),app);
categoryRoutes(new ROOT_PATH("/category"),app);
attributeRoutes(new ROOT_PATH("/attribute"),app);

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

// Set the views directory
app.set('views', join(__dirname, 'views'));

// Set the view engine (if you're using a templating engine like EJS)
app.set('view engine', 'ejs');

app.all('*', (req, _, next) => {
  next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server!`, STATUS_CODES.NOT_FOUND));
});

// centralized error handling
app.use((err, req, res, _) => {
  handleError(err, req, res, _);
});


// console.log( process.env.url)
// running the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));



