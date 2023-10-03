module.exports = (sequelize, DataTypes) => {
  const debts = sequelize.define("debts", {
    debt: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  });
  return debts;
};
