const catchErrorAsync = require('../util/catchError');
const db = require('./../model/index');
const sequelize = db.sequelize;
const sliders = db.sliders;
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  addOne,
  deleteAll,
  responseFunction,
} = require('./handlerController');

const addAllSliders = addOne(sliders);
const getHost = (req, res, next) => {
  const host = req.get('host'); // => "admin.marketlochin.uz" yoki "marketlochin.uz"
  if (host.startsWith('admin.')) {
    req.sliderHandler = 'admin';
  } else {
    req.sliderHandler = 'client';
  }

  next();
};

const sliderHandler = (req, res, next) => {
  if (req.sliderHandlerType === 'admin') {
    return getAllSliders(req, res, next);
  } else {
    return getSlidersClient(req, res, next);
  }
};

const getAllSliders = getAll(sliders);
const getSlidersClient = catchErrorAsync(async (req, res) => {
  const result = await sequelize.query(
    `
      SELECT *
      FROM (
        SELECT *,
          ROW_NUMBER() OVER (PARTITION BY slideOrder ORDER BY createdAt DESC) as row_num
        FROM sliders
      ) AS ordered_sliders
      WHERE row_num = 1
    `,
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );
  responseFunction(req, res, 200, result, 3);
});
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
  getSlidersClient,
  getHost,
  sliderHandler,
};
