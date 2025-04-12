const router = require('express').Router();
const { role, protect } = require('../controller/verify');
const {
  getAllSliders,
  getOneSlider,
  addAllSliders,
  updateOneSlider,
  deleteOneSlider,
  getHost,
  sliderHandler,
} = require('./../controller/slider');

router.route('/').get(getHost, sliderHandler).post(protect, addAllSliders);

router
  .route('/:id')
  .get(getOneSlider)
  .patch(protect, role(['admin']), updateOneSlider)
  .delete(protect, role(['admin']), deleteOneSlider);
module.exports = router;
