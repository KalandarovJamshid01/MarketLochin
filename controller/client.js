const db = require("./../model/index");
const clients = db.clients;
const {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
  responseFunction,
} = require("./handlerController");

const addOneClient = addOne(clients);
const getAllClients = getAll(clients, null, "clientPhone", "clientName");
const getOneClient = getOne(clients);
const updateOneClient = updateOne(clients);
const deleteOneClient = deleteOne(clients);

module.exports = {
  getAllClients,
  addOneClient,
  getOneClient,
  updateOneClient,
  deleteOneClient,
};
