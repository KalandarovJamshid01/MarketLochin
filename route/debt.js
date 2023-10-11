const router = require("express").Router();
const { role, protect } = require("../controller/verify");
const {
  getAllDebts,
  getOneDebt,
  addOneDebt,
  updateOneDebt,
  deleteOneDebt,
} = require("./../controller/debt");

router.route("/").get(protect, getAllDebts).post(protect, addOneDebt);

router
  .route("/:id")
  .get(protect, getOneDebt)
  .patch(protect, role(["admin"]), updateOneDebt)
  .delete(protect, role(["admin"]), deleteOneDebt);
module.exports = router;
