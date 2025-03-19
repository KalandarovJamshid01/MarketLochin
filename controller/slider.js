const db = require('./../model/index');
const sliders = db.sliders;
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  addOne,
  deleteAll,
} = require('./handlerController');

const addAllSliders = addOne(sliders);
const getAllSliders = getAll(sliders);
const getOneSlider = getOne(sliders);
const updateOneSlider = updateOne(sliders);
const deleteOneSlider = deleteOne(sliders);
const deleteAllsliders = deleteAll(sliders);
module.exports = {
  getAllSliders,
  addAllSliders,
  getOneSlider,
  updateOneSlider,
  deleteOneSlider,
  deleteAllsliders,
};
