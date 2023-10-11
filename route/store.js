const router = require("express").Router();
const { role, protect } = require("../controller/verify");
const {
  addOneStore,
  getAllStores,
  getOneStore,
  updateStore,
  deleteStore,
} = require("./../controller/store");

router.route("/").get(protect, getAllStores).post(protect, addOneStore);
router
  .route("/:id")
  .get(protect, getOneStore)
  .patch(protect, role(["admin"]), updateStore)
  .delete(protect, role(["admin"]), deleteStore);

module.exports = router;
