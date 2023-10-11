const router = require("express").Router();
const { protect, role } = require("../controller/verify");
const {
  getAllCurrencies,
  getOneCurrency,
  addAllCurrencies,
  updateOneCurrency,
  deleteOneCurrency,
} = require("./../controller/currency");

router
  .route("/")
  .get(protect, getAllCurrencies)
  .post(protect, addAllCurrencies);
router
  .route("/:id")
  .get(protect, getOneCurrency)
  .patch(protect, role(["admin"]), updateOneCurrency)
  .delete(protect, role(["admin"]), deleteOneCurrency);
module.exports = router;
