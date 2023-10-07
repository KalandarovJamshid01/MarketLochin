const db = require("./../model/index");
const firms = db.firms;
const {
  getAll,
  getOne,
  addAll,
  updateOne,
  deleteOne,
  responseFunction,
  addOne,
} = require("./handlerController");

const addAllFirms = addOne(firms);
const getAllFirms = getAll(firms, null, "firmName", "firmINN");
const getOneFirm = getOne(firms);
const updateOneFirm = updateOne(firms);
const deleteOneFirm = deleteOne(firms);

module.exports = {
  getAllFirms,
  addAllFirms,
  getOneFirm,
  updateOneFirm,
  deleteOneFirm,
};
