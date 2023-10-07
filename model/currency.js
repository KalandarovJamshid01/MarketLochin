module.exports = (sequelize, DataTypes) => {
  const currencies = sequelize.define("currencies", {
    currencyMoney: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    currencyOption: {
      type: DataTypes.STRING,
    },
  });
  return currencies;
};
