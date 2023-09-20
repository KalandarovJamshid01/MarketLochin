const router = require("express").Router();
const { updateOne } = require("../controller/handlerController");
const {
  getAllSellers,
  addSeller,
  bcryptFunc,
  getOneSeller,
  updateOneSeller,
  deletOneSeller,
} = require("./../controller/seller");

router.route("/").get(getAllSellers).post(bcryptFunc, addSeller);
router
  .route("/:id")
  .get(getOneSeller)
  .patch(bcryptFunc, updateOneSeller)
  .delete(deletOneSeller);
module.exports = router;
