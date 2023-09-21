module.exports = (sequelize, DataTypes) => {
  const soldproducts = sequelize.define("soldproducts", {
    soldPrice: {
      type: DataTypes.BIGINT,
    },
    soldQuantity: {
      type: DataTypes.BIGINT,
    },
  });
  return soldproducts;
};
