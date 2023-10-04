const router = require("express").Router();
const {
  addOneSale,
  getAllSales,
  getOneSale,
  updateSale,
  deleteSale,
  checkFile,
} = require("./../controller/sale");

router.route("/").get(getAllSales).post(addOneSale);

router.route("/file/:id").get(checkFile)
router.route("/:id").get(getOneSale).patch(updateSale).delete(deleteSale);

module.exports = router;
