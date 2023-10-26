const db = require("./../model/index");
const payments = db.payments;
const {
  getAll,
  getOne,
  addAll,
  updateOne,
  deleteOne,
  responseFunction,
  deleteAll,
} = require("./handlerController");

const addAllPayments = addAll(payments);
const getAllPayments = getAll(payments);
const getOnePayment = getOne(payments);
const updateOnePayment = updateOne(payments);
const deleteOnePayment = deleteOne(payments);
const deleteAllPayments = deleteAll(payments);

module.exports = {
  getAllPayments,
  addAllPayments,
  getOnePayment,
  updateOnePayment,
  deleteOnePayment,
  deleteAllPayments,
};
