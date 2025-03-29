const router = require('express').Router();
const { role, protect } = require('../controller/verify');
const {
  addOneOrder,
  getAllOrders,
  getOneOrder,
  deleteOrder,
  deleteAllOrders,
} = require('./../controller/order');

router.route('/').get(getAllOrders).post(addOneOrder).delete(deleteAllOrders);

router.route('/:id').get(getOneOrder).delete(deleteOrder);

module.exports = router;
