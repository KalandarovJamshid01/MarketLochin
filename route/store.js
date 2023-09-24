const router = require("express").Router();
const {
  addOneStore,
  getAllStores,
  getOneStore,
  updateStore,
  deleteStore,
} = require("./../controller/store");

router.route("/").get(getAllStores).post(addOneStore);
router.route("/:id").get(getOneStore).patch(updateStore).delete(deleteStore);

module.exports = router;
