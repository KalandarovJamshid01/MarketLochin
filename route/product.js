const router = require("express").Router();
const {
  addOneProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  addProductByFile,
} = require("./../controller/product");

router.route("/").get(getAllProducts).post(addOneProduct);
router.route("/file").post(addProductByFile);
router
  .route("/:id")
  .get(getOneProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
