const db = require("./../model/index");
const payments = db.payments;
const sequelize = db.sequelize;
const axios = require("axios");
const { QueryTypes } = require("sequelize");
const schedule = require("node-schedule");
const {
  getAll,
  getOne,
  addAll,
  updateOne,
  deleteOne,
  responseFunction,
  deleteAll,
} = require("./handlerController");
const catchErrorAsync = require("../util/catchError");

const addAllPayments = addAll(payments);
const getAllPayments = getAll(payments);

const getOnePayment = getOne(payments);
const updateOnePayment = updateOne(payments);
const deleteOnePayment = deleteOne(payments);
const deleteAllPayments = deleteAll(payments);
const j = schedule.scheduleJob({ hour: 21, minute: 0 }, async () => {
  try {
    const date = new Date();
    var yesterday = new Date(date.getTime());
    yesterday.setDate(date.getDate() - 1);
    yesterday = yesterday.toISOString().slice(0, -5).replace("T", " ");
    const today = new Date().toISOString().slice(0, -5).replace("T", " ");
    const data = {
      email: "kalandarovjamshid01@gmail.com",
      password: "eJgfZSxUpqxiRrKqXBwXo88IKhXOk6WFFwIBZGqR",
    };
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://notify.eskiz.uz/api/auth/login",
      headers: {},
      data: data,
    };
    const authData = await axios(config);

    const payments = await sequelize.query(
      `Select sum(paymentAmount) as paymentSum,paymentType,storeName from payments left join stores on payments.storeId=stores.id where payments.createdAt BETWEEN "${yesterday}" and "${today}" group by payments.storeId, payments.paymentType `,
      {
        type: QueryTypes.SELECT,
      }
    );
    const admins = JSON.parse(process.env.ADMINSNUMBER);
    await Promise.all(
      admins.map(async (item) => {
        let message = "";
        await Promise.all(
          payments.map(async (item) => {
            message =
              message +
              "\n" +
              `Do'kon nomi: ${item.storeName} \n To'lov turi: ${item.paymentType} \n Jami summa: ${item.paymentSum}`;
          })
        );
        var config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://notify.eskiz.uz/api/message/sms/send",
          headers: {
            Authorization: `Bearer ${authData.data.data.token}`,
          },
          data: {
            mobile_phone: item,
            message: `${yesterday} dan ${today} gacha oraliqdagi to'lovlar ${message}`,
            from: 4546,
            callback_url: "https://marketlochin.uz",
          },
        };
        await axios(config);
      })
    );
  } catch (error) {
    console.log(error);
  }
});
module.exports = {
  getAllPayments,
  addAllPayments,
  getOnePayment,
  updateOnePayment,
  deleteOnePayment,
  deleteAllPayments,
};
