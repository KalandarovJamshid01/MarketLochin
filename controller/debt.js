const catchErrorAsync = require("../util/catchError");
const db = require("./../model/index");
const debts = db.debts;
const clients = db.clients;
const sequelize = db.sequelize;
const { QueryTypes } = sequelize;
const {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
  responseFunction,
  deleteAll,
} = require("./handlerController");

const addOneDebt = catchErrorAsync(async (req, res, next) => {
  const debt = await debts.create(req.body);

  const debtSum = await sequelize.query(
    `SELECT SUM(debts.debt) as debtSum from debts where clientId=${req.body.clientId} and storeId=${req.body.storeId} group by clientId`,
    {
      type: QueryTypes.SELECT,
    }
  );
  if (debtSum[0].debtSum == 0) {
    debts.update(
      { debtStatus: "archive" },
      {
        where: {
          clientId: req.body.clientId,
          storeId: req.body.storeId,
        },
      }
    );
    clients.update(
      {
        clientPaymentDate: null,
      },
      {
        where: {
          id: req.body.clientId,
        },
      }
    );
  }
  responseFunction(req, res, 201, debt, 1);
});
const getAllDebts = getAll(debts);
const getOneDebt = getOne(debts);
const updateOneDebt = updateOne(debts);
const deleteOneDebt = deleteOne(debts);
const deleteAllDebts = deleteAll(debts);

module.exports = {
  getAllDebts,
  addOneDebt,
  getOneDebt,
  updateOneDebt,
  deleteOneDebt,
  deleteAllDebts,
};
