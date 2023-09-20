const router = require("express").Router();
const seller = require("./../controller/seller");

router.route("/").get(seller.getAllSellers);

module.exports = router;
