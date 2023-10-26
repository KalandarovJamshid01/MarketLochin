const catchErrorAsync = require("../util/catchError");
const db = require("./../model/index");

const adresses = db.adresses;
const {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  responseFunction,
  deleteAll,
} = require("./handlerController");

const addOneAdress = addOne(adresses);
const getAllAdresses = getAll(adresses, null, "adressName", "adressImgUrl");
const getOneAdress = getOne(adresses);
const updateAdress = updateOne(adresses);
const deleteAdress = deleteOne(adresses);
const deleteAllAdress = deleteAll(adresses);

module.exports = {
  addOneAdress,
  getAllAdresses,
  getOneAdress,
  updateAdress,
  deleteAdress,
  deleteAllAdress,
};
