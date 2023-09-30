const router = require("express").Router();
const {
  addOneSale,
  getAllSales,
  getOneSale,
  updateSale,
  deleteSale,
} = require("./../controller/sale");

router.route("/").get(getAllSales).post(addOneSale);
router.route("/:id").get(getOneSale).patch(updateSale).delete(deleteSale);

module.exports = router;
