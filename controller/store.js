const db = require("./../model/index");

const stores = db.stores;
const {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  responseFunction,
} = require("./handlerController");

const addOneStore = addOne(stores);
const getAllStores = getAll(stores, null, "storeName", "storeId");
const getOneStore = getOne(stores);
const updateStore = updateOne(stores);
const deleteStore = deleteOne(stores);

module.exports = {
  addOneStore,
  getAllStores,
  getOneStore,
  updateStore,
  deleteStore,
};
