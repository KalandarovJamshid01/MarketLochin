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
  deleteAll,
} = require("./handlerController");

const options = [
  {
    model: db.currencies,
  },
];

const addAllFirms = addOne(firms);
const getAllFirms = getAll(firms, null, "firmName", "firmINN");
const getOneFirm = getOne(firms, options);
const updateOneFirm = updateOne(firms);
const deleteOneFirm = deleteOne(firms);
const deleteAllFirms = deleteAll(firms);
module.exports = {
  getAllFirms,
  addAllFirms,
  getOneFirm,
  updateOneFirm,
  deleteOneFirm,
  deleteAllFirms,
};
