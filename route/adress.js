const router = require("express").Router();
const {
  addOneAdress,
  getAllAdresses,
  getOneAdress,
  updateAdress,
  deleteAdress,
} = require("./../controller/adress");

router.route("/").get(getAllAdresses).post(addOneAdress);
router.route("/:id").get(getOneAdress).patch(updateAdress).delete(deleteAdress);

module.exports = router;
