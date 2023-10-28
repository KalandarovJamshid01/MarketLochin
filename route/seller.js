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
  deleteAllSellers,
} = require("./../controller/seller");

router
  .route("/")
  .get(protect, role(["admin"]), getAllSellers)
  .post(
    // protect, role("admin"),
  
    bcryptFunc, addSeller)
  .delete(protect, deleteAllSellers);

router.route("/me").get(protect, sellerMe);
router
  .route("/:id")
  .get(protect, getOneSeller)
  .patch(protect, bcryptFunc, updateOneSeller)
  .delete(protect, role(["admin"]), deletOneSeller);

module.exports = router;
