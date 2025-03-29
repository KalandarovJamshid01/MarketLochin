const catchErrorAsync = require('../util/catchError');
const db = require('./../model/index');
const xlsx = require('json-as-xlsx');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

const { getAll, getOne, deleteOne, deleteAll } = require('./handlerController');

const addOneOrder = catchErrorAsync(async (req, res, next) => {
  const { clientPhone, clientName, orders, comment } = req.body;
  const productIds = orders.map((item) => item.productId);

  // Bazadan mahsulotlarni olish
  const products = await db.products.findAll({
    where: { id: { [Op.in]: productIds } },
  });

  // Buyurtmalarni qayta ishlash
  const result = orders.map((order) => {
    const product = products.find((p) => p.id === order.productId);
    const totalPrice = product?.productDiscPrice
      ? product.productDiscPrice * order.quantity
      : product?.productPrice * order.quantity;

    return {
      productName: product ? product.productName : 'Unknown',
      productModel: product ? product.productModel : 'Unknown',
      productPrice: product
        ? product.productDiscPrice || product.productPrice
        : 'Unknown',
      quantity: order.quantity,
      totalPrice: totalPrice,
      clientName: clientName,
      clientPhone: clientPhone,
      comment: comment,
    };
  });

  // Excel fayl uchun ma'lumotlar
  let data = [
    {
      sheet: 'Check',
      columns: [
        { label: 'Mahsulot nomi', value: (row) => row.productName },
        { label: 'Mahsulot modeli', value: (row) => row.productModel },
        { label: 'Miqdor', value: (row) => row.quantity },
        { label: 'Mahsulot narxi', value: (row) => row.productPrice },
        { label: 'Umumiy narx', value: (row) => row.totalPrice },
        { label: "Xaridor ma'lumotlari", value: (row) => row.clientName },
        { label: 'Izoh', value: (row) => row.comment },
      ],
      content: result,
    },
  ];

  let settings = {
    fileName: 'Check_File', // Fayl nomi
    extraLength: 3,
    writeMode: 'write',
    writeOptions: { type: 'buffer', bookType: 'xlsx' },
    RTL: false,
  };

  // **1. Faylni yaratish**
  const buffer = xlsx(data, settings);

  // **2. Faylni saqlash**
  const fileName = `check_${clientName.replace(
    /\s+/g,
    '_'
  )}_${Date.now()}.xlsx`; // Fayl nomi unik bo‘lishi uchun
  const filePath = path.join(__dirname, '../uploads', fileName);
  fs.writeFileSync(filePath, buffer); // Faylni diskka yozish

  // **3. Fayl URL'ini yaratish**
  const fileUrl = `${process.env.BASE_URL}/uploads/${fileName}`;

  // **4. Buyurtmani bazaga saqlash**
  const order = await db.orders.create({
    clientName,
    clientPhone,
    comment,
    fileUrl, // Yaratilgan fayl URL'ini saqlaymiz
  });

  // **5. Javob qaytarish**
  res.status(201).json({
    message: 'Order created successfully',
    order,
    fileUrl,
  });
});

const getAllOrders = getAll(db.orders);
const getOneOrder = getOne(db.orders);
const deleteOrder = deleteOne(db.orders);

const deleteAllOrders = deleteAll(db.orders);
module.exports = {
  addOneOrder,
  getAllOrders,
  getOneOrder,
  deleteOrder,
  deleteAllOrders,
};
