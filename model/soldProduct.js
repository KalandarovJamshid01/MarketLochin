module.exports = (sequelize, DataTypes) => {
  const soldproducts = sequelize.define("soldproducts", {
    soldProductName: {
      type: DataTypes.STRING,
    },
    soldPrice: {
      type: DataTypes.BIGINT,
    },
    soldQuantity: {
      type: DataTypes.BIGINT,
    },
  });
  return soldproducts;
};
