module.exports = (sequelize, DataTypes) => {
  const clients = sequelize.define("clients", {
    clientName: {
      type: DataTypes.STRING,
    },
    clientAdress: {
      type: DataTypes.STRING,
    },
    clientPhone: {
      type: DataTypes.BIGINT,
    },
    clientDebtAmount: {
      type: DataTypes.BIGINT,
    },
    clientPaidMoney: {
      type: DataTypes.BIGINT,
    },
    clientPaymentDate: {
      type: DataTypes.DATE,
    },
  });
  return clients;
};
