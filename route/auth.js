const router = require("express").Router();
const { login } = require("./../controller/auth");
router.route("/").post(login);
module.exports = router;
