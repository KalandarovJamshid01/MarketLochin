const router = require("express").Router();
const {
  getAllPayments,
  getOnePayment,
  addAllPayments,
  updateOnePayment,
  deleteOnePayment,
} = require("./../controller/payment");

router.route("/").get(getAllPayments).post(addAllPayments);
router
  .route("/:id")
  .get(getOnePayment)
  .patch(updateOnePayment)
  .delete(deleteOnePayment);
module.exports = router;
