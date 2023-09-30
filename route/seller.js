const router = require("express").Router();
const { role, protect } = require("../controller/verify");
const {
  getAllSellers,
  addSeller,
  bcryptFunc,
  getOneSeller,
  updateOneSeller,
  deletOneSeller,
} = require("./../controller/seller");

router
  .route("/")
  .get(
    // protect, role(["admin", "seller"]),
    getAllSellers)
  .post(
    // protect,role,
    bcryptFunc,
    addSeller
  );
router
  .route("/:id")
  .get(
    // protect,role,
    getOneSeller
  )
  .patch(
    // protect,role,
    bcryptFunc,
    updateOneSeller
  )
  .delete(
    // protect,role,
    deletOneSeller
  );
module.exports = router;
