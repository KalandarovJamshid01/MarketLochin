const router = require("express").Router();
const {
  addOneProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  addProductByFile,
  getProductFile,
} = require("./../controller/product");

router.route("/").get(getAllProducts).post(addOneProduct);
router.route("/file/:adressId").post(addProductByFile).get(getProductFile);

router
  .route("/:id")
  .get(getOneProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
