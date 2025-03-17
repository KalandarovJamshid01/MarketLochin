const db = require('./../model/index');

const categories = db.categories;
const {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  deleteAll,
} = require('./handlerController');

const addOneCategory = addOne(categories);
const getAllCategories = getAll(categories, null, 'CategoryName', 'CategoryId');
const getOneCategory = getOne(categories);
const updateCategory = updateOne(categories);
const deleteCategory = deleteOne(categories);
const deleteAllCategories = deleteAll(categories);
module.exports = {
  addOneCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
};
