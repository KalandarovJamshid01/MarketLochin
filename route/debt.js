const router = require("express").Router();
const {
  getAllDebts,
  getOneDebt,
  addOneDebt,
  updateOneDebt,
  deleteOneDebt,
  
} = require("./../controller/debt");

router.route("/").get(getAllDebts).post(addOneDebt);

router.route("/:id").get(getOneDebt).patch(updateOneDebt).delete(deleteOneDebt);
module.exports = router;
