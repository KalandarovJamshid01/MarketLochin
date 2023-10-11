const router = require("express").Router();
const { role, protect } = require("../controller/verify");
const {
  getAllSellers,
  addSeller,
  bcryptFunc,
  getOneSeller,
  updateOneSeller,
  deletOneSeller,
  sellerMe,
} = require("./../controller/seller");

router
  .route("/")
  .get(
    // protect, role(["admin"]),
    getAllSellers)
  .post(protect, role("admin"), bcryptFunc, addSeller);

router.route("/me").get(protect, sellerMe);
router
  .route("/:id")
  .get(protect, getOneSeller)
  .patch(protect, role(["admin"]), bcryptFunc, updateOneSeller)
  .delete(protect, role(["admin"]), deletOneSeller);

module.exports = router;
