const router = require("express").Router();
const { protect } = require("../controller/verify");
const uploadFile = require("./../controller/uploadFile");

router
  .route("/")
  .post(protect, uploadFile.upload.single("file"), uploadFile.uploadFile)
  .get();
module.exports = router;
