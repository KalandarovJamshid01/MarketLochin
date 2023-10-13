const router = require("express").Router();
const { protect, role } = require("../controller/verify");
const {
  getAllClients,
  getOneClient,
  addOneClient,
  updateOneClient,
  deleteOneClient,
  getDebitorsFile,
  getDebitorsStore,
  sendSms,
} = require("./../controller/client");

router.route("/").get(protect, getAllClients).post(protect, addOneClient);
router.route("/file").get(protect, getDebitorsFile);
router
  .route("/sms/:storeId")
  .get(
    // protect, role(["admin"]),
    getDebitorsStore)
  .post(
    // protect, role(["admin"]),
    sendSms);
router
  .route("/:id")
  .get(protect, getOneClient)
  .patch(protect, role(["admin"]), updateOneClient)
  .delete(protect, role(["admin"]), deleteOneClient);
module.exports = router;
