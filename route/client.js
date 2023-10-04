const router = require("express").Router();
const {
  getAllClients,
  getOneClient,
  addOneClient,
  updateOneClient,
  deleteOneClient,
  getDebitorsFile,
} = require("./../controller/client");

router.route("/").get(getAllClients).post(addOneClient);
router.route("/file").get(getDebitorsFile);
router
  .route("/:id")
  .get(getOneClient)
  .patch(updateOneClient)
  .delete(deleteOneClient);
module.exports = router;
