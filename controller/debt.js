const db = require("./../model/index");
const debts = db.debts;
const {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
  responseFunction,
} = require("./handlerController");

const addOneDebt = addOne(debts);
const getAllDebts = getAll(debts);
const getOneDebt = getOne(debts);
const updateOneDebt = updateOne(debts);
const deleteOneDebt = deleteOne(debts);

module.exports = {
  getAllDebts,
  addOneDebt,
  getOneDebt,
  updateOneDebt,
  deleteOneDebt,
};
