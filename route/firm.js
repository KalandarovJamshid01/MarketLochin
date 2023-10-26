const router = require("express").Router();
const { role, protect } = require("../controller/verify");
const {
  getAllFirms,
  getOneFirm,
  addAllFirms,
  updateOneFirm,
  deleteOneFirm,
  deleteAllFirms,
} = require("./../controller/firm");

router
  .route("/")
  .get(protect, getAllFirms)
  .post(protect, addAllFirms)
  .delete(protect, deleteAllFirms);
router
  .route("/:id")
  .get(protect, getOneFirm)
  .patch(protect, role(["admin"]), updateOneFirm)
  .delete(protect, role(["admin"]), deleteOneFirm);
module.exports = router;
