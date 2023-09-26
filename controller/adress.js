const db = require("./../model/index");

const adresses = db.adresses;
const {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  responseFunction,
} = require("./handlerController");

const addOneAdress = addOne(adresses);
const getAllAdresses = getAll(adresses);
const getOneAdress = getOne(adresses);
const updateAdress = updateOne(adresses);
const deleteAdress = deleteOne(adresses);

module.exports = {
  addOneAdress,
  getAllAdresses,
  getOneAdress,
  updateAdress,
  deleteAdress,
};
