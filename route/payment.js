const router = require("express").Router();
const { protect, role } = require("../controller/verify");
const {
  getAllPayments,
  getOnePayment,
  addAllPayments,
  updateOnePayment,
  deleteOnePayment,
} = require("./../controller/payment");

router.route("/").get(protect, getAllPayments).post(protect, addAllPayments);
router
  .route("/:id")
  .get(protect, getOnePayment)
  .patch(protect, role(["admin"]), updateOnePayment)
  .delete(protect, role(["admin"]), deleteOnePayment);
module.exports = router;
