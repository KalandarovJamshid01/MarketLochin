const router = require('express').Router();
const { role, protect } = require('../controller/verify');
const {
  addOneProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  addProductByFile,
  getProductFile,
  deleteAllPrducts,
  productDisc,
} = require('./../controller/product');

router
  .route('/')
  .get(getAllProducts)
  .post(protect, productDisc, addOneProduct)
  .delete(protect, deleteAllPrducts);
router
  .route('/file/:adressId/:storeId')
  .post(protect, addProductByFile)
  .get(protect, getProductFile);

router
  .route('/:id')
  .get(getOneProduct)
  .patch(protect, updateProduct)
  .delete(protect, role(['admin']), deleteProduct);

module.exports = router;
