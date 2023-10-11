const router = require("express").Router();
const { protect, role } = require("../controller/verify");
const {
  addOneAdress,
  getAllAdresses,
  getOneAdress,
  updateAdress,
  deleteAdress,
} = require("./../controller/adress");

router
  .route("/")
  .get(protect, getAllAdresses)
  .post(protect, role(["admin"]), addOneAdress);
router
  .route("/:id")
  .get(protect, getOneAdress)
  .patch(protect, role(["admin"]), updateAdress)
  .delete(protect, role(["admin"]), deleteAdress);

module.exports = router;
