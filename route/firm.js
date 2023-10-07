const router = require("express").Router();
const {
  getAllFirms,
  getOneFirm,
  addAllFirms,
  updateOneFirm,
  deleteOneFirm,
} = require("./../controller/firm");

router.route("/").get(getAllFirms).post(addAllFirms);
router.route("/:id").get(getOneFirm).patch(updateOneFirm).delete(deleteOneFirm);
module.exports = router;
