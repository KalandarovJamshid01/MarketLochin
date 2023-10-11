const router = require("express").Router();
const { role, protect } = require("../controller/verify");
const {
  addOneSale,
  getAllSales,
  getOneSale,
  updateSale,
  deleteSale,
  checkFile,
} = require("./../controller/sale");

router.route("/").get(protect, getAllSales).post(protect, addOneSale);

router.route("/file/:id").get(protect, checkFile);
router
  .route("/:id")
  .get(protect, getOneSale)
  .patch(protect, role(["admin"]), updateSale)
  .delete(protect, role(["admin"]), deleteSale);

module.exports = router;
