module.exports = (sequelize, DataTypes) => {
  const payments = sequelize.define("payments", {
    paymentAmount: {
      type: DataTypes.BIGINT,
    },
    paymentType: {
      type: DataTypes.ENUM("naqd", "terminal", "transfer"),
    },
  });
  return payments;
};
