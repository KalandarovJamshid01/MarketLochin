const db = require("./../model/index");
const currencies = db.currencies;
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

const addAllCurrencies = addOne(currencies);
const getAllCurrencies = getAll(
  currencies,
  null,
  "currencyMoney",
  "currencyOption"
);
const getOneCurrency = getOne(currencies);
const updateOneCurrency = updateOne(currencies);
const deleteOneCurrency = deleteOne(currencies);
const deleteAllCurrencies = deleteAll(currencies);
module.exports = {
  getAllCurrencies,
  addAllCurrencies,
  getOneCurrency,
  updateOneCurrency,
  deleteOneCurrency,
  deleteAllCurrencies,
};
