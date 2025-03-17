const express = require('express');
const app = express();
const ErrorController = require('../controller/errorController');
const AppError = require('./../util/appError');
const { apiLimiter, apiLimiterUpload } = require('../util/appLimiter');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const uploadFile = require('./../route/uploadFile');
const seller = require('./../route/seller');
const auth = require('./../route/auth');
const store = require('../route/store');
const product = require('./../route/product');
const adress = require('../route/adress');
const sale = require('./../route/sale');
const client = require('./../route/client');
const payment = require('../route/payment');
const debt = require('../route/debt');
const firm = require('./../route/firm');
const currency = require('./../route/currency');
const category = require('./../route/category');
app.set('trust proxy', 1);
app.use('/uploads', express.static('uploads'));
app.use('/download', express.static('public'));

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(cookieParser());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(express.json({ limit: '1000000kb' }));

app.use(express.urlencoded({ extended: true }));

app.use(xss());

app.use(hpp());

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/v1/upload', apiLimiterUpload, uploadFile);
app.use('/api/v1/sellers', seller);
app.use('/api/v1/auth', auth);
app.use('/api/v1/stores', store);
app.use('/api/v1/products', product);
app.use('/api/v1/adresses', adress);
app.use('/api/v1/sales', sale);
app.use('/api/v1/clients', client);
app.use('/api/v1/payments', payment);
app.use('/api/v1/debts', debt);
app.use('/api/v1/firms', firm);
app.use('/api/v1/currencies', currency);
app.use('/api/v1/categories', category);

app.all('*', function (req, res, next) {
  next(new AppError(`This url has not found: ${req.originalUrl}`, 404));
});
app.use(ErrorController);
module.exports = app;
