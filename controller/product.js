const parceUrl = require('parse-url');
const excelToJson = require('convert-excel-to-json');
const db = require('./../model/index');
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;
const products = db.products;
const sequelize = db.sequelize;
const xlsx = require('json-as-xlsx');
const { QueryTypes } = require('sequelize');

const {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  responseFunction,
  deleteAll,
} = require('./handlerController');
const catchErrorAsync = require('../util/catchError');
const AppError = require('../util/appError');

const options = [
  {
    model: db.adresses,
  },
  {
    model: db.stores,
  },
];
const productDisc = (req, res, next) => {
  if (!req.body.productDiscPrice || req.body.productDiscPrice == 0) {
    req.body.productDiscPrice = null;
  }
  next();
};

const addOneProduct = addOne(products);
let getAllProducts = getAll(products, null, 'productModel', 'productName');

const getOneProduct = getOne(products, options);
const updateProduct = updateOne(products);
const deleteProduct = deleteOne(products);
const addProductByFile = catchErrorAsync(async (req, res, next) => {
  const path = parceUrl(req.body.url);
  const result = excelToJson({
    sourceFile: `/root/lochin/MarketLochin${path.pathname}`,
  });
  if (!result) {
    return next(new AppError('Faylni saqlashda xatolik yuz berdi', 402));
  }

  result[`${Object.keys(result)[0]}`].map(async (item) => {
    const product = await products.findOne({
      where: {
        productModel: item?.B,
      },
    });
    if (!product) {
      await products.create({
        productName: item?.A,
        productModel: item?.B,
        productMainPrice: item?.C,
        productPrice: item?.D,
        productCurrency: item?.E,
        productQuantity: item?.F,
        productMeasure: item?.G,
        storeId: req.params.storeId,
        adressId: req.params.adressId,
      });
    } else {
      let productQuantity = item?.F * 1 + product?.productQuantity * 1;
      await products.update(
        {
          productMainPrice: item?.C || product?.productMainPrice,
          productPrice: item?.D || product.productPrice,
          productQuantity: productQuantity,
        },
        { where: { id: product.id } }
      );
    }
  });

  responseFunction(
    req,
    res,
    200,
    'Created',
    result[`${Object.keys(result)[0]}`].length
  );
});

const getProductFile = catchErrorAsync(async (req, res, next) => {
  const products = await sequelize.query(
    `SELECT productName, productModel, productPrice,productCurrency, productQuantity,productMeasure, adressName from products left join adresses on products.adressId=adresses.id where products.adressId=${req.params.adressId} and products.storeId=${req.params.storeId} ORDER BY products.productQuantity ASC`,
    {
      type: QueryTypes.SELECT,
    }
  );
  let data = [
    {
      sheet: 'Check',
      columns: [
        { label: 'Mahsulot nomi', value: (row) => row.productName }, // Top level data
        { label: 'Mahsulot modeli', value: (row) => row.productModel },
        {
          label: 'Mahsulot asl narxi',
          value: (row) =>
            row?.productMainPrice || 0 + ' ' + row?.productCurrency,
        },
        {
          label: 'Mahsulot narxi',
          value: (row) => row.productPrice + ' ' + row?.productCurrency,
        },
        {
          label: 'Mahsulot valyutasi',
          value: (row) => row?.productCurrency,
        },
        {
          label: 'Mahsulot miqdori',
          value: (row) => row.productQuantity + ' ' + row.productMeasure,
        },
        { label: 'Manzil', value: (row) => row.adressName }, // Custom format

        // Run functions
      ],
      content: products,
    },
  ];

  let settings = {
    fileName: `${products[0]?.adressName} Product File`, // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: 'write', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: { type: 'buffer', bookType: 'xlsx' }, // Style options from https://docs.sheetjs.com/docs/api/write-options
    RTL: true, // Display the columns from right-to-left (the default value is false)
  };

  const file = xlsx(data, settings);
  res.statusCode = 200;
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=" ${products[0]?.adressName} Product File.xls"`
  );
  res.setHeader('Content-Type', 'application/vnd.ms-excel');
  res.end(file);
});
const deleteAllPrducts = deleteAll(products);
module.exports = {
  addOneProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  addProductByFile,
  getProductFile,
  deleteAllPrducts,
  productDisc,
};
