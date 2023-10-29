const router = require("express").Router();
const { role, protect } = require("../controller/verify");
const {
  addOneProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  addProductByFile,
  getProductFile,
  deleteAllPrducts,
} = require("./../controller/product");

router
  .route("/")
  .get(
    protect,
    getAllProducts)
  .post(protect, addOneProduct)
  .delete(protect, deleteAllPrducts);
router
  .route("/file/:adressId/:storeId")
  .post(protect, addProductByFile)
  .get(protect, getProductFile);

router
  .route("/:id")
  .get(protect, getOneProduct)
  .patch(protect, updateProduct)
  .delete(protect, role(["admin"]), deleteProduct);

module.exports = router;
