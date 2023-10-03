const db = require("./../model/index");
const payments = db.payments;
const {
  getAll,
  getOne,
  addOne,
  addAll,
  updateOne,
  deleteOne,
  responseFunction,
} = require("./handlerController");

const addAllPayments = addAll(payments);
const getAllPayments = getAll(payments);
const getOnePayment = getOne(payments);
const updateOnePayment = updateOne(payments);
const deleteOnePayment = deleteOne(payments);

module.exports = {
  getAllPayments,
  addAllPayments,
  getOnePayment,
  updateOnePayment,
  deleteOnePayment,
};
