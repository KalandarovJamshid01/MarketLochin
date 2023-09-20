const catchErrorAsync = require("../util/catchError");
const AppError = require("../util/appError");
const bcrypt = require("bcryptjs");
const db = require("./../model/index");

const sellers = db.sellers;
const {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  responseFunction,
} = require("./handlerController");

const getAllSellers = getAll(sellers);

const bcryptFunc = (req, res, next) => {
  if (req.body.password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
  }
  next();
};
const addSeller = addOne(sellers);
const getOneSeller = getOne(sellers);
const updateOneSeller = updateOne(sellers);
const deletOneSeller = deleteOne(sellers);
module.exports = {
  getAllSellers,
  addSeller,
  bcryptFunc,
  getOneSeller,
  updateOneSeller,
  deletOneSeller,
};
