const parceUrl = require("parse-url");
const excelToJson = require("convert-excel-to-json");
const db = require("./../model/index");
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;
const products = db.products;
const {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  responseFunction,
} = require("./handlerController");
const catchErrorAsync = require("../util/catchError");
const AppError = require("../util/appError");

const addOneProduct = addOne(products);
let getAllProducts = getAll(products, null, "productModel", "productName");
// let getAllProducts = catchErrorAsync(async (req, res, next) => {
//   const data = await products.findAll({
//     where: {
//       productName: { [Op.like]: "%" + req.query.search + "%" },
//     },
//   });
//   res.status(200).json(data);
// });
const getOneProduct = getOne(products);
const updateProduct = updateOne(products);
const deleteProduct = deleteOne(products);
const addProductByFile = catchErrorAsync(async (req, res, next) => {
  const path = parceUrl(req.body.url);

  const result = excelToJson({
    sourceFile: `${__dirname}./..${path.pathname}`,
  });
  if (!result) {
    return next(new AppError("Faylni saqlashda xatolik yuz berdi", 402));
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
        productPrice: item?.C,
        productQuantity: item?.D,
        productMeasure: item?.E,
        storeId: req.body.storeId,
        adressId: req.body.adressId,
      });
    } else {
      let productQuantity = item?.D + product?.productQuantity;
      await products.update(
        {
          productPrice: item?.C || product.productPrice,
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
    "Created",
    result[`${Object.keys(result)[0]}`].length
  );
});

module.exports = {
  addOneProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  addProductByFile,
};
