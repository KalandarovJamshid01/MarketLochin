module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define("sales", {
    saleMainPrice: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    saleSoldPrice: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    saleDebt: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    comment: {
      type: DataTypes.STRING,
    },
  });
  return sales;
};
