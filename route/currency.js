const router = require("express").Router();
const {
  getAllCurrencies,
  getOneCurrency,
  addAllCurrencies,
  updateOneCurrency,
  deleteOneCurrency,
} = require("./../controller/currency");

router.route("/").get(getAllCurrencies).post(addAllCurrencies);
router
  .route("/:id")
  .get(getOneCurrency)
  .patch(updateOneCurrency)
  .delete(deleteOneCurrency);
module.exports = router;
