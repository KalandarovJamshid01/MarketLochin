module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientPhone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
    },
    fileUrl: {
      type: DataTypes.STRING,
    },
  });
  return orders;
};
