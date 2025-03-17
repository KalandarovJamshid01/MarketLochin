const router = require('express').Router();
const { role, protect } = require('../controller/verify');
const {
  addOneCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} = require('./../controller/category');

router
  .route('/')
  .get(getAllCategories)
  .post(protect, addOneCategory)
  .delete(protect, deleteAllCategories);
router
  .route('/:id')
  .get(getOneCategory)
  .patch(protect, role(['admin']), updateCategory)
  .delete(protect, role(['admin']), deleteCategory);

module.exports = router;
