const router = require("express").Router();
const {
  addOneProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require("./../controller/product");

router.route("/").get(getAllProducts).post(addOneProduct);
router
  .route("/:id")
  .get(getOneProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
