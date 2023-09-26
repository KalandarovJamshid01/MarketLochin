const db = require("./../model/index");

const products = db.products;
const {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  responseFunction,
} = require("./handlerController");

const addOneProduct = addOne(products);
const getAllProducts = getAll(products);
const getOneProduct = getOne(products);
const updateProduct = updateOne(products);
const deleteProduct = deleteOne(products);

module.exports = {
  addOneProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
